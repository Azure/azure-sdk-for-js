let nock = require('nock');

module.exports.hash = "1eee015a93b043be58b398563a594367";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"fe484186-7d3e-4ccc-9875-ab931019cc68","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163978895648400227","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"ec229472-182b-4961-bcd0-c329f6aa5f4a","dataSourceCredentialName":"js-test-servicePrincipalCred-163978895648408359","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"800a0e38-98a1-474e-bf87-c1ae5ad9214e","dataSourceCredentialName":"js-test-datalakeCred-163978895648305805","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"fd1ceed7-0f5a-4867-83f7-e5a75d128458","dataSourceCredentialName":"js-test-sqlServerCred-163978895648309718","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}]}, [
  'Content-Length',
  '1380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '393d14ce-1a9a-4d5f-b61d-5357a756b2f7',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '393d14ce-1a9a-4d5f-b61d-5357a756b2f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"fe484186-7d3e-4ccc-9875-ab931019cc68","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163978895648400227","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"ec229472-182b-4961-bcd0-c329f6aa5f4a","dataSourceCredentialName":"js-test-servicePrincipalCred-163978895648408359","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint/:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '988',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5d6d4194-4f1f-407e-8226-282dd0c09296',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '5d6d4194-4f1f-407e-8226-282dd0c09296',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"800a0e38-98a1-474e-bf87-c1ae5ad9214e","dataSourceCredentialName":"js-test-datalakeCred-163978895648305805","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"fd1ceed7-0f5a-4867-83f7-e5a75d128458","dataSourceCredentialName":"js-test-sqlServerCred-163978895648309718","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint/:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '659',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a6426d92-fccf-4ccb-a83b-349d8dd31f27',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  'a6426d92-fccf-4ccb-a83b-349d8dd31f27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:00 GMT'
]);
