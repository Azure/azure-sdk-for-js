let nock = require('nock');

module.exports.hash = "dcb5cd425dcc277c92506f2d765801ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/polygon/json')
  .query(true)
  .reply(200, {"additionalData":[{"providerID":"invalid-geometry-id","error":"Wrong geometry id format. Supported format: UUID (RFC 4122)"}]}, [ 'Content-Length',
  '127',
  'Content-Type',
  'application/json',
  'ETag',
  'A93017ABF1870C2ED609CB4F2E98FB97',
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
  'Ref A: 0155A12EC7C744A58CC369F12D500BFD Ref B: TYO01EDGE3415 Ref C: 2022-06-23T09:21:53Z',
  'Date',
  'Thu, 23 Jun 2022 09:21:52 GMT' ]);
