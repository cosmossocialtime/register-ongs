/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: () => void
  iconRight?: () => void
  label?: string
  htmlRef?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ iconLeft, iconRight, label, htmlRef, ...rest }: InputProps, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={htmlRef}
          className="flex w-full flex-col bg-transparent text-gray-800 "
        >
          {label}
        </label>

        <div className="group flex items-center rounded-md border border-gray-50 pl-2 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
          <>
            {iconLeft && iconLeft()}

            <input
              {...rest}
              ref={ref}
              className="w-full bg-transparent px-2 py-3 text-gray-600 focus:border-none focus:outline-none "
            />

            {iconRight && iconRight()}
          </>
        </div>
      </div>
    )
  },
)
