let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/26b7ac5f-0c81-426e-9868-bd105d284e98')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c12c6a1d-b611-4f1a-9c08-fe9bd2cc9bd3',
  'x-envoy-upstream-service-time',
  '408',
  'apim-request-id',
  'c12c6a1d-b611-4f1a-9c08-fe9bd2cc9bd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/26b7ac5f-0c81-426e-9868-bd105d284e98')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '855ac76f-aa11-4263-933a-233517602a33',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '855ac76f-aa11-4263-933a-233517602a33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:49 GMT'
]);
