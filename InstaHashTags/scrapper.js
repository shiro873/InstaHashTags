function scrapeData(url, titleName, contentName) {
    request(url, function (error, response, html) {
        if (!error) {
            console.log("no error");
            var $ = cheerio.load(html);
            var title, content;
            var json = { title: "", content: "" };
            json.title = $('.blog').children().first().text();
            json.content = $('#note').text();
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })
        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')
    });
}