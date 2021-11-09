let nock = require('nock');

module.exports.hash = "790bf13118df991b0e5282bac10fadec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163636434695308176","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"keyVaultEndpoint":"keyvault-endpoint","keyVaultClientId":"keyvault-client-id","keyVaultClientSecret":"keyvault-client-secret","servicePrincipalIdNameInKV":"service-principal-in-kv","servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/aaf125c8-707d-41b9-81b2-9b90a129de07',
  'x-request-id',
  '83d0132c-2f77-4574-9d8c-2b480f427dcd',
  'x-envoy-upstream-service-time',
  '288',
  'apim-request-id',
  '83d0132c-2f77-4574-9d8c-2b480f427dcd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/aaf125c8-707d-41b9-81b2-9b90a129de07')
  .reply(200, {"dataSourceCredentialId":"aaf125c8-707d-41b9-81b2-9b90a129de07","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163636434695308176","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"service-principal-in-kv","tenantId":"tenant-id","keyVaultClientId":"keyvault-client-id","keyVaultEndpoint":"keyvault-endpoint"}}, [
  'Content-Length',
  '506',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '66f14db2-c2fb-4182-9edb-d26d6499e412',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '66f14db2-c2fb-4182-9edb-d26d6499e412',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:09 GMT'
]);
