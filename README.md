<h1 align="center">Grid Preset for UnoCSS</h1>
<p align="center">
  Boostrap 5-like grid system fully compatible with UnoCSS breakpoint system
</p>
<p align="center">
  <a href="https://statu.co"><img src="https://img.shields.io/badge/Author-Statu-black?style=for-the-badge" alt="Author"></a>
  <a href="https://www.npmjs.com/package/unocss-preset-grid"><img src="https://img.shields.io/npm/v/unocss-preset-grid?style=for-the-badge" alt="Versio"></a>
  <a href="https://github.com/StatuAgency/unocss-preset-grid/blob/dev/LICENSE"><img src="https://img.shields.io/github/license/StatuAgency/unocss-preset-grid?sanitize=true&style=for-the-badge" alt="License"></a>
  <a href="https://www.npmjs.com/package/unocss-preset-grid"><img src="https://img.shields.io/maintenance/yes/2025?style=for-the-badge" alt="Maintained"></a>
</p>

---

## Install
```sh
# Using npm
npm install unocss-preset-grid

# Using yarn
yarn add unocss-preset-grid

# Using pnpm
pnpm add unocss-preset-grid
```

## Usage

```js
// unocss.config.js
import { defineConfig } from 'unocss'
import { presetGrid } from 'unocss-preset-grid'

export default defineConfig({
  presets: [
    presetUno(),
    // ...
    presetGrid()
  ]
})
```

> **Note**
> If used with UnoPreset or other similar preset, call `presetGrid()` at the bottom

## Utilities

* .container
* .container-fluid
* .row
* .col
* .col-(1-12)
* .col-auto
* .col-fill
* .offset-(1-12)
* .g(x|y)-*

## Type of `GridOptions`

```ts
export interface GridOptions {
  prefix?: string
  piece?: string
  gutter?: string
  columns?: number
  breakpoints?: Record<string, string | number>
}
```
