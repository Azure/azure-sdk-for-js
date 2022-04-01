let nock = require('nock');

module.exports.hash = "8033afbf40873eb11fa807c8fe2fa406";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '645d3b54-aeb7-11ec-a21d-0022487870d4',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'b389fb25-9963-48a9-88ec-19d91c46dd00',
  'x-ms-ests-server',
  '2.1.12570.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AilWcO98k1BDiWIhQJLBLME; expires=Wed, 27-Apr-2022 16:52:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgSUjefhnGK3-OFvX3aCmKHI4YZA-8jO0QB2kOu5GGjhmoUNREGOw0OvhpYUdUDG9hH2URki4mIxSW7qg2wRFbwFU_nm4__yNdVs9a9lCKy4B_KvFiqVnfACj4wz7lo2BuUs0MkWBZvh18Yybam4UYZBFQyQ3MzuOjN9j2UHp-hsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Mar 2022 16:52:02 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '294f1c7d-ee64-4695-9200-3fd2f4f2a100',
  'x-ms-ests-server',
  '2.1.12570.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnnG2bCvbjNGgVxZE8cHbuk; expires=Wed, 27-Apr-2022 16:52:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrS_BrVCMHyPKTQhkrWfxa2Bv1CvTBpF1RQZ0fTeNVJN7AzxRXeYjl-cJEJRsF9nD3Ox-_IBM9g7JgB2Ydw2CHhJGAxcxTD_uKUVlhKltwUydbgJGqsxlTHblLUJmFEnGxtKeVz5Bo0dEZzoCqG__hlRDvmOl9NC7TA_xofbOxr_ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Mar 2022 16:52:02 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a67e52f6-2023-4975-ba7a-2ee447f49e08&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e0efe67c-2457-46af-a0eb-f728ecf5e000',
  'x-ms-ests-server',
  '2.1.12570.11 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoyrjzN1qBRGu0lBjPis9m9Cl2kEAQAAALLe09kOAAAA; expires=Wed, 27-Apr-2022 16:52:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Mar 2022 16:52:02 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27', {"properties":{"roleName":"b36b00af-89c6-435f-a43d-9a3087015c27","type":"CustomRole","assignableScopes":["/"]}})
  .query(true)
  .reply(201, {"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"assignableScopes":["/"],"description":"","permissions":[],"roleName":"b36b00af-89c6-435f-a43d-9a3087015c27","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '353',
  'x-ms-request-id',
  '64cb50a8-aeb7-11ec-a21d-0022487870d4',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '241',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"assignableScopes":["/"],"description":"","permissions":[],"roleName":"b36b00af-89c6-435f-a43d-9a3087015c27","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '64f1d1e2-aeb7-11ec-a21d-0022487870d4',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westus2',
  'content-length',
  '353',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20220314-1-3dc5f232-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '0'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27', {"properties":{"roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6"}})
  .query(true)
  .reply(201, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  '64f36de0-aeb7-11ec-a21d-0022487870d4',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '41',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '64fb6c66-aeb7-11ec-a21d-0022487870d4',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westus2',
  'content-length',
  '398',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20220314-1-3dc5f232-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
  .query(true)
  .reply(200, {"value":[{"id":"/providers/Microsoft.Authorization/roleAssignments/ae463e75-2ebc-4456-875c-ef79a2bfc8d6","name":"ae463e75-2ebc-4456-875c-ef79a2bfc8d6","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/0ff09664-1852-4a50-933a-3cc912b5f1c2","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/748a61e6-af5e-4d9a-aa2c-1e7d034ca735","name":"748a61e6-af5e-4d9a-aa2c-1e7d034ca735","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/4bcc0bc0-b655-4299-9aeb-087fb58867be","name":"4bcc0bc0-b655-4299-9aeb-087fb58867be","properties":{"principalId":"e9d1e02a-01d1-490a-b6ad-e06ac00c374a","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/239eaebe-7f34-4a23-853b-98494b96e5cf","name":"239eaebe-7f34-4a23-853b-98494b96e5cf","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/1c160530-8e97-458b-b354-754d8ca16e19","name":"1c160530-8e97-458b-b354-754d8ca16e19","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/11ba89fb-9d24-4025-b301-9b6631e4591f","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/0f7dd37a-fb3c-41f1-849a-a0e9571462ae","name":"0f7dd37a-fb3c-41f1-849a-a0e9571462ae","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '64fdb642-aeb7-11ec-a21d-0022487870d4',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westus2',
  'content-length',
  '2804',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20220314-1-3dc5f232-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(200, {"value":[{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","name":"7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/keys/backup/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Backup User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/33413926-3206-4cdd-b39a-83574fe37a17","name":"33413926-3206-4cdd-b39a-83574fe37a17","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Encryption User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625c","name":"21dbd100-6940-42c2-9190-5d6cb909625c","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/release/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Release User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","name":"2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Auditor","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/4bd23610-cdcf-4971-bdee-bdc562cc28e4","name":"4bd23610-cdcf-4971-bdee-bdc562cc28e4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Policy Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/770fd66c-6266-4643-9d4e-b616870898d5","name":"770fd66c-6266-4643-9d4e-b616870898d5","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":["Microsoft.KeyVault/managedHsm/keys/createIfNotExists","Microsoft.KeyVault/managedHsm/keys/read/action"],"dataActions":[],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM ARM User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","name":"21dbd100-6940-42c2-9190-5d6cb909625b","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/rotate/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/release/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/derive/action","Microsoft.KeyVault/managedHsm/rng/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","name":"515eb02d-2335-4d2d-92f2-b1cbdf9c3778","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/export/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Officer","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","name":"a290e904-7015-4bba-90c8-60543313cdb4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/securitydomain/download/action","Microsoft.KeyVault/managedHsm/securitydomain/download/read","Microsoft.KeyVault/managedHsm/securitydomain/upload/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/read","Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read","Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/restore/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/restore/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"assignableScopes":["/"],"description":"","permissions":[],"roleName":"b36b00af-89c6-435f-a43d-9a3087015c27","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '64ff83dc-aeb7-11ec-a21d-0022487870d4',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westus2',
  'content-length',
  '7616',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20220314-1-3dc5f232-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(404, {"error":{"code":"RoleAssignmentNotFound","message":"Requested role assignment not found (Activity ID: 6501491a-aeb7-11ec-a21d-0022487870d4)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '143',
  'x-ms-request-id',
  '6501491a-aeb7-11ec-a21d-0022487870d4',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('///providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"assignableScopes":["/"],"description":"","permissions":[],"roleName":"b36b00af-89c6-435f-a43d-9a3087015c27","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '353',
  'x-ms-request-id',
  '65030cc8-aeb7-11ec-a21d-0022487870d4',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '51',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
