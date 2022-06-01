let nock = require('nock');

module.exports.hash = "26be118ace021c1235287359e5075d53";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/448fae01-1eaf-4f5b-a1d6-30e33c27eebe')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '15fa298c-80a4-447c-bf6c-376932aaee23',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  '15fa298c-80a4-447c-bf6c-376932aaee23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/448fae01-1eaf-4f5b-a1d6-30e33c27eebe')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '91f62671-f1e9-4903-9840-b086c37e7828',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '91f62671-f1e9-4903-9840-b086c37e7828',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:17 GMT'
]);
