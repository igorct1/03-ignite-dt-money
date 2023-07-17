import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Transactions } from './pages/Transactions'
import { TransactionsStorage } from './contexts/TransactionsContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsStorage>
        <Transactions />
        <GlobalStyle />
      </TransactionsStorage>
    </ThemeProvider>
  )
}
