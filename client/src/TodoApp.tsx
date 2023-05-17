import { Layout } from './layouts'
import { TodoProvider } from './todos/context/TodoProvider'
import { TodoPage } from './todos/pages'

function App (): JSX.Element {
  return (
    <TodoProvider>
      <Layout>
        <TodoPage />
      </Layout>
    </TodoProvider>
  )
}

export default App
