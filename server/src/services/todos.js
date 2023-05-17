const TodosModel = require("../models/todos");

class TodosService {
    async getAll() {
        try {
            const todos = await TodosModel.getAll();

            return {
                success: true,
                todos
            };
        } catch(error) {
            console.log(error);
            return {
                success: false,
                msg: "Un error salvaje ha aparecido"
            };
        }
    }

    async get(id) {
        try {
            const todo = await TodosModel.getById(id);
            
            if(!todo) {
                return {
                    success: false,
                    msg: "Todo no encontrado"
                };
            }
            
            return {
                success: true,
                todo
            };
        } catch(error) {
            console.log(error);
            return {
                success: false,
                msg: "Un error salvaje ha aparecido"
            };
        }
    }

    async create(newTodo) {
        try {
            const todo = await TodosModel.create(newTodo);

            return {
                success: true,
                todo
            };
        } catch(error) {
            console.log(error);
            return {
                success: false,
                msg: "Un error salvaje ha aparecido"
            };
        }
    }

    async update(id, replacer) {
        try {
            const { success:wasFound } = await this.get(id);

            if(!wasFound) {
                return {
                    success: false,
                    msg: "Todo no encontrado"
                };
            }
            
            const todo = await TodosModel.edit(id, replacer);

            return {
                success: true,
                todo
            };
        } catch(error) {
            console.log(error);
            return {
                success: false,
                msg: "Un error salvaje ha aparecido"
            };
        }
    }

    async delete(id) {
        try {
            const { success:wasFound } = await this.get(id);

            if(!wasFound) {
                return {
                    success: false,
                    msg: "Todo no encontrado"
                };
            }

            const deletedTodo = await TodosModel.delete(id);
            return {
                success: true,
                todo: deletedTodo
            };
        } catch(error) {
            console.log(error);
            return {
                success: false,
                msg: "Un error salvaje ha aparecido"
            };
        }
    }
}

module.exports = TodosService;
