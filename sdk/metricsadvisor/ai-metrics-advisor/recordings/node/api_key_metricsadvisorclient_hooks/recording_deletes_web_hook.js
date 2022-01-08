let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/542f4cb3-51d7-4b3b-b7f8-005d9b7758f2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ba8b7b5b-b848-4a17-8840-fa1ee9be5e2e',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'ba8b7b5b-b848-4a17-8840-fa1ee9be5e2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/542f4cb3-51d7-4b3b-b7f8-005d9b7758f2')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '808d79ed-c0f0-4002-bdac-d6eadc9d6868',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '808d79ed-c0f0-4002-bdac-d6eadc9d6868',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:32 GMT'
]);
