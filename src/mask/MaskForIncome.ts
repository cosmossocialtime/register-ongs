export const MaskForIncome = (value: string) => {
  if (!value) return ''
  value = value.replace(/\D/g, '')
  const formattedCurrency = (parseFloat(value) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formattedCurrency
}
