import AlbumModel from '../models/album.mjs';
import PhotoModel from '../models/photo.mjs';

const Albums = class Albums {
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.run();
  }

  getAll() {
    this.app.get('/albums', async (req, res) => {
      try {
        const albums = await this.AlbumModel.find();
        res.status(200).json(albums);
      } catch (err) {
        console.error(`[ERROR] albums/getAll -> ${err}`);
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      }
    });
  }

  getById() {
    this.app.get('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.id);
        if (!album) {
          return res.status(404).json({ code: 404, message: 'Album not found' });
        }
        return res.status(200).json(album);
      } catch (err) {
        console.error(`[ERROR] albums/getById -> ${err}`);
        return res.status(500).json({ code: 500, message: 'Internal Server error' });
      }
    });
  }

  create() {
    this.app.post('/albums', async (req, res) => {
      try {
        const album = new this.AlbumModel(req.body);
        const savedAlbum = await album.save();
        return res.status(201).json(savedAlbum);
      } catch (err) {
        console.error(`[ERROR] albums/create -> ${err}`);
        return res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  update() {
    this.app.put('/albums/:id', async (req, res) => {
      try {
        const updatedAlbum = await this.AlbumModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedAlbum) {
          return res.status(404).json({ code: 404, message: 'Album not found' });
        }
        return res.status(200).json(updatedAlbum);
      } catch (err) {
        console.error(`[ERROR] albums/update -> ${err}`);
        return res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  deleteById() {
    this.app.delete('/albums/:id', async (req, res) => {
      try {
        const deletedAlbum = await this.AlbumModel.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) {
          return res.status(404).json({ code: 404, message: 'Album not found' });
        }
        return res.status(204).send();
      } catch (err) {
        console.error(`[ERROR] albums/delete -> ${err}`);
        return res.status(500).json({ code: 500, message: 'Internal Server error' });
      }
    });
  }

  run() {
    this.getAll();
    this.getById();
    this.create();
    this.update();
    this.deleteById();
  }
};

export default Albums;
