let nock = require('nock');

module.exports.hash = "3b953c0f7d0010ddeb3db30cf99affa3";

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
  '977a8d29-9b94-4c73-ab83-264e80040c98',
  'elapsed-time',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:53:25 GMT',
  'Content-Length',
  '0'
]);
