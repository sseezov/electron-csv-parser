import sqlite3 from 'sqlite3';

let sqlite = sqlite3.verbose()
const db = new sqlite.Database('./db.sqlite3');

db.serialize(() => {
    db.run("CREATE TABLE sdfsdf (info TEXT)");

    const stmt = db.prepare("INSERT INTO sdfsdf VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    //     console.log(row.id + ": " + row.info);
    // });
});

db.close();

export default db;