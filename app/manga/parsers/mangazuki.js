const cheerio = require('cheerio');

function parse(html) {
    const $ =  cheerio.load(html);

    let lastItem = $('.chapter-list').find('a');

    console.log(lastItem.html());
    console.log(lastItem.attr('href'));
}

module.exports =  (() => {
    return {
        parse: parse,
        pattern: /mangazuki\.fun/
    }
})();
