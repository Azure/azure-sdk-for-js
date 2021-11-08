let nock = require('nock');

module.exports.hash = "26be118ace021c1235287359e5075d53";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/dc36bd57-e9f4-4495-ba4b-e3ea2fa7aa15')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2b507892-8e93-4f26-a69d-9b66478a8d68',
  'x-envoy-upstream-service-time',
  '324',
  'apim-request-id',
  '2b507892-8e93-4f26-a69d-9b66478a8d68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/dc36bd57-e9f4-4495-ba4b-e3ea2fa7aa15')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '98c566ca-3792-4c00-bf76-788f27cb5938',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '98c566ca-3792-4c00-bf76-788f27cb5938',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:26 GMT'
]);
