let nock = require('nock');

module.exports.hash = "6736fa1edd97ca9694f3279647ec71ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ba116d00-65f2-4a1b-9e7e-bc065f145658')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'da4fc509-08c3-4d5e-acee-7468f595ed5d',
  'x-envoy-upstream-service-time',
  '362',
  'apim-request-id',
  'da4fc509-08c3-4d5e-acee-7468f595ed5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ba116d00-65f2-4a1b-9e7e-bc065f145658')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0ad07a82-4c0f-43fa-82e0-47ce3516f55b',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '0ad07a82-4c0f-43fa-82e0-47ce3516f55b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:35 GMT'
]);
