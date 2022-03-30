let nock = require('nock');

module.exports.hash = "2a0877a3acfaad18ffb7a55df793f4db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/map/tileset')
  .query(true)
  .reply(200, {"tilejson":"2.2.0","name":"microsoft.base","version":"1.0.0","attribution":"<a data-azure-maps-attribution-tileset=\"microsoft.base\">&copy;2022 TomTom</a>","scheme":"xyz","tiles":["https://atlas.microsoft.com/map/tile?api-version=2.1&tilesetId=microsoft.base&zoom={z}&x={x}&y={y}"],"grids":[],"data":[],"minzoom":0,"maxzoom":22,"bounds":[-180,-90,180,90]}, [
  'Content-Length',
  '365',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  'Wed, 06 Apr 2022 01:39:10 GMT',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: D2F602F8D58748E08B43C3B7E15956E1 Ref B: TPE30EDGE0606 Ref C: 2022-03-30T01:39:10Z',
  'Date',
  'Wed, 30 Mar 2022 01:39:10 GMT'
]);
