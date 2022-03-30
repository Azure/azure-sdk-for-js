let nock = require('nock');

module.exports.hash = "b89b3f49e093b7be54324b3fa15ce102";

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
  'Ref A: AA3AA85A94654BE18DB3E3B955F406AA Ref B: TPE30EDGE0509 Ref C: 2022-03-30T01:39:09Z',
  'Date',
  'Wed, 30 Mar 2022 01:39:09 GMT'
]);
