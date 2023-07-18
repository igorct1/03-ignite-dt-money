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

interface TransactionsContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
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

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
