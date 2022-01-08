let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/35f7d888-4d68-42fc-ab69-7ff2623eced4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4ccb4c28-cc3c-41d1-80d5-434c5e71546a',
  'x-envoy-upstream-service-time',
  '342',
  'apim-request-id',
  '4ccb4c28-cc3c-41d1-80d5-434c5e71546a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/35f7d888-4d68-42fc-ab69-7ff2623eced4')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fe2653d2-b64d-4e48-80ba-c83f597dd9ce',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'fe2653d2-b64d-4e48-80ba-c83f597dd9ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:05 GMT'
]);
