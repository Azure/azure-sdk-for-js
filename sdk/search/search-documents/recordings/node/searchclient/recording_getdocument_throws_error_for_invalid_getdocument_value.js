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
  'afe19624-6fce-49f3-a38a-0415696deeee',
  'elapsed-time',
  '12',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:07:45 GMT',
  'Content-Length',
  '0'
]);
