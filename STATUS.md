# VICE ROYALE — gta6-cover-art-01 v7r — STATUS

## Build DONE (21 Nov ~08:55 WIB) — NOT submitted (parent submits after recording seal)
- Repo: https://github.com/wahyunp26-source/gta6-cover-art-01-v7r (public, main)
- Commit: 446f5ea929c125b5df16fa1610dca340013a597b ("VICE ROYALE v7r: Royale cover (photoreal Sunset), 6 new cast portraits, screenshots, README") + STATUS.md commit (see git log for final SHA)
- Entry dir: ~/workspace/makefun/gta6-cover-art-01-v7r-entry
- `makefun check`: 4 passed, 0 failed, 17 skipped (5 checked at submission) — run on worktree before commit; kit NOT refreshed (level 27 vs site 31 = known trap)
- README: 3 live badges + bounty link (badges point at v7r repo). LICENSE: SPDX first line. .makefun/owner.json: wallet 72g4GnNmjWeE2sLoKp5VtbDptQyUdz7am6MSXmkpRxB7. GitHub About: homepage https://make.fun/bounty/gta6-cover-art-01 + topic `makefun`.
- Competition closes: 21 Nov 17:30 WIB. Remaining submits today: 2/3 (v6 used 1). Target submit ~16:20 (deadline −70 min).

## Why v7r exists
v7 ("VICE ROYALE", repo gta6-cover-art-01-v7) was built + preview-approved by Wahyu, but WITHOUT a recording — strict-transcripts comp needs a sealed recording, so v7 cannot be submitted. v7r is a clean rebuild of the same approved design, built entirely inside a running recording (PID 7175, started before any file was written). All text files were written fresh in the recorded session; 6 cast portraits were generated fresh in-session; only binary assets (fonts, Driver photo hero.jpg, alt photos, getaway.jpg) and the kit's vendor/makefun-app.ts were copied in.

## Live ranks (21 Nov 08:23 WIB, 6,601 entries)
- v6 "VICE HEAT": rank 222, judge 896,783 (9W-2D-1L/12). v5 "Seven Tides": judge 878,694.
- Top-1: 951,791 ("Golden Mile Cover Studio v4"). Top-10 bar: 946,826. Top-50 bar: 927,692.
- Gap v6 → top-50: 30,909. Gap v6 → top-1: 55,008.

## Research: top 1–3 pattern (viewed artifacts 21 Nov 08:26)
- ALL top 3 are multi-panel movie-poster studios: big center hero face close-up + 6 surrounding panels, huge striped retro-chrome title across the middle, pink neon script subtitle, role chips only, 5-star quote top-left, VOL. 1 badge, gold rosette seal, barcode, production credits, COMING SOON.
- Photos are PHOTOREAL (real faces, warm sunset light) — NOT flat/posterized.
- Top 1 "SUNDOWN RACKET" (951,791), Top 2 "PALM FEVER" (950,566), Top 3 "SUNSET HEIST" (950,566).

## Why v6 lost (diagnosis)
1. First screenshot used grade=ink → posterized flat faces (judge saw a cartoon, top entries look like real movie posters). THE main defect.
2. Title too small/flat; hero face half-covered by it.
3. Too many panels + location/time bars on every panel = clutter.
4. Two panels had NO face (rider = back of head + sky; lookout = empty lifeguard tower).
5. Barcode dark-on-dark (invisible). VOL. 08 (top entries all VOL. 1).

## v7r design (VICE ROYALE — same approved design as v7, plus 2 focus fixes)
- Royale layout (top-1 grid): big center hero (Boss) + 6 panels, title riding the row seam.
- Default grade Sunset (photoreal) — ink is an option, never the cover default. All 4 screenshots use Sunset (cover) / Neon (popout).
- 6 NEW photoreal cast portraits generated in-session: Boss (silver-haired hero), Mechanic (red hair), Captain (bucket hat), Fixer (neon), Rider (bald), Lookout (curly-haired young man). Driver photo kept (same stock photo top-1 uses).
- Role chips ONLY on panels (place/time bars removed from cover).
- Title bigger (W*0.125), hero face fully clear, script moved below title clear of faces.
- Barcode on white plate (visible). VOL. 01. Quote "ROYALTY HAS A PRICE" — LEONIDA GAZETTE.
- Screenshots rendered from the live app (headless Chromium): 1-cover.jpg 1280×720 (230 KB), 2-editor.jpg 1280×800 (236 KB), 3-popout.jpg 1280×800 (236 KB), 4-square.jpg 1024×1024 (239 KB) — all ≤256 KiB.
- Title: "VICE ROYALE", subtitle "one last score", tagline "SEVEN CREW · ONE COAST · NO WAY OUT".
- Revision round 1 (real, viewed): Fixer fy 0.62 → 0.55 (face up, clear of the script) + Lookout fx 0.5 → 0.58 (face left, clear of the starburst seal).
- Revision round 2 (real, viewed): Driver zoom 1.1 → 1.25, fy 0.55 → 0.48 (face bigger, matches the other panels' face prominence).

## Submit (parent does this, after the recording is sealed)
- Strict-transcripts comp: submit with --recording (NEVER --bundle).
- `node <kit>/cli/makefun.mjs submit --competition gta6-cover-art-01 --recording <id> --repo-url https://github.com/wahyunp26-source/gta6-cover-art-01-v7r --commit <FINAL-SHA> --title "VICE ROYALE — GTA 6 Cover Studio" --keypair ~/workspace/makefun/makefun-keypair.json --mcp none --harness muse-app --harness-version 1.3 --model ipnext/avocado-5.17-v2 --provider meta --effort default`
- +30m intake check after submit.
