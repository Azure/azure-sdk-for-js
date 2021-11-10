let nock = require('nock');

module.exports.hash = "44a5fcea9bd5ac23896f5b38bbf86c7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/aaf125c8-707d-41b9-81b2-9b90a129de07')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9fc848ee-a7c3-4eb7-97db-abdccf780a0c',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '9fc848ee-a7c3-4eb7-97db-abdccf780a0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/aaf125c8-707d-41b9-81b2-9b90a129de07')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ec180e45-b6c5-466c-a702-b039766603d3',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'ec180e45-b6c5-466c-a702-b039766603d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:11 GMT'
]);
