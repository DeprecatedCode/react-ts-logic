import { KeyboardEvent } from 'react'

type KeyHandler = <T>(event: KeyboardEvent<T>) => void

export const handler = (keyCode: number) => (callback: () => void) => <T>(event: KeyboardEvent<T>) => {
  if (event.keyCode === keyCode) {
    callback()
    event.stopPropagation()
    event.preventDefault()
  }
}

export const KeyCodes = {
  BACKSPACE: 8,
  ESCAPE: 27,
  RETURN: 13
}

export const Keys = {
  BACKSPACE: handler(KeyCodes.BACKSPACE),
  ESCAPE: handler(KeyCodes.ESCAPE),
  RETURN: handler(KeyCodes.RETURN)
}

export const Multiple = (...handlers: KeyHandler[]) =>
  <T>(event: KeyboardEvent<T>) => {
    handlers.forEach(item => {
      item(event)
    })
  }
