import { ParsedTherapySections } from '../types';

export function parseTherapyResponse(rawText: string): ParsedTherapySections {
  const sections: ParsedTherapySections = {
    validation: '',
    rational: '',
    grounding: '',
    actionPlan: '',
    actionItems: [],
    biasesDetected: [],
  };

  if (!rawText) return sections;

  // Patterns for the 4 required sections:
  // 1. [Validasi Emosi] or [Validasi Emosi / Penerimaan Awal] or [Validasi & Empati]
  // 2. [Analisis Rasional] or [Analisis Rasional / Pematahan Mitos Zodiak] or [Sudut Pandang Rasional / Patahkan Mitos]
  // 3. [Latihan Grounding] or [Latihan Grounding Fisik]
  // 4. [Action Plan Hari Ini] or [Action Plan Logis Hari Ini]

  const validationMatch = rawText.match(
    /\[(?:Validasi Emosi(?:\s*\/\s*Penerimaan Awal)?|Validasi & Empati|Validasi)\]([\s\S]*?)(?=\[(?:Analisis Rasional|Sudut Pandang Rasional|Latihan Grounding|Action Plan)|$)/i
  );

  const rationalMatch = rawText.match(
    /\[(?:Analisis Rasional(?:\s*\/\s*Pematahan Mitos(?:\s*Zodiak)?)?|Sudut Pandang Rasional(?:\s*\/\s*Patahkan Mitos)?|Pematahan Mitos)\]([\s\S]*?)(?=\[(?:Latihan Grounding|Action Plan)|$)/i
  );

  const groundingMatch = rawText.match(
    /\[(?:Latihan Grounding(?:\s*Fisik)?(?:\s*\(.*?\))?|Grounding)\]([\s\S]*?)(?=\[(?:Action Plan)|$)/i
  );

  const actionPlanMatch = rawText.match(
    /\[(?:Action Plan(?:\s*Logis)?(?:\s*Hari Ini)?|Rencana Aksi(?:\s*Hari Ini)?)\]([\s\S]*?)$/i
  );

  if (validationMatch) {
    sections.validation = validationMatch[1].trim();
  }
  if (rationalMatch) {
    sections.rational = rationalMatch[1].trim();
  }
  if (groundingMatch) {
    sections.grounding = groundingMatch[1].trim();
  }
  if (actionPlanMatch) {
    sections.actionPlan = actionPlanMatch[1].trim();
  }

  // Fallback if formatting was non-standard
  if (!sections.validation && !sections.rational && !sections.grounding && !sections.actionPlan) {
    sections.rational = rawText.trim();
  }

  // Extract checklist items from action plan
  const actionSource = sections.actionPlan || rawText;
  const itemMatches = actionSource.match(/(?:^|\n)\s*(?:\d+[\.\)]|[-•*])\s+(.+)/g);
  if (itemMatches && itemMatches.length > 0) {
    sections.actionItems = itemMatches.map((m, idx) => {
      const cleanText = m.replace(/(?:^|\n)\s*(?:\d+[\.\)]|[-•*])\s+/, '').trim();
      return {
        id: `act-${idx}-${Date.now()}`,
        text: cleanText,
        done: false,
      };
    });
  }

  // Detect biases / cognitive concepts mentioned in the text
  const biasDictionary = [
    { name: 'Confirmation Bias', terms: ['konfirmasi bias', 'confirmation bias', 'efek konfirmasi'] },
    { name: 'Barnum / Forer Effect', terms: ['barnum', 'forer', 'efek barnum'] },
    { name: 'Self-Fulfilling Prophecy', terms: ['self-fulfilling', 'ramalan yang mewujud'] },
    { name: 'External Locus of Control', terms: ['locus of control', 'kendali eksternal', 'pasrah takdir'] },
    { name: 'Catastrophizing', terms: ['katastrofik', 'catastrophizing', 'melebih-lebihkan', 'kehancuran'] },
    { name: 'Mercury Retrograde Myth', terms: ['mercury retrograde', 'merkurius retrograde', 'retrogad'] },
    { name: 'Emotional Reasoning', terms: ['emotional reasoning', 'penalaran emosional'] },
  ];

  const lowerRaw = rawText.toLowerCase();
  for (const b of biasDictionary) {
    if (b.terms.some((term) => lowerRaw.includes(term))) {
      sections.biasesDetected.push(b.name);
    }
  }

  return sections;
}
