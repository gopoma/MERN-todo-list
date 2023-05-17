import { todosApi } from '../../api'
import type { Todo } from '../interfaces'

export class TodosService {
  async getAll (): Promise<any> {
    return await todosApi.get('/todos/')
  }

  async create (todo: Partial<Todo>): Promise<any> {
    return await todosApi.post('/todos/', todo)
  }

  async edit (id: number, todo: Partial<Todo>): Promise<any> {
    return await todosApi.put(`/todos/${id}`, todo)
  }

  async delete (id: number): Promise<any> {
    return await todosApi.delete(`/todos/${id}`)
  }
}
