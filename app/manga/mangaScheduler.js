const cron = require("node-cron");
const request = require('request');
const mangazukiParser = require('./parsers/mangazuki');

const test_url = 'http://mangazuki.fun/manga/solo-leveling';

function parsePage(url) {
    let parser;

    if (mangazukiParser.pattern.test(url)) {
        parser = mangazukiParser.parse;
    } else {
        return;
    }

    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            parser(html);
        }
    });
}


function launcher() {
    cron.schedule("*/1 * * * * *", function () {
        parsePage(test_url);
    });
}

//TODO fix pattern matcher
function matchToPattern(url) {
    return mangazukiParser.pattern.test(url);
}

module.exports = (() => {
    return {
        start: launcher,
        matchToPattern: matchToPattern
    }
})();
