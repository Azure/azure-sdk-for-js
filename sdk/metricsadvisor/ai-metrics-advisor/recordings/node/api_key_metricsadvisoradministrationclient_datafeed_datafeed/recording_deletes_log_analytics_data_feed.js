let nock = require('nock');

module.exports.hash = "797af05c28fecaa61519a9b263d973c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/fec5d0cd-9394-423e-9808-9faf29e5a9d9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '482c6512-a970-418b-9463-8616aec21668',
  'x-envoy-upstream-service-time',
  '380',
  'apim-request-id',
  '482c6512-a970-418b-9463-8616aec21668',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/fec5d0cd-9394-423e-9808-9faf29e5a9d9')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c0a2f2b1-c7c7-45ba-9627-f9001d265054',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'c0a2f2b1-c7c7-45ba-9627-f9001d265054',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:39 GMT'
]);
