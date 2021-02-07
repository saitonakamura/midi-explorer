import React from 'react'
import { TailwindHeightWidthSize, tw } from '../tw'
import { Spinner } from './Spinner'

export const SpinnerOverlay: React.FC<
  { size: TailwindHeightWidthSize } & Stylable
> = ({ size, ...rest }) => (
  <div
    {...rest}
    className={tw([
      'absolute',
      'bg-black',
      'bg-opacity-10',
      'dark:bg-gray-50',
      'dark:bg-opacity-10',
      'w-full',
      'h-full',
      'top-0',
      'left-0',
    ])}
  >
    <Spinner size={size} />
  </div>
)
