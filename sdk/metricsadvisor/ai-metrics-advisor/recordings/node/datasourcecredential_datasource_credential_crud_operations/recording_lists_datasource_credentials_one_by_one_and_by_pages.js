let nock = require('nock');

module.exports.hash = "1eee015a93b043be58b398563a594367";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"aaf125c8-707d-41b9-81b2-9b90a129de07","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163636434695308176","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c","dataSourceCredentialName":"js-test-servicePrincipalCred-163636434695309101","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"d404535c-1efb-4feb-b535-83e246f31c0c","dataSourceCredentialName":"js-test-datalakeCred-163636434695302037","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"0da7e320-dfa8-4288-9550-4da9509f072a","dataSourceCredentialName":"js-test-sqlServerCred-163636434695301676","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}]}, [
  'Content-Length',
  '1380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '25474b74-a02b-4661-b65d-b98e699a94db',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '25474b74-a02b-4661-b65d-b98e699a94db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"aaf125c8-707d-41b9-81b2-9b90a129de07","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163636434695308176","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c","dataSourceCredentialName":"js-test-servicePrincipalCred-163636434695309101","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '988',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2413b590-1d69-4fcd-a9a6-c811cbf7917b',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '2413b590-1d69-4fcd-a9a6-c811cbf7917b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"d404535c-1efb-4feb-b535-83e246f31c0c","dataSourceCredentialName":"js-test-datalakeCred-163636434695302037","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"0da7e320-dfa8-4288-9550-4da9509f072a","dataSourceCredentialName":"js-test-sqlServerCred-163636434695301676","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '659',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7c5af514-7f6c-4681-85ad-3350341b88ea',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '7c5af514-7f6c-4681-85ad-3350341b88ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);
