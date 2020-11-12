let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f28d592f-baae-4d8f-ac7c-eabfb85d57ea')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '442f0865-3dae-45bc-b34d-526a635ae4fc',
  'x-envoy-upstream-service-time',
  '343',
  'apim-request-id',
  '442f0865-3dae-45bc-b34d-526a635ae4fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f28d592f-baae-4d8f-ac7c-eabfb85d57ea')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e2d316ea-e64c-4752-9acf-f8d66d20c3d9',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'e2d316ea-e64c-4752-9acf-f8d66d20c3d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:03 GMT'
]);
