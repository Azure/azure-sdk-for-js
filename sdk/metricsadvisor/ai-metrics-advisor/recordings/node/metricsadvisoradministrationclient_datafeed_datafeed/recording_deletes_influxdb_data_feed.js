let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/1e77b8e4-e8ab-46ea-a30d-3956f9c967e0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '78f832ad-8f2f-469b-b692-3df4c6863335',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  '78f832ad-8f2f-469b-b692-3df4c6863335',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1e77b8e4-e8ab-46ea-a30d-3956f9c967e0')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4b5e9046-ce94-4046-ad55-ad5cc6e1224b',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '4b5e9046-ce94-4046-ad55-ad5cc6e1224b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:45 GMT'
]);
