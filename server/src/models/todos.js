const { query } = require("../libs/database");

class TodosModel {
    static tableName = "todos";

    static async getAll() {
        return await query(`
            SELECT id, title, description, status
            FROM ${TodosModel.tableName}
            ORDER BY id DESC
        `);
    }

    static async getById(id) {
        const [todo] = await query(`
            SELECT id, title, description, status 
            FROM ${TodosModel.tableName} 
            WHERE id=?
        `, [id]);

        return todo;
    }

    static async create(todo) {
        const { insertId } = await query(
            `INSERT INTO ${TodosModel.tableName} (??) VALUES (?)`,
            [Object.keys(todo), Object.values(todo)]
        );

        return await TodosModel.getById(insertId);
    }

    static async edit(id, todo) {
        const assignationsWithTrailingComma = Object.keys(todo).reduce((result, key) => {
            return `${result}${key}=?, `
        }, "");
        const assignations = assignationsWithTrailingComma.trim().replace(/,$/, "");

        await query(`
            UPDATE ${TodosModel.tableName}
            SET ${assignations}
            WHERE id=?
        `, [...Object.values(todo), id]);

        return await TodosModel.getById(id);
    }

    static async delete(id) {
        const todo = await TodosModel.getById(id);

        await query(`DELETE FROM ${TodosModel.tableName} WHERE id=?`, [id]);

        return todo;
    }
}

module.exports = TodosModel;
