const pool = require("../config/db");

const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query("SELECT * FROM categories");
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories");
    res.status(500).json({ error: "Failed to fetch categoroies" });
  }
};

module.exports = {
  getCategories,
};
