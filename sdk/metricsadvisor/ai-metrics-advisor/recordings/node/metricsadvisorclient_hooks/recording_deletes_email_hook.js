let nock = require('nock');

module.exports.hash = "e9867cceaf5f5e66027a73da2e3403ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/6d3f3d41-4114-458d-bf45-a3fbcd78a400')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6265dad9-6c87-4dc9-8219-ebf3bec7aac0',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '6265dad9-6c87-4dc9-8219-ebf3bec7aac0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:55:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/6d3f3d41-4114-458d-bf45-a3fbcd78a400')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2b0c3341-4397-4c30-ac3f-41a940d33543',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '2b0c3341-4397-4c30-ac3f-41a940d33543',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:55:01 GMT'
]);
