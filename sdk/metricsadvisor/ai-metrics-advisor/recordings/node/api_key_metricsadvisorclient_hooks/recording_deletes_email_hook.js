let nock = require('nock');

module.exports.hash = "08b7835c27ab4323499bba6eac53ccf2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/9194cb28-ba76-4fac-99c6-092c73e5e1f3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '71a240f4-b382-4a6c-9e1d-94a339a6d242',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '71a240f4-b382-4a6c-9e1d-94a339a6d242',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/9194cb28-ba76-4fac-99c6-092c73e5e1f3')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '574cb67d-28ba-4b41-84ec-67ce82e2c71e',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '574cb67d-28ba-4b41-84ec-67ce82e2c71e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:06 GMT'
]);
