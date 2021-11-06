let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/84968cc8-b283-4bce-b2f1-eba0fa853c17')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '13f3df7e-d98e-47f6-8381-f3f036a0af05',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  '13f3df7e-d98e-47f6-8381-f3f036a0af05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/84968cc8-b283-4bce-b2f1-eba0fa853c17')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd80bfb5d-94e0-4f63-903d-5ba6d7be8b15',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'd80bfb5d-94e0-4f63-903d-5ba6d7be8b15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:15 GMT'
]);
