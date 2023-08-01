import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import dts from 'vite-plugin-dts'

import { presetGrid } from './src'

export default defineConfig({
  plugins: [
    unocss({
      presets: [
        presetGrid(),
      ],
    }),
    dts(),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['unocss'],
    }
  }
})