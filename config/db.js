const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        pool: {
            max: 5, // Maximum number of connection in pool
            min: 0, // Minimum number of connection in pool
            acquire: 30000, // Maximum time (ms) to wait for connection
            idle: 10000, // Maximum time (ms) that a connection can be idle before being released
        },
        dialectOptions: {
            connectTimeout: 60000, // Increased connection timeout
        },
    }
);

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}

testConnection();

module.exports = sequelize;
