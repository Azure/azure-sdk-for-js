let nock = require('nock');

module.exports.hash = "b532a46235a6167fe37a0601d68211ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3c063804-158b-4e2f-80d0-1e178637b036')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5cb32081-d487-4bbd-922d-4c2bf3a5ebea',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  '5cb32081-d487-4bbd-922d-4c2bf3a5ebea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3c063804-158b-4e2f-80d0-1e178637b036')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e60000a9-26ed-4834-ab25-30c5f6837d78',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'e60000a9-26ed-4834-ab25-30c5f6837d78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:58 GMT'
]);
