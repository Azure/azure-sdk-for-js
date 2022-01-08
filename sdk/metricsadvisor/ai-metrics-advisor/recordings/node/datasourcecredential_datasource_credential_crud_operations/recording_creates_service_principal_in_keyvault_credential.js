let nock = require('nock');

module.exports.hash = "790bf13118df991b0e5282bac10fadec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164160823668206422","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"keyVaultEndpoint":"keyvault-endpoint","keyVaultClientId":"keyvault-client-id","keyVaultClientSecret":"keyvault-client-secret","servicePrincipalIdNameInKV":"service-principal-in-kv","servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/59b66b44-7558-46c1-8dc4-df31839467e6',
  'x-request-id',
  '9add933f-374f-4621-bf39-695a1788a121',
  'x-envoy-upstream-service-time',
  '246',
  'apim-request-id',
  '9add933f-374f-4621-bf39-695a1788a121',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/59b66b44-7558-46c1-8dc4-df31839467e6')
  .reply(200, {"dataSourceCredentialId":"59b66b44-7558-46c1-8dc4-df31839467e6","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164160823668206422","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"service-principal-in-kv","tenantId":"tenant-id","keyVaultClientId":"keyvault-client-id","keyVaultEndpoint":"keyvault-endpoint"}}, [
  'Content-Length',
  '506',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '47d8b2c5-f5f0-4b92-a590-a87bdcd2f860',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '47d8b2c5-f5f0-4b92-a590-a87bdcd2f860',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:19 GMT'
]);
