let nock = require('nock');

module.exports.hash = "3b953c0f7d0010ddeb3db30cf99affa3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%27garbxyz%27)')
  .query(true)
  .reply(404, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '098f0bf5-378d-4108-b2b4-951f298d588d',
  'elapsed-time',
  '4',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 02 Aug 2021 18:19:45 GMT',
  'Content-Length',
  '0'
]);
