import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 하위 경로(/personal-stylist/)에서도 동작하도록 상대 경로 사용
  base: './',
  plugins: [react(), cloudflare()],
})