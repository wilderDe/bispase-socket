const multer = require('multer');
const path = require('path');
const hash = require('../helpers/hash');

// config multer imgs
const storageImg = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads/multimedia/imagenes'));
  },
  filename: function(req, file, cb) {
    cb(null, hash.nombreArchivo(file.originalname) + path.extname(file.originalname));
  },
});

const subirImagenes = multer({ storage: storageImg, fileFilter: function(req, file, cb) {
 
  if (file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg") {    
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, true);
  } else {
    cb(null, false, new Error('Tipo de archivo inválido'));
  }
}}).array('imagen');

// config multer videos
const storageVideos = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads/multimedia/videos'));
  },
  filename: function(req, file, cb) {
    cb(null, hash.nombreArchivo(file.originalname) + path.extname(file.originalname));
  },
});

const subirVideos = multer({ 
  storage: storageVideos,
  fileFilter: function(req, file, cb) {
  if (file.mimetype === "video/mp4" ||
    file.mimetype === "video/avi" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/flv" ) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, true);
  } else {
    cb(null, false, new Error('Tipo de archivo inválido'));
  }
  },
}).array('video');


module.exports = { 
  subirImagenes,
  subirVideos,
};