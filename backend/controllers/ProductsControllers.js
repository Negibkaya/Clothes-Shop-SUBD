const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

module.exports.getProducts = async (req, res) => {
  const sql = "SELECT * FROM products";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

// POST a new user
module.exports.saveProducts = async (req, res) => {
  const { name, price, color, seasons_id, types_id } = req.body;

  if (!name || !price || !color || !seasons_id || !types_id) {
    return res.status(400).json({ error: "season, description are required" });
  }

  const sql =
    "INSERT INTO products (name, price,color,seasons_id,types_id) VALUES (?, ?, ?, ?, ?)";

  db.run(sql, [name, price, color, seasons_id, types_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id: this.lastID });
  });
};

module.exports.delProducts = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  });
};

// PUT update an existing user by ID
module.exports.updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, price, color, seasons_id, types_id } = req.body;

  if (!name && !price && !color && !seasons_id && !types_id) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const updateFields = [];
  const updateValues = [];

  if (name) {
    updateFields.push("name = ?");
    updateValues.push(name);
  }

  if (price) {
    updateFields.push("price = ?");
    updateValues.push(price);
  }

  if (color) {
    updateFields.push("color = ?");
    updateValues.push(color);
  }

  if (seasons_id) {
    updateFields.push("seasons_id = ?");
    updateValues.push(seasons_id);
  }

  if (types_id) {
    updateFields.push("types_id = ?");
    updateValues.push(types_id);
  }

  updateValues.push(id);
  const sql = `UPDATE products SET ${updateFields.join(", ")} WHERE id = ?`;

  db.run(sql, updateValues, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "products not found" });
    }

    res.json({ success: true });
  });
};

module.exports.getProducts_price = async (req, res) => {
  const price = req.body.price;

  const sql = "SELECT * FROM products WHERE price <= ?";

  db.all(sql, [price], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

module.exports.getProducts_type = async (req, res) => {
  //футболка кросовки

  const types = req.body.type;

  const sql =
    "SELECT products.name , products.price FROM products INNER JOIN types on types.id = products.types_id WHERE types.type == ?";

  db.all(sql, [types], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};
