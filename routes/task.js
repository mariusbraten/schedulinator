const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.post('/new', function(req, res, next) {
    const data = {
        task: req.body.task,
        date: req.body.date,
    }

    const sql = "INSERT INTO todo (task, date) VALUES (?,?)";
    const params = [data.task, data.date];

    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});

router.delete('/delete', function(req, res, next) {
    const id = req.body.id;

    db.run("DELETE FROM todo WHERE rowid=?", id, function(err) {
        if (err) {
            throw err;
        }
        
        res.json({
            "message": "success",
            "id": id
        })
    });
});

router.patch('/patch', function(req, res, next) {
    const { id, task, date } = req.body.data;
    db.run("UPDATE todo SET task = ?, date = ? WHERE id = ?", [task, date, id], function(err) {
        if (err) {
            throw err;
        }
    });
    res.json({
        "message": "success",
        "data": { id, task, date }
    });
});

module.exports = router;
