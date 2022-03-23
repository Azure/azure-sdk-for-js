let nock = require('nock');

module.exports.hash = "a90e8f42b23cd72d7cd1a558de8699e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"ec72ea83-4884-4e83-b23f-2f5ba5ea9786","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164264036985602901","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"60cae6ef-62d5-4dcf-9491-c0a0884b64e4","dataSourceCredentialName":"js-test-servicePrincipalCred-164264036985605505","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"d4348883-7f69-4f3e-9523-bde85ae79abb","dataSourceCredentialName":"js-test-datalakeCred-164264036985603664","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"2527beee-a546-4f61-b95a-e807d5c645a2","dataSourceCredentialName":"js-test-sqlServerCred-164264036985608229","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}]}, [
  'Content-Length',
  '1380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5626e6e9-bd43-4396-bf51-b89eb0cf9fe2',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '5626e6e9-bd43-4396-bf51-b89eb0cf9fe2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"ec72ea83-4884-4e83-b23f-2f5ba5ea9786","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-164264036985602901","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"60cae6ef-62d5-4dcf-9491-c0a0884b64e4","dataSourceCredentialName":"js-test-servicePrincipalCred-164264036985605505","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '988',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4054674c-f3bb-4072-aa3f-b3b5fd660c7a',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '4054674c-f3bb-4072-aa3f-b3b5fd660c7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"d4348883-7f69-4f3e-9523-bde85ae79abb","dataSourceCredentialName":"js-test-datalakeCred-164264036985603664","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"2527beee-a546-4f61-b95a-e807d5c645a2","dataSourceCredentialName":"js-test-sqlServerCred-164264036985608229","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '659',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '886ebc85-40e5-4506-828a-8a1050b5bf35',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '886ebc85-40e5-4506-828a-8a1050b5bf35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);
