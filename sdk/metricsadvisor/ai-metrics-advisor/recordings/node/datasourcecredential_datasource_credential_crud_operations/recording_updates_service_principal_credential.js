let nock = require('nock');

module.exports.hash = "c93d3a58b35e0b0f5fb77bac6758413a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/ec229472-182b-4961-bcd0-c329f6aa5f4a', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-163978895648408359","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"ec229472-182b-4961-bcd0-c329f6aa5f4a","dataSourceCredentialName":"js-test-servicePrincipalCred-163978895648408359","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ed85ec75-efe7-4e3e-a4a9-36762b8bd371',
  'x-envoy-upstream-service-time',
  '347',
  'apim-request-id',
  'ed85ec75-efe7-4e3e-a4a9-36762b8bd371',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:59 GMT'
]);
