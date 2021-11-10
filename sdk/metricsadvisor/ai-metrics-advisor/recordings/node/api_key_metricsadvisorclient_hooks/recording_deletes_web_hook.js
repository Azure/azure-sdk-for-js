let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/6cf4555e-321e-4702-a0ad-48ac2b698d2a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7a61ec72-a491-42f9-aab5-0dd9b2396ca6',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '7a61ec72-a491-42f9-aab5-0dd9b2396ca6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/6cf4555e-321e-4702-a0ad-48ac2b698d2a')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '543da8c5-62be-4cdd-9de9-59384fffc9d8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '543da8c5-62be-4cdd-9de9-59384fffc9d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:31 GMT'
]);
