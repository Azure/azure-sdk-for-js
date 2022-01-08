let nock = require('nock');

module.exports.hash = "d98981d9bf602515a1154516d3524da1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/ad883651-15cb-4f24-96c1-f8d201f06e27')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0ef2c155-e038-43af-8650-73c9d78acada',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '0ef2c155-e038-43af-8650-73c9d78acada',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/ad883651-15cb-4f24-96c1-f8d201f06e27')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c94c9681-737c-4190-938f-d04053a25647',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'c94c9681-737c-4190-938f-d04053a25647',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);
