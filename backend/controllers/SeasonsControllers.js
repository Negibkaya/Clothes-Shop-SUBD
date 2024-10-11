const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

module.exports.getSeasons = async (req, res) => {
  const sql = "SELECT * FROM seasons";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

// POST a new user
module.exports.saveSeasons = async (req, res) => {
  const { season, description } = req.body;

  if (!season || !description) {
    return res.status(400).json({ error: "season, description are required" });
  }

  const sql = "INSERT INTO seasons (season, description) VALUES (?, ?)";

  db.run(sql, [season, description], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id: this.lastID });
  });
};

module.exports.delSeasons = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM seasons WHERE id = ?";

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
module.exports.updateSeasons = async (req, res) => {
  const { id } = req.params;
  const { season, description } = req.body;

  if (!season && !description) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const updateFields = [];
  const updateValues = [];

  if (season) {
    updateFields.push("season = ?");
    updateValues.push(season);
  }

  if (description) {
    updateFields.push("description = ?");
    updateValues.push(description);
  }

  updateValues.push(id);
  const sql = `UPDATE seasons SET ${updateFields.join(", ")} WHERE id = ?`;

  db.run(sql, updateValues, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "season not found" });
    }

    res.json({ success: true });
  });
};
