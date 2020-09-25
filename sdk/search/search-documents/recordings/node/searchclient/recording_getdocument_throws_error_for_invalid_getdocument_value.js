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
  '2bd36fd0-ea44-483b-9c68-c91ced17c8a7',
  'elapsed-time',
  '6',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:17:06 GMT',
  'Content-Length',
  '0' ]);
