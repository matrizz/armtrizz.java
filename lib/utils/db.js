
const SimpleJsonDB = require("simple-json-db");
const db = new SimpleJsonDB("./db/database.json");

module.exports = {
    get(key) {
        return db.get(key)
    },

    set(key, value) {
        db.set(key, value)
        db.sync()
    },

    add(key, value) {
        const data = db.get(key) || 0  
        db.set(key, data + value)
        db.sync()
    },

    delete(key) {
        db.delete(key)
        db.sync()
    },

    all() {
        return db.JSON()
    }
}
