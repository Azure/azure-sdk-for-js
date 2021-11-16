let nock = require('nock');

module.exports.hash = "790bf13118df991b0e5282bac10fadec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163702281643108508","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"keyVaultEndpoint":"keyvault-endpoint","keyVaultClientId":"keyvault-client-id","keyVaultClientSecret":"keyvault-client-secret","servicePrincipalIdNameInKV":"service-principal-in-kv","servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/f08830ff-ef02-481d-a697-8cc1b8610ee2',
  'x-request-id',
  '08261421-d5dc-49af-aa34-fd7345289d4e',
  'x-envoy-upstream-service-time',
  '310',
  'apim-request-id',
  '08261421-d5dc-49af-aa34-fd7345289d4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/f08830ff-ef02-481d-a697-8cc1b8610ee2')
  .reply(200, {"dataSourceCredentialId":"f08830ff-ef02-481d-a697-8cc1b8610ee2","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163702281643108508","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"service-principal-in-kv","tenantId":"tenant-id","keyVaultClientId":"keyvault-client-id","keyVaultEndpoint":"keyvault-endpoint"}}, [
  'Content-Length',
  '506',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '478ead94-e69e-4842-b3da-78b44f3ad8bc',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '478ead94-e69e-4842-b3da-78b44f3ad8bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:39 GMT'
]);
