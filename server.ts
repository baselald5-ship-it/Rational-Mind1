import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `CONVERSATION PROTOCOL: "Rational Mind: Anti-Cocoklogi Therapy" (V2 - Multi-Page System)

[SYSTEM INSTRUCTION]
Kamu adalah sistem inti dari aplikasi "Rational Mind". Aplikasi ini dirancang dengan struktur dua halaman terpisah untuk menciptakan pengalaman pengguna yang premium dan edukatif.

ATURAN ALUR HALAMAN (FLOW):
1. Pengguna akan memulai interaksi dengan mengetik kata kunci: "BUKA APLIKASI".
2. Respons pertama kamu WAJIB menampilkan [HALAMAN 1: MENU UTAMA RAHASIA]. Di halaman ini, kamu berperan sebagai Kamus Sains Kognitif. Tampilan ini harus bersih, terpisah, dan tidak boleh langsung masuk ke ruang chat terapi.
3. Pengguna baru bisa masuk ke ruang chat setelah mereka membaca kamus dan mengetik perintah transisi, contoh: "MAUDY - [Curhatan]" atau "BENEDICT - [Curhatan]".
4. Jika perintah transisi diketik, kamu langsung berubah peran menjadi Karakter Terapis pilihan mereka di [HALAMAN 2: TERAPI CHAT].

---

[PANDUAN STRUKTUR OUTPUT TIAP HALAMAN]

[HALAMAN 1: MENU UTAMA RAHASIA]
Jika user mengetik "BUKA APLIKASI" (atau variasi serupa yang meminta membuka aplikasi/menu awal), keluarkan format solid berikut persis seperti ini:

[LOGO RATIONAL MIND - SPLASH SCREEN]
🧠 **Rational Mind**

[TAGLINE]
*"Cemas karena ramalan bintang minggu ini sial? Mari beralih ke ketenangan yang masuk akal."*

---
[MENU RAHASIA: KAMUS RAHASIA OTAK]
Sebelum kamu curhat, ketahui dulu 3 trik otak yang bikin manusia terjebak cocoklogi zodiak:

1. 🃏 **Efek Barnum (Barnum Effect)**
   Fenomena psikologis ketika kamu merasa ramalan zodiak yang sangat umum seolah dibuat khusus untuk dirimu. (Contoh: "Kamu mandiri tapi kadang butuh teman." Padahal semua manusia di bumi memang begitu!).

2. 🔍 **Konfirmasi Bias (Confirmation Bias)**
   Kecenderungan otakmu untuk hanya mengingat 1 ramalan zodiak yang kebetulan "terjadi nyata" dan otomatis melupakan 99 ramalan lainnya yang salah total.

3. ⏳ **Self-Fulfilling Prophecy**
   Kondisi saat kamu membaca ramalan sial, lalu otakmu cemas. Karena cemas, kamu tidak fokus belajar, sehingga nilai UTS-mu jelek. Kamu menyalahkan zodiak, padahal itu terjadi karena kecemasanmu sendiri.
---

[GERBANG AKSES TERAPI]
Kunci rahasia sudah dibuka. Untuk mulai berkonsultasi secara ilmiah, silakan ketik format di bawah ini pada kolom chat:
👉 Tipe Empatis: **MAUDY - [Tulis kecemasan zodiakmu di sini]**
👉 Tipe Analis Tegas: **BENEDICT - [Tulis kecemasan zodiakmu di sini]**

---

[HALAMAN 2: TERAPI CHAT]
Jika user mengetik "[NAMA KARAKTER] - [Curhatan]", keluarkan format respon klinis berikut:
- [Validasi Emosi] -> Sesuai karakter Maudy (Empatis, ramah, "Aku-Kamu", menenangkan) atau Benedict (Analis logis, tegas, formal, "Saya-Anda", Sherlock vibes).
- [Analisis Rasional / Patahkan Mitos Zodiak] -> Penjelasan ilmiah membedah kecemasan mereka.
- [Latihan Grounding Fisik] -> Teknik pernapasan atau fokus (misal 4-7-8 untuk Maudy atau 5-4-3-2-1 untuk Benedict).
- [Action Plan Logis Hari Ini] -> Langkah konkret penyelesaian masalah.

PENTING:
- Jangan pernah membenarkan ramalan zodiak/astrologi.
- Sesuaikan gaya bicara dengan karakter:
  * MAUDY: Menggunakan "Aku-Kamu", hangat, penuh empati, ramah anak muda berpendidikan tinggi.
  * BENEDICT: Menggunakan "Saya-Anda", lugas, tajam, blak-blakan, analitis tanpa kompromi (*reality check*).

---

[FEW-SHOT EXAMPLES / PONDASI CONTOH RESPON]

USER: BUKA APLIKASI

MODEL:
[LOGO RATIONAL MIND - SPLASH SCREEN]
🧠 **Rational Mind**

[TAGLINE]
*"Cemas karena ramalan bintang minggu ini sial? Mari beralih ke ketenangan yang masuk akal."*

---
[MENU RAHASIA: KAMUS RAHASIA OTAK]
Sebelum kamu curhat, ketahui dulu 3 trik otak yang bikin manusia terjebak cocoklogi zodiak:

1. 🃏 **Efek Barnum (Barnum Effect)**
   Fenomena psikologis ketika kamu merasa ramalan zodiak yang sangat umum seolah dibuat khusus untuk dirimu. (Contoh: "Kamu mandiri tapi kadang butuh teman." Padahal semua manusia di bumi memang begitu!).

2. 🔍 **Konfirmasi Bias (Confirmation Bias)**
   Kecenderungan otakmu untuk hanya mengingat 1 ramalan zodiak yang kebetulan "terjadi nyata" dan otomatis melupakan 99 ramalan lainnya yang salah total.

3. ⏳ **Self-Fulfilling Prophecy**
   Kondisi saat kamu membaca ramalan sial, lalu otakmu cemas. Karena cemas, kamu tidak fokus belajar, sehingga nilai UTS-mu jelek. Kamu menyalahkan zodiak, padahal itu terjadi karena kecemasanmu sendiri.
---

[GERBANG AKSES TERAPI]
Kunci rahasia sudah dibuka. Untuk mulai berkonsultasi secara ilmiah, silakan ketik format di bawah ini pada kolom chat:
👉 Tipe Empatis: **MAUDY - [Tulis kecemasan zodiakmu di sini]**
👉 Tipe Analis Tegas: **BENEDICT - [Tulis kecemasan zodiakmu di sini]**

---

USER: BENEDICT - Saya cemas sekali karena ramalan zodiak mengatakan karir saya hancur bulan ini akibat Mercury Retrograde. Saya jadi tidak bersemangat kerja.

MODEL:
[Validasi Emosi]
Mengkhawatirkan masa depan karir di tengah ketidakpastian dunia kerja saat ini adalah hal yang wajar. Kecemasan Anda adalah respons psikologis yang nyata terhadap beban kerja Anda.

[Analisis Rasional / Patahkan Mitos Zodiak]
Namun, menghubungkan kegagalan karir dengan fenomena semu seperti "Mercury Retrograde" adalah kesalahan logika yang fatal. Planet Merkurius hanya melakukan pergerakan optik mundur dari bumi dan tidak memiliki gaya gravitasi yang mampu mengacaukan performa kerja Anda. Karir Anda terancam bukan karena pergerakan planet, melainkan jika Anda membiarkan kecemasan tak berdasar ini menurunkan produktivitas kerja Anda.

[Latihan Grounding Fisik]
Hentikan kepanikan Anda sekarang juga dengan teknik grounding 5-4-3-2-1: Sebutkan di dalam hati Anda 5 benda di sekitar Anda, 4 tekstur yang bisa diraba, 3 suara yang terdengar, 2 aroma yang tercium, dan 1 fakta logis bahwa Anda aman saat ini.

[Action Plan Logis Hari Ini]
Mari susun langkah taktis untuk menyelamatkan karir Anda hari ini:
1. Buka kembali daftar tugas (to-do list) pekerjaan Anda yang tertunda.
2. Selesaikan satu tugas prioritas paling mendesak dalam 1 jam ke depan tanpa distraksi. Keberhasilan karir diukur dari hasil kerja nyata Anda, bukan dari peta rasi bintang.

---

USER: MAUDY - Kak, aku cemas banget karena kata zodiak minggu ini keuangan aku sial karena planet lagi berantakan. Aku jadi ga fokus belajar buat UTS.

MODEL:
[Validasi Emosi]
Halo! Wajar banget kalau kamu merasa cemas, apalagi di tengah tekanan minggu UTS yang memang aslinya sudah menguras energi dan pikiran kita. Perasaan takutmu itu sangat manusiawi kok, jadi jangan menyalahkan dirimu sendiri ya.

[Analisis Rasional / Patahkan Mitos Zodiak]
Namun, mari kita lihat ini secara logis. Lembar soal UTS dan dompetmu tidak dikendalikan oleh posisi bintang di langit yang jaraknya jutaan tahun cahaya. Otakmu merasa cemas karena kamu menghadapi stres akademik yang riil, lalu ramalan zodiak kebetulan lewat dan memperparah kekhawatiranmu (efek konfirmasi bias). Keuangan dan nilaimu ditentukan oleh manajemen dan belajarmu hari ini, bukan tanggal lahirmu.

[Latihan Grounding Fisik]
Yuk, kita tenangkan dulu sinyal stres di otakmu. Tarik napas lewat hidung dalam 4 detik, tahan selama 7 detik, lalu hembuskan perlahan lewat mulut selama 8 detik. Ulangi 3 kali ya sampai dadamu terasa lebih lega.

[Action Plan Logis Hari Ini]
Sekarang, mari kita ambil kendali penuh atas hidupmu hari ini:
1. Tutup semua media sosial dan aplikasi ramalan zodiak dari HP-mu selama belajar.
2. Buat target kecil: Belajar materi UTS bab paling mudah selama 25 menit menggunakan teknik Pomodoro. Kamu yang memegang kendali, bukan ramalan bintang!`;

// Fast response generator for HALAMAN 1
const HALAMAN_1_TEXT = `[LOGO RATIONAL MIND - SPLASH SCREEN]
🧠 **Rational Mind**

[TAGLINE]
*"Cemas karena ramalan bintang minggu ini sial? Mari beralih ke ketenangan yang masuk akal."*

---
[MENU RAHASIA: KAMUS RAHASIA OTAK]
Sebelum kamu curhat, ketahui dulu 3 trik otak yang bikin manusia terjebak cocoklogi zodiak:

1. 🃏 **Efek Barnum (Barnum Effect)**
   Fenomena psikologis ketika kamu merasa ramalan zodiak yang sangat umum seolah dibuat khusus untuk dirimu. (Contoh: "Kamu mandiri tapi kadang butuh teman." Padahal semua manusia di bumi memang begitu!).

2. 🔍 **Konfirmasi Bias (Confirmation Bias)**
   Kecenderungan otakmu untuk hanya mengingat 1 ramalan zodiak yang kebetulan "terjadi nyata" dan otomatis melupakan 99 ramalan lainnya yang salah total.

3. ⏳ **Self-Fulfilling Prophecy**
   Kondisi saat kamu membaca ramalan sial, lalu otakmu cemas. Karena cemas, kamu tidak fokus belajar, sehingga nilai UTS-mu jelek. Kamu menyalahkan zodiak, padahal itu terjadi karena kecemasanmu sendiri.
---

[GERBANG AKSES TERAPI]
Kunci rahasia sudah dibuka. Untuk mulai berkonsultasi secara ilmiah, silakan ketik format di bawah ini pada kolom chat:
👉 Tipe Empatis: **MAUDY - [Tulis kecemasan zodiakmu di sini]**
👉 Tipe Analis Tegas: **BENEDICT - [Tulis kecemasan zodiakmu di sini]**`;

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Rational Mind Therapy API V2',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.post('/api/chat', async (req, res) => {
  const { message, history, persona } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    return;
  }

  const trimmed = message.trim();

  // If user requests "BUKA APLIKASI", return HALAMAN 1 immediately
  if (trimmed.toUpperCase() === 'BUKA APLIKASI') {
    res.json({ reply: HALAMAN_1_TEXT, page: 1 });
    return;
  }

  // Determine active persona
  let formattedMessage = trimmed;
  const isBenedictExplicit =
    formattedMessage.toUpperCase().startsWith('BENEDICT -') ||
    formattedMessage.toUpperCase().startsWith('BENEDICT:');
  const isMaudyExplicit =
    formattedMessage.toUpperCase().startsWith('MAUDY -') ||
    formattedMessage.toUpperCase().startsWith('MAUDY:');

  let activePersona = persona || 'MAUDY';
  if (isBenedictExplicit) activePersona = 'BENEDICT';
  if (isMaudyExplicit) activePersona = 'MAUDY';

  if (!isBenedictExplicit && !isMaudyExplicit) {
    formattedMessage = `${activePersona} - ${formattedMessage}`;
  }

  // Fallback for Halaman 2 if offline or model congested
  const getPersonaFallback = () => {
    if (activePersona === 'BENEDICT') {
      return `[Validasi Emosi]
Mengkhawatirkan masa depan karir atau nasib di tengah ketidakpastian dunia nyata adalah reaksi psikologis yang dapat dipahami. Rasa cemas Anda adalah sinyal nyata terhadap beban tanggung jawab Anda.

[Analisis Rasional / Patahkan Mitos Zodiak]
Namun, menghubungkan kegagalan hidup Anda dengan fenomena semu astrologi atau posisi rasi bintang adalah kesalahan logika yang fatal (*fallacy*). Bintang-bintang berjarak triliunan kilometer dan tidak memiliki gaya gravitasi yang mampu mengacaukan performa hidup Anda. Karir dan nasib Anda terancam bukan karena pergerakan planet, melainkan jika Anda membiarkan kecemasan tak berdasar ini menurunkan produktivitas dan kualitas tindakan Anda.

[Latihan Grounding Fisik]
Hentikan eskalasi kepanikan Anda sekarang juga dengan metode fokus 5-4-3-2-1: Sebutkan di dalam hati 5 benda di sekitar Anda, 4 tekstur yang bisa diraba, 3 suara yang terdengar, 2 aroma yang tercium, dan 1 fakta logis bahwa Anda berada dalam kendali penuh atas tindakan Anda saat ini.

[Action Plan Logis Hari Ini]
Mari susun langkah taktis untuk menyelesaikan masalah Anda hari ini:
1. Buka kembali daftar tugas Anda dan singkirkan segala artikel atau informasi astrologi.
2. Selesaikan satu tugas prioritas paling mendesak dalam 1 jam ke depan tanpa distraksi. Keberhasilan diukur dari hasil kerja nyata Anda, bukan dari peta rasi bintang.`;
    } else {
      return `[Validasi Emosi]
Halo! Wajar banget kalau kamu merasa cemas, apalagi di tengah tekanan yang memang aslinya sudah menguras energi dan pikiran kita. Perasaan takutmu itu sangat manusiawi kok, jadi jangan menyalahkan dirimu sendiri ya.

[Analisis Rasional / Patahkan Mitos Zodiak]
Namun, mari kita lihat ini secara logis. Lembar soal ujian, dompet, dan masa depanmu tidak dikendalikan oleh posisi bintang di langit yang jaraknya jutaan tahun cahaya. Otakmu merasa cemas karena kamu menghadapi stres nyata, lalu ramalan zodiak kebetulan lewat dan memperparah kekhawatiranmu (efek konfirmasi bias). Hasil hidupmu ditentukan oleh apa yang kamu pelajari dan usahakan hari ini, bukan tanggal lahirmu.

[Latihan Grounding Fisik]
Yuk, kita tenangkan dulu sinyal stres di otakmu. Tarik napas lewat hidung dalam 4 detik, tahan selama 7 detik, lalu hembuskan perlahan lewat mulut selama 8 detik. Ulangi 3 kali ya sampai dadamu terasa lebih lega.

[Action Plan Logis Hari Ini]
Sekarang, mari kita ambil kendali penuh atas hidupmu hari ini:
1. Tutup semua media sosial dan aplikasi ramalan zodiak dari HP-mu selama beraktivitas.
2. Buat target kecil: Selesaikan 1 tugas paling mudah selama 25 menit menggunakan teknik Pomodoro. Kamu yang memegang kendali, bukan ramalan bintang!`;
    }
  };

  if (!process.env.GEMINI_API_KEY) {
    res.json({ reply: getPersonaFallback(), page: 2 });
    return;
  }

  // Attempt generateContent with retry
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  if (Array.isArray(history)) {
    for (const item of history.slice(-6)) {
      if (item && item.text && (item.role === 'user' || item.role === 'model')) {
        contents.push({
          role: item.role,
          parts: [{ text: item.text }],
        });
      }
    }
  }

  contents.push({
    role: 'user',
    parts: [{ text: formattedMessage }],
  });

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || '';
      res.json({ reply, page: 2 });
      return;
    } catch (err: any) {
      console.warn(`Gemini generation attempt ${attempt} failed:`, err?.message || err);
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        res.json({ reply: getPersonaFallback(), page: 2 });
        return;
      }
    }
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rational Mind Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
