import Song from "../models/song.model.js"

export const getSongs = async (req, res) => {
  const songs = await Song.find()
  res.json(songs);
};

export const getSong = async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });

  res.json(song);
}

export const updateSong = async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!song) return res.status(404).json({ message: 'Song not found' });

  res.json(song);
}

export const createSong = async (req, res) => {
  const { name, lyric } = req.body;

  try {
    // Validar si la canción ya existe
    const songFounded = await Song.findOne({ name });
    if (songFounded) {
      return res.status(400).json({ error: 'La canción ya existe' });
    }

    // Crear la nueva canción
    const newSong = new Song({
      name,
      lyric,
      user: req.user.id // Asegúrate de validar y autenticar correctamente el usuario
    });

    // Guardar la canción en la base de datos
    const songSaved = await newSong.save();

    res.json(songSaved);
  } catch (error) {
    // Manejar los errores de manera adecuada
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const deleteSong = async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  if (!song) return res.status(404).json(['Song not found']);

  return res.sendStatus(204);
}

