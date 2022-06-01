let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/70d94864-501a-4a69-ac14-b38e00ba55fc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bc82d9bf-0929-4cec-99bd-0ac56ecccd50',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  'bc82d9bf-0929-4cec-99bd-0ac56ecccd50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/70d94864-501a-4a69-ac14-b38e00ba55fc')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6d42e86e-4087-4870-bf0e-591e1d45b265',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '6d42e86e-4087-4870-bf0e-591e1d45b265',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:20 GMT'
]);
