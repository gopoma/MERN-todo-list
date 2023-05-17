import { type FC } from 'react'
import { useTodos } from '../hooks'

export const DeleteTodosButton: FC = () => {
  const { startDeletingSelectedTodos } = useTodos()

  const onDeleteSelected = (): void => {
    // eslint-disable-next-line
    startDeletingSelectedTodos()
  }

  return (
    <button
      onClick={ onDeleteSelected }
      className='absolute bottom-4 right-4 bg-red-600 hover:bg-red-800 transition-colors text-xl text-white font-bold px-3 py-2 rounded'
    >
      DELETE SELECTED
    </button>
  )
}
