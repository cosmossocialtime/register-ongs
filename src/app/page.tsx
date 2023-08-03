'use client'
import Header from '@/components/Header'
import { Layout } from '@/components/Layout'
import {
  Mail,
  Smartphone,
  User,
  Building2,
  Building,
  ChevronRight,
  X,
  Briefcase,
  Users,
  Check,
  HardHat,
  DollarSign,
  Award,
  Upload,
} from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputSelect } from '@/components/Select'
import { phoneMask } from '@/mask/MaskForNumberTel'
import { useEffect, useState } from 'react'
import {
  TypeFormRegisterOngs,
  schemaFormValidation,
} from '@/types/typesRegisterForm'
import { MaskForCnpj } from '@/mask/MaskForCnpj'
import { CheckboxInput } from '@/components/Checkbox'
import useFetch from '@/hooks/useFetch'
import axios from 'axios'
import * as Select from '@radix-ui/react-select'
import { MaskForIncome } from '@/mask/MaskForIncome'
import { InputTextArea } from '@/components/TextArea'

interface cityProps {
  id: number
  nome: string
}

interface stateProps extends cityProps {
  sigla: string
}

const genders = ['Masculino', 'Feminino', 'Outro']

export default function Home() {
  const [causesArray, setCausesArray] = useState(Array<string>)
  const [noCnpj, setNoCnpj] = useState(false)
  const [notHaveSocialContract, setNotHaveSocialContract] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  // const [outOfBrazil, setOutOfBrazil] = useState(false)
  const [stateSubmit, setStateSubmit] = useState('')
  const [citySubmit, setCitySubmit] = useState('')
  const [city, setCity] = useState<cityProps[]>()
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

  console.log(errors)

  const { data: statesOfBrazil } = useFetch<stateProps[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  )
  useEffect(() => {
    async function fetchCidadesPorEstado() {
      try {
        const estadoEncontrado = statesOfBrazil?.find(
          (e) => e.sigla === stateSubmit,
        )
        const cidadesResponse = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`,
        )
        setCity(cidadesResponse.data)
      } catch (error) {
        console.error('Não foi possível obter a lista de cidades:')
        setCity([])
      }
    }
    fetchCidadesPorEstado()
  }, [stateSubmit, statesOfBrazil])

  const numberTel = watch('tel')
  const cnpj = watch('cnpj')
  const anualIncome = watch('annualIncome')
  const causes = watch('causes')

  useEffect(() => {
    setValue('tel', phoneMask(numberTel))
    setValue('cnpj', MaskForCnpj(cnpj))
    setValue('annualIncome', MaskForIncome(anualIncome))
  }, [numberTel, cnpj, setValue, anualIncome])

  function handleSubmitForm(data: TypeFormRegisterOngs) {
    console.log(data)
    console.log(noCnpj)
    console.log(causesArray)
    console.log(stateSubmit, citySubmit)
  }

  function handleSubmitCauses() {
    if (causes) {
      if (causesArray.length <= 2) {
        setCausesArray([...causesArray, causes])
      }
    }
  }

  return (
    <main className="h-screen px-10 lg:px-0">
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
                maxLength={50}
                id="name"
                label="Nome da liderança da organização"
                placeholder="Escreva aqui seu nome"
                iconLeft={() => (
                  <User className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
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
                <div className="flex w-full items-center gap-1 rounded-md border-2 border-gray-50 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
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
                maxLength={30}
                placeholder="Escreva o cargo em que você atua na organização"
                iconLeft={() => (
                  <Building2 className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.role && (
                <span className="text-sm text-red-600">
                  {errors.role.message}
                </span>
              )}
            </div>
            <div className="mt-5 flex flex-col justify-center gap-5">
              <h1 className="my-5 text-2xl font-semibold text-gray-800">
                Etapa 2: Sobre a Organização
              </h1>
              <Input
                {...register('nameCompany')}
                htmlRef="nameCompany"
                maxLength={50}
                id="nameCompany"
                label="Nome da organização"
                placeholder="Escreva aqui o nome da organização"
                iconLeft={() => (
                  <Building className="text-gray-50 transition-colors  group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.nameCompany?.message && (
                <span className="text-sm text-red-600">
                  {errors.nameCompany.message}
                </span>
              )}
              <div className="flex flex-col gap-3 md:flex-row">
                <Input
                  {...register('causes')}
                  htmlRef="causes"
                  maxLength={50}
                  id="causes"
                  label="Causa(s) em que atua (máx. 3)"
                  placeholder="Escreva aqui o nome das causas."
                  iconLeft={() => (
                    <Briefcase className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                  )}
                />
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleSubmitCauses}
                    className="flex h-12 w-full items-center justify-center rounded-md bg-violet-500 text-zinc-50 transition-colors hover:bg-violet-400 group-hover:text-[#9D37F2] md:w-12"
                  >
                    <ChevronRight />
                  </button>
                </div>

                {errors.causes?.message && (
                  <span className="text-sm text-red-600">
                    {errors.causes.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {causesArray.map((cause, index) => {
                  return (
                    <div
                      key={index}
                      className="flex w-fit gap-2 rounded-full bg-sky-500 px-3 py-2"
                    >
                      <span className=" font-semibold text-zinc-50">
                        {cause}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setCausesArray((prevArray) => {
                            const updateArray = [...prevArray]
                            updateArray.splice(index, 1)
                            return updateArray
                          })
                        }}
                      >
                        <X className="text-zinc-50 transition-colors hover:text-violet-600" />
                      </button>
                    </div>
                  )
                })}
              </div>
              {!noCnpj ? (
                <Input
                  {...register('cnpj')}
                  label="CNPJ"
                  htmlRef="cnpj"
                  id="cnpj"
                  maxLength={18}
                  placeholder="Digite aqui o CNPJ da organização"
                  iconLeft={() => (
                    <Users className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                  )}
                />
              ) : (
                ''
              )}

              {errors.cnpj && (
                <span className="text-sm text-red-600">
                  {errors.cnpj.message}
                </span>
              )}

              <CheckboxInput
                className="text-gray-600"
                checked={noCnpj}
                onChangeChecked={setNoCnpj}
                content="Não possuo CNPJ"
              />

              <Input
                {...register('yearOfCreation')}
                type="date"
                label="Ano de fundação"
                htmlRef="yearOfCreation"
                id="yearOfCreation"
                placeholder="Ano em que a organização foi fundada"
              />
              <div className="flex flex-col gap-2">
                <label className="text-gray-600">
                  Qual a localização da organização?
                </label>
                <div className="flex w-full gap-2">
                  <div className="flex w-full flex-col items-center gap-1 rounded-md border-2 border-gray-50 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
                    <Select.Root onValueChange={setStateSubmit}>
                      <Select.Trigger
                        id="country"
                        className="flex w-full items-center justify-between rounded border-none bg-zinc-50 px-4 py-3 text-sm text-zinc-500 focus:border-none focus:outline-none "
                      >
                        <Select.Value placeholder="Estado" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content
                          position="popper"
                          className="mt-2 w-full rounded bg-white text-center"
                        >
                          <Select.Viewport className="max-h-60 w-full cursor-pointer p-2 text-violet-500">
                            {statesOfBrazil?.map((states) => {
                              return (
                                <Select.Item
                                  key={states.id}
                                  value={states.sigla}
                                  className="flex items-center justify-between rounded-lg px-4 py-2 outline-none hover:bg-violet-500 hover:text-zinc-50"
                                >
                                  <Select.ItemText>
                                    {states.nome}
                                  </Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              )
                            })}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1 rounded-md border-2 border-gray-50 transition-colors hover:border-[#9D37F2] hover:shadow-sm hover:shadow-[#9D37F2] focus:border-[#65BAFA] focus:outline-none focus:ring-1 focus:ring-[#65BAFA]">
                    <Select.Root onValueChange={setCitySubmit}>
                      <Select.Trigger
                        id="City"
                        className="flex w-full items-center justify-between rounded bg-zinc-50 px-4 py-3 text-sm text-zinc-500 focus:outline-none"
                      >
                        <Select.Value placeholder="Cidade" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content
                          position="popper"
                          className="w-full rounded bg-white p-2 shadow-xl"
                        >
                          <Select.Viewport className="max-h-60 w-full cursor-pointer p-2 text-violet-500">
                            {city?.map((city) => {
                              return (
                                <Select.Item
                                  key={city.id}
                                  value={city.nome}
                                  className="flex cursor-pointer items-center justify-between gap-4 rounded-md p-3 text-violet-500 outline-none hover:bg-violet-500 hover:text-white"
                                >
                                  <Select.ItemText>{city.nome}</Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              )
                            })}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div>
              </div>
              <Input
                type="number"
                {...register('totalCollaborators')}
                label="Quantidade de funcionários"
                htmlRef="Collaborators"
                id="Collaborators"
                placeholder="Quantidade de funcionários"
                iconLeft={() => (
                  <HardHat className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.totalCollaborators && (
                <span className="text-sm text-red-600">
                  {errors.totalCollaborators.message}
                </span>
              )}

              <Input
                {...register('annualIncome')}
                label="Receita anual"
                htmlRef="income"
                id="income"
                placeholder="0000,00"
                iconLeft={() => (
                  <DollarSign className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.annualIncome && (
                <span className="text-sm text-red-600">
                  {errors.annualIncome.message}
                </span>
              )}
              <Input
                type="number"
                {...register('beneficiaries')}
                label="Quantidade de beneficiários"
                htmlRef="beneficiaries"
                id="beneficiaries"
                placeholder="Quantidade de beneficiários"
                iconLeft={() => (
                  <Award className="text-gray-50 transition-colors group-hover:text-[#9D37F2]" />
                )}
              />
              {errors.beneficiaries && (
                <span className="text-sm text-red-600">
                  {errors.beneficiaries.message}
                </span>
              )}
              <div className="flex flex-col gap-2">
                {!notHaveSocialContract ? (
                  <>
                    <label className="text-gray-600" htmlFor="document">
                      Estatuto ou Contrato Social
                    </label>
                    <label
                      htmlFor="document"
                      className=" flex flex-col items-center rounded-md border-2 border-dashed border-gray-50 p-10 text-center text-gray-50"
                    >
                      <Upload /> Insira o documento aqui
                    </label>
                  </>
                ) : (
                  ''
                )}

                <CheckboxInput
                  className="mt-4 text-gray-600"
                  checked={notHaveSocialContract}
                  onChangeChecked={setNotHaveSocialContract}
                  content="Não possui Estatuto ou Contrato Social"
                />
              </div>
              <input id="document" className="hidden" type="file" />
            </div>
            <div className="mt-5 flex flex-col justify-center gap-5">
              <h1 className="my-5 text-2xl font-semibold text-gray-800">
                Etapa 3: Dados Descritivos
              </h1>
              <label htmlFor="historyOrganization">
                Descreva brevemente a história da organização
              </label>
              <Controller
                name="historyOrganization"
                control={control}
                render={({ field }) => (
                  <InputTextArea
                    required
                    id="historyOrganization"
                    text={field.value}
                    onChange={field.onChange}
                    className="h-32"
                    placeholder="Escreva aqui a história da organização"
                    minChar={100}
                    maxChar={300}
                  />
                )}
              />
              <label htmlFor="impactOrganization">
                Descreva a atuação e o impacto da organização
              </label>
              <Controller
                name="impactOrganization"
                control={control}
                render={({ field }) => (
                  <InputTextArea
                    required
                    id="impactOrganization"
                    text={field.value}
                    onChange={field.onChange}
                    className="h-32"
                    placeholder="Escreva aqui a atuação e o impacto da organização"
                    minChar={100}
                    maxChar={300}
                  />
                )}
              />
              <label htmlFor="mainNeeds">
                Quais são as principais necessidades/desafios que a sua
                organização enfrenta no momento?
              </label>
              <Controller
                name="mainNeeds"
                control={control}
                render={({ field }) => (
                  <InputTextArea
                    required
                    id="mainNeeds"
                    text={field.value}
                    onChange={field.onChange}
                    className="h-32"
                    placeholder="Escreva aqui os desafios que a organização enfrenta no momento"
                    minChar={100}
                    maxChar={300}
                  />
                )}
              />
              <label htmlFor="organizationSuport">
                Como você acredita que o programa [Nome do programa] poderá
                apoiar a sua organização?
              </label>
              <Controller
                name="organizationSuport"
                control={control}
                render={({ field }) => (
                  <InputTextArea
                    required
                    id="organizationSuport"
                    text={field.value}
                    onChange={field.onChange}
                    className="h-32"
                    placeholder="Escreva aqui como o programa pode apoiar a sua organização"
                    minChar={100}
                    maxChar={300}
                  />
                )}
              />
            </div>
            <div className="mt-5 flex flex-col justify-center gap-5">
              <h1 className="my-5 text-2xl font-semibold text-gray-800">
                Etapa 4: Finalizar Inscrição
              </h1>
              <label htmlFor="howDidAboutTheProgram">
                Como você ficou sabendo sobre o programa?
              </label>
              <Controller
                name="howDidAboutTheProgram"
                control={control}
                render={({ field }) => (
                  <InputTextArea
                    required
                    id="howDidAboutTheProgram"
                    text={field.value}
                    onChange={field.onChange}
                    className="h-32"
                    placeholder="Escreva aqui como você ficou sabendo sobre o programa"
                    minChar={100}
                    maxChar={300}
                  />
                )}
              />
              <CheckboxInput
                className="mt-4 text-gray-600"
                checked={acceptTerms}
                onChangeChecked={setAcceptTerms}
                content="Aceito o termo de tratamento de dados"
              />
            </div>
            <button
              type="submit"
              className="my-10 w-full rounded-md bg-violet-500 py-3 font-semibold text-zinc-50 transition-colors hover:bg-violet-400"
            >
              Enviar
            </button>
          </form>
        </div>
      </Layout>
    </main>
  )
}
