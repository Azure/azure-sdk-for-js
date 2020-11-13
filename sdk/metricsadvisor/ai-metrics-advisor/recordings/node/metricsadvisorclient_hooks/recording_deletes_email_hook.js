let nock = require('nock');

module.exports.hash = "e9867cceaf5f5e66027a73da2e3403ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/5e24aead-09d6-4bf7-be95-da5340b82e4a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2807e5cf-5516-4ce6-a12c-a94fe15f80be',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  '2807e5cf-5516-4ce6-a12c-a94fe15f80be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5e24aead-09d6-4bf7-be95-da5340b82e4a')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2b70c494-461a-4da3-b563-f181d874d0ac',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '2b70c494-461a-4da3-b563-f181d874d0ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:19 GMT'
]);
