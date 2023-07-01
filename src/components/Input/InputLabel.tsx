interface LabelProps {
  name: string
  reference: string
}

export function InputLabel({ name, reference }: LabelProps) {
  return (
    <label className="w-fit text-gray-800" htmlFor={reference}>
      {name}
    </label>
  )
}
