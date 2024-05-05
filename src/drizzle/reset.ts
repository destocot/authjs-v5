import Database from "better-sqlite3";

const reset = async () => {
  const sqlite = new Database(process.env.AUTH_DRIZZLE_URL);

  sqlite.exec("DROP TABLE if exists account");
  sqlite.exec("DROP TABLE if exists user");
  sqlite.exec("DROP TABLE if exists session");
  sqlite.exec("DROP TABLE if exists verificationToken");

  sqlite.exec("DROP TABLE if exists __drizzle_migrations");

  sqlite.close();
};

reset();
