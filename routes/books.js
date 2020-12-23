const express = require('express');

const { getBooks } = require('../src/scraper');

const router = express.Router();

router.get('/page/:number', async (req, res) => {
    try{
        const books = await getBooks(req.params.number);

        if(books.length > 0){
            res.status(200);
            res.json(books);
        }
        else{
            res.status(404);
            res.json({
                message:'No books found'
            });
        }
    }
    catch(error){
        res.status(500);
        res.json({
            message:error.message
        });
    }
});

module.exports = router;