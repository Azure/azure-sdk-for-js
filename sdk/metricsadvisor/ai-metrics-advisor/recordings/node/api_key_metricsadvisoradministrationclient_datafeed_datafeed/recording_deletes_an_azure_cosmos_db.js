let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/32082c27-302a-4970-a5a8-cbe68d59e60c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e7f8ba15-4f6c-4d46-9c65-2745577b90d8',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  'e7f8ba15-4f6c-4d46-9c65-2745577b90d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/32082c27-302a-4970-a5a8-cbe68d59e60c')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3e3add73-4ef5-4f49-a6df-1de20ac223a3',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '3e3add73-4ef5-4f49-a6df-1de20ac223a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:25 GMT'
]);
