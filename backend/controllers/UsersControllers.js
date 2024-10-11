const sqlite3 = require("sqlite3").verbose();

const db1 = new sqlite3.Database("./sqlite1.db");
const db = new sqlite3.Database("./2_lab_users.db");

module.exports.getUsers = async (req, res) => {
  const sql = "SELECT * FROM users";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

// POST a new user 111111111111111111
module.exports.saveUsers = async (req, res) => {
  const { phone, gender, FIO, date_birth, password, role } = req.body;

  if (!phone || !gender || !FIO || !date_birth || !password || !role) {
    return res
      .status(400)
      .json({
        error: "phone, gender, FIO, date_birth,password, role are required",
      });
  }

  const sql =
    "INSERT INTO users (phone, gender, FIO, date_birth, password, role) VALUES (?, ?, ?, ?, ?, ?)";

  db.run(sql, [phone, gender, FIO, date_birth, password, role], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id: this.lastID });
  });
};

module.exports.delUsers = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id_user = ?";

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
module.exports.updateUsers = async (req, res) => {
  const { id } = req.params;
  const { phone, gender, FIO, date_birth, password, role } = req.body;

  if (!phone && !gender && !FIO && !date_birth && !password && !role) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const updateFields = [];
  const updateValues = [];

  if (phone) {
    updateFields.push("phone = ?");
    updateValues.push(phone);
  }

  if (gender) {
    updateFields.push("gender = ?");
    updateValues.push(gender);
  }

  if (FIO) {
    updateFields.push("FIO = ?");
    updateValues.push(FIO);
  }

  if (date_birth) {
    updateFields.push("date_birth = ?");
    updateValues.push(date_birth);
  }

  if (password) {
    updateFields.push("password = ?");
    updateValues.push(password);
  }

  if (role) {
    updateFields.push("role = ?");
    updateValues.push(role);
  }

  updateValues.push(id);
  const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id_user = ?`;

  db.run(sql, updateValues, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "users not found" });
    }

    res.json({ success: true });
  });
};

module.exports.getUsers_role = async (req, res) => {
  //футболка кросовки

  const date_birth = req.body.date_birth;

  const sql = "SELECT * from users WHERE DATE(date_birth) < ?";

  db.all(sql, [date_birth], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};
