let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/bb398970-3714-4b9c-95a7-db740e93cad1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f0c3b502-30c9-4883-ba0f-cdf8557c00e4',
  'x-envoy-upstream-service-time',
  '701',
  'apim-request-id',
  'f0c3b502-30c9-4883-ba0f-cdf8557c00e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/bb398970-3714-4b9c-95a7-db740e93cad1')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2c048272-2293-4df8-83b3-8e0dbed83ee5',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '2c048272-2293-4df8-83b3-8e0dbed83ee5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:55 GMT'
]);
