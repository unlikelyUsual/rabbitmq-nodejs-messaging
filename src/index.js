const express = require("express");
const PORT = process.env.PORT || 5999;
const app = express();
const messageRoute = require("./routes/message");

app.use("/", messageRoute);

app.listen(PORT, () => console.log(`Process started on port : ${PORT}`));
