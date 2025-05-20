const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// GET all media items
router.get('/', async (req, res) => {
  try {
    const items = await Media.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new media item
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

// PUT update an existing media item
router.put('/:id', async (req, res) => {
  try {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
    });

    if (!updated) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a media item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Media.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.json({ message: 'Media item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;