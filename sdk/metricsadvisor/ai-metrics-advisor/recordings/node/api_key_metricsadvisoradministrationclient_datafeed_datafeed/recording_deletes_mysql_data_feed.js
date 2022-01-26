let nock = require('nock');

module.exports.hash = "6736fa1edd97ca9694f3279647ec71ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c8b97327-4bd1-489b-b5fa-3811842f73a3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0609f497-d275-458c-9f75-c69efa539eef',
  'x-envoy-upstream-service-time',
  '249',
  'apim-request-id',
  '0609f497-d275-458c-9f75-c69efa539eef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c8b97327-4bd1-489b-b5fa-3811842f73a3')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '02c73826-be29-4bb1-989c-aedaaab418e7',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '02c73826-be29-4bb1-989c-aedaaab418e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:24 GMT'
]);
