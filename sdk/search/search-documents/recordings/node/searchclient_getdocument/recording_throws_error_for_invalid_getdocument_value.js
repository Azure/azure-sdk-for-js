let nock = require('nock');

module.exports.hash = "55e015990b37ce087406775baadefb58";

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
  '1a7021ce-c093-4204-8ca6-bf9ca2fed374',
  'elapsed-time',
  '3',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:07:42 GMT',
  'Content-Length',
  '0' ]);
