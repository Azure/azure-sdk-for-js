let nock = require('nock');

module.exports.hash = "f192d3f68b63ab57b2ed0ca99ba41afe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/ad883651-15cb-4f24-96c1-f8d201f06e27', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-164160823668205408","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"ad883651-15cb-4f24-96c1-f8d201f06e27","dataSourceCredentialName":"js-test-servicePrincipalCred-164160823668205408","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c120ac0c-e7bc-4e56-a357-b54eca01bd8c',
  'x-envoy-upstream-service-time',
  '331',
  'apim-request-id',
  'c120ac0c-e7bc-4e56-a357-b54eca01bd8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:19 GMT'
]);
