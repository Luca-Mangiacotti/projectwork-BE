//connettiamo il database
const connection = require("../data/db");

//CREATE USER
const createUser = (req, res) => {
  const { id, surname, name, email, password, address, phone } = req.body;

  if (!id || !surname || !name || !email || !password || !address || !phone) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All fields are required",
    });
  }

  const sql = `
      INSERT INTO user (id, surname, name, email, password, address, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  connection.execute(
    sql,
    [id, surname, name, email, password, address, phone],
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
        message: "User created successfully",
      });
    }
  );
};

module.exports = { createUser };
