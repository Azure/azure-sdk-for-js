let nock = require('nock');

module.exports.hash = "a7e884bf029eb2cbf4e153650529df49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/800a0e38-98a1-474e-bf87-c1ae5ad9214e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2b1745c9-e53a-4131-bb74-102422fea0af',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '2b1745c9-e53a-4131-bb74-102422fea0af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/800a0e38-98a1-474e-bf87-c1ae5ad9214e')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a3bb73b7-1cff-49aa-88fd-d7bec479259f',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'a3bb73b7-1cff-49aa-88fd-d7bec479259f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:01 GMT'
]);
