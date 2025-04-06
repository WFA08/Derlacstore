// Importar dependencias  
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Db-derlacstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch((error) => console.error('Error de conexión a MongoDB:', error));

// Esquema de datos
const proyectSchema = new mongoose.Schema({
  name: { type: String, index: true },
  description: { type: String, index: true },
  image: String,
});

const Proyecto = mongoose.model('Proyecto', proyectSchema);

// Crear índice de texto para búsquedas avanzadas
proyectSchema.index({ name: "text", description: "text" });

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
