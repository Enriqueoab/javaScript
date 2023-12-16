const express = require('express');

const router = express.Router();

const locationStorage = {
  locations: []
};

router.post('/add-location', (req, res, next) => {
  locationStorage.locations.push({
    id: Math.random(),
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng }
  });
  res.json({message: 'Stored location!'}); //Response to send back to the client. same as res.send({JSON object})
});

router.get('/location', (req, res, next) => {});

module.exports = router; // In order to make it available to import in other files (As in node.js)
