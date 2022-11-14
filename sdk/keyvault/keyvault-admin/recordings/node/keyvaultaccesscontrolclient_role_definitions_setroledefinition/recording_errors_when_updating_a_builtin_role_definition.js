let nock = require('nock');

module.exports.hash = "efd68c089bf08eee6b93df6842e7a58b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(401, "OK", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '2',
  'x-ms-request-id',
  'b40105b2-605c-11ed-a993-0022488d4c2b',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '0'
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
  '8b32c626-f1a9-4d83-9a97-640d86a61801',
  'x-ms-ests-server',
  '2.1.14059.12 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avs_zx5saSVEvyfoPlR7OyE; expires=Fri, 09-Dec-2022 18:31:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdY2hXF7YoW92QqCGiReCVWpuWwVBpBRLR4YrWhmCbHYBEyDW17L0x9Nj08HlcWMa4B9RAR1rG7JVsPUu3jszL_kz5HyTWwAPkMc_NJ9TburPLzM3u6HXXjoUny6QqlgR7kJtQvHjVtf_y4JSybSoD-Fg0TlSuAJXSKFsdRBSueUH13cw5w6CJMi_vDycJ_HyXuaVJc7dPP0oHSxOtjTdmkD5fjnSK_M1mKKQH3g6T9cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:19 GMT',
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
  'bfcec97e-f8c8-4585-a4fd-ffbad6a84c00',
  'x-ms-ests-server',
  '2.1.14059.12 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlAgUbJmAi1Dsam6VNJ3L5g; expires=Fri, 09-Dec-2022 18:31:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvNYd055A7giN1RJXst-6rJ7QqXDZv2QgqCs4fegwrh9WxP4HgszsHNgvqhMIyUrCJfVFTatb4sayAaYfnIvP26ZioaX_5yo-6534JxV6pfqTECZ_OnPuXwboexbqe8LjnpZlKH_OJ2ui2BqM1fWU6yo4MTLCxEFfLoVB0eKQhmNEikWXb1FpV8R098ulDngn8zFeMcuzKvQZX6USPxxD8A1QPKlfBYPKWVjL5nLlfMsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7a9862a0-d913-4e85-a7d9-b182782a25eb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd2aacb87-2ae8-49a2-b95f-91287c14bc00',
  'x-ms-ests-server',
  '2.1.14059.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ajg8KN6xVRNCkfngwpEcDsYYD5OPAQAAAPbo_doOAAAA; expires=Fri, 09-Dec-2022 18:31:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:19 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(200, {"value":[{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","name":"7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/keys/backup/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Backup User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/33413926-3206-4cdd-b39a-83574fe37a17","name":"33413926-3206-4cdd-b39a-83574fe37a17","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Encryption User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625c","name":"21dbd100-6940-42c2-9190-5d6cb909625c","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/release/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Release User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","name":"2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Auditor","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/4bd23610-cdcf-4971-bdee-bdc562cc28e4","name":"4bd23610-cdcf-4971-bdee-bdc562cc28e4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Policy Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","name":"21dbd100-6940-42c2-9190-5d6cb909625b","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/rotate/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/release/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/derive/action","Microsoft.KeyVault/managedHsm/rng/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","name":"515eb02d-2335-4d2d-92f2-b1cbdf9c3778","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/export/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Officer","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","name":"a290e904-7015-4bba-90c8-60543313cdb4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/securitydomain/download/action","Microsoft.KeyVault/managedHsm/securitydomain/download/read","Microsoft.KeyVault/managedHsm/securitydomain/upload/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/read","Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read","Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/restore/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/restore/status/action","Microsoft.KeyVault/managedHsm/settings/read/action","Microsoft.KeyVault/managedHsm/settings/write/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'b4458156-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'northus',
  'content-length',
  '6857',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4', {"properties":{"roleName":"Managed HSM Administrator","type":"CustomRole","permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action"],"notDataActions":[]},{"actions":[],"notActions":[],"dataActions":[],"notDataActions":["Microsoft.KeyVault/managedHsm/keys/encrypt/action"]}],"assignableScopes":["/"]}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Cannot re-use the name/GUID matching that of a built-in role. Please use a unique role ID. (Activity ID: b44f24b8-605c-11ed-a993-0022488d4c2b)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '188',
  'x-ms-request-id',
  'b44f24b8-605c-11ed-a993-0022488d4c2b',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
