let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e18ec164-11c2-4189-9d94-e2d1e591f2d5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '87183f1d-6383-497b-a9aa-a7b08a7c3553',
  'x-envoy-upstream-service-time',
  '372',
  'apim-request-id',
  '87183f1d-6383-497b-a9aa-a7b08a7c3553',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e18ec164-11c2-4189-9d94-e2d1e591f2d5')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6025a9de-21af-49e8-a04a-054158eac9ce',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '6025a9de-21af-49e8-a04a-054158eac9ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:38 GMT'
]);
