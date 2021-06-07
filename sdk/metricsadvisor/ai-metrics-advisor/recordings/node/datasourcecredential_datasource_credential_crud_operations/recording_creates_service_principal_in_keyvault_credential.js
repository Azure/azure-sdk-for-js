let nock = require('nock');

module.exports.hash = "fcb4b93a6e1d23454bb728551bb56cbb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"ExampleSPinKVCredential","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"keyVaultEndpoint":"keyvault-endpoint","keyVaultClientId":"keyvault-client-id","keyVaultClientSecret":"keyvault-client-secret","servicePrincipalIdNameInKV":"service-principal-in-kv","servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/c81898d7-ba8c-4da2-9dc4-de57b37efe06',
  'x-request-id',
  'b1b9cadd-098b-4881-a368-b22c77fed837',
  'x-envoy-upstream-service-time',
  '397',
  'apim-request-id',
  'b1b9cadd-098b-4881-a368-b22c77fed837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:15 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c81898d7-ba8c-4da2-9dc4-de57b37efe06')
  .reply(200, {"dataSourceCredentialId":"c81898d7-ba8c-4da2-9dc4-de57b37efe06","dataSourceCredentialName":"ExampleSPinKVCredential","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"service-principal-in-kv","tenantId":"tenant-id","keyVaultClientId":"keyvault-client-id","keyVaultEndpoint":"keyvault-endpoint"}}, [
  'Content-Length',
  '478',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cdc9ec75-cc7c-4e1c-9857-1f07fee99ef0',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'cdc9ec75-cc7c-4e1c-9857-1f07fee99ef0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:16 GMT',
  'Connection',
  'close'
]);
