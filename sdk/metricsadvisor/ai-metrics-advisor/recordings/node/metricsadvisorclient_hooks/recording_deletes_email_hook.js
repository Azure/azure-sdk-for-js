let nock = require('nock');

module.exports.hash = "e9867cceaf5f5e66027a73da2e3403ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/8ee27014-a775-4e18-b846-8ce3acea698d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '085f642c-6dab-49a7-acb9-fe8e5f43e666',
  'x-envoy-upstream-service-time',
  '495',
  'apim-request-id',
  '085f642c-6dab-49a7-acb9-fe8e5f43e666',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/8ee27014-a775-4e18-b846-8ce3acea698d')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '465c5c3b-39a5-4f43-9969-8571084fd03d',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '465c5c3b-39a5-4f43-9969-8571084fd03d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:39 GMT'
]);
