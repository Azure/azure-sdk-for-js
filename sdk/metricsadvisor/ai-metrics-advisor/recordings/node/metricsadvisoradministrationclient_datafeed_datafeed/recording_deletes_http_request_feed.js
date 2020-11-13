let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/bfc9c86f-7adc-4b5a-b5a8-69e26dad979c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '03c889ce-e28f-44cc-956b-e9df0d928135',
  'x-envoy-upstream-service-time',
  '398',
  'apim-request-id',
  '03c889ce-e28f-44cc-956b-e9df0d928135',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/bfc9c86f-7adc-4b5a-b5a8-69e26dad979c')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'be4948b7-1d59-4497-aa15-5a2649626ee5',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'be4948b7-1d59-4497-aa15-5a2649626ee5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:49 GMT'
]);
