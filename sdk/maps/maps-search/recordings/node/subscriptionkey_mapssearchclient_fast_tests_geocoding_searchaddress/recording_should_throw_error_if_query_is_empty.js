let nock = require('nock');

module.exports.hash = "5bdfb6b3ba5f9c8fb5ea3e1953a1b2c8";

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
  'Ref A: D11C75BAF94D4DC38C75D3FD80E4A983 Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:49Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:48 GMT'
]);
