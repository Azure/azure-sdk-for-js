let nock = require('nock');

module.exports.hash = "7be3c94e62b49b6318687c3fa1d9c10d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/99487362-fcd3-4745-b522-7a776e9bb6b4', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-162527918841007760","dataSourceCredentialDescription":"updated description","parameters":{"keyVaultEndpoint":"updated-keyvault-endpoint","keyVaultClientId":"updated-keyvault-client-id","keyVaultClientSecret":"updated-keyvault-client-secret","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"99487362-fcd3-4745-b522-7a776e9bb6b4","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-162527918841007760","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '532',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd5bea16d-1ec7-4082-84d5-dd5c5dd71c19',
  'x-envoy-upstream-service-time',
  '801',
  'apim-request-id',
  'd5bea16d-1ec7-4082-84d5-dd5c5dd71c19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:52 GMT'
]);
