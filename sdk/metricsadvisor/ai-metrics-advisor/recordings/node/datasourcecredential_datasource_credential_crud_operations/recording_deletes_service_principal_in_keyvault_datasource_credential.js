let nock = require('nock');

module.exports.hash = "896cc1ac7b6bb318a49094d7e7c82463";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/c81898d7-ba8c-4da2-9dc4-de57b37efe06')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '42ec61a0-b738-4088-9424-78db071cc0a3',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '42ec61a0-b738-4088-9424-78db071cc0a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:21 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c81898d7-ba8c-4da2-9dc4-de57b37efe06')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e7bfa7c9-62b7-4601-9828-df96905a67d7',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'e7bfa7c9-62b7-4601-9828-df96905a67d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:21 GMT',
  'Connection',
  'close'
]);
