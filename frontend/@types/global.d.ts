type Stylable = {
  className?: string
}

type FIXME = any

declare module '*.svg' {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const url: string
  export default url
}
