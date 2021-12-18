let nock = require('nock');

module.exports.hash = "7be3c94e62b49b6318687c3fa1d9c10d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/fe484186-7d3e-4ccc-9875-ab931019cc68', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163978895648400227","dataSourceCredentialDescription":"updated description","parameters":{"keyVaultEndpoint":"updated-keyvault-endpoint","keyVaultClientId":"updated-keyvault-client-id","keyVaultClientSecret":"updated-keyvault-client-secret","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"fe484186-7d3e-4ccc-9875-ab931019cc68","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163978895648400227","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '532',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b8b40096-2099-42d4-ad06-44e2195d8c61',
  'x-envoy-upstream-service-time',
  '316',
  'apim-request-id',
  'b8b40096-2099-42d4-ad06-44e2195d8c61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:59 GMT'
]);
