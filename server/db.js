import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "Um@riy@18",
  port: 5432,
});

export default db;
