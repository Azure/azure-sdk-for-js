let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5064dada-ab18-492b-851c-ee447f76d93d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'baa1198c-2f14-405e-afbd-e35947f0607b',
  'x-envoy-upstream-service-time',
  '799',
  'apim-request-id',
  'baa1198c-2f14-405e-afbd-e35947f0607b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5064dada-ab18-492b-851c-ee447f76d93d')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f65be648-d5b2-4f44-922c-ec5443a947ed',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'f65be648-d5b2-4f44-922c-ec5443a947ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:17 GMT'
]);
