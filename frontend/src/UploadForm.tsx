import React, { useRef, useCallback } from 'react'
import { Form, Field } from 'react-final-form'
import { uploadSongEffect, Song } from './api'
import { delayV } from './helpers'
import { tw, twIf } from './tw'
import { Mutator } from 'final-form'
import { fileAsUInt8Array } from './utils'
import { RadioButton } from './ui/RadioButton'
import { Button } from './ui/Button'

uploadSongEffect.use((v) => {
  return delayV(({} as unknown) as Song, 1000)
})

type FormValues = {
  type: 'gp3' | 'gp5' | 'midi'
  file: unknown
}

const setTypeBasedOnFile: Mutator<FormValues> = (_, state, tools) => {
  if (state.lastFormState?.values.file) {
  }
}

export const UploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadSong = useCallback(
    (values: FormValues) => {
      return uploadSongEffect({})
      // if (
      //   !fileInputRef.current?.files ||
      //   fileInputRef.current.files.length <= 0
      // ) {
      //   return
      // }

      // const file = fileInputRef.current.files[0]

      // return fileAsUInt8Array(file).then((uint8array) =>
      //   uploadSongEffect({ ...values, file: uint8array, name: file.name })
      //     .then(console.log)
      //     .catch((error) => {
      //       console.error(error)
      //     }),
      // )
    },
    [fileInputRef.current],
  )

  return (
    <Form<FormValues>
      mutators={{ setTypeBasedOnFile }}
      onSubmit={uploadSong}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          onSubmit={handleSubmit}
          className={tw([
            'bg-gray-100',
            'dark:bg-gray-800',
            'shadow-md',
            'rounded',
            'p-8',
          ])}
        >
          <div className="mb-4">
            <Field<FormValues['file']> name="file">
              {({ input }) => (
                <input
                  {...(input as any)}
                  type="file"
                  accept=".gp3,.gp5,.midi"
                  ref={fileInputRef}
                />
              )}
            </Field>
          </div>
          <div className="mb-4 inline-flex">
            <RadioButton<FormValues, 'type'>
              position="left"
              name="type"
              value="gp3"
              content="GP3"
              values={values}
            />
            <RadioButton<FormValues, 'type'>
              position="between"
              name="type"
              value="gp5"
              content="GP5"
              values={values}
            />
            <RadioButton<FormValues, 'type'>
              position="right"
              name="type"
              value="midi"
              content="Midi"
              values={values}
            />
          </div>
          <div>
            <Button
              variant="primary"
              state={submitting ? { key: 'loading' } : undefined}
              children="Show me!"
              type="submit"
            />
          </div>
        </form>
      )}
    />
  )
}
