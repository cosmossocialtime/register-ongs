import { z } from 'zod'

export const schemaFormValidation = z.object({
  name: z.string().nonempty('Por favor, digite seu nome.'),
  email: z.string().email('Por favor digite um email válido.'),
})

export type TypeFormRegisterOngs = z.infer<typeof schemaFormValidation>
