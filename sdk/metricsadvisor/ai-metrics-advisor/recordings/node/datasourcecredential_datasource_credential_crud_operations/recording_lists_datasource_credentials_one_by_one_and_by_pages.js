let nock = require('nock');

module.exports.hash = "a90e8f42b23cd72d7cd1a558de8699e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"59b66b44-7558-46c1-8dc4-df31839467e6","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164160823668206422","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"ad883651-15cb-4f24-96c1-f8d201f06e27","dataSourceCredentialName":"js-test-servicePrincipalCred-164160823668205408","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"7da36fdb-0164-4165-8d7b-bec00021dc12","dataSourceCredentialName":"js-test-datalakeCred-164160823668202890","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc","dataSourceCredentialName":"js-test-sqlServerCred-164160823668208076","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}]}, [
  'Content-Length',
  '1380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '426df71b-1e25-48bd-ac24-cf28e89903cc',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '426df71b-1e25-48bd-ac24-cf28e89903cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"59b66b44-7558-46c1-8dc4-df31839467e6","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164160823668206422","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"ad883651-15cb-4f24-96c1-f8d201f06e27","dataSourceCredentialName":"js-test-servicePrincipalCred-164160823668205408","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '988',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4f5e1ebf-7928-4d1d-b3c5-4010687bd2b9',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '4f5e1ebf-7928-4d1d-b3c5-4010687bd2b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"7da36fdb-0164-4165-8d7b-bec00021dc12","dataSourceCredentialName":"js-test-datalakeCred-164160823668202890","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc","dataSourceCredentialName":"js-test-sqlServerCred-164160823668208076","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '659',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dab14155-d759-4b9c-a1bc-727a36841e7d',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'dab14155-d759-4b9c-a1bc-727a36841e7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);
