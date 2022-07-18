let nock = require('nock');

module.exports.hash = "79e76edfbd08822c52c09e04823da2c9";

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
  'Mon, 25 Jul 2022 16:31:35 GMT',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 1C7459F74FBB458E8C5DE51EF1A34464 Ref B: TPE30EDGE0509 Ref C: 2022-07-18T16:31:35Z',
  'Date',
  'Mon, 18 Jul 2022 16:31:34 GMT'
]);
