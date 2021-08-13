let nock = require('nock');

module.exports.hash = "c93d3a58b35e0b0f5fb77bac6758413a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/d1916ee9-be4b-453c-a9c3-38ccdad5672a', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-162527918841009052","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"d1916ee9-be4b-453c-a9c3-38ccdad5672a","dataSourceCredentialName":"js-test-servicePrincipalCred-162527918841009052","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5250bb3b-8d34-46ad-8595-b646e68fbb05',
  'x-envoy-upstream-service-time',
  '785',
  'apim-request-id',
  '5250bb3b-8d34-46ad-8595-b646e68fbb05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:45 GMT'
]);
