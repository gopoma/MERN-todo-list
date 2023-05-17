import { useContext } from 'react'
import { TodoContext } from '../context'
import { TodosService } from '../services'
import type { Todo, TodoStatus } from '../interfaces'
import { colors } from '../config'

const todosServ = new TodosService()

// eslint-disable-next-line
export const useTodos = () => {
  const {
    todos,
    selectedTodos,
    hasSelectedTodos,
    onLoadTodos,
    onAddTodo,
    onEditTodo,
    onToggleTodo,
    onDeleteTodos
  } = useContext(TodoContext)

  const startLoadingTodos = async (): Promise<void> => {
    try {
      const { data: { todos } } = await todosServ.getAll()
      onLoadTodos(todos)
    } catch (error) {
      console.log('[Error] Loading Todos')
      console.log(error)
    }
  }

  const startSavingTodo = async (todo: Partial<Todo>): Promise<void> => {
    try {
      const { data: { todo: newTodo } } = await todosServ.create(todo)
      onAddTodo(newTodo)
    } catch (error) {
      console.log('[Error] Saving Todo')
      console.log(error)
    }
  }

  const startRotatingTodoStatus = async (idTodo: number, status: TodoStatus): Promise<void> => {
    try {
      const currentStatusIndex = colors.findIndex((_status) => _status === status)
      const nextStatusIndex = (currentStatusIndex + 1) % colors.length
      const nextStatus = colors[nextStatusIndex]

      const { data: { todo } } = await todosServ.edit(idTodo, { status: nextStatus })
      onEditTodo(todo)
    } catch (error) {
      console.log('[Error] Rotating Todo Status')
      console.log(error)
    }
  }

  const startTogglingTodo = (idTodo: number): void => {
    onToggleTodo(idTodo)
  }

  const startDeletingSelectedTodos = async (): Promise<void> => {
    try {
      const promises = [...selectedTodos.values()].map(async (selectedTodoId) => {
        const { data: { todo } } = await todosServ.delete(selectedTodoId)
        onToggleTodo(selectedTodoId)
        return todo
      })

      const deletedTodosIds: number[] = []
      const results = await Promise.allSettled(promises)
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const deletedTodo = result.value
          deletedTodosIds.push(deletedTodo.id)
        } else {
          console.log('[Error]', result.reason)
        }
      })

      onDeleteTodos(deletedTodosIds)
    } catch (error) {
      console.log('[Error] Deleting Selected Todos')
      console.log(error)
    }
  }

  return {
    todos,
    selectedTodos,
    hasSelectedTodos,

    startLoadingTodos,
    startSavingTodo,
    startRotatingTodoStatus,
    startTogglingTodo,
    startDeletingSelectedTodos
  }
}
