let nock = require('nock');

module.exports.hash = "790bf13118df991b0e5282bac10fadec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163978895648400227","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"keyVaultEndpoint":"keyvault-endpoint","keyVaultClientId":"keyvault-client-id","keyVaultClientSecret":"keyvault-client-secret","servicePrincipalIdNameInKV":"service-principal-in-kv","servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/credentials/fe484186-7d3e-4ccc-9875-ab931019cc68',
  'x-request-id',
  '1ad9f60c-54e7-40d4-b63f-52c8bbd0b04f',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '1ad9f60c-54e7-40d4-b63f-52c8bbd0b04f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/fe484186-7d3e-4ccc-9875-ab931019cc68')
  .reply(200, {"dataSourceCredentialId":"fe484186-7d3e-4ccc-9875-ab931019cc68","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163978895648400227","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"service-principal-in-kv","tenantId":"tenant-id","keyVaultClientId":"keyvault-client-id","keyVaultEndpoint":"keyvault-endpoint"}}, [
  'Content-Length',
  '506',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9c29a50d-1035-47a0-86d8-3e5bc841ebd2',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '9c29a50d-1035-47a0-86d8-3e5bc841ebd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:59 GMT'
]);
