import classnames from 'classnames'

export const cx = classnames

export const delayV = <T>(value: T, ms: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms))
