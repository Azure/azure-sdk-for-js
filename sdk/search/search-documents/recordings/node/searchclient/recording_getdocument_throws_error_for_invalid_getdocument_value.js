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
  'cd48bf47-a760-40c9-b432-2b34c85e668c',
  'elapsed-time',
  '4',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:52:10 GMT',
  'Content-Length',
  '0'
]);
