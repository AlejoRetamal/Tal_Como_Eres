import { MongoClient } from "mongodb";
const URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "tal_como_eres";
let db;
export async function connectDB() {
    const client = new MongoClient(URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Conectado a MongoDB");
    return db;
}
export function getDB() {
    if (!db)
        throw new Error("La base de datos no está conectada");
    return db;
}
//# sourceMappingURL=database.js.map