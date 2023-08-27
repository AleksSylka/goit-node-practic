const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://DB-user:oWvXBVogNTOAhdUz@cluster0.vokv7yv.mongodb.net/contacts-base?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
    .then(() => console.log("Database connect success"))
    .catch(error => console.log(error.message))

const contactsRouter = require("./routes/api/contacts")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
    res.status(404).json({
        message: "Not found"
    });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error"} = err;
    res.status(status).json({ message })
});

app.listen(3000, () => console.log("Server running")); // on server