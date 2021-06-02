let nock = require('nock');

module.exports.hash = "649ff33f6dd8c7706f7f70061b6b7b8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/876781d0-d174-460d-add9-60fc9904035f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'af70a894-94d4-4e8a-927b-58a6b3b4a738',
  'x-envoy-upstream-service-time',
  '5470',
  'apim-request-id',
  'af70a894-94d4-4e8a-927b-58a6b3b4a738',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/876781d0-d174-460d-add9-60fc9904035f')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '52c063b8-8ba6-45bf-badb-7133a6a9d593',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '52c063b8-8ba6-45bf-badb-7133a6a9d593',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:29 GMT'
]);
