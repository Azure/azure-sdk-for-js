let nock = require('nock');

module.exports.hash = "b532a46235a6167fe37a0601d68211ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/d98674ef-0215-4008-8f2d-3551a916afd3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2b380df2-702d-45fe-a40a-c64b6e399fa5',
  'x-envoy-upstream-service-time',
  '345',
  'apim-request-id',
  '2b380df2-702d-45fe-a40a-c64b6e399fa5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/d98674ef-0215-4008-8f2d-3551a916afd3')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ea1bd235-b8d6-482c-965c-104bafd62bfd',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'ea1bd235-b8d6-482c-965c-104bafd62bfd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:21 GMT'
]);
