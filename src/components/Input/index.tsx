/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: () => void
  iconRight?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ iconLeft, iconRight, ...rest }: InputProps, ref) => {
    return (
      <div className="group flex items-center rounded-md border border-gray-50 pl-2 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
        <>
          {iconLeft && iconLeft()}
          <label
            htmlFor=""
            className="flex w-full flex-col bg-transparent text-gray-800"
          >
            <input
              {...rest}
              ref={ref}
              className="bg-transparent px-2 py-3 focus:border-none focus:outline-none "
            />
          </label>
          {iconRight && iconRight()}
        </>
      </div>
    )
  },
)
