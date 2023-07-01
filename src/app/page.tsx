import Header from '@/components/Header'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'

export default function Home() {
  return (
    <main className="h-screen">
      <Header />
      <Layout>
        <div className="mx-auto w-full max-w-lg ">
          <h1 className="mb-5 text-2xl font-semibold text-gray-800">
            Etapa 1: Sobre a Liderança
          </h1>
          <form className="flex flex-col justify-center gap-5">
            <div className="flex w-full flex-col gap-1">
              <Input.Label
                name="Nome da liderança da organização"
                reference="name"
              />
              <Input.InputMain
                id="name"
                type="text"
                placeholder="Escreva aqui o seu nome"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Input.Label name="E-mail" reference="email" />
              <Input.InputMain
                id="email"
                type="text"
                placeholder="nome@email.com"
              />
            </div>
          </form>
        </div>
      </Layout>
    </main>
  )
}
