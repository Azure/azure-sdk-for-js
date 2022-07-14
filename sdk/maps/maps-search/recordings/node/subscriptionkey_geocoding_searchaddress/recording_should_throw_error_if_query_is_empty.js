let nock = require('nock');

module.exports.hash = "55f118b1c5e73931c6967df7b05ea3bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/json')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"query is missing or empty"}}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 59CA385E871C462FA75C12ADF21F6155 Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:27Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:26 GMT'
]);
