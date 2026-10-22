// Synthetic ambient sound generator via Web Audio API
// 100% self-contained, no external audio files or network requests needed.

class AmbientSoundGenerator {
  private ctx: AudioContext | null = null;
  private currentTrack: 'rain' | 'ocean' | 'forest' | 'binaural' | null = null;
  private isPlaying = false;
  private volumeNode: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(track: 'rain' | 'ocean' | 'forest' | 'binaural', volume = 0.4) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrack = track;

    this.volumeNode = this.ctx.createGain();
    this.volumeNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.volumeNode.connect(this.ctx.destination);

    switch (track) {
      case 'rain':
        this.generateRain();
        break;
      case 'ocean':
        this.generateOcean();
        break;
      case 'forest':
        this.generateForest();
        break;
      case 'binaural':
        this.generateBinaural();
        break;
    }
  }

  public setVolume(volume: number) {
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrack = null;
    for (const node of this.activeNodes) {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else {
        try {
          if ('stop' in node && typeof (node as any).stop === 'function') {
            (node as any).stop();
          }
          node.disconnect();
        } catch {
          // Ignore disconnection error
        }
      }
    }
    this.activeNodes = [];
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      track: this.currentTrack,
    };
  }

  // Pink noise generator buffer
  private createPinkNoiseBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error('No context');
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  private generateRain() {
    if (!this.ctx || !this.volumeNode) return;
    const pinkNoise = this.createPinkNoiseBuffer();

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = pinkNoise;
    noiseSource.loop = true;

    // Filter to sound like soft rainfall
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.6, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.volumeNode);

    noiseSource.start();
    this.activeNodes.push(noiseSource, filter, rainGain);
  }

  private generateOcean() {
    if (!this.ctx || !this.volumeNode) return;
    const pinkNoise = this.createPinkNoiseBuffer();

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = pinkNoise;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    // LFO for wave swelling
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave cycles

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(waveGain.gain);

    noiseSource.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.volumeNode);

    noiseSource.start();
    lfo.start();
    this.activeNodes.push(noiseSource, filter, lfo, waveGain, lfoGain);
  }

  private generateForest() {
    if (!this.ctx || !this.volumeNode) return;
    const pinkNoise = this.createPinkNoiseBuffer();

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = pinkNoise;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Modulate filter for gentle wind gusts
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.volumeNode);

    noiseSource.start();
    lfo.start();
    this.activeNodes.push(noiseSource, filter, lfo, lfoGain, windGain);
  }

  private generateBinaural() {
    if (!this.ctx || !this.volumeNode) return;

    // 432 Hz base carrier with 10 Hz alpha wave difference
    const oscLeft = this.ctx.createOscillator();
    const oscRight = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscRight.type = 'sine';
    oscLeft.frequency.setValueAtTime(216, this.ctx.currentTime);
    oscRight.frequency.setValueAtTime(226, this.ctx.currentTime); // 10 Hz difference (Alpha brainwave)

    const merger = this.ctx.createChannelMerger(2);
    const toneGain = this.ctx.createGain();
    toneGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(toneGain);
    toneGain.connect(this.volumeNode);

    oscLeft.start();
    oscRight.start();
    this.activeNodes.push(oscLeft, oscRight, merger, toneGain);
  }
}

export const ambientSound = new AmbientSoundGenerator();
