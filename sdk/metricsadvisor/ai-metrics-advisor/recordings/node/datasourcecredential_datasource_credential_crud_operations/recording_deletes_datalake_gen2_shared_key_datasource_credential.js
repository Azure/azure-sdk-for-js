let nock = require('nock');

module.exports.hash = "a7e884bf029eb2cbf4e153650529df49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/d4348883-7f69-4f3e-9523-bde85ae79abb')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '15e0e72a-cfe1-4534-b57f-b46192a26037',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '15e0e72a-cfe1-4534-b57f-b46192a26037',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d4348883-7f69-4f3e-9523-bde85ae79abb')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'da16aff3-3a91-4cc9-9613-be7e5dc81431',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'da16aff3-3a91-4cc9-9613-be7e5dc81431',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);
