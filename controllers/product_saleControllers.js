//connettiamo il database
const connection = require("../data/db");

//CREATE product_sale
const create_prod_sale = (req, res) => {
  const { sales_id, quantity, unitary_price, product_title, product_image } =
    req.body;
  console.log(req.body);
  if (
    !sales_id ||
    !quantity ||
    !unitary_price ||
    !product_title ||
    !product_image
  ) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Missing data",
    });
  }

  const sql = `
      INSERT INTO product_sales (sales_id, quantity, unitary_price, product_title, product_image)
      VALUES (?, ?, ?, ?, ?)
    `;

  connection.execute(
    sql,
    [sales_id, quantity, unitary_price, product_title, product_image],
    (err, result) => {
      // Changed 'res' to 'result' to avoid conflict with response object
      if (err) {
        console.error("Database Error:", err); // debug per l'eventuale errore
        return res.status(500).json({
          error: "Query Error",
          message: err.message || "Unknown database error", // messaggio di errore
          code: err.code, // Include il codice di errore SQL
        });
      }

      res.status(201).json({
        message: "product_sale created successfully",
      });
    }
  );
};

module.exports = { create_prod_sale };
