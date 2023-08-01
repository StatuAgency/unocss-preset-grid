export function ensureSuffix(suffix: string, str: string) {
  if (!str.endsWith(suffix))
    return str + suffix
  return str
}
