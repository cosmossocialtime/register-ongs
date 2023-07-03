'use client'
import Header from '@/components/Header'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  TypeFormRegisterOngs,
  schemaFormValidation,
} from '@/types/Input/typesRegisterForm'
import { zodResolver } from '@hookform/resolvers/zod'

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
              <Input.Label
                name="Nome da liderança da organização"
                reference="name"
              />
              <Input.InputMain
                {...register('name')}
                id="name"
                type="text"
                placeholder="Escreva aqui o seu nome"
                iconLeft={() => (
                  <User className="text-gray-50 transition-colors  group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="flex w-full flex-col gap-1">
              <Input.Label name="E-mail" reference="email" />
              <Input.InputMain
                {...register('email')}
                id="email"
                placeholder="nome@email.com"
                iconLeft={() => (
                  <Mail className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <button>Enviar</button>
          </form>
        </div>
      </Layout>
    </main>
  )
}
