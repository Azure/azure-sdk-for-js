let nock = require('nock');

module.exports.hash = "e9867cceaf5f5e66027a73da2e3403ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/c2696e26-17f0-4c9f-9aa3-1982e7fed1bc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'dddba3c2-92a8-41f5-b3de-226d34529408',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'dddba3c2-92a8-41f5-b3de-226d34529408',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c2696e26-17f0-4c9f-9aa3-1982e7fed1bc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fbd085fa-55e7-4482-937d-a57de578ffe6',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'fbd085fa-55e7-4482-937d-a57de578ffe6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:54 GMT'
]);
