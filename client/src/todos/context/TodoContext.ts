import { createContext } from 'react'
import type { Todo } from '../interfaces'

interface TodoContextProps {
  todos: Todo[] | null
  selectedTodos: Set<number>
  hasSelectedTodos: boolean
  onLoadTodos: (todos: Todo[]) => void
  onAddTodo: (todo: Todo) => void
  onEditTodo: (todo: Todo) => void
  onToggleTodo: (idTodo: number) => void
  onDeleteTodos: (idTodos: number[]) => void
}

export const TodoContext = createContext<TodoContextProps>({} as any)
