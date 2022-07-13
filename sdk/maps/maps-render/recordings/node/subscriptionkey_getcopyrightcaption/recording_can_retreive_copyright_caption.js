let nock = require('nock');

module.exports.hash = "f2d337bc069ed546606e03b4f736c82e";

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
  'Ref A: C0E21349127E41D6A2417E1337CCE7E0 Ref B: TPE30EDGE0713 Ref C: 2022-07-13T11:09:32Z',
  'Date',
  'Wed, 13 Jul 2022 11:09:31 GMT'
]);
