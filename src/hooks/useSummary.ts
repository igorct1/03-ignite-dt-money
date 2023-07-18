import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
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
