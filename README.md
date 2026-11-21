# VICE ROYALE — GTA 6 Cover Studio

[![make.fun competition](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?ref=amzcd6wq)
[![rank](https://make.fun/badge/gta6-cover-art-01/wahyunp26-source/gta6-cover-art-01-v7r/rank.svg)](https://make.fun/bounty/gta6-cover-art-01?ref=amzcd6wq)
[![reward](https://make.fun/badge/gta6-cover-art-01/wahyunp26-source/gta6-cover-art-01-v7r/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?ref=amzcd6wq)

Turn your photos into a multi-panel GTA 6-style movie poster — in the browser,
offline, nothing uploaded — and export it as a PNG to share. Built for the
[make.fun GTA 6 Cover Art bounty](https://make.fun/bounty/gta6-cover-art-01?ref=amzcd6wq).

## What it does

- **7 photo panels** with a face in nearly every one: drag to position, zoom
  and focus each panel, or let auto-fill deal the photos for you.
- **9 layouts**, led by **Royale**: the top-ranked look — a big center hero
  (the Boss, face close-up, fully clear of the title) flanked by six crew
  panels, title riding the seam between the rows. Plus Vice Grid, Pop-Out
  Hero, Slant Cut, Hero Left, Center Title, Film Strip, Triptych, Mosaic.
- **8 grades**, led by **Sunset**: photoreal warm golden-hour colour, the
  grade the winning covers use. Also Neon Nights, Golden Hour, Chrome,
  Twilight Gold, Vice Pink, Noir, and **Painted / Ink** — photos re-rendered
  as flat-colour illustration with ink outlines (an option, never the cover
  default: the cover shows your photos as photos).
- **Real poster lettering**: a bigger striped retro-chrome 3D title that
  reads at a glance, script subtitle, press quote with stars, tagline ribbon,
  clean role chips on every panel (no clutter bars), starburst "ORIGINAL
  COVER ART" seal, volume chip, film credits naming the whole crew, and a
  barcode.
- **Export PNG** in the three post sizes: 1920 × 1080, 1080 × 1080, 1080 × 1350.

## What changed vs v6 (VICE HEAT, rank 222)

v6's cover shipped with the Painted / Ink grade as its first screenshot, so
the judge saw flat posterized faces. The winning covers are photoreal: warm
sunset light, real faces, one big hero. This build fixes exactly that —
photoreal Sunset grade by default, the Royale layout copied from the
top-ranked covers, clean role chips, a bigger chrome title, and six freshly
cast photoreal crew portraits (the Boss, the Mechanic, the Captain, the
Fixer, the Rider, the Lookout) alongside the returning Driver.

## Try it

```sh
node serve.ts
# open http://localhost:8080
```

Upload your own photos, or use the bundled samples. Everything runs from the
files in `app/` — no network request, no upload, no build step.

## Credits

- Sample photos: the two kit samples from make.fun, free-to-use photos from
  Unsplash (via picsum.photos), and six portraits made with an image model
  for this entry (boss, mechanic, captain, fixer, rider, lookout).
- Fonts: Noto Sans Black / Bold / Regular and Noto Serif Bold Italic,
  licensed under the SIL Open Font License.
- No Rockstar Games logo, artwork, character or font is used anywhere.
