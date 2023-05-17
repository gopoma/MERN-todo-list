import { type FC, useEffect } from 'react'
import { useTodos } from '../hooks'
import { DeleteTodosButton, TodoForm, TodosList } from '../components'

export const TodoPage: FC = () => {
  const { hasSelectedTodos, startLoadingTodos } = useTodos()

  useEffect(() => {
    // eslint-disable-next-line
    startLoadingTodos()
  }, [])

  return <>
    <h1 className='text-4xl font-bold text-center'>
      TodoApp
    </h1>

    <TodoForm />

    <TodosList />

    {
      hasSelectedTodos
        ? <DeleteTodosButton />
        : <></>
    }
  </>
}
