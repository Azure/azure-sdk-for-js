var cheerio = require('cheerio');
var superagent = require('superagent');

superagent
  .get('http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements')
  .end(function (err, res) {
    var $ = cheerio.load(res.text);
    var codes = $('dfn#void-elements')
                .parent()
                .next()
                .text()
                .replace(/\s/gm,'')
                .split(",");

    console.log('/**');
    console.log(' * This file automatically generated from `build.js`.');
    console.log(' * Do not manually edit.');
    console.log(' */');
    console.log();
    console.log('module.exports = %s;', JSON.stringify(codes, null, 2));
  });
