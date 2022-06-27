let nock = require('nock');

module.exports.hash = "dcb5cd425dcc277c92506f2d765801ef";

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
  '556A0F1204FAA9FCA14036FEE6B1A18E',
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
  'Ref A: D9D4CB644F7446E5BC5920B4E9474042 Ref B: TPE30EDGE0719 Ref C: 2022-06-27T02:24:47Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:46 GMT'
]);
