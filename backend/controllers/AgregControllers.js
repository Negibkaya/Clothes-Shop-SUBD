// Импортируем модели
const Review = require("../models/ThemeModel");
const User = require("../models/UserModel");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

// Контроллер для получения среднего рейтинга для каждого продукта
module.exports.getCountMessageEachMounth = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: {
            month: { $month: "$created_at" },
            year: { $year: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ];

    // Выполняем запрос
    const results = await Review.aggregate(pipeline);

    // Отправляем результат в ответе
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Контроллер для получения пользователей между заданными датами
module.exports.getUsersBetweenDates = async (req, res) => {
  try {
    const startDate = new Date(req.body.start_date);
    const endDate = new Date(req.body.end_date);

    const pipeline = [
      {
        $match: {
          date_birth: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $count: "total_users",
      },
    ];

    // Выполняем запрос
    const results = await User.aggregate(pipeline);

    // Отправляем результат в ответе
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
