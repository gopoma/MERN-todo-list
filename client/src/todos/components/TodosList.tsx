import { type FC } from 'react'
import { useTodos } from '../hooks'
import { TodoItem } from './'

export const TodosList: FC = () => {
  const { todos } = useTodos()

  return (
    <section className='flex flex-col gap-4'>
      {
        todos?.map((todo) => (
          <TodoItem
            key={ todo.id }
            todo={ todo }
          />
        ))
      }
    </section>
  )
}
