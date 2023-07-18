import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface ITransaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface NewTransactionProps {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: NewTransactionProps) => void
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionStorageProps {
  children: ReactNode
}

export function TransactionsStorage({ children }: TransactionStorageProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      },
    })

    const { data } = response

    setTransactions(data)
  }

  async function createNewTransaction(data: NewTransactionProps) {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((prev) => [response.data, ...prev])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
