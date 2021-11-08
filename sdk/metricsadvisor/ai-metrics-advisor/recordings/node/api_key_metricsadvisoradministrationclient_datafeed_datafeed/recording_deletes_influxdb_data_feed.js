let nock = require('nock');

module.exports.hash = "95c25f09cf194bdeaa62de3da2b4d804";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5330d7b1-2e05-4a6d-b708-ab21ce1a402b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1c9f8fea-2c7c-4d93-805e-7923147df638',
  'x-envoy-upstream-service-time',
  '364',
  'apim-request-id',
  '1c9f8fea-2c7c-4d93-805e-7923147df638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5330d7b1-2e05-4a6d-b708-ab21ce1a402b')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9cf50544-df83-4ae7-8cde-cca70d8676c8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '9cf50544-df83-4ae7-8cde-cca70d8676c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:32 GMT'
]);
