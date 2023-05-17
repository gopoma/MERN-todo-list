export interface Todo {
  id: number
  title: string
  status: TodoStatus
  description: string
}

export type TodoStatus = 'PENDING' | 'DOING' | 'COMPLETED' | 'CANCELLED'
