let nock = require('nock');

module.exports.hash = "aa09f45dd3cb11b51d28b0007812a430";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b009aaf4-9c90-4641-bb36-6ac5b0894f27')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b6d1cd9f-aae5-4060-86e5-4800fe355343',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  'b6d1cd9f-aae5-4060-86e5-4800fe355343',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b009aaf4-9c90-4641-bb36-6ac5b0894f27')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '17033ebd-fbfa-46fd-8c63-cae3a5e39741',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '17033ebd-fbfa-46fd-8c63-cae3a5e39741',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:29 GMT'
]);
