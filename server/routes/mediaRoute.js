const express = require('express');
const router = express.Router();
const Media = require('../models/Media');


router.get('/', async (req, res) => {
  try {
    const items = await Media.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { type, title, completed, notes } = req.body;
  const media = new Media({ type, title, completed, notes });

  try {
    const saved = await media.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;