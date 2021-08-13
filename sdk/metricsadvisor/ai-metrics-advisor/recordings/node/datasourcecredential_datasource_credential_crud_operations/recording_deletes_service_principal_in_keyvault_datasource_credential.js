let nock = require('nock');

module.exports.hash = "44a5fcea9bd5ac23896f5b38bbf86c7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/99487362-fcd3-4745-b522-7a776e9bb6b4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c828161e-e900-47d0-b37a-5148a2587f72',
  'x-envoy-upstream-service-time',
  '334',
  'apim-request-id',
  'c828161e-e900-47d0-b37a-5148a2587f72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:27:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/99487362-fcd3-4745-b522-7a776e9bb6b4')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6d013d22-3daf-45a6-8d60-b1b1032952e6',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '6d013d22-3daf-45a6-8d60-b1b1032952e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:27:00 GMT'
]);
