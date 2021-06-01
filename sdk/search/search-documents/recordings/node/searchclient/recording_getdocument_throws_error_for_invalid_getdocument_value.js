let nock = require('nock');

module.exports.hash = "3f8fadee02fbd9cec2a9238a219955cd";

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
  'd7386df4-ddc3-45b2-882b-1b8615ee5d39',
  'elapsed-time',
  '6',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:33:50 GMT',
  'Content-Length',
  '0'
]);
