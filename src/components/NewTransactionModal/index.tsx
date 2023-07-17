import * as Dialog from '@radix-ui/react-dialog'
import {
  DialogCloseButton,
  DialogOverlay,
  DialongContent,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

export function NewTransactionModal() {
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

        <form>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <TransactionType>
            <TransactionTypeButton variant="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton variant="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>
          <button type="submit">Cadastrar</button>
        </form>
      </DialongContent>
    </Dialog.Portal>
  )
}
