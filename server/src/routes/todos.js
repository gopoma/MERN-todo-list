const { Router } = require("express");
const TodosService = require("../services/todos");

function todos(app) {
    const router = Router();
    app.use("/api/todos", router);

    const todosServ = new TodosService();


    router.get("/", async (req, res) => {
        const result = await todosServ.getAll();

        return res.status(result.success ? 200 : 500).json(result);
    });

    router.get("/:id", async (req, res) => {
        const result = await todosServ.get(req.params.id);

        return res.status(result.success ? 200 : 404).json(result);
    })

    router.post("/", async (req, res) => {
        const result = await todosServ.create(req.body);

        return res.status(result.success ? 201 : 400).json(result);
    });

    router.put("/:id", async (req, res) => {
        const result = await todosServ.update(req.params.id, req.body);

        return res.status(result.success ? 202 : 400).json(result);
    });

    router.delete("/:id", async (req, res) => {
        const result = await todosServ.delete(req.params.id);

        return res.status(result.success ? 202 : 400).json(result);
    });
}

module.exports = todos;
