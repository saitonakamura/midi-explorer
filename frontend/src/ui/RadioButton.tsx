import React from 'react'
import { Field } from 'react-final-form'
import { tw } from '../tw'

export function RadioButton<
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
      className={tw(
        [
          'text-sm',
          'font-bold',
          'px-4',
          'py-2',
          'cursor-pointer',
          ...(props.values[props.name] === props.value
            ? ['bg-green-500', 'hover:bg-green-600', 'text-gray-50'] as const
            : [
                'bg-gray-300',
                'hover:bg-gray-400',
                'text-gray-800',
                'dark:bg-gray-700',
                'dark:hover:bg-gray-600',
                'dark:text-gray-50',
              ] as const),
          {
            'rounded-l': props.position === 'left',
            'rounded-r': props.position === 'right',
          },
        ],
        props.className,
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
