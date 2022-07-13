let nock = require('nock');

module.exports.hash = "1be181c6f72e837cbe58e6fadaf0a994";

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
  'Wed, 20 Jul 2022 11:09:34 GMT',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: FE5F263F8FAA40D595A72CDADABBB06F Ref B: TPE30EDGE0713 Ref C: 2022-07-13T11:09:34Z',
  'Date',
  'Wed, 13 Jul 2022 11:09:33 GMT'
]);
