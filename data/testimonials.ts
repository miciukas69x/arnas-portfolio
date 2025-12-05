export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: {
    lt: string;
    en: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Jonas Kazlauskas',
    role: 'CEO, TechStart',
    text: {
      lt: 'Arnas padėjo mums sukurti prekės ženklą, kuris tikrai atspindi mūsų verslą. Rezultatai viršijo lūkesčius.',
      en: 'Arnas helped us create a brand that truly reflects our business. The results exceeded expectations.',
    },
  },
  {
    id: 'testimonial-2',
    name: 'Laura Petraitytė',
    role: 'Founder, BeautyBox',
    text: {
      lt: 'Profesionalus požiūris ir puikūs rezultatai. Mūsų pardavimai išaugo 150% per pirmus 3 mėnesius.',
      en: 'Professional approach and great results. Our sales grew by 150% in the first 3 months.',
    },
  },
  {
    id: 'testimonial-3',
    name: 'Tomas Rimkus',
    role: 'Marketing Director, GreenLife',
    text: {
      lt: 'Geriausia investicija, kurią padarėme rinkodaroje. Arnas tikrai supranta, kaip pasiekti tikslinę auditoriją.',
      en: 'The best investment we made in marketing. Arnas truly understands how to reach the target audience.',
    },
  },
  {
    id: 'testimonial-4',
    name: 'Greta Stankevičiūtė',
    role: 'E-commerce Owner',
    text: {
      lt: 'Nuo pat pradžių jaučiausi patikimose rankose. Komunikacija buvo sklandžia, o rezultatai kalbėjo patys už save.',
      en: 'From the start, I felt I was in good hands. Communication was smooth, and the results spoke for themselves.',
    },
  },
  {
    id: 'testimonial-5',
    name: 'Paulius Jonaitis',
    role: 'Startup Founder',
    text: {
      lt: 'Arnas ne tik sukūrė puikią kampaniją, bet ir išmokė mane suprasti rinkodaros pagrindus. Neįkainojama patirtis.',
      en: 'Arnas not only created a great campaign but also taught me to understand the basics of marketing. Invaluable experience.',
    },
  },
  {
    id: 'testimonial-6',
    name: 'Ieva Balčiūnaitė',
    role: 'Brand Manager',
    text: {
      lt: 'Kūrybiškas, atsakingas ir visada pasiruošęs padėti. Rekomenduoju visiems, ieškantiems tikrų rezultatų.',
      en: 'Creative, responsible, and always ready to help. I recommend to anyone looking for real results.',
    },
  },
  {
    id: 'testimonial-7',
    name: 'Marius Petraitis',
    role: 'Founder, TechFlow',
    text: {
      lt: 'Arnas transformavo mūsų rinkodaros strategiją. Dabar turime aiškų kelią į priekį ir matome konkretų augimą.',
      en: 'Arnas transformed our marketing strategy. Now we have a clear path forward and see concrete growth.',
    },
  },
  {
    id: 'testimonial-8',
    name: 'Elena Žukauskienė',
    role: 'Marketing Lead, FashionHub',
    text: {
      lt: 'Puikus darbas su prekės ženklu. Mūsų atpažįstamumas padidėjo, o klientų bazė išaugo pastebimai.',
      en: 'Excellent work with brand identity. Our recognition increased and our customer base grew significantly.',
    },
  },
  {
    id: 'testimonial-9',
    name: 'Rokas Navickas',
    role: 'CEO, Digital Solutions',
    text: {
      lt: 'Profesionalus, greitas ir efektyvus. Arnas supranta, kaip derinti kūrybiškumą su duomenimis.',
      en: 'Professional, fast, and effective. Arnas understands how to combine creativity with data.',
    },
  },
];

