const Ebook = require('../models/ebookmodel');
const asyncHandler = require('express-async-handler');
const { generateUniqueId } = require('../utils/index');

// Create a new eBook
const createEbook = asyncHandler(async (req, res) => {
  const { name, overview, long_description, price, poster, rating, in_stock, size, best_seller } = req.body;

  const existing = await Ebook.findOne({ name });
  if (existing) {
    res.status(400);
    throw new Error("Ebook with this name already exists.");
  }

  if (!name || !price || !rating) {
    res.status(400);
    throw new Error('Name, price, and rating are required');
  }
  if (rating < 0 || rating > 5) {
    res.status(400);
    throw new Error('Rating must be between 0 and 5');
  }

  const ebook = new Ebook({
    id: await generateUniqueId(),
    name,
    overview,
    long_description,
    price,
    poster,
    rating,
    in_stock,
    size,
    best_seller
  });

  const savedEbook = await ebook.save();
  res.status(201).json(savedEbook);
});

const updateEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { overview, long_description, price, poster, rating, in_stock, size, best_seller } = req.body;
 
  try {
  
    const ebook = await Ebook.findOne({id});

  // if (!ebook) {
  //   res.status(404);
  //   throw new Error('Ebook not found');
  // }

  if (ebook){

    ebook.price = req.body.price || ebook.price;
    ebook.overview = req.body.overview || ebook.overview;

    ebook.long_description = req.body.long_description || ebook.long_description;
    ebook.poster = req.body.poster || ebook.poster;

    ebook.rating = req.body.rating || ebook.rating;
    ebook.in_stock = req.body.in_stock !== undefined ? req.body.in_stock : ebook.in_stock;

    ebook.size = req.body.size || ebook.size;
    ebook.best_seller = req.body.best_seller !== undefined ? req.body.best_seller : ebook.best_seller;

    const updatedEbook = await ebook.save();
    res.status(200).json(updatedEbook);

  }else {
    res.status(400);
    throw new Error('Ebook not found');
  }
  
} catch (error) {
  res.status(500).json({ message: 'Error updating ebook', error: error.message });
}});

const getAllEbooks = asyncHandler(async (req, res) => {
  const ebooks = await Ebook.find({});

  if (!ebooks || ebooks.length === 0) {
    res.status(404);
    throw new Error('No ebooks found');
  }

  res.status(200).json(ebooks);
});

const getAnEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ebook = await Ebook.findOne({ id });
 
  if(ebook){
    
    const { name, overview, long_description, price, poster, rating, in_stock, size, best_seller } = ebook;
    if (!name || !price || !rating) {
      res.status(400);
      throw new Error('Name, price, and rating are required');
    }
    res.status(200).json(ebook);


    }
  
  else {
    res.status(404);
    throw new Error('Ebook not found');
  }
}
);

const getBestSellers = asyncHandler(async (req, res) => {
  const bestSellers = await Ebook.find({ best_seller: true });

  if (!bestSellers || bestSellers.length === 0) {
    res.status(404);
    throw new Error('No best seller ebooks found');
  }

  res.status(200).json(bestSellers);
});



module.exports = { createEbook, updateEbook, getAllEbooks, getAnEbook, getBestSellers  };