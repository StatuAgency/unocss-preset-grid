import type { Preset } from "unocss"
import { escapeSelector } from "unocss"

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

export function presetGrid(options: GridOptions = {}): Preset {
  // Default Columns
  const columns = options?.columns ?? 12

  // Default Prefix
  const prefix = options?.prefix ?? {}
  const prefixClass = prefix?.class ?? ""
  const prefixVariable = prefix?.variable ?? "statu-"

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
        new RegExp(`^${prefixClass}container$`),
        ([], { rawSelector, theme }: any) => {
          const _breakpoints = theme?.breakpoints ?? breakpoints

          const template = Object.keys(_breakpoints).map(
            (breakpoint: string) => `@media (min-width: ${_breakpoints[breakpoint]}) {
              .${escapeSelector(rawSelector)} {
                max-width: calc(${_breakpoints[breakpoint]} - ${piece});
              }
            }`
          )

          return `
            .${escapeSelector(rawSelector)} {
              --${prefixVariable}gutter-x: ${gutter};
              --${prefixVariable}gutter-y: "0";
              
              width: 100%;
              padding-right: calc(var(--${prefixVariable}gutter-x) * .5);
              padding-left: calc(var(--${prefixVariable}gutter-x) * .5);
              margin-right: auto;
              margin-left: auto;
            }
            
            ${template.join("\n")}
          `.replace(/^ {12}/gm, "")
        }
      ],
      [
        new RegExp(`^${prefixClass}row$`),
        ([], { rawSelector }) => {
          const selector = escapeSelector(rawSelector)
          const template = `
            .${selector} {
              --${prefixVariable}gutter-x: ${gutter};
              --${prefixVariable}gutter-y: 0;
            
              display: flex;
              flex-wrap: wrap;
              
              margin-top: calc(-1 * var(--${prefixVariable}gutter-y));
              margin-right: calc(-.5 * var(--${prefixVariable}gutter-x));
              margin-left: calc(-.5 * var(--${prefixVariable}gutter-x));
            }
            .${selector} > * {
              flex-shrink: 0;
              width: 100%;
              max-width: 100%;
              padding-right: calc(var(--${prefixVariable}gutter-x) * .5);
              padding-left: calc(var(--${prefixVariable}gutter-x) * .5);
              margin-top: var(--${prefixVariable}gutter-y);
            }
          `
          return template.replace(/^ {12}/gm, "")
        }
      ],
      [
        new RegExp(`^${prefixClass}col-?(\\d*)$`),
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
        }
      ],
      [
        `${prefixClass}col-auto`,
        {
          flex: "0 0 auto",
          width: "auto"
        }
      ],
      [
        `${prefixClass}col-fill`,
        {
          flex: "1 1 auto",
          width: "auto"
        }
      ],
      [
        new RegExp(`^${prefixClass}offset-(\\d+)$`),
        ([, size]: any): any => ({
          "margin-left": size === "0" ? 0 : `${(size / columns) * 100}%`
        })
      ],
      [
        new RegExp(`^${prefixClass}g([xy])?-(\\d+)$`),
        ([, dim, size]: any): any => {
          let gutterObject: { [key: string]: string } = {}
          if (dim !== "y") gutterObject[`--${prefixVariable}gutter-x`] = `${0.25 * size}rem`
          if (dim !== "x") gutterObject[`--${prefixVariable}gutter-y`] = `${0.25 * size}rem`
          return gutterObject
        }
      ]
    ]
  }
}

export default presetGrid
