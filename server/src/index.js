const express = require("express");
require("./db/index");

const AuthRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(AuthRouter);

app.listen(process.env.PORT || "1234", () => {
    console.log("Server started ! ");
});
