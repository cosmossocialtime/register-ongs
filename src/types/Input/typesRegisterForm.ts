import { z } from 'zod'

export const schemaFormValidation = z.object({
  name: z.string().min(3, 'Por favor digite um nome válido'),
  email: z.string().email('Por favor digite um email válido.'),
  birth: z.coerce.date(),
  tel: z
    .string()
    .min(15, 'Informe um numero de telefone válido')
    .max(15, 'Informe um numero de telefone válido')
    .nonempty('Informe um numero de telefone'),
  gender: z.string().nonempty('Por favor selecione seu gênero'),
})

export type TypeFormRegisterOngs = z.infer<typeof schemaFormValidation>
