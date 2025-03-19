//connettiamo il database
const connection = require("../data/db");

/* const discounted = (req, res) => {
  const sql = "SELECT id, discount FROM products";

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
 */
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
  //recuperiamo il titolo
  const { title } = params;
  const productSql = `
      SELECT * 
      FROM products
      WHERE title LIKE ?`;

  //mandiamo la query che comprende il parametro [title] per il contenuto richiesto
  connection.execute(productSql, [title], (err, results) => {
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
    product.image = `${process.env.BE_URL}/images/${product.image}`;
    res.json(product);
  });
};

//SHOW BY TAG
const showByTag = ({ params }, res) => {
  //recuperiamo l'id
  const { tag_name } = params; // ----------------------------------------------------------------< quando pronto al FE

  const tagSql = `
      SELECT tag_name, products.*
      FROM product_tag
      JOIN products ON products.id = product_id
      JOIN tag ON tag_id = tag.id
      WHERE tag_name = ?`;

  //mandiamo la query che comprende il parametro [id] per il contenuto richiesto
  connection.execute(tagSql, [tag_name], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${tagSql}`,
      });
    }

    //salviamo in una variabile il contenuto richiesto
    const brand = results;

    if (!brand) {
      return res.status(404).json({
        error: "Not found",
        message: "brand not found",
      });
    }

    const products = results.map((product) => {
      product.image = `${process.env.BE_URL}/images/${product.image}`;
      return product;
    });

    res.json(brand);
  });
};

// SHOW BY CORRELATED
const showByCorrelated = (req, res) => {
  //recuperiamo l'id
  const { ram, cpu, gpu } = req.query; // ----------------------------------------------------------------< quando pronto al FE

  const parametri = [];
  let correlatedSql = `
      SELECT *
      FROM products
      WHERE 1 = 1`;
  if (ram) {
    correlatedSql += " AND ram LIKE ?";
    parametri.push(`%${req.query.ram}%`);
  }
  if (gpu) {
    correlatedSql += " AND gpu LIKE ?";
    parametri.push(`%${req.query.gpu}%`);
  }
  if (cpu) {
    correlatedSql += " AND cpu LIKE ?";
    parametri.push(`%${req.query.cpu}%`);
  }

  //mandiamo la query che comprende il parametro [] per il contenuto richiesto
  connection.execute(correlatedSql, parametri, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${correlatedSql}`,
      });
    }

    //salviamo in una variabile il contenuto richiesto
    const correlatedList = results;

    if (!correlatedList) {
      return res.status(404).json({
        error: "Not found",
        message: "Correlated list not found",
      });
    }

    const products = results.map((product) => {
      product.image = `${process.env.BE_URL}/images/${product.image}`;
      return product;
    });

    res.json(correlatedList);
  });
};

//SEARCH BY TITLE
const searchByTitle = (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Title parameter is required",
    });
  }

  const searchSql = `
    SELECT *
    FROM products 
    WHERE title LIKE ?
  `;

  connection.execute(searchSql, [`%${title}%`], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${searchSql}`,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "No products found with this title",
      });
    }

    const products = results.map((product) => {
      product.image = `${process.env.BE_URL}/images/${product.image}`;
      return product;
    });

    res.json(products);
  });
};

//UPDATE QUANTITY
const updateQuantity = (req, res) => {
  const { title } = req.body;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Quantity is required",
    });
  }

  const sql = `
    UPDATE products 
    SET quantity = quantity - ?
    WHERE title = ?
  `;

  connection.execute(sql, [quantity, title], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: err.message || "Unknown database error",
        code: err.code,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Product not found",
      });
    }

    res.json({
      message: "Quantity updated successfully",
    });
  });
};

module.exports = {
  index,
  show,
  showByTag,
  showByCorrelated,
  searchByTitle,
  updateQuantity,
};
