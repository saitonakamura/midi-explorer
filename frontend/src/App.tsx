import React from 'react'
import { UploadForm } from './UploadForm'

export const App = (props: {}) => (
  <div className="container mx-auto font-sans grid grid-cols-1 gap-4 w-full max-w-s p-12">
    <UploadForm />
  </div>
)
