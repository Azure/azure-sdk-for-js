let nock = require('nock');

module.exports.hash = "64cf5c6126184b4197c02d4fc2aa63fc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/32466738-1a3e-492f-8bad-b3ddb2f4be78')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1c7765aa-9ee2-4930-be7e-b7b52f3482f9',
  'x-envoy-upstream-service-time',
  '435',
  'apim-request-id',
  '1c7765aa-9ee2-4930-be7e-b7b52f3482f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/32466738-1a3e-492f-8bad-b3ddb2f4be78')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2ae700ee-d520-43cf-ab1c-d2a81f64c688',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '2ae700ee-d520-43cf-ab1c-d2a81f64c688',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:41 GMT'
]);
