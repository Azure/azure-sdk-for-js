let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/99e72aab-1d84-4bfe-80fb-1ce6754511cc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e08b6a7f-237c-40db-9257-6a813f7eed4c',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  'e08b6a7f-237c-40db-9257-6a813f7eed4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/99e72aab-1d84-4bfe-80fb-1ce6754511cc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ef8dc6e7-e1e5-470c-bbac-a3b98017ff63',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'ef8dc6e7-e1e5-470c-bbac-a3b98017ff63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:54 GMT'
]);
