let nock = require('nock');

module.exports.hash = "4ba47d2cea0fcd81354b05de8691dcd7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/map/attribution')
  .query(true)
  .reply(200, {"copyrights":["<a data-azure-maps-attribution-tileset=\"microsoft.base\">&copy;2022 TomTom</a>"]}, [
  'Content-Length',
  '98',
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
  'Ref A: 688AF4F486FD4ABBA617E5AE7A56D52E Ref B: TPE30EDGE0509 Ref C: 2022-07-18T16:31:35Z',
  'Date',
  'Mon, 18 Jul 2022 16:31:34 GMT'
]);
