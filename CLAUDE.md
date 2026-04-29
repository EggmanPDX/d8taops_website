# CLAUDE.md — D8:WEBSITE Project
# Path: /Users/greggeiler/Developer/D8:WEBSITE
# Always quote this path in Bash — the colon causes shell expansion issues.

## Project Identity
D8TAOPS marketing/company website. React/Vite. Deployed on Vercel.

## Dev Server
```bash
bash "/Users/greggeiler/Developer/D8:WEBSITE/dev.sh"
```
Or via skill: `/dev`
Never run bare `npm run dev` without the `--prefix` flag.

## Git
```bash
git -C "/Users/greggeiler/Developer/D8:WEBSITE" pull --rebase && \
git -C "/Users/greggeiler/Developer/D8:WEBSITE" push -u origin main
```
Or via skill: `/ship`

## Key Rules
- **Read before Edit** — always after image attachment or file rebuild; cite line numbers.
- **Images in public/images/** — filenames must have no spaces. Rename before moving.
- **Screenshot paths** — if path contains spaces or colon directory, use `mv` with full quoted path.

## Brand
Navy `#081F5C` · Blue `#0477BF` · IBM Plex Sans
Design system: `/Users/greggeiler/Downloads/D8TAOPS-Design-System-v1.1.md`

## Park / Resume
On "park": run `/park` skill → write handoff to `memory/last_handoff.md`.
On resume: run `/resume D8:WEBSITE` → reads handoff + reports status.
