let nock = require('nock');

module.exports.hash = "c93d3a58b35e0b0f5fb77bac6758413a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-163636434695309101","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c","dataSourceCredentialName":"js-test-servicePrincipalCred-163636434695309101","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9517d056-6d9c-4253-ad9a-d8684e41fa8c',
  'x-envoy-upstream-service-time',
  '403',
  'apim-request-id',
  '9517d056-6d9c-4253-ad9a-d8684e41fa8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:09 GMT'
]);
