let nock = require('nock');

module.exports.hash = "3641856d67574433e3d0be86e7320b3a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/map/copyright/caption/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","copyrightsCaption":"© 1992 - 2022 TomTom."}, [
  'Cache-Control',
  'max-age=86400',
  'Content-Length',
  '81',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"f3cfa19fc3c68912b94faa097ee62351"',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 097E5821952040C4BF8E366D14B5E772 Ref B: TPE30EDGE0509 Ref C: 2022-07-18T16:31:32Z',
  'Date',
  'Mon, 18 Jul 2022 16:31:32 GMT'
]);
