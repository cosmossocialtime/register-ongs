'use client'
import Header from '@/components/Header'
import { Layout } from '@/components/Layout'
import { Mail, Smartphone, User, Building2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputSelect } from '@/components/Select'
import { phoneMask } from '@/mask/MaskForNumberTel'
import { useEffect } from 'react'
import {
  TypeFormRegisterOngs,
  schemaFormValidation,
} from '@/types/typesRegisterForm'

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
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="flex flex-col justify-center gap-5">
              <h1 className="mb-5 text-2xl font-semibold text-gray-800">
                Etapa 1: Sobre a Liderança
              </h1>
              <Input
                {...register('name')}
                htmlRef="name"
                id="name"
                label="Nome da liderança da organização"
                placeholder="Escreva aqui seu nome"
                iconLeft={() => (
                  <User className="text-gray-50 transition-colors  group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.name?.message && (
                <span className="text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
              <Input
                {...register('email')}
                id="email"
                htmlRef="email"
                label="E-mail"
                placeholder="Email@email.com"
                iconLeft={() => (
                  <Mail className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.email?.message && (
                <span className="text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}

              <Input
                {...register('birth')}
                label="Data de nacimento"
                type="date"
                htmlRef="birth"
                id="birth"
                placeholder="Selecione sua data de nascimento"
              />
              {errors.birth && (
                <span className="text-sm text-red-600">
                  {errors.birth.message}
                </span>
              )}

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
              {errors.tel && (
                <span className="text-sm text-red-600">
                  {errors.tel.message}
                </span>
              )}
              <div className="flex flex-col gap-1 text-gray-600">
                <label htmlFor="gender">Gênero</label>
                <div className="flex w-full items-center gap-1 rounded-md border border-gray-50 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputSelect
                        className="mr-2 w-full cursor-pointer rounded-lg border-none bg-transparent px-2 py-3 text-gray-600 focus:border-none focus:outline-none"
                        placeholder="Selecione seu gênero"
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
              <Input
                {...register('role')}
                label="Cargo em que atua"
                htmlRef="role"
                id="role"
                maxLength={15}
                placeholder="Escreva o cargo em que você atua na organização"
                iconLeft={() => (
                  <Building2 className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.tel && (
                <span className="text-sm text-red-600">
                  {errors.tel.message}
                </span>
              )}
            </div>
            <div>
              <h1 className="my-5 text-2xl font-semibold text-gray-800">
                Etapa 2: Sobre a Organização
              </h1>
            </div>
            <button>Enviar</button>
          </form>
        </div>
      </Layout>
    </main>
  )
}
