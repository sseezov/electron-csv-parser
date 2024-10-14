import sqlite3 from 'sqlite3';

let sqlite = sqlite3.verbose()
const db = new sqlite.Database('./db.sqlite3');

db.serialize(() => {
    db.run("CREATE TABLE testdb (info TEXT, name TEXT)", [], (err) => {
        console.log(err);
    });

    db.run("INSERT INTO testdb VALUES (?, ?)", ['text', 'name1'], (e)=>console.log(e));
});

db.close();

export default db;