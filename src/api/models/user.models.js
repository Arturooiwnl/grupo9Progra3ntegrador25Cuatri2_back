import connection from "../database/db.js";

const insertUser = (name, email, password) => {
    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    return connection.query(sql, [name, email, password]);
}

const getEmailUser = (email) => {
    const sql = "SELECT * FROM usuarios where email = ?";
    return connection.query(sql, [email]);
}


export default {
    insertUser,
    getEmailUser
}