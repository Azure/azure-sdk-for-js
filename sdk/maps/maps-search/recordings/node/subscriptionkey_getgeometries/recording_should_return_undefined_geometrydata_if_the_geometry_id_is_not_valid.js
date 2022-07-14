let nock = require('nock');

module.exports.hash = "931d1a465eb39289ce1aeba6ce07f5bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/polygon/json')
  .query(true)
  .reply(200, {"additionalData":[{"providerID":"invalid-geometry-id","error":"Wrong geometry id format. Supported format: UUID (RFC 4122)"}]}, [
  'Content-Length',
  '127',
  'Content-Type',
  'application/json',
  'ETag',
  '9BD95FF1EED14867978720B873641707',
  'Vary',
  'accept-encoding,origin,access-control-request-headers,access-control-request-method,accept-encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2F52B622F9924C2DA67CA86109D40814 Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:26Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:26 GMT'
]);
