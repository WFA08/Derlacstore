// Importar dependencias
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

// Validación de la variable de entorno para la conexión con MongoDB
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI no está definida en el archivo .env");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
  .catch((error) => {
    console.error("Error de conexión a MongoDB:", error.message);
    process.exit(1);
  });

// Manejo de errores en la conexión
mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión con MongoDB:", err.message);
});

// Definir modelo basado en la colección "movies"
const Movie = mongoose.model("Movie", new mongoose.Schema({}, { collection: "movies" }));

// Endpoint para visualizar el contenido de la base de datos "sample_mflix"
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().limit(10); // Obtener hasta 10 películas
    res.json(movies);
  } catch (error) {
    console.error("Error al obtener películas:", error.message);
    res.status(500).json({ message: "Error al obtener los datos de la base de datos" });
  }
});

// Definir puerto y arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
