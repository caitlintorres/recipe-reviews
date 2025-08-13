# Recipe Reviews App

A modern web app to save and rate recipes with attributes. Built with Next.js, Tailwind CSS, React Select, and Supabase.

---

## Features

- Add a recipe link and rate it from 1–10  
- Select multiple attributes (Healthy, Quick, Kid-friendly, etc.)  
- Display saved reviews in cards with styling  
- Fully responsive design  
- Uses Supabase as backend  

---

## Project Structure

- **app/**  
  - layout.js → Root layout with Tailwind and fonts  
  - page.js → Main page with form and reviews list  
  - globals.css → Tailwind directives and custom global styles  
- **lib/**  
  - supabaseClient.js → Supabase client configuration  
- package.json  
- postcss.config.js  
- tailwind.config.js  

---

## Installation

1. Make sure Node.js v18 or higher is installed  
2. Install dependencies using pnpm: `pnpm install`  

---

## Configuration

### Supabase

- Create a project at https://app.supabase.com  
- Get the anon API key  
- Create a table called `reviews` with columns:  
  - `id` (bigint, auto-increment, primary key)  
  - `link` (text)  
  - `rating` (integer)  
  - `attributes` (text array)  
  - `created_at` (timestamp, default now())  

### Supabase Client (lib/supabaseClient.js)

- import { createClient } from "@supabase/supabase-js"  
- const supabaseUrl = "YOUR_SUPABASE_URL"  
- const supabaseAnonKey = "YOUR_ANON_KEY"  
- export const supabase = createClient(supabaseUrl, supabaseAnonKey)  

---

## Tailwind CSS Setup

### globals.css

- @tailwind base  
- @tailwind components  
- @tailwind utilities  
- html, body { height: 100%; background-color: #f9fafb; }  
- body { font-family: var(--font-geist-sans), system-ui, sans-serif; }  

### postcss.config.js

- module.exports = { plugins: { '@tailwindcss/postcss': {}, autoprefixer: {} } }  

### tailwind.config.js

- module.exports = {  
    content: ['./app/**/*.{js,jsx}', './pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],  
    theme: { extend: {} },  
    plugins: []  
  }  

### Import globals.css in layout.js

- import './globals.css'  
- function RootLayout({ children }) { return html lang="en" body {children} }  

---

## Running the App

- Start the dev server: `pnpm run dev`  
- Open browser at http://localhost:3000  

---

## Notes

- If Tailwind classes don’t appear:  
  - Make sure globals.css is imported in layout.js  
  - Tailwind config content paths include your JSX files  
  - Restart the dev server after changing configs  

- For Next.js 15 + Turbopack + Tailwind v4, PostCSS plugins may not fully work. Using Tailwind v3 or Webpack avoids this issue. 