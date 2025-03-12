//connettiamo il database
const connection = require("../data/db");

//INDEX
const index = (req, res) => {
  const sql = "SELECT * FROM products";

  //mandiamo la query
  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    const products = results.map((product) => {
      product.image = `${process.env.BE_URL}/images/${product.image}`;
      return product;
    });

    res.json(results);
  });
};

//SHOW
const show = ({ params }, res) => {
  //recuperiamo l'id
  const { id } = params;

  const productSql = `
      SELECT * 
      FROM products
      WHERE id = ?`;

  //mandiamo la query che comprende il parametro [id] per il contenuto richiesto
  connection.execute(productSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${productSql}`,
      });
    }

    //salviamo in una variabile il contenuto richiesto
    const product = results[0];

    if (!product) {
      return res.status(404).json({
        error: "Not found",
        message: "product not found",
      });
    }

    //aggiungiamo il percorso dell'immagine
    product.image = `${process.env.BE_URL}/images/${product.image}.jpg`;
    res.json(product);
  });
};

module.exports = { index, show };
