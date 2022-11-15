let nock = require('nock');

module.exports.hash = "50938835b67ff8a2cfc26f55d68d4b09";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
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
  'b51a0ab6-605c-11ed-a993-0022488d4c2b',
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
  'c9c41efe-0a5a-4894-8e1a-bb42d5bcc700',
  'x-ms-ests-server',
  '2.1.14059.12 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ap7LQKx3pyhMq6Xt1fVk4Bo; expires=Fri, 09-Dec-2022 18:31:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrd7V-C6pC5Xw4kFgY0qF1Oe8RFakYfs7uPg0uZyp-Sp8IrIrR1RowyAMUvtsL7tGj97BCkC7k7RRg_Ls3S83bVwM0Xud4XgeMzBssvrNhQOPFRxMZzti29STVCY9G6ZhRe9LIO2i8gSaZoWWMzeAtzYJw456ccDR9ieEOnjPsBv-cvbBWK5z3-inSmf9_MF1w4iVZ0S74YDML9WLoWvf5Q5jDJQotkMKRtGmkvnxsaJYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:21 GMT',
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
  '62805b6e-f450-4bf2-9c6e-10c9fdf71101',
  'x-ms-ests-server',
  '2.1.14059.12 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoNc8vNLT7tAqG3YJ42_-cc; expires=Fri, 09-Dec-2022 18:31:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfnXwcQg3DWLCzVx7N_kAIiPqlRjlxU_8ngUE0W-JViWCS8zTJgUyREAjdgNGb6FLvqEG_hB4X7EVgqXPxLyaLjqcBN79tef81KY7UEwSkh8z8ar4E6EwxRzJA152oO-OdrbVmyfHySgn97oVDNKwisS5JQWEnXHFbRK0IDLX97yJhpFUvv1_D4MHeCSNH0wp1QQgNMGM_PJX5Iz15NILK0FEmrSGBUF35xQ0eLqNOd0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=11c568c1-5025-460f-baa3-2caf9ccb621d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c65ef7a3-132e-4ef3-935b-f71c9439be00',
  'x-ms-ests-server',
  '2.1.14059.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtUQUJKdv-NNuLjURhhPZKkYD5OPAQAAAPjo_doOAAAA; expires=Fri, 09-Dec-2022 18:31:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:21 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
  .query(true)
  .reply(200, {"value":[{"id":"/providers/Microsoft.Authorization/roleAssignments/ee697cd1-889c-0f7c-b501-437bb26c6611","name":"ee697cd1-889c-0f7c-b501-437bb26c6611","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/eab3beb4-1eac-4369-98f5-8a3707aa9072","name":"eab3beb4-1eac-4369-98f5-8a3707aa9072","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/684742ab-d6bc-430f-966d-b3e917e82d82","name":"684742ab-d6bc-430f-966d-b3e917e82d82","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/4b304a33-e984-43ec-879b-f1415f3b3292","name":"4b304a33-e984-43ec-879b-f1415f3b3292","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/40a166c0-04b1-4835-ab64-51b8ae8626f0","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/12dcace1-86ab-446c-98a7-391f9f1d6347","name":"12dcace1-86ab-446c-98a7-391f9f1d6347","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/e218992a-e4ed-4804-ba97-077dd13224cd","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/335d4866-2654-435f-a7bd-e9f3e49d6881","name":"335d4866-2654-435f-a7bd-e9f3e49d6881","properties":{"principalId":"09c2d1d8-d276-4036-b20d-7212c5383852","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/173e3fef-b314-4a60-a0a9-8f1486c947b8","name":"173e3fef-b314-4a60-a0a9-8f1486c947b8","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/08efb636-0068-4049-a194-e518dc613dad","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/1190bdfb-7f38-4aad-8f02-743418762b61","name":"1190bdfb-7f38-4aad-8f02-743418762b61","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/b127710a-ed8c-4ff5-b7d2-7821d25028f3","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'b56903c8-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'northus',
  'content-length',
  '3203',
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
