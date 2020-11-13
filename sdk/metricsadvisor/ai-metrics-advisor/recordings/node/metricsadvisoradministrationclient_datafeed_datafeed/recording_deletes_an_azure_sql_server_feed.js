let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/bb9a7c37-a7f3-4edd-a759-e68ed4b75936')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'abd366d0-6498-40b8-b871-ade2e9f21afe',
  'x-envoy-upstream-service-time',
  '411',
  'apim-request-id',
  'abd366d0-6498-40b8-b871-ade2e9f21afe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/bb9a7c37-a7f3-4edd-a759-e68ed4b75936')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1bcc8988-48d8-4cb8-96f0-70a6bf94e1c8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '1bcc8988-48d8-4cb8-96f0-70a6bf94e1c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:11 GMT'
]);
