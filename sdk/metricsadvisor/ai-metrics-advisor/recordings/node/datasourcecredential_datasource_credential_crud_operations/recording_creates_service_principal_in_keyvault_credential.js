let nock = require('nock');

module.exports.hash = "790bf13118df991b0e5282bac10fadec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipalInKV","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-162527918841007760","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"keyVaultEndpoint":"keyvault-endpoint","keyVaultClientId":"keyvault-client-id","keyVaultClientSecret":"keyvault-client-secret","servicePrincipalIdNameInKV":"service-principal-in-kv","servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/99487362-fcd3-4745-b522-7a776e9bb6b4',
  'x-request-id',
  '6692ab2b-e450-4f47-91eb-b91679a3fd58',
  'x-envoy-upstream-service-time',
  '5708',
  'apim-request-id',
  '6692ab2b-e450-4f47-91eb-b91679a3fd58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/99487362-fcd3-4745-b522-7a776e9bb6b4')
  .reply(200, {"dataSourceCredentialId":"99487362-fcd3-4745-b522-7a776e9bb6b4","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-162527918841007760","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"service-principal-in-kv","tenantId":"tenant-id","keyVaultClientId":"keyvault-client-id","keyVaultEndpoint":"keyvault-endpoint"}}, [
  'Content-Length',
  '506',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9423b981-e6f3-4928-8c3b-2c519db569ef',
  'x-envoy-upstream-service-time',
  '329',
  'apim-request-id',
  '9423b981-e6f3-4928-8c3b-2c519db569ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:51 GMT'
]);
