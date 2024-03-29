import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// use multiple .env files
if (process.env.NODE_ENV === "local") {
  const result = dotenv.config({ path: ".env.local" });

  process.env = {
    ...process.env,
    ...result.parsed,
  };
} else if (process.env.NODE_ENV === "docker") {
  const result = dotenv.config({ path: ".env.docker" });

  process.env = {
    ...process.env,
    ...result.parsed,
  };
}
else if (process.env.NODE_ENV === "test") {
  const result = dotenv.config({ path: ".env.test" });

  process.env = {
    ...process.env,
    ...result.parsed,
  };
}

console.log(`INSIDE database.js ${process.env.NODE_ENV} ${process.env.DATABASE_NAME}`);

// Connection pools help reduce the time spent connecting to the MySQL server by reusing a previous connection, leaving them open instead of closing when you are done with them.
// This improves the latency of queries as you avoid all of the overhead that comes with establishing a new connection.
export const pool = mysql
  .createPool({
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || "3306",
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })
  .promise();