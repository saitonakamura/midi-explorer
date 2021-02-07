type Stylable = {
  className?: string
}

type FIXME = unknown

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const url: string
  export default url
}

declare module '*.css' {
  const _: never
  export default _
}
