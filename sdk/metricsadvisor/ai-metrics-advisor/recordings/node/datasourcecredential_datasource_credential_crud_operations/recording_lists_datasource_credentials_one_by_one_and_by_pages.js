let nock = require('nock');

module.exports.hash = "1eee015a93b043be58b398563a594367";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"f08830ff-ef02-481d-a697-8cc1b8610ee2","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163702281643108508","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"d92566c8-6a08-4ddc-917f-120139250878","dataSourceCredentialName":"js-test-servicePrincipalCred-163702281643106518","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"54cb9964-58fa-496f-b408-479ef69a8965","dataSourceCredentialName":"js-test-datalakeCred-163702281643103059","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"44d64215-151e-441d-a446-44477a71f5c6","dataSourceCredentialName":"js-test-sqlServerCred-163702281643106715","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}]}, [
  'Content-Length',
  '1380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3bf2ac96-2894-41ad-96fd-9e1019abcbca',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '3bf2ac96-2894-41ad-96fd-9e1019abcbca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"f08830ff-ef02-481d-a697-8cc1b8610ee2","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-163702281643108508","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"d92566c8-6a08-4ddc-917f-120139250878","dataSourceCredentialName":"js-test-servicePrincipalCred-163702281643106518","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '988',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cb069f8c-ece9-481c-8924-dce1ab851697',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'cb069f8c-ece9-481c-8924-dce1ab851697',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"54cb9964-58fa-496f-b408-479ef69a8965","dataSourceCredentialName":"js-test-datalakeCred-163702281643103059","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"44d64215-151e-441d-a446-44477a71f5c6","dataSourceCredentialName":"js-test-sqlServerCred-163702281643106715","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '659',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7499d2c5-d56b-4386-bdd4-2cc23b80f159',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '7499d2c5-d56b-4386-bdd4-2cc23b80f159',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);
