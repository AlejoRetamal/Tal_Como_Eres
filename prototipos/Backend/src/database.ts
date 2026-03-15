import { MongoClient, Db } from "mongodb";

const URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "tal_como_eres";

let db: Db;

export async function connectDB(): Promise<Db> {
  const client = new MongoClient(URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("Conectado a MongoDB");
  return db;
}

export function getDB(): Db {
  if (!db) throw new Error("La base de datos no está conectada");
  return db;
}