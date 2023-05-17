import { type FC } from 'react'
import type { Todo } from '../interfaces'
import { colorMap } from '../config'
import { useTodos } from '../hooks/useTodos'

interface Props {
  todo: Todo
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    selectedTodos,
    startRotatingTodoStatus,
    startTogglingTodo
  } = useTodos()

  const onRotateStatus = (): void => {
    // eslint-disable-next-line
    startRotatingTodoStatus(todo.id, todo.status)
  }

  const onToggle = (): void => {
    startTogglingTodo(todo.id)
  }

  return (
    <article className='flex justify-between items-center bg-yellow-200 transition-colors p-4 rounded'>
      <h2 className='font-bold text-2xl'>{ todo.title }</h2>
      <div className='flex gap-4 items-center'>
        <button
          onClick={ onRotateStatus }
          style={{ backgroundColor: colorMap[todo.status] }}
          className='min-w-[160px] p-2 text-xl font-bold text-white rounded'
        >
          { todo.status }
        </button>
        <input
          type='checkbox'
          checked={ selectedTodos.has(todo.id) }
          onChange={ onToggle }
          className='w-6 h-6'
        />
      </div>
    </article>
  )
}
