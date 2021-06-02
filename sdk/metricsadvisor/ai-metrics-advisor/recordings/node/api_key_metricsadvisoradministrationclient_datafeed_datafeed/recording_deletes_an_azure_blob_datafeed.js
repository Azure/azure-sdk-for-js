let nock = require('nock');

module.exports.hash = "3467b9577b6a0cbbc2fd9cd5043145f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c375e961-d088-4b84-a1ca-90c61966c61c',
  'x-envoy-upstream-service-time',
  '465',
  'apim-request-id',
  'c375e961-d088-4b84-a1ca-90c61966c61c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0b778054-b071-4784-9f72-4652644aa677',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '0b778054-b071-4784-9f72-4652644aa677',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:16 GMT'
]);
