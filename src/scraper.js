const fetch = require('node-fetch');

const cheerio = require('cheerio');

const urls = [
    'http://books.toscrape.com',
    'http://books.toscrape.com/catalogue/page',
    'http://books.toscrape.com/catalogue'
]

const getBooks = async (page) => {
    const resp = await fetch(`${urls[1]}-${page}.html`);
    const body = await resp.text();

    try{
        const $ = cheerio.load(body);

        const books = [];

        $('article.product_pod').each((i, el) => {
            const thumb = `${urls[0]}/${$(el).find('img.thumbnail').attr('src')}`;
            const title = $(el).find('h3 a').attr('title');
            const alias = $(el).find('h3 a').attr('href').match(/^(.*)\//)[1];
            const price = $(el).find('p.price_color').text();
            const state = $(el).find('p.instock.availability').text().trim();

            books.push({
                thumb,
                title,
                alias,
                price,
                state
            });
        });

        return books;
    }
    catch(error){
        throw new Error(`Scraping error: ${error.message}`);
    }
}

const getBook = async (title) => {
    const resp = await fetch(`${urls[2]}/${title}/index.html`);
    const body = await resp.text();

    try{
        const $ = cheerio.load(body);

        const book = {};

        book.title = $('.product_main h1').text();
        book.price = `£${$('p.price_color').text().split('£')[1]}`;
        book.state = $('p.instock.availability').text().trim().match(/^(.+)\n*/)[1];
        book.image = `${urls[0]}/${$('.item.active img').attr('src').match(/media.*$/)[0]}`;
        book.summary = $('#product_description').next().text();
        book.upc = $($('tr')[0]).find('td').text();
        book.type = $($('tr')[1]).find('td').text();
        book.tax = $($('tr')[4]).find('td').text();
        book.reviews = $($('tr')[6]).find('td').text();

        return book;
    }
    catch(error){
        throw new Error(`Scraping error: ${error.message}`);
    }
}

module.exports = { getBooks, getBook };