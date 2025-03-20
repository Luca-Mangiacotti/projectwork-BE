const express = require("express");
const cors = require("cors");

//Errors Handlers
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
const productRouters = require("./routers/productRouters");
const userRouters = require("./routers/userRouters");
const saleRouters = require("./routers/saleRouters");
const prod_sale_Routers = require("./routers/product_saleRouters");
const emailRouters = require("./routers/emailRouters");

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
app.use("/yuno", productRouters);
app.use("/user", userRouters);
app.use("/sale", saleRouters);
app.use("/prod_sale", prod_sale_Routers);
app.use("/email", emailRouters);

//gestione degli errori
app.use(notFound);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
