import * as Dialog from '@radix-ui/react-dialog'
import { DialogCloseButton, DialogOverlay, DialongContent } from './styles'
import { X } from 'phosphor-react'

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

          <button type="submit">Cadastrar</button>
        </form>
      </DialongContent>
    </Dialog.Portal>
  )
}
