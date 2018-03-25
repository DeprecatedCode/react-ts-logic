import { defined } from './condition'

export const findIndex = <T>(arr: T[], test: (item: T) => boolean) => {
  let foundIndex: number | undefined

  arr.some((item, index) => {
    if (test(item)) {
      foundIndex = index

      return true
    }

    return false
  })

  return foundIndex
}

export const replaceById = <T extends { id: string }>(arr: T[], item: T): T[] => {
  const index = findIndex(arr, compare => compare.id === item.id)

  if (defined(index)) {
    return [
      ...arr.slice(0, index),
      item,
      ...arr.slice(index + 1)
    ]
  }

  return [ ...arr, item ]
}

export const range = (from: number, to: number) => {
  const result = []

  for (let i = 0; i < to - from; i ++) {
    result.push(from + i)
  }

  return result
}
