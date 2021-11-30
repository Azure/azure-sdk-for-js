let nock = require('nock');

module.exports.hash = "c93d3a58b35e0b0f5fb77bac6758413a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/d92566c8-6a08-4ddc-917f-120139250878', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-163702281643106518","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"d92566c8-6a08-4ddc-917f-120139250878","dataSourceCredentialName":"js-test-servicePrincipalCred-163702281643106518","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dfb1a420-9460-4320-9e8c-9f9257b40fae',
  'x-envoy-upstream-service-time',
  '520',
  'apim-request-id',
  'dfb1a420-9460-4320-9e8c-9f9257b40fae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:38 GMT'
]);
