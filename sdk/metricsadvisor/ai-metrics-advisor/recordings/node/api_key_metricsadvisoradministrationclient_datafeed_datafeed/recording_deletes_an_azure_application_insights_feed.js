let nock = require('nock');

module.exports.hash = "81ce971f29723c92439a2f7abf28283b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/a91ffbde-b243-4a40-aa8c-00485d611297')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f4a7879b-cdb8-41bb-8d46-8f8ffcfd4f5c',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  'f4a7879b-cdb8-41bb-8d46-8f8ffcfd4f5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a91ffbde-b243-4a40-aa8c-00485d611297')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3fdb9246-624a-43d2-a55d-36591911b1d0',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '3fdb9246-624a-43d2-a55d-36591911b1d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:23 GMT'
]);
