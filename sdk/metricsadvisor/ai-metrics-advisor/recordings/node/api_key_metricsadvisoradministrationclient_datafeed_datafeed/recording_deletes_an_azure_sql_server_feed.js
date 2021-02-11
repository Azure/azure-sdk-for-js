let nock = require('nock');

module.exports.hash = "b2209a17485822432cf80b656050872d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ba83086a-880b-4e8b-a5a4-0ba260e74ecd')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f823808f-58e4-47a0-bfbf-7fde8dffda45',
  'x-envoy-upstream-service-time',
  '401',
  'apim-request-id',
  'f823808f-58e4-47a0-bfbf-7fde8dffda45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ba83086a-880b-4e8b-a5a4-0ba260e74ecd')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '041036bd-d9fa-48f9-80af-50be636aa042',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '041036bd-d9fa-48f9-80af-50be636aa042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:30 GMT'
]);
