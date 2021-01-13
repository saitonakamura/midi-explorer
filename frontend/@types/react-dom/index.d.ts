declare module 'react-dom' {
  interface Root {
    render(reactEl: React.ReactElement): void
  }

  interface UnstableCreateRoot {
    (node: HTMLElement | null): Root
  }

  export const unstable_createRoot: UnstableCreateRoot
}
