let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3d7b2247-ce07-49b2-ab00-57dee48b4fb4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f771c404-eb09-4d3f-af9f-d54afcb1808f',
  'x-envoy-upstream-service-time',
  '1361',
  'apim-request-id',
  'f771c404-eb09-4d3f-af9f-d54afcb1808f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3d7b2247-ce07-49b2-ab00-57dee48b4fb4')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3d1c087f-84d7-47b0-99d7-ec0b70026538',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '3d1c087f-84d7-47b0-99d7-ec0b70026538',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:10 GMT'
]);
