const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cors = require("cors");
const db = require("./models");

//User Routes
const todoRoute = require("./routes/todo");
const userRoute = require("./routes/user");

// App Config...
const app = express();                  // instanciating express() in app variable
dotenv.config();                        // to use .env variables
const Port = process.env.Port || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.use("/todos",todoRoute);
app.use("/users", userRoute);

// DB Config
db.sequelize.sync({force: false});

//Default Route
app.get("/", (req, res) => {
    res.send("Hello From Server All Ok.........");
});


//Port for listening
app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})

