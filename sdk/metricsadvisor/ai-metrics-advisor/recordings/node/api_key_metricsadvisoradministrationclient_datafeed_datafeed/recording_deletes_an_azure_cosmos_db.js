let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/62165776-5ccb-46a4-a211-a0bd02769989')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e03e8dbd-476a-4765-9425-5ae7d6b0a6a0',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  'e03e8dbd-476a-4765-9425-5ae7d6b0a6a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/62165776-5ccb-46a4-a211-a0bd02769989')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e276e649-a6a7-4373-b6e7-acc2fa573abb',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'e276e649-a6a7-4373-b6e7-acc2fa573abb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:18 GMT'
]);
