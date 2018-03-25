const {
  atob,
  btoa
} = window

const TWO_SPACES = 2

const chunk = (str: string) => {
  const match = str.match(/.{1,4}/g)
  if (match !== null) {
    return match.join(' ')
  }

  return ''
}

const unchunk = (str: string) => str.split(' ')
  .join('')

export const encode = (content: any) => chunk(
  btoa(
    encodeURIComponent(
      JSON.stringify(content, undefined, TWO_SPACES)
    )
  )
)

export const decode = (representation: string) => JSON.parse(
  decodeURIComponent(
    atob(
      unchunk(
        representation
      )
    )
  )
)
