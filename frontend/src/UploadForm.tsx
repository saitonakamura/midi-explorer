import React, { useRef, useCallback } from 'react'
import { Form, Field } from 'react-final-form'
import { uploadSongEffect, Song } from './api'
import { cx, delayV } from './helpers'
import { Mutator } from 'final-form'

// uploadSongEffect.use((v) => {
//   return delayV(({} as unknown) as Song, 1000)
// })

type FormValues = {
  type: 'gp3' | 'gp5' | 'midi'
  file: unknown
}

function RadioButton<
  TFormValues extends Record<string, any>,
  TKey extends keyof TFormValues
>(
  props: {
    position: 'left' | 'right' | 'between'
    name: keyof TFormValues
    value: TFormValues[TKey]
    content: React.ReactNode
    values: TFormValues
  } & Stylable,
) {
  return (
    <label
      className={cx(
        props.className,
        'text-sm font-bold px-4 py-2 cursor-pointer',
        props.values[props.name] === props.value
          ? 'bg-teal-500 hover:bg-teal-600 text-white'
          : 'bg-gray-300 hover:bg-gray-400 text-gray-800',
        {
          'rounded-l': props.position === 'left',
          'rounded-r': props.position === 'right',
        },
      )}
    >
      <Field<TFormValues[TKey]>
        name={(props.name as unknown) as any}
        component="input"
        type="radio"
        value={props.value}
        className="appearance-none"
      />
      {props.content}
    </label>
  )
}

const fileAsUInt8Array = (file: File): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      if (!this.result) {
        reject(`result array buffer of file ${file.name} is null`)
        return
      }

      if (typeof this.result === 'string') {
        reject(`result array buffer of file ${file.name} is string`)
        return
      }

      const arrayBuffer = this.result
      resolve(new Uint8Array(arrayBuffer))
    }
    reader.readAsArrayBuffer(file)
  })

const setTypeBasedOnFile: Mutator<FormValues> = (_, state, tools) => {
  if (state.lastFormState?.values.file) {
  }
}

export const UploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadSong = useCallback(
    (values: FormValues) => {
      if (
        !fileInputRef.current?.files ||
        fileInputRef.current.files.length <= 0
      ) {
        return
      }

      const file = fileInputRef.current.files[0]

      return fileAsUInt8Array(file).then((uint8array) =>
        uploadSongEffect({ ...values, file: uint8array, name: file.name }).then(
          console.log,
        ).catch(error => {
          console.error(error)
        }),
      )
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
          className="bg-teal-100 shadow-md rounded p-8"
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
            <button
              className={cx(
                'bg-teal-700 hover:bg-teal-800 px-3 py-2 rounded text-white',
                { 'cursor-not-allowed opacity-50': submitting },
              )}
              type="submit"
            >
              Show me!
            </button>
          </div>
        </form>
      )}
    />
  )
}
