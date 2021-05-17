let nock = require('nock');

module.exports.hash = "08b7835c27ab4323499bba6eac53ccf2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/f07da91b-3d76-4317-a0b1-ddc56e74e214')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '77ded704-6a2e-464e-90ee-3b3277d8f92e',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '77ded704-6a2e-464e-90ee-3b3277d8f92e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/f07da91b-3d76-4317-a0b1-ddc56e74e214')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8c7337cf-6bf3-4d9a-9c48-15cea9dc49b6',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '8c7337cf-6bf3-4d9a-9c48-15cea9dc49b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:47 GMT'
]);
