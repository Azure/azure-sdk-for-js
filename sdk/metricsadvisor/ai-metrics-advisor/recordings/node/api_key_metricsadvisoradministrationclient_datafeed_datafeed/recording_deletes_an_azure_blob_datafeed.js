let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0ae4f903-cd73-4ffc-b248-b310a8fd7620')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ff92b1a2-f10b-4208-8290-eceab8c1a483',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  'ff92b1a2-f10b-4208-8290-eceab8c1a483',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0ae4f903-cd73-4ffc-b248-b310a8fd7620')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '016d4206-08e1-4a35-be91-2f31d4c55385',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '016d4206-08e1-4a35-be91-2f31d4c55385',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:16 GMT'
]);
