let nock = require('nock');

module.exports.hash = "e9867cceaf5f5e66027a73da2e3403ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/776297a1-f283-420e-beb2-cc0564b4d7dc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0c1ebd1b-dd12-4f10-b341-e0a88d1d7e58',
  'x-envoy-upstream-service-time',
  '455',
  'apim-request-id',
  '0c1ebd1b-dd12-4f10-b341-e0a88d1d7e58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/776297a1-f283-420e-beb2-cc0564b4d7dc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e1674a97-d574-4ce7-9060-ad07bfd251ce',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'e1674a97-d574-4ce7-9060-ad07bfd251ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:32 GMT'
]);
