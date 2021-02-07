import React, { useRef, useCallback } from 'react'
import { Form, Field } from 'react-final-form'
import { uploadSongEffect, Song } from './api'
import { delayV } from './helpers'
import { tw, twIf } from './tw'
import { Decorator, Mutator } from 'final-form'
import { fileAsUInt8Array, noop } from './utils'
import { RadioButton } from './ui/RadioButton'
import { Button } from './ui/Button'
import { Paper } from './ui/Paper'

uploadSongEffect.use((v) => {
  return delayV(({} as unknown) as Song, 1000)
})

type FormValues = {
  fileType: 'gp3' | 'gp5' | 'midi'
  file: unknown
}

export const UploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadSong = useCallback((values: FormValues) => {
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
  }, [])

  const setTypeBasedOnFile = useCallback<Decorator<FormValues>>(
    (form) =>
      form.subscribe(
        ({ values }) => {
          const files = fileInputRef.current?.files

          if (files && files.length > 0) {
            const file = files[0]
            if (file.name.toLowerCase().endsWith('.gp3')) {
              form.change('fileType', 'gp3')
            } else if (file.name.toLowerCase().endsWith('gp5')) {
              form.change('fileType', 'gp5')
            } else if (file.name.toLowerCase().endsWith('midi')) {
              form.change('fileType', 'midi')
            }
          }
        },
        { values: true },
      ),
    [],
  )

  return (
    <Form<FormValues>
      onSubmit={uploadSong}
      decorators={[setTypeBasedOnFile]}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <>
          <Paper
            as="form"
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
                    {...(input as FIXME)}
                    type="file"
                    accept=".gp3,.gp5,.midi"
                    ref={fileInputRef}
                  />
                )}
              </Field>
            </div>
            <div className="mb-4 inline-flex">
              <Field
                name="fileType"
                render={({ input }) => (
                  <RadioButton
                    options={[
                      { value: 'gp3', label: 'GP3' },
                      { value: 'gp5', label: 'GP5' },
                      { value: 'midi', label: 'Midi' },
                    ]}
                    {...input}
                  />
                )}
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
          </Paper>
        </>
      )}
    />
  )
}
