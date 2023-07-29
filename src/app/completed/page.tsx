import Image from 'next/image'

export default function Completed() {
  return (
    <main className="h-screen w-screen bg-completedBackground bg-cover bg-no-repeat">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative max-w-5xl rounded-md bg-gradient-to-l from-[#9D37F2] to-[#65BAFA] p-1">
          <div className="flex max-w-4xl flex-col items-center rounded-md border-2 bg-zinc-50 px-20 py-14">
            <h1 className="text-4xl font-semibold text-gray-800">
              Obrigado por se inscrever no programa [Nome do Programa]!
            </h1>
            <p className="mt-8 text-xl">
              O processo de seleção será realizado pela empresa [Nome da
              Empresa]. As inscrições para o projeto ficarão abertas até
              meia-noite do dia dd/mm/aaaa, e o resultado desta primeira etapa
              vai ser enviado para o e-mail cadastrado dentro de algumas semanas
              após o fim do prazo. Preste atenção na sua caixa de spam para não
              perder nenhuma etapa importante!
            </p>
            <div className="mt-10 flex gap-5">
              <Image
                src="/logoItau.svg"
                alt="Logo itau"
                width={150}
                height={150}
              />
              <Image
                src="/logoCosmos.svg"
                alt="Logo Cosmos"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
