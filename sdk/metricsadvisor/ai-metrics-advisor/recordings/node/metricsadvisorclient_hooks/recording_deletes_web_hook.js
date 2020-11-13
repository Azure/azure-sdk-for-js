let nock = require('nock');

module.exports.hash = "da39bba3c06162c654185f7c8c2c23d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/20f65cc3-2f21-44b8-ab83-0040da955bc5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0d060959-6933-45d3-ba68-ec0014658b0f',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '0d060959-6933-45d3-ba68-ec0014658b0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:55:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/20f65cc3-2f21-44b8-ab83-0040da955bc5')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '02baa925-2887-463d-944d-2a99c761cbac',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '02baa925-2887-463d-944d-2a99c761cbac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:55:01 GMT'
]);
