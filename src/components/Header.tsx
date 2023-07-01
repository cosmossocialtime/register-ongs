import Image from 'next/image'
import logo from '../../public/logo.svg'

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-around  p-3 shadow-md">
        <div>
          <span className="text-lg text-gray-500">Formulário de Inscrição</span>
          <h1 className="text-3xl font-semibold text-gray-600">
            [Nome do Programa]
          </h1>
        </div>
        <div>
          <Image src={logo} width={190} height={75} alt="Logo da empresa" />
        </div>
      </header>
      <div className="h-[0.375rem] bg-gradient-to-l from-[#9D37F2] to-[#65BAFA] shadow-md shadow-black/25" />
    </>
  )
}
