import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += item.price
        acc.total += acc.income
      } else {
        acc.outcome += item.price
        acc.total -= acc.outcome
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return { summary }
}
