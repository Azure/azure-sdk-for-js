let nock = require('nock');

module.exports.hash = "4de38b90c2a36be689420c322f85a504";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/be0c9796-4419-4f33-bbde-2050c07d3a0e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '26d1dfb2-a8d9-4dd3-b1da-7ec632fdb8d4',
  'x-envoy-upstream-service-time',
  '359',
  'apim-request-id',
  '26d1dfb2-a8d9-4dd3-b1da-7ec632fdb8d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/be0c9796-4419-4f33-bbde-2050c07d3a0e')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1878e8fa-fd99-436f-a026-6d4571eb70f7',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '1878e8fa-fd99-436f-a026-6d4571eb70f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:04 GMT'
]);
