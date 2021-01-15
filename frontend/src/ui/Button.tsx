import React from 'react'
import { tw, twIf } from '../tw'
import { Spinner } from './Spinner'

export const Button: React.FC<
  { state: { key: 'loading' } | undefined; variant: 'primary' } & Pick<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  >
> = ({ variant, state, children, ...rest }) => (
  <button
    {...rest}
    className={tw([
      'rounded',
      'px-3',
      'py-2',
      'relative',
      ...twIf(
        [
          'bg-green-600',
          'hover:bg-green-700',
          'dark:bg-green-700',
          'dark:hover:bg-green-800',
          'text-white',
        ],
        variant === 'primary',
      ),
      ...twIf(
        [/*'cursor-not-allowed',*/ 'opacity-50', 'pointer-events-none'],
        state?.key === 'loading',
      ),
    ])}
    disabled={state?.key === 'loading'}
  >
    {children}
    {state?.key === 'loading' && <Spinner size="5" />}
  </button>
)
