import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import { editorialRouter } from "./Editorial/Editorial.routes.js";
import { usuarioRouter } from "./Usuario/Usuario.routes.js";
import { autorRouter } from "./Autor/Autor.routes.js";
import { categoriaRouter } from "./Categoria/Categoria.routes.js";
import { libroRouter } from "./Libro/Libro.routes.js";
import { localidadRouter } from "./Localidad/Localidad.routes.js";
import { provinciaRouter } from "./Provincia/Provincia.routes.js";
import { formatoRouter } from "./formatoLibro/formatoLibro.routes.js";
import { reseniaRouter } from "./Resenia/Resenia.routes.js";
import { pedidoRouter } from "./Pedido/Pedido.routes.js";
const app = express();
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/libros", libroRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/editoriales", editorialRouter);
app.use("/api/autores", autorRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/localidades", localidadRouter);
app.use("/api/provincias", provinciaRouter);
app.use("/api/formatos", formatoRouter);
app.use("/api/resenias", reseniaRouter);
app.use("/api/pedidos", pedidoRouter);
app.use((_, res) => {
    return res.status(404).send({ message: "Resource not found" });
});
// Conectar a MongoDB y luego levantar el servidor
connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000/");
    });
}).catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
});
//# sourceMappingURL=app.js.map