const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

module.exports.getBrands = async (req, res) => {
  const sql = "SELECT * FROM brands";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

// POST a new user
module.exports.saveBrands = async (req, res) => {
  const { name, license_price } = req.body;

  if (!name || !license_price) {
    return res.status(400).json({ error: "Name, license_price are required" });
  }

  const sql = "INSERT INTO brands (name, license_price) VALUES (?, ?)";

  db.run(sql, [name, license_price], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id: this.lastID });
  });
};

module.exports.delBrands = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM brands WHERE id = ?";

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
module.exports.updateBrands = async (req, res) => {
  const { id } = req.params;
  const { name, license_price } = req.body;

  if (!name && !license_price) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const updateFields = [];
  const updateValues = [];

  if (name) {
    updateFields.push("name = ?");
    updateValues.push(name);
  }

  if (license_price) {
    updateFields.push("license_price = ?");
    updateValues.push(license_price);
  }

  updateValues.push(id);
  const sql = `UPDATE brands SET ${updateFields.join(", ")} WHERE id = ?`;

  db.run(sql, updateValues, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  });
};
