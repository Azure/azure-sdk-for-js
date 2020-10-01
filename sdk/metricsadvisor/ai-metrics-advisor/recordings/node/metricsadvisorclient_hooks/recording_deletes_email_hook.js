let nock = require('nock');

module.exports.hash = "e9867cceaf5f5e66027a73da2e3403ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9c391fa1-81be-4abf-991e-2a008e6328c1',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  '9c391fa1-81be-4abf-991e-2a008e6328c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bd3bfda6-3299-4e1d-b437-e336a34a43a4',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'bd3bfda6-3299-4e1d-b437-e336a34a43a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:31 GMT'
]);
