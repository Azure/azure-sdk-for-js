let nock = require('nock');

module.exports.hash = "7be3c94e62b49b6318687c3fa1d9c10d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/f08830ff-ef02-481d-a697-8cc1b8610ee2', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163702281643108508","dataSourceCredentialDescription":"updated description","parameters":{"keyVaultEndpoint":"updated-keyvault-endpoint","keyVaultClientId":"updated-keyvault-client-id","keyVaultClientSecret":"updated-keyvault-client-secret","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"f08830ff-ef02-481d-a697-8cc1b8610ee2","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163702281643108508","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '532',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '04d79e21-79fd-43a4-a5c7-31aff4931bee',
  'x-envoy-upstream-service-time',
  '343',
  'apim-request-id',
  '04d79e21-79fd-43a4-a5c7-31aff4931bee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:39 GMT'
]);
