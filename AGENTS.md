# Codex Project Rules

## Working Context
- Repo ini: `kaiichin/izhar-portfolio`, folder lokal `C:/Users/Lenovo/Documents/GitHub/izhar-portfolio`.
- Kode website ada di `frontend/` (Vercel Root Directory = `frontend`).
- Branch utama `main` → auto-deploy ke Vercel.

## Implementation Style
- Keep edits focused and easy to review.
- Semua teks di `frontend/data/portfolio.ts` — jangan hardcode teks baru di page.
- Style per halaman di `frontend/app/styles/<halaman>.css` — jangan tulis di `globals.css`.
- Satu library animasi: `motion` (framer-motion + gsap sudah dihapus).
- Komponen baru wajib ada komentar cara pakai (contoh: `components/Reveal.tsx`).
- Use TypeScript and Tailwind CSS consistently.

## UI Quality Bar
- Prioritize professional portfolio quality for internship recruiters.
- Optimize for internship credibility, not flashy decoration.
- Make layouts responsive and verify that text does not overlap or spill out of buttons, cards, or sections.
- Use real links and resume assets where available.
- Jangan sentuh `components/InteractiveLanyard.tsx` kecuali diminta (fisika 3D 577 baris).

## Verification
- Sebelum bilang selesai: `cd frontend` lalu `npm run test` + `npm run lint` + `npm run build` harus hijau (run lint/build).
- For UI work, inspect the page in a browser at desktop and mobile widths.
- If a check cannot be run, clearly explain why.
