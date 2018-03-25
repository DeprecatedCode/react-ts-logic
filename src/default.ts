const isString = <T>(value: string | T) =>
  typeof value === 'string'

export const defaultValue = <T, U extends T = T>(value: T | null | undefined, fallback: U) =>
  value !== null && typeof value !== 'undefined' ? (
    (isString(value as any) ? (value as any).length > 0 : true) ? value : fallback
  ) : fallback
