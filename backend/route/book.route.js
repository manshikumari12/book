const express = require("express")

const {Bookmodel}=require('../model/book.model')
const bookrouter= express.Router()

bookrouter.post('/book', (req, res) => {
    const { title, author, genre, description, price } = req.body;
  
    const newBook = new Bookmodel({ title, author, genre, description, price });
    console.log(newBook);
  
    newBook.save()
      .then(savedBook => {
        res.status(201).json(savedBook);
      })
      .catch(error => {
        console.error('Failed to add book', error);
        res.status(500).json({ error: 'Failed to add book' });
      });
  });



  bookrouter.get('/api/book', (req, res) => {
    const { genre, sort } = req.query;
    const filter = genre ? { genre } : {};
    const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
  
 
    Bookmodel.find(filter)
      .sort(sortOptions)
      .then(books => {
        res.json(books); 
      })
      .catch(error => {
        console.error('Failed to retrieve books', error);
        res.status(500).json({ error: 'Failed to retrieve books' });
      });
  });
  



  bookrouter.delete('/book/:id', (req, res) => {
    const bookId = req.params.id;
  
   
    Bookmodel.findByIdAndDelete(bookId)
      .then(() => {
        res.status(240).json({ "msg": 'delete book from database' });
      })
      .catch(error => {
        console.error('Failed to delete book', error);
        res.status(500).json({ error: 'Failed to delete book' });
      });
  });


  bookrouter.get('/book', (req, res) => {
    const { genre } = req.query;
    const filter = genre ? { genre } : {};
  
  
    Bookmodel.find(filter)
      .then(books => {
        res.json(books); 
      })
      .catch(error => {
        console.error('Failed to filter books', error);
        res.status(500).json({ error: 'Failed to filter books' });
      });
  });
  


  bookrouter.get('/book', (req, res) => {
    const { sort } = req.query;
    const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
  
   
    Bookmodel.find()
      .sort(sortOptions)
      .then(books => {
        res.json(books); 
      })
      .catch(error => {
        console.error('Failed to sort books', error);
        res.status(500).json({ error: 'Failed to sort books' });
      });
  });
  
  
  
  

module.exports={bookrouter}