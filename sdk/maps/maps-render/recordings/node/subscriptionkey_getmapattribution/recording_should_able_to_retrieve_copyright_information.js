let nock = require('nock');

module.exports.hash = "a7c877e97e5377a15f35abd306f0912a";

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
  'Ref A: 666CD356CF864680BC8A1DB48A5502BC Ref B: TPE30EDGE0713 Ref C: 2022-07-13T11:09:34Z',
  'Date',
  'Wed, 13 Jul 2022 11:09:33 GMT'
]);
