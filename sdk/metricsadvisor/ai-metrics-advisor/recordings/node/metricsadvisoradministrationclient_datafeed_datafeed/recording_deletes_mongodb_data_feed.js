let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e118b38c-fd57-4722-990a-3b3be88ae12a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ed8fa8c2-f66e-4fdf-96d5-65e7960405b4',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'ed8fa8c2-f66e-4fdf-96d5-65e7960405b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e118b38c-fd57-4722-990a-3b3be88ae12a')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'be1281a4-c88c-4c4a-aba8-5a5d8382a9cc',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'be1281a4-c88c-4c4a-aba8-5a5d8382a9cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:46 GMT'
]);
