let nock = require('nock');

module.exports.hash = "44a5fcea9bd5ac23896f5b38bbf86c7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/fe484186-7d3e-4ccc-9875-ab931019cc68')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0755d1f3-a962-4b2d-85e4-8eac8b57fa08',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '0755d1f3-a962-4b2d-85e4-8eac8b57fa08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/fe484186-7d3e-4ccc-9875-ab931019cc68')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '485f4341-6354-4c03-ae50-61c11f34748a',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '485f4341-6354-4c03-ae50-61c11f34748a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:01 GMT'
]);
