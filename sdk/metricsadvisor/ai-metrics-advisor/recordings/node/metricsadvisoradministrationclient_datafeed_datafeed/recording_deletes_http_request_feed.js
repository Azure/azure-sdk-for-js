let nock = require('nock');

module.exports.hash = "22290994c5cf7b8b970cb8203d6e1b5b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/043dcc0c-4a74-45a5-9d60-6e9546d025d3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '01359ff3-a818-4a3d-bb54-a50b81f571fb',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '01359ff3-a818-4a3d-bb54-a50b81f571fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/043dcc0c-4a74-45a5-9d60-6e9546d025d3')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '714f4a06-ebea-4bf9-b420-5bab3b85251b',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '714f4a06-ebea-4bf9-b420-5bab3b85251b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:54 GMT'
]);
