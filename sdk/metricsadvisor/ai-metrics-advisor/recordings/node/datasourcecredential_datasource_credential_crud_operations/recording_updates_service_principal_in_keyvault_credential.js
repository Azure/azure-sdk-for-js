let nock = require('nock');

module.exports.hash = "7be3c94e62b49b6318687c3fa1d9c10d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/aaf125c8-707d-41b9-81b2-9b90a129de07', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163636434695308176","dataSourceCredentialDescription":"updated description","parameters":{"keyVaultEndpoint":"updated-keyvault-endpoint","keyVaultClientId":"updated-keyvault-client-id","keyVaultClientSecret":"updated-keyvault-client-secret","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"aaf125c8-707d-41b9-81b2-9b90a129de07","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163636434695308176","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '532',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9f769eca-989b-44b8-af17-e32dfde973a4',
  'x-envoy-upstream-service-time',
  '371',
  'apim-request-id',
  '9f769eca-989b-44b8-af17-e32dfde973a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);
