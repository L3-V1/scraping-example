const express = require('express');

const { getBook } = require('../src/scraper');

const router = express.Router();

router.get('/:title', async (req, res) => {
    try{
        const book = await getBook(req.params.title);

        if(book){
            res.status(200);
            res.json(book);
        }
        else{
            res.status(404);
            res.json({
                message:'Book not found'
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