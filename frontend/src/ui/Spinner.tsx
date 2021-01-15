import React from 'react'
import { ReactSVG } from 'react-svg'
import { TailwindHeightWidthSize, tw } from '../tw'
import SpinnerSvg from '../svg/spinner.svg'

// export { default as Spinner } from '../svg/spinner.svg'

export const Spinner = ({
  className,
  size,
  ...rest
}: Stylable & { size: TailwindHeightWidthSize }) => (
  <div
    {...rest}
    className={tw(
      [
        'absolute',
        'top-1/2',
        'left-1/2',
        'transform-gpu',
        '-translate-x-1/2',
        '-translate-y-1/2',
        `w-${size}` as const,
        `h-${size}` as const,
      ],
      className,
    )}
  >
    <ReactSVG className={tw(['animate-spin'])} src={SpinnerSvg} />
  </div>
)
