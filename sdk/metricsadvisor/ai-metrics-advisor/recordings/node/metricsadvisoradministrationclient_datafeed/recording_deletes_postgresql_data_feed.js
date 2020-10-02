let nock = require('nock');

module.exports.hash = "92fe237ca5eef2e18e119bd3c53e14ce";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/4ec30e05-9607-47dd-9742-90b3ba302123')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c8554806-d9b2-4eeb-86cf-fa8796d58d5d',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  'c8554806-d9b2-4eeb-86cf-fa8796d58d5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4ec30e05-9607-47dd-9742-90b3ba302123')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b572331b-c7f1-4ce3-bf3f-7cc803a17656',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'b572331b-c7f1-4ce3-bf3f-7cc803a17656',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:43 GMT'
]);
