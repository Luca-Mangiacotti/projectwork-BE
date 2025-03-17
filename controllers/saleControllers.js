//connettiamo il database
const connection = require("../data/db");

//CREATE SALE
const createRecept = (req, res) => {
  const { user_id, user_email, user_address, data, state, discounted, total } =
    req.body;
  console.log(req.body);
  if (
    !user_id ||
    !user_email ||
    !user_address ||
    !data ||
    !state ||
    !discounted ||
    !total
  ) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Missing data",
    });
  }

  const sql = `
      INSERT INTO sales (user_id, user_email, user_address, data, state, discounted, total)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  connection.execute(
    sql,
    [user_id, user_email, user_address, data, state, discounted, total],
    (err, results) => {
      if (err) {
        console.error("Database Error:", err); // debug per l'eventuale errore
        return res.status(500).json({
          error: "Query Error",
          message: err.message || "Unknown database error", // messaggio di errore
          code: err.code, // Include il codice di errore SQL
        });
      }

      res.status(201).json({
        message: "Recept created successfully",
      });
    }
  );
};

module.exports = { createRecept };
