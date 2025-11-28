import express from 'express';
import connectDB from './db.mjs';
import Item from './item.mjs'; // ✅ Capitalize model names by convention

const app = express();
connectDB();

app.use(express.json()); // ✅ To parse JSON bodies

// Optional: fix favicon 404
app.get('/favicon.ico', (req, res) => res.status(204).end());

// GET all items
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }
    return res.status(200).json({ data: items });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST a new item
app.post('/', async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const newItem = new Item({ name, category, price });
    await newItem.save();
    return res.status(201).json({ message: 'New record added', data: newItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET item by ID
app.get('/:id', async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id);
    if (!foundItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ data: foundItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// UPDATE item
app.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item updated', data: updatedItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE item
app.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted', data: deletedItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
