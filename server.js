const express = require('express');
const app = express();
const cors = require('cors');
const body = require('body-parser');
const { Image, Exhibit, User } = require('./models');
const PORT = process.env.PORT || 4567;
app.use(cors());

// https://github.com/expressjs/body-parser/issues/235
app.use(body.json({ limit: '1000000000000000mb' }));

//display all exhibits on MainComponent (executes on Exhibit Component)
app.get('/', async (req, res) => {
  const exhibit = await Exhibit.findAll({ include: [Image] });
  res.json(exhibit);
});

//added user,img, name, description to save it to db (executes on CreateExhibit Component )
app.post('/exhibitions', async (req, res) => {
  try {
    const { artist, images, name, description, user } = req.body;
    // findOrcreate return array.
    const userInstances = await User.findOrCreate({
      where: { google_id: user.uniqueId, google_name: user.name }
    });
    // collect images to the Exhibit and Create new Exhibit
    let exhibit = await Exhibit.create({ artist, name, description });
    let exhibitImages = await Image.bulkCreate(images, { returning: true });
    await exhibit.setImages(exhibitImages);
    // Add just created exhibit to the user if we have one
    if (userInstances[0]) {
      await userInstances[0].addExhibit(exhibit);
    }
    res.send({
      message: 'Data Uploaded'
    });
  } catch (err) {
    console.error('Server error: ', err);
  }
});

// Delete button (on Exhibit Component when user LoggedIn)
app.delete('/exhibitions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Exhibit.destroy({
      where: {
        id: id
      }
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

// when logged In shows user his/her exhibits (on UserPage Component)
app.get('/exhibitions/:id', async (req, res) => {
  const id = Number(req.params.id);
  const exhibit = await Exhibit.findByPk(id, { include: [Image, User] });
  res.json(exhibit);
});

//update (on Edit Component)
app.put('/exhibitions/:id', async (req, res) => {
  try {
    const exhibitData = req.body;
    const id = req.params.id;
    const updateExhibit = await Exhibit.findByPk(id);
    updateExhibit.update(exhibitData);
    console.log(updateExhibit);
    res.json(updateExhibit);
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

// Get user by name and display the cover image of the Exhibit (on UserPage Component )
app.get('/users/by-name/:userName', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        google_name: req.params.userName.replace('-', ' ')
      },
      include: [
        {
          model: Exhibit,
          include: [
            {
              model: Image,
              limit: 1
            }
          ]
        }
      ]
    });
    res.json(user);
  } catch (err) {
    console.error('Error while getting user', err);
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
