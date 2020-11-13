let nock = require('nock');

module.exports.hash = "da39bba3c06162c654185f7c8c2c23d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/78ee2629-4750-4511-8b11-961cbffc2aa9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1ff7cc3e-7bb3-4e92-8c2d-33ec9b54c9b3',
  'x-envoy-upstream-service-time',
  '610',
  'apim-request-id',
  '1ff7cc3e-7bb3-4e92-8c2d-33ec9b54c9b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/78ee2629-4750-4511-8b11-961cbffc2aa9')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b21a600e-8ac7-4cff-96ee-35976cf9846e',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'b21a600e-8ac7-4cff-96ee-35976cf9846e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:19 GMT'
]);
