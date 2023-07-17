'use client'
import Header from '@/components/Header'
import { Layout } from '@/components/Layout'
import { Mail, Smartphone, User } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputSelect } from '@/components/Select'
import { phoneMask } from '@/mask/MaskForNumberTel'
import { useEffect } from 'react'
import {
  TypeFormRegisterOngs,
  schemaFormValidation,
} from '@/types/Input/typesRegisterForm'

const genders = ['Masculino', 'Feminino', 'Outro']

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<TypeFormRegisterOngs>({
    resolver: zodResolver(schemaFormValidation),
    mode: 'all',
    criteriaMode: 'all',
  })

  const numberTel = watch('tel')

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
            <div className="flex flex-col gap-1 text-gray-600">
              <label htmlFor="gender">Selecione seu gênero</label>
              <div className="flex w-full items-center gap-1 rounded-md border border-gray-50 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputSelect
                      className="mr-2 w-full cursor-pointer rounded-lg border-none bg-transparent px-2 py-3 text-gray-600 focus:border-none focus:outline-none"
                      placeholder="Selecione seu 
                      gênero"
                      items={genders}
                      option={field.value}
                      changeOption={(option) => field.onChange(option)}
                    />
                  )}
                />
              </div>
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
