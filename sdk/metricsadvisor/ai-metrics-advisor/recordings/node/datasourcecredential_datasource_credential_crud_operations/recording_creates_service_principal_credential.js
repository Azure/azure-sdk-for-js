let nock = require('nock');

module.exports.hash = "fdff5ea578619d2979bdb998c7d36edd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"ExampleSPCredential","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/3ee2df85-919c-4e6a-b0b4-dca40b2d7b10',
  'x-request-id',
  '7c73f317-b058-4084-93e1-a7918c0cbfcf',
  'x-envoy-upstream-service-time',
  '360',
  'apim-request-id',
  '7c73f317-b058-4084-93e1-a7918c0cbfcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:13 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/3ee2df85-919c-4e6a-b0b4-dca40b2d7b10')
  .reply(200, {"dataSourceCredentialId":"3ee2df85-919c-4e6a-b0b4-dca40b2d7b10","dataSourceCredentialName":"ExampleSPCredential","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'afdcc9ea-3a43-4c98-88d1-23fc6d3101a0',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'afdcc9ea-3a43-4c98-88d1-23fc6d3101a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:15 GMT',
  'Connection',
  'close'
]);
