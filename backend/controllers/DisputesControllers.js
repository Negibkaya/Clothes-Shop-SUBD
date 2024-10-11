const sqlite3 = require("sqlite3").verbose();

const db1 = new sqlite3.Database("./sqlite1.db");
const db = new sqlite3.Database("./2_lab_users.db");

module.exports.getDisputes = async (req, res) => {
  const sql = "SELECT * FROM disputes";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

// POST a new user 111111111111111111
module.exports.saveDisputes = async (req, res) => {
  const { date_time, message, id_good, id_user, id_cause_dispute } = req.body;

  if (!date_time || !message || !id_good || !id_user || !id_cause_dispute) {
    return res
      .status(400)
      .json({
        error:
          "date_time, message, id_good, id_user, id_cause_dispute  are required",
      });
  }

  const sql =
    "INSERT INTO disputes (date_time, message, id_good, id_user, id_cause_dispute) VALUES (?, ?, ?, ?, ?)";

  db.run(
    sql,
    [date_time, message, id_good, id_user, id_cause_dispute],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ id: this.lastID });
    }
  );
};

module.exports.delDisputes = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM disputes WHERE id_dispute = ?";

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
module.exports.updateDisputes = async (req, res) => {
  const { id } = req.params;
  const { date_time, message, id_good, id_user, id_cause_dispute } = req.body;

  if (!date_time && !message && !id_good && !id_user && !id_cause_dispute) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const updateFields = [];
  const updateValues = [];

  if (date_time) {
    updateFields.push("date_time = ?");
    updateValues.push(date_time);
  }

  if (message) {
    updateFields.push("message = ?");
    updateValues.push(message);
  }

  if (id_good) {
    updateFields.push("id_good = ?");
    updateValues.push(id_good);
  }

  if (id_user) {
    updateFields.push("id_user = ?");
    updateValues.push(id_user);
  }

  if (id_cause_dispute) {
    updateFields.push("id_cause_dispute = ?");
    updateValues.push(id_cause_dispute);
  }

  updateValues.push(id);
  const sql = `UPDATE disputes SET ${updateFields.join(
    ", "
  )} WHERE id_dispute = ?`;

  db.run(sql, updateValues, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "disputes not found" });
    }

    res.json({ success: true });
  });
};

//аналитич

module.exports.getDispuse_date = async (req, res) => {
  //футболка кросовки

  const date_time = req.body.date_time;

  const sql = "SELECT * FROM disputes WHERE DATE(date_time) > ?";

  db.all(sql, [date_time], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
}; // все отзывы от определенной даты
