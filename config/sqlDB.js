import mysql from "mysql";

const connectToSql = async () => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345",
        database:"sample"

    });

    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
            } else {
                console.log("SQL connected");
                resolve(connection);
              // connection.query("CREATE DATABASE sample")
            }
        });
    });
};

export default connectToSql;
