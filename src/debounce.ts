import { defined, invokePropertyIfDefined } from './condition'

const { setTimeout, clearTimeout } = window

export const debounce = <T>(
  action: (a: T) => Promise<void>, delay = 50
): ((a: T, immediate?: boolean) => Promise<void>) => {
  let timer: number
  let promise: Promise<void> | undefined
  const control: { resolve?(): void } = {}

  const exec = async (a: T) => {
    promise = undefined

    await action(a)
    invokePropertyIfDefined(control, 'resolve')
  }

  return async (a: T, immediate?: boolean): Promise<void> => {
    clearTimeout(timer)
    timer = setTimeout(async () => exec(a), defined(immediate) && immediate ? 0 : delay)

    if (!defined(promise)) {
      promise = new Promise(resolve => {
        control.resolve = resolve
      })
    }

    return promise
  }
}
