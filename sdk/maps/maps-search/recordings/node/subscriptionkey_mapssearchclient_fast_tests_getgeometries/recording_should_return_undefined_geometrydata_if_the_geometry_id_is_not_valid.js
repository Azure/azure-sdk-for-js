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
  '24D963F0BB949E91BFB8C90A6AF80647',
  'Vary',
  'Accept-Encoding,accept-encoding,origin,access-control-request-headers,access-control-request-method,accept-encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: D07EF90655D1497B8B1F781F4DF5471C Ref B: TYAEDGE1122 Ref C: 2022-02-22T10:18:47Z',
  'Date',
  'Tue, 22 Feb 2022 10:18:47 GMT'
]);
