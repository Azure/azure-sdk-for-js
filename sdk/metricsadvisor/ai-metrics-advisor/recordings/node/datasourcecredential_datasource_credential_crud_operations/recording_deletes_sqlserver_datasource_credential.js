let nock = require('nock');

module.exports.hash = "62bf2de974cc718245b0129b75e1b5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e6377afe-553b-4754-b239-700a6e3ab6ad',
  'x-envoy-upstream-service-time',
  '345',
  'apim-request-id',
  'e6377afe-553b-4754-b239-700a6e3ab6ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '46d6616a-bc8e-4c28-bad0-c2939c2839e0',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '46d6616a-bc8e-4c28-bad0-c2939c2839e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:58 GMT'
]);
