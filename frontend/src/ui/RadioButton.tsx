import React from 'react'
import { tw } from '../tw'

export const RadioButton: React.FC<
  {
    name: string
    options: Array<{ value: string | number; label: React.ReactNode }>
    value: string | number
    onChange: (
      val: string | number,
      e: React.ChangeEvent<HTMLInputElement>,
    ) => void
  } & Stylable
> = ({ options, value, onChange, className, name, ...rest }) => (
  <>
    {options.map((option, index) => (
      <label
        {...rest}
        key={option.value}
        className={tw(
          [
            'text-sm',
            'font-bold',
            'px-4',
            'py-2',
            'cursor-pointer',
            ...(option.value === value
              ? ([
                  'bg-green-500',
                  'hover:bg-green-600',
                  'text-gray-50',
                ] as const)
              : ([
                  'bg-gray-300',
                  'hover:bg-gray-400',
                  'text-gray-800',
                  'dark:bg-gray-700',
                  'dark:hover:bg-gray-600',
                  'dark:text-gray-50',
                ] as const)),
            {
              'rounded-l': index === 0,
              'rounded-r': index === options.length - 1,
            },
          ],
          className,
        )}
      >
        <input
          type="radio"
          className={tw(['appearance-none'])}
          value={value}
          name={name}
          onChange={(e) => onChange(option.value, e)}
        />
        {option.label}
      </label>
    ))}
  </>
)
