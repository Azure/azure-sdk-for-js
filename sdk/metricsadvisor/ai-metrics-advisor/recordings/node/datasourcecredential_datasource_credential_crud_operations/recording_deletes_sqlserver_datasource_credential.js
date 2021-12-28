let nock = require('nock');

module.exports.hash = "62bf2de974cc718245b0129b75e1b5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/44d64215-151e-441d-a446-44477a71f5c6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'edeefb71-f7e4-4196-a74c-8f861006327f',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'edeefb71-f7e4-4196-a74c-8f861006327f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/44d64215-151e-441d-a446-44477a71f5c6')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '257d2be9-03f1-479e-999c-3814c76da38c',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '257d2be9-03f1-479e-999c-3814c76da38c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);
