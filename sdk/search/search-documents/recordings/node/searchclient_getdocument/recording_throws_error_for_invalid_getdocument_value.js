let nock = require('nock');

module.exports.hash = "ab74505abc03f132ceaa169aa5f3dd38";

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
  'e8c743bc-5de4-40b3-932c-519eb1e0c9e8',
  'elapsed-time',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:41:36 GMT',
  'Content-Length',
  '0' ]);
