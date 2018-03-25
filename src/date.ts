import { language } from './language'

const MILLISECONDS = 1000

export const formatDateTime = (timestamp: number) => {
  const locale = language.get()
  const date = new Date(timestamp * MILLISECONDS)

  return `${date.toLocaleString(locale)}`
}
