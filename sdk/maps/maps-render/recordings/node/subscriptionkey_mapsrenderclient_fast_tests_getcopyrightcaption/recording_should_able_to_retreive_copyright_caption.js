let nock = require('nock');

module.exports.hash = "3d6dab34aebbac83ec9c68fe189634d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/map/copyright/caption/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","copyrightsCaption":"© 1992 - 2022 TomTom."}, [
  'Cache-Control',
  'max-age=86400',
  'Content-Length',
  '83',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  'Wed, 30 Mar 2022 16:20:58 GMT',
  'ETag',
  'W/"04edd08d6465990a456b49db47137450"',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 29C3183C536D4FEDA3A2F6F177C6A033 Ref B: TPE30EDGE0509 Ref C: 2022-03-30T01:39:07Z',
  'Date',
  'Wed, 30 Mar 2022 01:39:07 GMT'
]);
