import { SerachFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
const searchFormSchema = zod.object({
  query: zod.string(),
})

type searchFormDataProps = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchFormDataProps>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  })

  async function handleSearchTransactions(data: searchFormDataProps) {
    await fetchTransactions(data.query)
  }

  return (
    <SerachFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SerachFormContainer>
  )
}
