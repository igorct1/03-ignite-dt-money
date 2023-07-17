import { createContext, ReactNode, useEffect, useState } from 'react'

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
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionStorageProps {
  children: ReactNode
}

export function TransactionsStorage({ children }: TransactionStorageProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function getTransactions() {
    const res = await fetch('http://localhost:3000/posts')

    const json = await res.json()

    setTransactions(json)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
