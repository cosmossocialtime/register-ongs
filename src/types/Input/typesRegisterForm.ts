import { z } from 'zod'

export const schemaFormValidation = z.object({
  name: z.string().min(3, 'Por favor digite um nome válido'),
  email: z.string().email('Por favor digite um email válido.'),
  birth: z.coerce.date(),
})

export type TypeFormRegisterOngs = z.infer<typeof schemaFormValidation>
