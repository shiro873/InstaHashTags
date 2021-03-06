
//'use strict';
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var scrapper = require('./scrapper.js');

app.get('/scrape', function (req, res) {

    url = 'http://instatag.net/mostpopular.html';

    request(url, function (error, res, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var tags = $('textarea').text();
            var header = $('h2', '.blog').text();
            var hashtag;
            var title;
            var json = {
                title: title,
                hastags: hashtag
            }

            json.hastags = tags;
            json.title = header;

            fs.writeFileSync('output.json', json, function (err) {
                if (err) console.error(err);
                console.log('File successfully written! - Check your project directory for the output.json file');

            })
        }
    })

    
})

app.get('/scrapehome', function (req, res) {
    url = 'http://instatag.net/';

    request(url, function (error, res, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var links = [];
            var links = $('a');
            var address;
            var addresses = [];
            var json = {
                addresses: []
            }; 

            $(links).each(function (i, link) {
                //console.log($(link).text() + ':\n  ' + $(link).attr('href'));
                address = 'http://instatag.net' + $(link).attr('href');
                addresses.push(address);
            });
            json.addresses = addresses;
            var data = JSON.stringify(json, null, 4);
            fs.writeFileSync('links.json', data, function (err) {
                if (err) console.error(err);
                console.log('File successfully written! - Check your project directory for the output.json file');

            })

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            //res.send('Check your console!');
        }
    })
})

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;