let nock = require('nock');

module.exports.hash = "1eee015a93b043be58b398563a594367";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"99487362-fcd3-4745-b522-7a776e9bb6b4","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-162527918841007760","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"d1916ee9-be4b-453c-a9c3-38ccdad5672a","dataSourceCredentialName":"js-test-servicePrincipalCred-162527918841009052","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"9baffa37-510f-4926-b6a4-06b90fac549c","dataSourceCredentialName":"js-test-datalakeCred-162527918841000766","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86","dataSourceCredentialName":"js-test-sqlServerCred-162527918841004036","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"6d98cfdb-1c6d-4559-b780-7c537c8e8d06","dataSourceCredentialName":"java_create_data_source_cred_spkv22445990-702c-4f20-836d-3e6c9a210eb5","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://b0572943-2e33-460f-a008-8e2a8392ad5a.vault.azure.net"}},{"dataSourceCredentialId":"ad579272-b6dd-43f5-a7d9-6bf291c36313","dataSourceCredentialName":"java_create_data_source_cred_sp98537d7b-9849-4163-b09f-a77559e9a5b9","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"c3837a9c-66aa-4f55-bd46-d14cfca13730","dataSourceCredentialName":"java_create_data_source_cred_sql_cone9b726d3-6d96-45fe-9fd7-afb0be8fd360","dataSourceCredentialDescription":"","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"942255c4-c1d7-4f27-bca3-7fa2917a60a7","dataSourceCredentialName":"java_create_data_source_cred_spkvd52e7321-36a8-49c0-80c2-27cb2233d9e6","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://31a453a4-f0c6-4831-8ff9-e5c2bd2957d5.vault.azure.net"}},{"dataSourceCredentialId":"d537a73d-adac-4054-9456-161db9d8381c","dataSourceCredentialName":"java_create_data_source_cred_sp71b2d872-47af-48db-b534-a7d7227974fd","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"0dbf39db-b8f5-4ca0-9a75-e8c38aab319e","dataSourceCredentialName":"java_create_data_source_cred_spkv5c36f06d-2434-4453-ab5a-524f42149bbd","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://2675557a-556e-4d34-a81f-196facd1d447.vault.azure.net"}},{"dataSourceCredentialId":"2118f332-a282-4bda-bcef-b15a91ebdad8","dataSourceCredentialName":"java_create_data_source_cred_sp119ad2b5-610b-4ae8-9d3b-67b1256358fc","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"99758802-5209-4d9f-a4fb-f60695109355","dataSourceCredentialName":"java_create_data_source_cred_dlake_gen1d2e2dd4-9ece-43c7-a83f-1e8efe3e323e","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"95d67a61-ff31-42a4-92e4-95cd26baa9f1","dataSourceCredentialName":"java_create_data_source_cred_spb501a0fe-4417-4de9-909b-6eae02f36c55","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"9a1aab85-27da-4633-b7d7-ff6a886b9ff4","dataSourceCredentialName":"java_create_data_source_cred_sql_con6782e215-87a4-467d-878d-d07889f4ed3d","dataSourceCredentialDescription":"","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"fd0e7d10-3481-4025-96f7-829d8362dc9a","dataSourceCredentialName":"java_create_data_source_cred_dlake_gen60c74f1f-7e74-42be-9b1f-deae94409e59","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"1e86a42b-d282-48fd-acbc-545bfaaa6f6b","dataSourceCredentialName":"java_create_data_source_cred_dlake_gen1b2e64de-3d50-4642-8bd6-6ce380dbbda7","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"d71ec78d-8507-44ca-8207-0f0a3737cd73","dataSourceCredentialName":"java_create_data_source_cred_sql_con5fb72f44-78c5-4b14-a84a-3120b23f0773","dataSourceCredentialDescription":"","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"26a3fc4a-5c99-4cf6-bae3-f6fe5c6c81ef","dataSourceCredentialName":"java_create_data_source_cred_spkv9e60db7c-e18f-445e-b363-8324d4ca28b0","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://c8cbc49f-afd4-4815-8b35-9f927dc64a9d.vault.azure.net"}},{"dataSourceCredentialId":"174bcebb-cfa6-4ee0-8570-c4d35a761e3f","dataSourceCredentialName":"java_create_data_source_cred_spkv05992da2-6520-4762-a082-7b0897eb666c","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://f4533f6a-dfbc-49dc-abba-dbd1769b4027.vault.azure.net"}},{"dataSourceCredentialId":"15be7870-85dc-40f3-b3dd-5dd8c32e1de3","dataSourceCredentialName":"java_create_data_source_cred_sp4da9f057-d433-47d3-9d83-ea124e0b0dc9","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=20&$skip=20"}, [
  'Content-Length',
  '7712',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c544f36f-24f5-42ba-9871-82170a18cad8',
  'x-envoy-upstream-service-time',
  '5216',
  'apim-request-id',
  'c544f36f-24f5-42ba-9871-82170a18cad8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"99487362-fcd3-4745-b522-7a776e9bb6b4","dataSourceCredentialName":"js-test-servicePrincipalInKVCred-162527918841007760","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"d1916ee9-be4b-453c-a9c3-38ccdad5672a","dataSourceCredentialName":"js-test-servicePrincipalCred-162527918841009052","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '988',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2d3a955d-64e8-456d-a939-6c15941ec8d9',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '2d3a955d-64e8-456d-a939-6c15941ec8d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"9baffa37-510f-4926-b6a4-06b90fac549c","dataSourceCredentialName":"js-test-datalakeCred-162527918841000766","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86","dataSourceCredentialName":"js-test-sqlServerCred-162527918841004036","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '659',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '32eb3fdd-b701-4d13-a2f5-3e1611169126',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '32eb3fdd-b701-4d13-a2f5-3e1611169126',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:58 GMT'
]);
