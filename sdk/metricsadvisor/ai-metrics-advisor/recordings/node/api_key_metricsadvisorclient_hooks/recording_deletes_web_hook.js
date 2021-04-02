let nock = require('nock');

module.exports.hash = "306ac624242c264b71f793ddad9dfc4e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/b1c3c74b-ed83-41aa-8716-dbe12c741940')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '409bbf92-c0a6-4f74-a52e-8a9f6508954c',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '409bbf92-c0a6-4f74-a52e-8a9f6508954c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/b1c3c74b-ed83-41aa-8716-dbe12c741940')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7e6862a1-d036-4726-abac-8d7c82b248a6',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '7e6862a1-d036-4726-abac-8d7c82b248a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:07 GMT'
]);
