import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: () => void
  iconRight?: () => void
}

export function InputMain({ iconLeft, iconRight, ...rest }: InputProps) {
  return (
    <div className="group flex items-center rounded-md border border-gray-50 pl-2 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
      <>
        {iconLeft && iconLeft()}
        <input
          {...rest}
          className=" w-full bg-transparent py-3 pl-2 focus:border-none  focus:outline-none "
        />
        {iconRight && iconRight()}
      </>
    </div>
  )
}
