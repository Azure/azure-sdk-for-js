let nock = require('nock');

module.exports.hash = "3f2f2e52becb7dfc9578a36e9342eca6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/59b66b44-7558-46c1-8dc4-df31839467e6', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164160823668206422","dataSourceCredentialDescription":"updated description","parameters":{"keyVaultEndpoint":"updated-keyvault-endpoint","keyVaultClientId":"updated-keyvault-client-id","keyVaultClientSecret":"updated-keyvault-client-secret","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"59b66b44-7558-46c1-8dc4-df31839467e6","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164160823668206422","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '532',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a9ac3b88-e291-4584-a829-402cdde4f6cd',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  'a9ac3b88-e291-4584-a829-402cdde4f6cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:19 GMT'
]);
