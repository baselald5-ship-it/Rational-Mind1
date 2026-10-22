import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pernyataan Umum (Barnum Statement)',
    scenario: 'Kamu membaca ramalan di medsos: "Kamu tampak mandiri dan kuat dari luar, tetapi di dalam hatimu kamu sering merasa kesepian dan rindu dimengerti orang lain."',
    options: [
      {
        label: 'Wah, ini sangat akurat mendeskripsikan mentalku 100%! Bintangku tahu rahasiaku.',
        description: 'Menilai pernyataan umum sebagai pesan personal khusus untuk diri sendiri.',
        score: 2,
      },
      {
        label: 'Relate sih, tapi mungkin kalimat ini memang cocok untuk sebagian besar orang.',
        description: 'Mulai menyadari sifat umum dari kalimat tersebut.',
        score: 1,
      },
      {
        label: 'Ini adalah trik klasik Efek Barnum (Rainbow Ruse)—hampir semua manusia di bumi merasakan hal ini.',
        description: 'Pemikiran kritis objektif yang memahami bias kognitif di baliknya.',
        score: 0,
      },
    ],
  },
  {
    id: 2,
    question: 'Konflik Hubungan Asmara',
    scenario: 'Kamu dan gebetanmu mulai sering berdebat karena perbedaan waktu luang dan kesibukan kerja. Temanmu bilang: "Ya iyalah, kamu kan zodiak Api dan dia Air, elemen kalian musuhan!"',
    options: [
      {
        label: 'Pantas saja! Lebih baik aku mundur sekarang daripada sakit hati karena zodiak kami ga jodoh.',
        description: 'Menyerahkan keputusan relasi kepada takdir kosmik eksternal.',
        score: 2,
      },
      {
        label: 'Aku jadi ragu dan kepikiran terus, apa jangan-jangan ramalan itu ada benarnya?',
        description: 'Terpapar kecemasan akibat sugesti cocoklogi.',
        score: 1,
      },
      {
        label: 'Konflik kami murni soal komunikasi dan manajemen waktu. Kami perlu diskusi jujur berdua, bukan cek zodiak.',
        description: 'Pendekatan rasional berbasis keterampilan komunikasi dan kedewasaan.',
        score: 0,
      },
    ],
  },
  {
    id: 3,
    question: 'Ramalan Sial Hari Ini',
    scenario: 'Pagi-pagi kamu melihat ramalan: "Hati-hati, hari ini zodiakmu mengalami nasib sial bertubi-tubi karena posisi planet Saturnus berlawanan."',
    options: [
      {
        label: 'Aku langsung panik, cemas seharian, dan takut keluar rumah atau ambil keputusan penting.',
        description: 'Kecemasan katastrofik yang berisiko memicu Self-Fulfilling Prophecy.',
        score: 2,
      },
      {
        label: 'Aku jadi ekstra was-was dan tiap ada hal buruk kecil, aku langsung teringat ramalan itu.',
        description: 'Kecenderungan konfirmasi bias selektif.',
        score: 1,
      },
      {
        label: 'Planet Saturnus berjarak 1,4 miliar kilometer dan tidak mengurusi agenda harianku. Aku jalani hari dengan fokus dan tenang.',
        description: 'Ketenangan mental berbasis logika sains astronomi.',
        score: 0,
      },
    ],
  },
  {
    id: 4,
    question: 'Pembenaran Perilaku Negatif',
    scenario: 'Seseorang yang kamu kenal suka membentak orang lain atau ghosting teman tanpa kabar, lalu beralasan: "Maklum ya, aku kan zodiak X, emang dari sananya begini."',
    options: [
      {
        label: 'Iya sih wajar, memang zodiak itu terkenal keras kepala dan dingin dari lahir.',
        description: 'Normalisasi perilaku toxic berkedok astrologi.',
        score: 2,
      },
      {
        label: 'Agak menyebalkan, tapi mungkin memang ada pengaruh karakter zodiaknya sedikit.',
        description: 'Kompromi dengan distorsi cocoklogi.',
        score: 1,
      },
      {
        label: 'Tidak ada hubungannya dengan bintang lahir. Itu adalah masalah kendali emosi dan tanggung jawab pribadi yang perlu diperbaiki.',
        description: 'Locus of control internal dan akuntabilitas moral yang matang.',
        score: 0,
      },
    ],
  },
  {
    id: 5,
    question: 'Fenomena Kosmik Populer (Mercury Retrograde)',
    scenario: 'Laptopmu mendadak lambat dan email penting telat terkirim. Linimasa media sosial ramai mengatakan: "Waspada, lagi musim Mercury Retrograde, semua barang elektronik dan komunikasi pasti rusak!"',
    options: [
      {
        label: 'Tuh kan! Ini pasti gara-gara energi kosmik Merkurius yang lagi mundur.',
        description: 'Menghubungkan masalah teknis acak dengan posisi orbit planet.',
        score: 2,
      },
      {
        label: 'Sempat mikir jangan-jangan beneran gara-gara kosmik, jadi agak was-was kirim dokumen.',
        description: 'Rentan terhadap bias penularan sosial (social contagion).',
        score: 1,
      },
      {
        label: 'Retrograde Merkurius hanyalah ilusi optik perspektif dari bumi. Laptop lambat karena cache penuh atau butuh restart sistem.',
        description: 'Penyelesaian masalah realistis berbasis fakta teknis dan astronomi.',
        score: 0,
      },
    ],
  },
];
