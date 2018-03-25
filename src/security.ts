export const isSecureExecutionContext = () =>
  window.location.protocol === 'https:' || window.location.hostname === 'localhost'
