let nock = require('nock');

module.exports.hash = "058ade2115d4866eaa76b1212287706e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/c81898d7-ba8c-4da2-9dc4-de57b37efe06', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"UpdatedSPinKVCred","dataSourceCredentialDescription":"updated description","parameters":{"keyVaultEndpoint":"updated-keyvault-endpoint","keyVaultClientId":"updated-keyvault-client-id","keyVaultClientSecret":"updated-keyvault-client-secret","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"c81898d7-ba8c-4da2-9dc4-de57b37efe06","dataSourceCredentialName":"UpdatedSPinKVCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '498',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '20e226a9-365d-4528-af47-84e0c19a18ae',
  'x-envoy-upstream-service-time',
  '1205',
  'apim-request-id',
  '20e226a9-365d-4528-af47-84e0c19a18ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:17 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c81898d7-ba8c-4da2-9dc4-de57b37efe06')
  .reply(200, {"dataSourceCredentialId":"c81898d7-ba8c-4da2-9dc4-de57b37efe06","dataSourceCredentialName":"UpdatedSPinKVCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}}, [
  'Content-Length',
  '498',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3fe5e787-9386-4045-b94e-078c84f33024',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '3fe5e787-9386-4045-b94e-078c84f33024',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:17 GMT',
  'Connection',
  'close'
]);
