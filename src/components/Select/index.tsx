import * as Select from '@radix-ui/react-select'
import { Check, ChevronDownIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface InputSelectProps extends Select.SelectProps {
  items: string[]
  option: string
  placeholder: string
  changeOption: (option: string) => void
  className?: string
  maxHeightView?: string
}

export function InputSelect({
  items,
  option,
  changeOption,
  placeholder,
  className,
  maxHeightView,
  ...rest
}: InputSelectProps) {
  return (
    <Select.Root {...rest} defaultValue={option} onValueChange={changeOption}>
      <Select.Trigger
        data-placeholder
        className={twMerge(
          `${
            rest.disabled ? 'border-0 border-b' : 'border-2'
          } group flex flex-1 items-center gap-2 rounded border-solid border-gray-400 px-4 py-3`,
          className,
        )}
      >
        <Select.Icon>
          <ChevronDownIcon className="text-gray-500 group-hover:text-[#9D37F2] group-data-[disabled]:opacity-20" />
        </Select.Icon>
        <Select.Value asChild>
          <span className={`${option ? 'text-gray-500' : 'opacity-50'}`}>
            {option || placeholder}
          </span>
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          side="bottom"
          sideOffset={16}
          position="popper"
          className="w-full rounded bg-white p-2 shadow-xl"
        >
          <Select.Viewport style={{ maxHeight: maxHeightView }}>
            {items &&
              items.map((item, key) => (
                <Select.Item
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-md p-3 text-violet-500 outline-none hover:bg-violet-500 hover:text-white"
                  key={key}
                  value={item}
                  disabled={item === option}
                >
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check size={18} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
