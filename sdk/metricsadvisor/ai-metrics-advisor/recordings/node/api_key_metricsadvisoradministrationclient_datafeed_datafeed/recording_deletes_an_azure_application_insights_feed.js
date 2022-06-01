let nock = require('nock');

module.exports.hash = "81ce971f29723c92439a2f7abf28283b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/06167af2-3649-480c-82a7-b50cd489aa9d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '917183c5-a1c5-4546-9de4-94770c02c421',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  '917183c5-a1c5-4546-9de4-94770c02c421',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/06167af2-3649-480c-82a7-b50cd489aa9d')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5fdc40c3-040f-4ea0-9c2b-d60e1a4109d6',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '5fdc40c3-040f-4ea0-9c2b-d60e1a4109d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:17 GMT'
]);
