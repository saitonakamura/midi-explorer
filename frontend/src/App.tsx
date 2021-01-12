import React from 'react'
import { UploadForm } from './UploadForm'

export const App = (props: {}) => (
  <div className="h-screen w-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-50">
    <div className="md:container md:mx-auto grid grid-cols-1 gap-4 w-full max-w-s p-12">
      <UploadForm />
    </div>
  </div>
)
