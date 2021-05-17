let nock = require('nock');

module.exports.hash = "306ac624242c264b71f793ddad9dfc4e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/1005f307-4cb0-40cf-8c17-e2160babcd1b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '50e04810-b59c-4e06-acf4-9192689b1605',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  '50e04810-b59c-4e06-acf4-9192689b1605',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/1005f307-4cb0-40cf-8c17-e2160babcd1b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '30775a7b-5cbf-4ae0-b832-061258549f09',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '30775a7b-5cbf-4ae0-b832-061258549f09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:47 GMT'
]);
