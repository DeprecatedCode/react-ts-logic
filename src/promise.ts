export const detach = <T>(promise: Promise<T>) => {
  promise
    .then(() => void 0)
    .catch((e: Error) => void 0)
}
