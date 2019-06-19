const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/jak_gallery_db', {
  database: 'jak_gallery_db',
  dialect: 'postgres'
});
//define Exhibit
const Exhibit = db.define('exhibit', {
  name: {
    type: Sequelize.STRING
  },
  artist: {
    type: Sequelize.STRING(64)
  },
  description: {
    type: Sequelize.TEXT
  },
  google_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

//define User
const User = db.define('user', {
  google_id: {
    type: Sequelize.STRING
  },
  google_name: {
    type: Sequelize.STRING
  }
});

//define Image
const Image = db.define('image', {
  name: {
    type: Sequelize.STRING
  },
  image_base64: {
    type: Sequelize.TEXT
  }
});

Exhibit.hasMany(Image, { onDelete: 'cascade' });
Image.belongsTo(Exhibit);

User.hasMany(Exhibit, { onDelete: 'cascade' });
Exhibit.belongsTo(User);

//Export Modules
module.exports = {
  db,
  Exhibit,
  Image,
  User
};
