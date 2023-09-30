const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get("/", (req, res) => {
  const sql = "SELECT * FROM todo";
  const params = [];

  db.all(sql, params, (err, rows) => {
      if (err) {
          res.status(400).json({ "error": err.message });
          return;
      }

      const result = rows;
      res.json(result);
  });
})

module.exports = router;
