import * as Dialog from '@radix-ui/react-dialog'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  DialogCloseButton,
  DialogOverlay,
  DialongContent,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
const newTransactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const createNewTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createNewTransaction
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionSchema),
  })

  async function handleNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data
    await createNewTransaction({
      description,
      price,
      category,
      type,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      {/* background escuro */}
      <DialogOverlay />
      {/* conteudo */}
      <DialongContent>
        <Dialog.Title>Nova transação</Dialog.Title>

        {/* fechar modal */}
        <DialogCloseButton>
          <X size={20} />
        </DialogCloseButton>

        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', {
              valueAsNumber: true,
            })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>
      </DialongContent>
    </Dialog.Portal>
  )
}
