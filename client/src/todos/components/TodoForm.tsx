import { type FormEvent, type FC } from 'react'
import { useForm } from '../../hooks'
import { useTodos } from '../hooks'

interface TodoFormState {
  title: string
  description: string
}

const initialTodoFormState: TodoFormState = {
  title: '',
  description: ''
}

export const TodoForm: FC = () => {
  const {
    title,
    formState,
    onInputChange,
    onResetForm
  } = useForm<TodoFormState>(initialTodoFormState)
  const { startSavingTodo } = useTodos()

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (title.trim() === '') return

    onResetForm()

    // eslint-disable-next-line
    startSavingTodo(formState)
  }

  return (
    <form
      onSubmit={ onSubmit }
      className='w-[80%] m-auto flex flex-col gap-4 bg-slate-200 p-4 rounded'
    >
      <div className='flex gap-4 items-center'>
        <label className='min-w-[18%] text-xl font-bold'>title:</label>
        <input
          name='title'
          value={ title }
          placeholder='Enter a title...'
          onChange={ onInputChange }
          className='w-full px-3 py-2 text-xl rounded'
        />
      </div>

      <button
        className='px-3 py-2 rounded text-xl text-white font-bold bg-blue-600 hover:bg-blue-800 transition-colors'
      >
        CREATE
      </button>
    </form>
  )
}
