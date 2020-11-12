let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/a8c87aa0-52d6-4025-8732-1d1a222237c1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '88d72fc2-0301-45a0-83ac-4b12f8d39616',
  'x-envoy-upstream-service-time',
  '475',
  'apim-request-id',
  '88d72fc2-0301-45a0-83ac-4b12f8d39616',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a8c87aa0-52d6-4025-8732-1d1a222237c1')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1a93f4da-302d-475d-99c2-115d76cadde6',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '1a93f4da-302d-475d-99c2-115d76cadde6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:59 GMT'
]);
