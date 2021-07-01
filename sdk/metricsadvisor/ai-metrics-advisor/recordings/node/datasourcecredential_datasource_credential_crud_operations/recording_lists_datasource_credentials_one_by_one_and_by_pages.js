let nock = require('nock');

module.exports.hash = "3b305897fecb4ff18f8589e7fe95af9b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .reply(200, {"value":[{"dataSourceCredentialId":"c81898d7-ba8c-4da2-9dc4-de57b37efe06","dataSourceCredentialName":"UpdatedSPinKVCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"3ee2df85-919c-4e6a-b0b4-dca40b2d7b10","dataSourceCredentialName":"UpdatedSPCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}},{"dataSourceCredentialId":"dc61651c-d7df-4e46-922d-57bd3bbc116b","dataSourceCredentialName":"UpdatedDataLakeCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"31392928-b87b-4975-9be2-cea71a6e814b","dataSourceCredentialName":"UpdatedSqlCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"2e0e9630-1034-4e13-85fa-1bf5979011da","dataSourceCredentialName":"java_create_data_source_cred_sp_9269bbe9-cc7a-4b74-9cd1-cbd79ef6ff5622","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"2f2e5ae0-81a7-4fe7-8eb7-73924234e386xx","tenantId":"c1c93514-7e47-439b-abb1-3129c5281404"}},{"dataSourceCredentialId":"53655339-fb54-4566-8ccd-b22054a45c56","dataSourceCredentialName":"UpdatedCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"58555126-95d2-4345-81a2-3486db9849bf","dataSourceCredentialName":"ExampleCred","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"4f76caa8-a0af-414c-8dc0-45fd2246ea1c","dataSourceCredentialName":"java_create_data_source_cred_sp_9269bbe9-cc7a-4b74-9cd1-cbd79ef6ff56","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"2f2e5ae0-81a7-4fe7-8eb7-73924234e386","tenantId":"c1c93514-7e47-439b-abb1-3129c5281404"}},{"dataSourceCredentialId":"e3483a80-9556-4f94-a681-632cdf6c39c2","dataSourceCredentialName":"java_create_data_source_cred_spkvc0906c9d-a47f-476e-abe7-3f1ca2f23cfb","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://d980b6c7-9bb8-4486-89ab-5dab5a24e62d.vault.azure.net"}},{"dataSourceCredentialId":"f0b4f08b-c901-4c03-bc29-5d4b57e370f7","dataSourceCredentialName":"java_create_data_source_cred_spb3930369-ec12-481d-83f7-d292311a143c","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"11cfc127-e774-40cf-b1f3-ec406842322d","dataSourceCredentialName":"java_create_data_source_cred_dlake_gene2e5abe1-a005-419a-a3b7-50387f74bf58","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"ef787c41-2d6e-4a27-8180-1c1d0c63e032","dataSourceCredentialName":"java_create_data_source_cred_spkva00b3ff8-a48b-4370-80c2-9d2b222dd023","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://dbd4c453-c7fc-4602-b083-6ed0401cc01d.vault.azure.net"}},{"dataSourceCredentialId":"d2ec3254-6e15-4862-a228-b22502ab2bc1","dataSourceCredentialName":"java_create_data_source_cred_spkv7731d8ac-bc24-4e63-acae-f5873daaa994","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"DSClientSer_1","servicePrincipalIdNameInKV":"DSClientID_1","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5","keyVaultClientId":"e70248b2-bffa-11eb-8529-0242ac130003","keyVaultEndpoint":"https://0c999727-775b-4eac-9dad-543217d615ca.vault.azure.net"}},{"dataSourceCredentialId":"25dc9420-4545-4b27-ae9c-2a301d2a0d27","dataSourceCredentialName":"java_create_data_source_cred_spb6eadb7b-8051-4dc6-9807-eed293a8b283","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"fbe58c18-af15-4ccb-b7a7-eddb43d1c8b3","dataSourceCredentialName":"java_create_data_source_cred_spcf14e3fb-4f4b-4d55-847a-bcb62c501316","dataSourceCredentialDescription":"","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"e70248b2-bffa-11eb-8529-0242ac130003","tenantId":"45389ded-5e07-4e52-b225-4ae8f905afb5"}},{"dataSourceCredentialId":"f2ed2284-b04c-4d2d-abf0-37833ac17138","dataSourceCredentialName":"java_create_data_source_cred_sql_conac257eb3-b21c-484a-ad64-4c015dafe882","dataSourceCredentialDescription":"","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"14c8521a-8e2c-45f3-8fb2-b74ede476322","dataSourceCredentialName":"java_create_data_source_cred_dlake_gen322daa5c-02ce-45a0-a465-3b1dbb652ea2","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"d945027f-a656-4dae-b4aa-ab158ebe2b0b","dataSourceCredentialName":"java_create_data_source_cred_dlake_gen07680095-1cbd-451d-a71a-8fa1d39ac498","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"9cb17d61-1df3-487c-bc27-9873d91a075c","dataSourceCredentialName":"java_create_data_source_cred_sql_conc5002d76-5960-41e4-88ab-042018e21e1b","dataSourceCredentialDescription":"","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}},{"dataSourceCredentialId":"5d0183f6-83dc-4b92-8ac6-f1233cb41de4","dataSourceCredentialName":"java_create_data_source_cred_dlake_gen39c3071d-eb62-4308-ad4a-5d8ea0fdb956","dataSourceCredentialDescription":"","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=20&$skip=20"}, [
  'Content-Length',
  '6980',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '38510913-5f1e-43c8-b7c5-cb596ac49915',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '38510913-5f1e-43c8-b7c5-cb596ac49915',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:18 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"c81898d7-ba8c-4da2-9dc4-de57b37efe06","dataSourceCredentialName":"UpdatedSPinKVCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipalInKV","parameters":{"servicePrincipalSecretNameInKV":"updated-service-principal-secret-name-in-kv","servicePrincipalIdNameInKV":"updated-service-principal-in-kv","tenantId":"updated-tenant","keyVaultClientId":"updated-keyvault-client-id","keyVaultEndpoint":"updated-keyvault-endpoint"}},{"dataSourceCredentialId":"3ee2df85-919c-4e6a-b0b4-dca40b2d7b10","dataSourceCredentialName":"UpdatedSPCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '920',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'da4b802e-a001-4123-a976-55887900db8b',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'da4b802e-a001-4123-a976-55887900db8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:18 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials')
  .query(true)
  .reply(200, {"value":[{"dataSourceCredentialId":"dc61651c-d7df-4e46-922d-57bd3bbc116b","dataSourceCredentialName":"UpdatedDataLakeCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}},{"dataSourceCredentialId":"31392928-b87b-4975-9be2-cea71a6e814b","dataSourceCredentialName":"UpdatedSqlCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/credentials?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '613',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9184b429-a146-49af-a97a-4d61c68078f7',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '9184b429-a146-49af-a97a-4d61c68078f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:19 GMT',
  'Connection',
  'close'
]);
