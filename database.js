const sqlite3 = require('sqlite3').verbose()

const dbsource = "schedule.db";

const db = new sqlite3.Database(dbsource, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message)
        throw err;
        //res.sendStatus(500);
    }
    console.log("Connected to database.");
});

module.exports = db