let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/9ca14594-5c11-491f-92fc-56a7bddb61e2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '455f236a-94f4-4a35-8c33-081bdd4ab6d6',
  'x-envoy-upstream-service-time',
  '494',
  'apim-request-id',
  '455f236a-94f4-4a35-8c33-081bdd4ab6d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9ca14594-5c11-491f-92fc-56a7bddb61e2')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8b1f42b6-67cd-48a3-b497-263677597e38',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '8b1f42b6-67cd-48a3-b497-263677597e38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:14 GMT'
]);
