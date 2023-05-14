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

* .[prefix-]container
* .[prefix-]row
* .[prefix-]col
* .[prefix-]col-(1-12)
* .[prefix-]col-auto
* .[prefix-]col-fill
* .[prefix-]offset-(1-12)
* .[prefix-]g(x|y)-*

## Type of `GridOptions`

```ts
export interface GridOptions {
  prefix?: {
    class?: string
    variable?: string
  }
  piece?: string
  gutter?: string
  columns?: number
  breakpoints?: Record<string, string>
}
```
