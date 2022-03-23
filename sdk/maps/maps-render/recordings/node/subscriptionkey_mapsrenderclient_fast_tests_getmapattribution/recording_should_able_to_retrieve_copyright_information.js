let nock = require('nock');

module.exports.hash = "2c5c8e669b83a550df20217e22411ad9";

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
  'Ref A: B09292DFF61544F1BA5175384BA63FC6 Ref B: TYAEDGE1018 Ref C: 2022-03-23T07:09:32Z',
  'Date',
  'Wed, 23 Mar 2022 07:09:31 GMT'
]);
