let nock = require('nock');

module.exports.hash = "649ff33f6dd8c7706f7f70061b6b7b8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ba305960-90eb-467e-a70f-c12a9a0b264b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5808d6e1-f55e-45d3-9890-b39370e20373',
  'x-envoy-upstream-service-time',
  '427',
  'apim-request-id',
  '5808d6e1-f55e-45d3-9890-b39370e20373',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ba305960-90eb-467e-a70f-c12a9a0b264b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'de0093b3-5c86-41fd-b636-a723ff4971a9',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'de0093b3-5c86-41fd-b636-a723ff4971a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:29 GMT'
]);
