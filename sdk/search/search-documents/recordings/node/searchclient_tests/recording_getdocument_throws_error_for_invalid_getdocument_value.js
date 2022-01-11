let nock = require('nock');

module.exports.hash = "304fc79e14e53d4f8d6e5ff9bf9d1357";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test1')/docs('garbxyz')`)
  .query(true)
  .reply(404, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '210e152b-dd11-479a-b643-e9f31ad1f6dc',
  'elapsed-time',
  '6',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:40:39 GMT',
  'Content-Length',
  '0'
]);
