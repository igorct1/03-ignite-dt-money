import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://localhost:3000/posts')

      const json = await res.json()

      setTransactions(json)
    }
    getData()
  }, [])

  console.log(transactions)

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>12/04/2022</td>
            </tr>

            <tr>
              <td width="50%">Laptop</td>
              <td>
                <PriceHighlight variant="outcome">- R$ 2.000,00</PriceHighlight>
              </td>
              <td>Pessoal</td>
              <td>12/04/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
