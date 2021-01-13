import React from 'react'
import { ReactSVG } from 'react-svg'
import { tw } from '../tw'
import SpinnerSvg from '../svg/spinner.svg'

// export { default as Spinner } from '../svg/spinner.svg'

export const Spinner = ({ className, ...rest }: Stylable) => (
  <ReactSVG
    {...rest}
    className={tw(['animate-spin', 'absolute'], className)}
    src={SpinnerSvg}
  />
)
