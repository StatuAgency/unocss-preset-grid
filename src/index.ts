import type { Preset } from "unocss"
import { escapeSelector } from "unocss"
import { ensureSuffix } from "./utils"

export type Breakpoints = Record<string, string | number>
export interface GridOptions {
  prefix?: string
  piece?: string
  gutter?: string
  columns?: number
  breakpoints?: Breakpoints
}

export function presetGrid(options: GridOptions = {}): Preset {
  // Default Columns
  const columns = options?.columns ?? 12

  // Default Prefix
  const prefix = options?.prefix ?? "statu-"

  // Default Breakpoints
  const piece = options?.piece ?? "60px"
  const breakpoints = options?.breakpoints ?? {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }

  // Default Gutter
  const gutter = options?.gutter ?? "1.5rem"

  return {
    name: "unocss-preset-grid",
    rules: [
      [
        new RegExp(`^__container$`),
        ([], { rawSelector, generator }: any) => {
          const _selector = escapeSelector(rawSelector)
          const _breakpoints: Breakpoints = generator?.userConfig?.theme?.breakpoints ?? breakpoints

          const template = Object.keys(_breakpoints).map(
            (breakpoint) => `@media (min-width: ${ensureSuffix("px", _breakpoints[breakpoint].toString())}) {
              .${_selector} {
                max-width: calc(${ensureSuffix("px", _breakpoints[breakpoint].toString())} - ${piece});
              }
            }`
          )

          return `
            .${_selector}, .${_selector}-fluid {
              --${prefix}gutter-x: ${gutter};
              --${prefix}gutter-y: 0;
              
              width: 100%;
              padding-right: calc(var(--${prefix}gutter-x) * .5);
              padding-left: calc(var(--${prefix}gutter-x) * .5);
              margin-right: auto;
              margin-left: auto;
            }
            
            ${template.join("\n")}
          `.replace(/^ {12}/gm, "")
        },
        { autocomplete: ["container", "container-fluid"] }
      ],
      [
        new RegExp(`^row$`),
        ([], { rawSelector }) => {
          const selector = escapeSelector(rawSelector)
          const template = `
            .${selector} {
              --${prefix}gutter-x: ${gutter};
              --${prefix}gutter-y: 0;
            
              display: flex;
              flex-wrap: wrap;
              
              margin-top: calc(-1 * var(--${prefix}gutter-y));
              margin-right: calc(-.5 * var(--${prefix}gutter-x));
              margin-left: calc(-.5 * var(--${prefix}gutter-x));
            }
            .${selector} > * {
              flex-shrink: 0;
              width: 100%;
              max-width: 100%;
              padding-right: calc(var(--${prefix}gutter-x) * .5);
              padding-left: calc(var(--${prefix}gutter-x) * .5);
              margin-top: var(--${prefix}gutter-y);
            }
          `
          return template.replace(/^ {12}/gm, "")
        }
      ],
      [
        new RegExp(`^col-?(\\d*)$`),
        ([, size]: any): any => {
          if (size) {
            return {
              flex: "0 0 auto",
              width: `${(size / columns) * 100}%`
            }
          } else {
            return {
              flex: "1 0 0%"
            }
          }
        },
        { autocomplete: "col-<num>" }
      ],
      [
        `col-auto`,
        {
          flex: "0 0 auto",
          width: "auto"
        }
      ],
      [
        `col-fill`,
        {
          flex: "1 1 auto",
          width: "auto"
        }
      ],
      [
        new RegExp(`^offset-(\\d+)$`),
        ([, size]: any): any => ({
          "margin-left": size === "0" ? 0 : `${(size / columns) * 100}%`
        }),
        { autocomplete: "offset-<num>" }
      ],
      [
        new RegExp(`^g([xy])?-(\\d+)$`),
        ([, dim, size]: any): any => {
          let gutterObject: { [key: string]: string } = {}
          if (dim !== "y") gutterObject[`--${prefix}gutter-x`] = `${0.25 * size}rem`
          if (dim !== "x") gutterObject[`--${prefix}gutter-y`] = `${0.25 * size}rem`
          return gutterObject
        },
        { autocomplete: ["g-<num>", "gx-<num>", "gy-<num>"] }
      ]
    ]
  }
}

export default presetGrid
