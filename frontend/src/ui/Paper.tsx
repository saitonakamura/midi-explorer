import React from 'react'
import { tw } from '../tw'

export function Paper(
  props: { as?: 'form'; children: React.ReactNode } & Stylable &
    JSX.IntrinsicElements['form'],
): JSX.Element
export function Paper({
  className,
  as: Element = 'div',
  ...rest
}: { as?: keyof React.ReactHTML; children: React.ReactNode } & Stylable) {
  return (
    <Element
      {...rest}
      className={tw(
        ['bg-gray-100', 'dark:bg-gray-800', 'shadow-md', 'rounded', 'p-8'],
        className,
      )}
    />
  )
}
