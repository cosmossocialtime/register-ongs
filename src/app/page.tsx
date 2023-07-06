'use client'
import Header from '@/components/Header'
import { Layout } from '@/components/Layout'
import { Check, ChevronDown, Mail, Smartphone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { phoneMask } from '@/mask/MaskForNumberTel'
import { useEffect } from 'react'
import {
  TypeFormRegisterOngs,
  schemaFormValidation,
} from '@/types/Input/typesRegisterForm'
import * as Select from '@radix-ui/react-select'

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TypeFormRegisterOngs>({
    resolver: zodResolver(schemaFormValidation),
    mode: 'all',
    criteriaMode: 'all',
  })

  const numberTel = watch('tel')
  const gender = watch('gender')

  useEffect(() => {
    setValue('tel', phoneMask(numberTel))
  }, [numberTel, setValue])

  function handleSubmitForm(data: TypeFormRegisterOngs) {
    console.log(data)
  }
  console.log(errors)

  return (
    <main className="h-screen">
      <Header />
      <Layout>
        <div className="mx-auto w-full max-w-lg ">
          <h1 className="mb-5 text-2xl font-semibold text-gray-800">
            Etapa 1: Sobre a Liderança
          </h1>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col justify-center gap-5"
          >
            <div className="flex w-full flex-col gap-1">
              <Input
                {...register('name')}
                placeholder="Escreva aqui seu nome"
                iconLeft={() => (
                  <User className="text-gray-50 transition-colors  group-hover:text-[#9D37F2]" />
                )}
              />
            </div>
            {errors.name?.message && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
            <div className="flex w-full flex-col gap-1">
              <Input
                {...register('email')}
                placeholder="Email@email.com"
                iconLeft={() => (
                  <Mail className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
            </div>
            {errors.email?.message && (
              <span className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}

            <div className="custom-date-input flex w-full flex-col gap-1">
              <Input
                {...register('birth')}
                type="date"
                htmlRef="birth"
                id="birth"
                placeholder="Selecione sua data de nascimento"
              />
            </div>
            {errors.birth && (
              <span className="text-sm text-red-600">
                {errors.birth.message}
              </span>
            )}

            <div className="custom-date-input flex w-full flex-col gap-1">
              <Input
                {...register('tel')}
                label="Seu numero de telefone"
                htmlRef="tel"
                id="tel"
                maxLength={15}
                placeholder="Informe seu numero de telefone"
                iconLeft={() => (
                  <Smartphone className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
            </div>
            {errors.tel && (
              <span className="text-sm text-red-600">{errors.tel.message}</span>
            )}
            <div className="custom-date-input flex w-full flex-col gap-1">
              <Select.Root value={gender}>
                <Select.Trigger className="group flex w-full items-center gap-2 rounded border border-gray-50 px-4 py-3 pl-2 text-gray-400 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:outline-none focus:ring-1">
                  <Select.Icon>
                    <ChevronDown
                      size={20}
                      className="text-gray-50 transition-colors group-hover:text-[#9D37F2]"
                    />
                  </Select.Icon>
                  <Select.Value
                    placeholder="Selecione seu gênero"
                    className="text-zinc-50"
                  />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    className="mt-1 w-44 rounded border border-gray-50 bg-zinc-50 text-center"
                  >
                    <Select.Viewport className="flex cursor-pointer flex-col gap-1 py-2 text-zinc-600">
                      <Select.Item
                        key="Masculino"
                        value="Masculino"
                        className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-[#9D37F2] hover:text-zinc-50"
                      >
                        <Select.ItemText className="">
                          Masculino
                        </Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={15} />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        key="Feminino"
                        value="Feminino"
                        className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-violet-500 hover:text-white"
                      >
                        <Select.ItemText className="">Feminino</Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={15} />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        key="Outro"
                        value="Outro"
                        className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-violet-500 hover:text-white"
                      >
                        <Select.ItemText className="">Outro</Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={15} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            {errors.gender && (
              <span className="text-sm text-red-600">
                {errors.gender.message}
              </span>
            )}
            <button>Enviar</button>
          </form>
        </div>
      </Layout>
    </main>
  )
}
