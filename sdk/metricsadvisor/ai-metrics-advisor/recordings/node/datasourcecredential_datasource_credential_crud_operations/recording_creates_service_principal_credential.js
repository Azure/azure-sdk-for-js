let nock = require('nock');

module.exports.hash = "2e4fa53335bfc4a276c6308e83b59eb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-164264036985605505","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/60cae6ef-62d5-4dcf-9491-c0a0884b64e4',
  'x-request-id',
  'f5e98405-60b0-462b-b04a-39c532bc0c7a',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  'f5e98405-60b0-462b-b04a-39c532bc0c7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/60cae6ef-62d5-4dcf-9491-c0a0884b64e4')
  .reply(200, {"dataSourceCredentialId":"60cae6ef-62d5-4dcf-9491-c0a0884b64e4","dataSourceCredentialName":"js-test-servicePrincipalCred-164264036985605505","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '316',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f92bbe88-9b04-464c-ae66-3345a31a82dc',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'f92bbe88-9b04-464c-ae66-3345a31a82dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:31 GMT'
]);
