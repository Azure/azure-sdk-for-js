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
  'Ref A: 5B1B9882353F4498B38C66EE335BDA8B Ref B: TPE30EDGE0719 Ref C: 2022-06-27T02:24:47Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:47 GMT'
]);
