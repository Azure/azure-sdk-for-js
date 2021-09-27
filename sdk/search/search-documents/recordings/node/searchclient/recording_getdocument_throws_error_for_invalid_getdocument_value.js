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
  'cd292dac-5864-48ac-8041-87d6c8ae0c92',
  'elapsed-time',
  '12',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:29:40 GMT',
  'Content-Length',
  '0'
]);
