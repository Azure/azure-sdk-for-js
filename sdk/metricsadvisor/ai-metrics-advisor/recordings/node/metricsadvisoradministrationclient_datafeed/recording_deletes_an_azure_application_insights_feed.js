let nock = require('nock');

module.exports.hash = "1a22061aca6ef0a4128b191f0d23256f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ed87fb04-2511-47e1-a55a-41e392a38ce0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9c751142-344d-4b50-86b5-34571d436999',
  'x-envoy-upstream-service-time',
  '281',
  'apim-request-id',
  '9c751142-344d-4b50-86b5-34571d436999',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ed87fb04-2511-47e1-a55a-41e392a38ce0')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1f7ff440-cc52-4ae4-8acc-3719c2698813',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '1f7ff440-cc52-4ae4-8acc-3719c2698813',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:17 GMT'
]);
