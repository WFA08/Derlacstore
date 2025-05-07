// Importar dependencias  
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
.catch((error) => console.error('❌ Error de conexión a MongoDB:', error));

// Esquema de datos
const proyectSchema = new mongoose.Schema({
  name: { type: String, index: true },
  description: { type: String, index: true },
  image: String,
});

// Crear índice de texto para búsquedas avanzadas (antes de definir el modelo)
proyectSchema.index({ name: "text", description: "text" });

const Proyecto = mongoose.model('Proyecto', proyectSchema);

// Endpoint para obtener todos los proyectos con filtro de búsqueda
app.get('/buscar', async (req, res) => {
  const { q } = req.query; // Obtiene el parámetro 'q' de la URL
  try {
    const filter = q ? { $text: { $search: q } } : {}; // Aplica filtro si hay consulta
    const proyectos = await Proyecto.find(filter, { score: { $meta: "textScore" } }) // Incluye puntaje de relevancia
      .sort({ score: { $meta: "textScore" } }); // Ordena por relevancia
    res.json(proyectos);
  } catch (error) {
    console.error('Error al buscar proyectos:', error.message);
    res.status(500).json({ message: 'Error al obtener los proyectos' });
  }
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
