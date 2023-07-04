'use client'
import Header from '@/components/Header'
import { Layout } from '@/components/Layout'
import { Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TypeFormRegisterOngs,
  schemaFormValidation,
} from '@/types/Input/typesRegisterForm'
import { Input } from '@/components/Input'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormRegisterOngs>({
    resolver: zodResolver(schemaFormValidation),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      email: '',
    },
  })

  function handleSubmitForm(data: TypeFormRegisterOngs) {
    console.log(data)
    console.log(errors)
  }
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
                placeholder="Selecione sua data de nascimento"
              />
            </div>
            <button>Enviar</button>
          </form>
        </div>
      </Layout>
    </main>
  )
}
