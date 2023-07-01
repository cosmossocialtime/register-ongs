import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export function InputMain({ ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className="rounded-md border border-gray-50 px-5 py-3 hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]"
    />
  )
}
