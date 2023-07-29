import { z } from 'zod'

export const schemaFormValidation = z.object({
  name: z.string().min(3, 'Por favor digite um nome válido.'),
  nameCompany: z
    .string()
    .min(3, 'Por favor digite um nome da sua organização.'),
  email: z.string().email('Por favor digite um email válido.'),
  birth: z.coerce.date().refine((date) => date < new Date(), {
    message: 'Data invalida, por favor selecione uma data válida.',
  }),
  tel: z
    .string()
    .min(15, 'Informe um numero de telefone válido.')
    .max(15, 'Informe um numero de telefone válido.')
    .nonempty('Informe um numero de telefone.'),
  gender: z.string().nonempty('Por favor selecione seu gênero.'),
  role: z.string().nonempty('Por favor selecione seu cargo.'),
  causes: z.string(),
  cnpj: z.string(),
  yearOfCreation: z.coerce.date().refine((date) => date < new Date(), {
    message: 'Data invalida, por favor selecione uma data válida.',
  }),
  totalCollaborators: z.coerce
    .number()
    .nonnegative('Por valor digite um valor válido'),
  annualIncome: z.string().nonempty('Digite uma quantia!'),
  beneficiaries: z.coerce.number().nonnegative('Digite uma quantidade válida.'),
  historyOrganization: z.string(),
  impactOrganization: z.string(),
  mainNeeds: z.string(),
  organizationSuport: z.string(),
  howDidAboutTheProgram: z.string(),
})

export type TypeFormRegisterOngs = z.infer<typeof schemaFormValidation>
