let nock = require('nock');

module.exports.hash = "f192d3f68b63ab57b2ed0ca99ba41afe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/60cae6ef-62d5-4dcf-9491-c0a0884b64e4', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-164264036985605505","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"60cae6ef-62d5-4dcf-9491-c0a0884b64e4","dataSourceCredentialName":"js-test-servicePrincipalCred-164264036985605505","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c9e1233b-940d-4713-b69e-76da6c8b0311',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'c9e1233b-940d-4713-b69e-76da6c8b0311',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:32 GMT'
]);
