export const defined = <T>(x: T | undefined): x is T =>
  typeof x !== 'undefined'

export const propertyDefined = <T>(x: T | undefined, property: string): x is T =>
  typeof x !== 'undefined' && typeof (x as any)[property] !== 'undefined'

export const invokePropertyIfDefined = <T>(x: T | undefined, property: string) => {
  if (typeof x !== 'undefined' && typeof (x as any)[property] === 'function') {
    (x as any)[property]()
  }
}

export const isString = <T>(x: string | T | undefined): x is string =>
  typeof x === 'string'

export const definedCondition = <T, U>(maybePresent: T | undefined, value: (isPresent: T) => U) => {
  if (defined(maybePresent)) {
    return value(maybePresent)
  }
}

export const condition = <U>(maybePresent: boolean | undefined, value: () => U) => {
  if (defined(maybePresent) && maybePresent) {
    return value()
  }
}
