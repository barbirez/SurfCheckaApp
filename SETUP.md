# SurfCheckaApp — Setup Guide

SurfCheckaApp is an **Expo / React Native** app written in **TypeScript**.
This guide gets it running on a fresh computer.

## 1. Install the tools (one-time per computer)

| Tool | What it's for | Check it's installed |
|------|---------------|----------------------|
| [Git](https://git-scm.com/downloads) | Download the code | `git --version` |
| [Node.js (LTS)](https://nodejs.org) | Runs Expo + npm | `node --version` |
| [VS Code](https://code.visualstudio.com) (or any editor) | Edit the code | — |
| **Expo Go** app (iOS App Store / Google Play) | Preview the app on your phone | — |

## 2. Get the code

Cloning creates the project folder for you — no need to make one manually.

```bash
git clone https://github.com/barbirez/SurfCheckaApp.git
cd SurfCheckaApp
```

## 3. Install dependencies

This recreates the `node_modules/` folder (intentionally not stored in Git).

```bash
npm install
```

## 4. Run the app

```bash
npx expo start
```

Then either:
- **Phone:** scan the QR code with the Expo Go app, or
- **Simulator:** press `i` (iOS) or `a` (Android) if you have those set up.

## Notes

- **No API key needed yet.** The `@anthropic-ai/sdk` package is listed as a
  dependency but is not used anywhere in the code yet. There is nothing to
  configure until an AI feature is actually added.
- **Editor-independent.** The project does not depend on any particular editor
  (e.g. Cursor). VS Code or anything else works.
- **Known TypeScript warnings.** `npx tsc --noEmit` currently reports some
  type errors (navigation param types, `SpotRating`, a `backgroundImage`
  style). These do not prevent the app from running and can be cleaned up
  separately.
