# Grid Preset for UnoCSS

## Usage

```js
// unocss.config.js
import { defineConfig } from 'unocss'
import { presetGrid } from 'unocss-preset-grid'

export default defineConfig({
  presets: [
    presetGrid(),
    ...
  ]
})
```

## Utilities

* .container
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
  breakpoints?: Record<string, string>
}
```
