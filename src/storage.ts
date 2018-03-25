export const storage = <T>(key: string) => ({
  clear() {
    localStorage.removeItem(key)
  },

  get exists() {
    try {
      return localStorage.getItem(key) !== null
    }

    catch (e) {
      return false
    }
  },

  get value(): T | undefined {
    try {
      const value = localStorage.getItem(key)
      if (value === null) {
        return undefined
      }

      return JSON.parse(value) as T
    }

    catch (e) {
      return undefined
    }
  },

  set value(value: T | undefined) {
    if (typeof value === 'undefined') {
      localStorage.removeItem(key)
    }

    else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
})
