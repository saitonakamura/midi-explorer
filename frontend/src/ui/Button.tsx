import React from 'react'
import { tw } from '../tw'

export const Button: React.FC<
  { state: { key: 'loading' } | undefined } & Pick<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  >
> = ({ state, children, ...rest }) => (
  <button {...rest} className={tw([])}>
    {children}
  </button>
)
