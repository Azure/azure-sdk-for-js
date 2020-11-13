let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/97b88d8c-4ff7-4a3d-bc16-3556982e69a8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '36f86e5c-2604-42cc-bff6-c57f900ba953',
  'x-envoy-upstream-service-time',
  '692',
  'apim-request-id',
  '36f86e5c-2604-42cc-bff6-c57f900ba953',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/97b88d8c-4ff7-4a3d-bc16-3556982e69a8')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a8a763bf-19c6-4adf-8d04-2ef0ad55885a',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'a8a763bf-19c6-4adf-8d04-2ef0ad55885a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:08 GMT'
]);
