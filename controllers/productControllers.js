//connettiamo il database
const connection = require("../data/db");

//INDEX
const index = (req, res) => {
  const sql = "SELECT * FROM movies";

  //mandiamo la query
  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    const movies = results.map((movie) => {
      movie.image = `${process.env.BE_URL}/images/${movie.image}`;
      return movie;
    });

    res.json(results);
  });
};

//SHOW
const show = (req, res) => {
  //recuperiamo l'id
  const { id } = req.params;

  const movieSql = `
      SELECT * 
      FROM movies
      WHERE id = ?`;

  //mandiamo la query che comprende il parametro [id] per il contenuto richiesto
  connection.execute(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${movieSql}`,
      });
    }

    //salviamo in una variabile il contenuto richiesto
    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: "MOVIE not found",
      });
    }

    //aggiungiamo il percorso dell'immagine
    movie.image = `${process.env.BE_URL}/images/${movie.image}`;

    //query per recuperare le recensioni dell'elemento film
    const reviewsSql = `
    SELECT reviews.name, reviews.vote, reviews.text, reviews.updated_at 
    FROM reviews
    WHERE movie_id = ?`;

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Query Error",
          message: `Database query failed: ${reviewsSql}`,
        });
      }

      movie.reviews = results;
      res.json(movie);
    });
  });
};

module.exports = { index, show, storeReview };
