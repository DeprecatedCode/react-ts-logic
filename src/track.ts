export interface IObjectWithId {
  id: string
}

type Action<T> = (arg: T) => Promise<void>
type GetAction<T> = () => Action<T>

export const trackById = <T extends IObjectWithId>(action: GetAction<T>): Action<T> => {
  const cache: { [key: string]: Action<T> } = {}

  return async (arg: T) => {
    if (!(arg.id in cache)) {
      cache[arg.id] = action()
    }

    return cache[arg.id](arg)
  }
}
