import PhotoModel from '../models/photo.mjs';
import AlbumModel from '../models/album.mjs';

const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.AlbumModel = connect.model('Album', AlbumModel);
    this.run();
  }

  getAllPhotos() {
    this.app.get('/albums/:albumId/photos', async (req, res) => {
      const { albumId } = req.params;

      try {
        const photos = await this.PhotoModel.find({ album: albumId });
        return res.status(200).json(photos);
      } catch (err) {
        console.error(`[ERROR] photos/getAllPhotos -> ${err}`);
        return res.status(500).json({ code: 500, message: 'Internal Server error' });
      }
    });
  }

  getPhotoById() {
    this.app.get('/albums/:albumId/photos/:photoId', async (req, res) => {
      const { albumId, photoId } = req.params;

      try {
        const photo = await this.PhotoModel.findOne({ _id: photoId, album: albumId });

        if (!photo) {
          return res.status(404).json({ code: 404, message: 'Photo not found' });
        }

        return res.status(200).json(photo);
      } catch (err) {
        console.error(`[ERROR] photos/getPhotoById -> ${err}`);
        return res.status(500).json({ code: 500, message: 'Internal Server error' });
      }
    });
  }

  addPhoto() {
    this.app.post('/albums/:albumId/photos', async (req, res) => {
      const { albumId } = req.params;
      console.log('Album ID:', albumId);
      console.log('Request Body:', req.body); // Ajout de logs pour le diagnostic
      const photo = new this.PhotoModel({ ...req.body, album: albumId });
      try {
        const savedPhoto = await photo.save();
        await this.AlbumModel.findByIdAndUpdate(albumId, { $push: { photos: savedPhoto._id } });
        return res.status(201).json(savedPhoto);
      } catch (err) {
        console.error(`[ERROR] photos/addPhoto -> ${err}`); // Log de l'erreur
        return res.status(400).json({ code: 400, message: 'Bad request', error: err.message }); // Détails de l'erreur
      }
    });
  }

  updatePhoto() {
    this.app.put('/albums/:albumId/photos/:photoId', async (req, res) => {
      const { albumId, photoId } = req.params;

      try {
        const updatedPhoto = await this.PhotoModel.findOneAndUpdate(
          { _id: photoId, album: albumId },
          req.body,
          { new: true }
        );

        if (!updatedPhoto) {
          return res.status(404).json({ code: 404, message: 'Photo not found' });
        }

        return res.status(200).json(updatedPhoto);
      } catch (err) {
        console.error(`[ERROR] photos/updatePhoto -> ${err}`);
        return res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  deletePhoto() {
    this.app.delete('/albums/:albumId/photos/:photoId', async (req, res) => {
      const { albumId, photoId } = req.params;

      try {
        const deletedPhoto = await this.PhotoModel.findOneAndDelete({
          _id: photoId,
          album: albumId
        });

        if (!deletedPhoto) {
          return res.status(404).json({ code: 404, message: 'Photo not found' });
        }

        // Retirer la photo de l'album
        await AlbumModel.findByIdAndUpdate(albumId, { $pull: { photos: photoId } });

        return res.status(200).json(deletedPhoto);
      } catch (err) {
        console.error(`[ERROR] photos/deletePhoto -> ${err}`);
        return res.status(500).json({ code: 500, message: 'Internal Server error' });
      }
    });
  }

  run() {
    this.getAllPhotos();
    this.getPhotoById();
    this.addPhoto();
    this.updatePhoto();
    this.deletePhoto();
  }
};

export default Photos;
