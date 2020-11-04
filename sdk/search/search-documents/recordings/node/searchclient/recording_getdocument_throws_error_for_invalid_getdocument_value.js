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
  'f088a8e1-14ac-40f8-b627-1d6fa4f134e1',
  'elapsed-time',
  '7',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:16:03 GMT',
  'Content-Length',
  '0' ]);
