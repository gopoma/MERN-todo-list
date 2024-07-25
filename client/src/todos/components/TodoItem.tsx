import { type FC, type KeyboardEvent, useState, useEffect } from 'react'
import type { Todo } from '../interfaces'
import { colorMap } from '../config'
import { useTodos } from '../hooks'
import { useForm } from '../../hooks'

interface Props {
  todo: Todo
}

interface EditFormState {
  titleReplacer: string
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    selectedTodos,
    startRotatingTodoStatus,
    startTogglingTodo,
    startEditingTodo
  } = useTodos()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  // eslint-disable-next-line
  const [currentTodo, setCurrentTodo] = useState<Todo>(todo)
  const { titleReplacer, onInputChange, onResetForm } = useForm<EditFormState>({
    titleReplacer: currentTodo.title
  })

  useEffect(() => {
    onInputChange({ target: { name: 'titleReplacer', value: todo.title } } as any)
  }, [todo])

  const onRotateStatus = (): void => {
    // eslint-disable-next-line
    startRotatingTodoStatus(todo.id, todo.status)
  }

  const onToggle = (): void => {
    startTogglingTodo(todo.id)
  }

  const onStartEditing = (): void => {
    setIsEditing(true)
  }

  const onEdit = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Enter') {
      setIsEditing(false)
      onResetForm()

      // eslint-disable-next-line
      startEditingTodo(todo.id, { title: titleReplacer })
    }
  }

  return (
    <article className='flex gap-4 justify-between items-center bg-yellow-200 transition-colors p-4 rounded'>
      {
        (isEditing)
          ? (<input
              type='text'
              name='titleReplacer'
              value={ titleReplacer }
              onChange={ onInputChange }
              onKeyDown={ onEdit }
              className='w-full px-3 py-2 text-xl rounded'
            />)
          : (<h2
              onDoubleClick={ onStartEditing }
              className='font-bold text-2xl w-full cursor-pointer'
            >
              { todo.title }
            </h2>)
      }
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
