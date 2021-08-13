let nock = require('nock');

module.exports.hash = "dd9d3737f1407f2c7563f2ae1728ce3b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f51a7f02-7333-4429-921c-36acc31fdb04')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7a384abc-2d5c-4307-afb7-960c60bf71c0',
  'x-envoy-upstream-service-time',
  '405',
  'apim-request-id',
  '7a384abc-2d5c-4307-afb7-960c60bf71c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f51a7f02-7333-4429-921c-36acc31fdb04')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ddc3ad43-19d0-4f55-b8ac-2fe2605339cf',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'ddc3ad43-19d0-4f55-b8ac-2fe2605339cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:07 GMT'
]);
