let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f6b33ecd-2bb4-4ab2-8a4c-e9327bd9ad22')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f8d3d0ae-f2a3-4ab5-877b-069ba4964dd6',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  'f8d3d0ae-f2a3-4ab5-877b-069ba4964dd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:39 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f6b33ecd-2bb4-4ab2-8a4c-e9327bd9ad22')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2a3ce91e-7b65-46ee-86c0-0c2ae68bfb6f',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '2a3ce91e-7b65-46ee-86c0-0c2ae68bfb6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:38 GMT',
  'Connection',
  'close'
]);
