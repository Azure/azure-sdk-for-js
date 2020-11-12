let nock = require('nock');

module.exports.hash = "da39bba3c06162c654185f7c8c2c23d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/44eec0cb-3b62-4e46-a830-cf5b2592dfa8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '20bd7473-15a7-4ca4-beea-9a0266f3192b',
  'x-envoy-upstream-service-time',
  '475',
  'apim-request-id',
  '20bd7473-15a7-4ca4-beea-9a0266f3192b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/44eec0cb-3b62-4e46-a830-cf5b2592dfa8')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c4a17f16-e626-44d6-bfff-77f5c03d9ce6',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'c4a17f16-e626-44d6-bfff-77f5c03d9ce6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:33 GMT'
]);
