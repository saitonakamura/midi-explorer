import classnames from 'classnames'

type TailwindPosition = 'static' | 'absolute' | 'fixed' | 'relative' | 'sticky'

type TailwindLayout = TailwindPosition

type TailwindPaddingSize =
  | '-0'
  | '-0.5'
  | '-1'
  | '-1.5'
  | '-2'
  | '-2.5'
  | '-3'
  | '-3.5'
  | '-4'
  | '-5'
  | '-6'
  | '-7'
  | '-8'
  | '-9'

type TailwindPaddingSide = '' | 't' | 'r' | 'b' | 'l' | 'x' | 'y'

type TailwindPadding = `p${TailwindPaddingSide}${TailwindPaddingSize}`

type TailwindSpacing = TailwindPadding

type TailwindColorName =
  | 'gray'
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'pruple'
  | 'pink'

type TailwindColorGrade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

type TailwindColor =
  | `${TailwindColorName}-${TailwindColorGrade}`
  | 'white'
  | 'black'

type TailwindTextColor = `text-${TailwindColor}`

type TailwindFontSizeSize =
  | '-xs'
  | '-sm'
  | '-base'
  | '-lg'
  | '-xl'
  | '-2xl'
  | '-3xl'
  | '-4xl'
  | '-5xl'

type TailwindFontSize = `text${TailwindFontSizeSize}`

type TailwindFontWeightWeight =
  | '-thin'
  | '-extralight'
  | '-light'
  | '-normal'
  | '-medium'
  | '-semibold'
  | '-bold'
  | '-extrabold'
  | '-black'

type TailwindFontWeight = `font${TailwindFontWeightWeight}`

type TailwindTypography =
  | TailwindFontSize
  | TailwindFontWeight
  | TailwindTextColor

type TailwindBackColor = `bg-${TailwindColor}`

type TailwindBackgrounds = TailwindBackColor

type TailwindBorderRadiusSize =
  | '-none'
  | '-sm'
  | ''
  | '-md'
  | '-lg'
  | '-xl'
  | '-2xl'
  | '-3xl'

type TailwindBorderRadiusSide =
  | ''
  | '-t'
  | '-r'
  | '-b'
  | '-l'
  | '-tl'
  | '-tr'
  | '-br'
  | '-bl'

type TailwindBorderRadius =
  | `rounded${TailwindBorderRadiusSide}${TailwindBorderRadiusSize}`
  | 'rounded-full'

type TailwindBorders = TailwindBorderRadius

type TailwindBoxShadow =
  | 'shadow-sm'
  | 'shadow'
  | 'shadow-md'
  | 'shadow-lg'
  | 'shadow-xl'
  | 'shadow-2xl'
  | 'shadow-inner'
  | 'shadow-none'

type TailwindOpacitySize =
  | '-0'
  | '-5'
  | '-10'
  | '-20'
  | '-25'
  | '-30'
  | '-40'
  | '-50'
  | '-60'
  | '-70'
  | '-75'
  | '-80'
  | '-90'
  | '-95'

type TailwindOpacity = `opacity${TailwindOpacitySize}`

type TailwindEffects = TailwindBoxShadow | TailwindOpacity

type TailwindAnimation = 'animate-spin'

type TailwindTransitionsAnimations = TailwindAnimation

type TailwindCursorType =
  | '-auto'
  | '-default'
  | '-pointer'
  | '-wait'
  | '-text'
  | '-move'
  | '-not-allowed'

type TailwindCursor = `cursor${TailwindCursorType}`

type TailwindInteractivity = TailwindCursor

type TailwindHover = `hover:${TailwindBackColor | TailwindTextColor}`

type TailwindDarkMode = `dark:${
  | TailwindBackColor
  | TailwindTextColor
  | TailwindHover}`

type TailwindCoreConcepts = TailwindHover | TailwindDarkMode

type TailwindClass =
  | TailwindLayout
  | TailwindTypography
  | TailwindSpacing
  | TailwindBackgrounds
  | TailwindBorders
  | TailwindEffects
  | TailwindTransitionsAnimations
  | TailwindInteractivity
  | TailwindCoreConcepts

export const tw = (
  classes: Array<TailwindClass | Partial<Record<TailwindClass, boolean>>>,
  outerClassName?: string,
): string => {
  return classnames(outerClassName, ...classes)
}

export const twIf = (classes: Array<TailwindClass>, condition: boolean) =>
  condition ? classes : []
