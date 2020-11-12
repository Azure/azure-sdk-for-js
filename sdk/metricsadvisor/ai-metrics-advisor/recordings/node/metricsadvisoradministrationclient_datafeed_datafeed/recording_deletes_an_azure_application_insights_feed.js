let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/fd952b2f-e935-45f5-bce3-b8a02d0950c3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8aafe64c-2d1d-4c11-afce-b58ac3ab232c',
  'x-envoy-upstream-service-time',
  '688',
  'apim-request-id',
  '8aafe64c-2d1d-4c11-afce-b58ac3ab232c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/fd952b2f-e935-45f5-bce3-b8a02d0950c3')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'de49ae07-bbdc-4a8a-93f4-9b61236bfad5',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'de49ae07-bbdc-4a8a-93f4-9b61236bfad5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:01 GMT'
]);
