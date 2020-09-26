let nock = require('nock');

module.exports.hash = "3f8fadee02fbd9cec2a9238a219955cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%27garbxyz%27)')
  .query(true)
  .reply(404, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a1654552-ec84-49d8-b147-38ebc7a141ea',
  'elapsed-time',
  '6',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:09:14 GMT',
  'Content-Length',
  '0' ]);
