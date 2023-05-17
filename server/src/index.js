const express = require("express");
const { appName, port } = require("./config");
const todos = require("./routes/todos");
const morgan = require("morgan");
const cors = require("cors")

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

todos(app);

app.get("/", (request, response) => {
    return response.json({
        name: appName,
        version: "1.0.0"
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);    
});
