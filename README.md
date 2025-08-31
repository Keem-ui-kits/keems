# Jayline Services V3 - Setup Guide

This project is a **React + Vite + TypeScript + TailwindCSS + Storybook** application.

---

## 1. Prerequisites
- **Node.js ≥ 18** (check with `node -v`)
- **npm ≥ 9** (or use `pnpm` / `yarn` if preferred)

👉 If Node isn’t installed: [Download here](https://nodejs.org/) or use **nvm**.

---

## 2. Extract & enter folder
```bash
cd Jayline-Services-V3
```

---

## 3. Copy environment file
```bash
cp .env.example .env   # Windows PowerShell: copy .env.example .env
```
Then open `.env` and adjust values (API URLs, keys, etc.).

---

## 4. Install dependencies
```bash
npm install
```

---

## 5. Run development server
```bash
npm run dev
```
Vite will start a hot-reload dev server.  
Default URL → [http://localhost:5173](http://localhost:5173)

---

## 6. Run Storybook (for UI components)
```bash
npm run storybook
```
Opens [http://localhost:6006](http://localhost:6006)

---

## 7. Build production bundle
```bash
npm run build
```
Output goes to `dist/`

---

## 8. Preview production build
```bash
npm run preview
```
Default URL → [http://localhost:4173](http://localhost:4173)
