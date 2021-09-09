let nock = require('nock');

module.exports.hash = "d98981d9bf602515a1154516d3524da1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/d1916ee9-be4b-453c-a9c3-38ccdad5672a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '05e30b21-7a6d-4eee-bc9a-c9cff1984742',
  'x-envoy-upstream-service-time',
  '334',
  'apim-request-id',
  '05e30b21-7a6d-4eee-bc9a-c9cff1984742',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d1916ee9-be4b-453c-a9c3-38ccdad5672a')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '00a33d52-545d-4e61-9c9c-1e293108f142',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '00a33d52-545d-4e61-9c9c-1e293108f142',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:59 GMT'
]);
