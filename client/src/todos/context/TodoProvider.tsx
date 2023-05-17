import { type FC, useState, useEffect, useMemo } from 'react'
import { TodoContext } from './'
import type { Todo } from '../interfaces'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const storedSelectedTodos = (() => {
  const storedSelectedTodosArray = JSON.parse(localStorage.getItem('selectedTodos') as string) ?? []
  const storedSelectedTodos = new Set<number>()

  storedSelectedTodosArray.forEach((selectedTodo: number) => {
    storedSelectedTodos.add(selectedTodo)
  })

  return storedSelectedTodos
})()

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(storedSelectedTodos)

  const hasSelectedTodos = useMemo(() => selectedTodos.size > 0, [selectedTodos.size])

  useEffect(() => {
    localStorage.setItem('selectedTodos', JSON.stringify([...selectedTodos.values()]))
  }, [selectedTodos])

  const onLoadTodos = (todos: Todo[]): void => {
    setTodos(todos)
  }

  const onAddTodo = (todo: Todo): void => {
    setTodos([todo, ...todos as Todo[]])
  }

  const onEditTodo = (todo: Todo): void => {
    const todosWithEditedOne = (todos as Todo[]).map((currentTodo) => {
      if (currentTodo.id === todo.id) {
        return {
          ...currentTodo,
          ...todo
        }
      }

      return { ...currentTodo }
    })

    setTodos(todosWithEditedOne)
  }

  const onToggleTodo = (idTodo: number): void => {
    setSelectedTodos((prevSelectedTodos) => {
      const newSelectedTodos = new Set(prevSelectedTodos)

      if (prevSelectedTodos.has(idTodo)) {
        newSelectedTodos.delete(idTodo)
      } else {
        newSelectedTodos.add(idTodo)
      }

      return newSelectedTodos
    })
  }

  const onDeleteTodos = (idTodos: number[]): void => {
    const newTodos = (todos as Todo[]).filter((todo) => !idTodos.some((idTodo) => idTodo === todo.id))
    setTodos(newTodos)
  }

  return <TodoContext.Provider
    value={{
      todos,
      selectedTodos,
      hasSelectedTodos,

      onLoadTodos,
      onAddTodo,
      onEditTodo,
      onToggleTodo,
      onDeleteTodos
    }}
  >
    { children }
  </TodoContext.Provider>
}
