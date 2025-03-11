const express = require("express");
const cors = require("cors");

//Errors Handlers
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();
const { PORT, FE_URL } = process.env;

//MIDDLEWARES
//middleware per i file statici
app.use(express.static("public"));
//middleware per il parsing del req.body
app.use(express.json());
//middleware CORS (che permette la comunicazione con il FE)
app.use(
  cors({
    origin: FE_URL,
  })
);

//Routes
app.use();

//gestione degli errori
app.use(notFound);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
