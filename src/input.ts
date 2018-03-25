import { ChangeEvent, Component, FocusEvent, FormEvent, KeyboardEvent, MouseEvent } from 'react'

type BaseElement = HTMLInputElement | HTMLSelectElement
type BaseEvent<T> = ChangeEvent<T> | FormEvent<T>

const BASE_DECIMAL = 10
const KEYCODE_ENTER = 13

export const focus = (element: BaseElement) => {
  (element as any).focus()
}

export const select = (element: BaseElement) => {
  (element as any).select()
}

export const getValue = (element: BaseElement) =>
  (element as any).value

export const getChecked = (element: BaseElement) =>
  (element as any).checked

export const stateChange = {
  string: <T extends BaseElement>(component: Component, property: string) =>
    (e: BaseEvent<T>) => {
      component.setState({ [property]: getValue(e.currentTarget as BaseElement) })
    },

  integer: <T extends BaseElement>(component: Component, property: string) =>
    (e: BaseEvent<T>) => {
      component.setState({ [property]: parseInt(getValue(e.currentTarget as BaseElement), BASE_DECIMAL) })
    }
}

export const value = {
  string: <T extends BaseElement>(action: (value: string) => void) =>
    (e: BaseEvent<T>) => {
      action(getValue(e.currentTarget as BaseElement))
    },

  integer: <T extends BaseElement>(action: (value: number) => void) =>
    (e: BaseEvent<T>) => {
      action(parseInt(getValue(e.currentTarget as BaseElement), BASE_DECIMAL))
    },

  checked: <T extends HTMLInputElement>(action: (value: boolean) => void) =>
    (e: ChangeEvent<T>) => {
      action(getChecked(e.currentTarget as BaseElement))
    }
}

export const onEnterKey = <T extends BaseElement>(action: () => void) => (e: KeyboardEvent<T>) => {
    if (e.keyCode === KEYCODE_ENTER) {
      action()
    }
}

export const selectAll = <T extends HTMLInputElement | HTMLTextAreaElement>(e: FocusEvent<T> | MouseEvent<T>) => {
  select(e.currentTarget as BaseElement)
}

export const selectNone = () => {
  if ('getSelection' in document) {
    document.getSelection()
      .removeAllRanges()
  }
}
