let nock = require('nock');

module.exports.hash = "911230e858263a0086ce3c1d50fc429c";

module.exports.testInfo = {"uniqueName":{"EC":"EC162542139619007515"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542139619007515/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '8882f8bc-1f51-467b-884e-69aa56a2071a',
  'x-ms-request-id',
  'ea44a442-4fe2-463e-8f65-8dad7317e2a0',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT'
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
  '979d71d5-bfd0-447c-a1f6-137e40ef8e01',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAQAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:56:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrf4uG-KzOPW8A5Y3BR0ofoySo2AoixyQUsq-xWv085Z1uTQZ_g7HXL_valBxO2MSvYmmiLsimKC3ZLNWVCR-Uc7LjhHpgH8s0CnIdv51NEMvCZLvI2TnFf6ttJwQL4zDhFm0s5bv-9p8GSvKr2mDXyraP1fxqaHo6j7Og7F2YSWMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
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
  '04923b22-c5b5-4349-b2d4-c550e58f6302',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAQAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:56:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzgaA-kzq9l7m3ErMRInnWvX0id283uBIywLnxz9wVrH4dGX51fxcXdA_1yWLDk0-_VgU9gaYMfDgD-lEMfuRmaYVY7PSZC27lrz0p6_HpVwV6EZhUVkxKTfw4rrxMmNWk6ZmA8qwEWFFsqgc1fMUAOyiK23IaZsc-FIUKKOtaIYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=97182b35-6eac-48d2-80e2-3bb35cebaf18&client_secret=azure_client_secret")
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
  'c19e3cf4-d853-423c-83e5-5de396fed901',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAgAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:56:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542139619007515/create', {"kty":"EC","attributes":{},"crv":"P-256K"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6","kty":"EC","key_ops":["sign","verify"],"crv":"P-256K","x":"WVBsV3Yp8w4N13MTbiR1lGRqt1al32t7Cwh3iLOCQU0","y":"lbmnNH8AfhrSq1weWWwT_lTOTRhbe7YEh1cyK2skS5A"},"attributes":{"enabled":true,"created":1625421397,"updated":1625421397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '8882f8bc-1f51-467b-884e-69aa56a2071a',
  'x-ms-request-id',
  'd8b9f0ba-3318-48de-919f-b282db625deb',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '397'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'ae6f2fd3-ce44-467d-9eb2-5a9fb579e945',
  'x-ms-request-id',
  'c31b035c-ab1c-4903-8371-faad9c151d5c',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6","kty":"EC","key_ops":["sign","verify"],"crv":"P-256K","x":"WVBsV3Yp8w4N13MTbiR1lGRqt1al32t7Cwh3iLOCQU0","y":"lbmnNH8AfhrSq1weWWwT_lTOTRhbe7YEh1cyK2skS5A"},"attributes":{"enabled":true,"created":1625421397,"updated":1625421397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'ae6f2fd3-ce44-467d-9eb2-5a9fb579e945',
  'x-ms-request-id',
  'd39fb291-9f80-44b6-9974-f2e6fc4949c3',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '397'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6/sign', {"alg":"ES256K","value":"6jjjD3V2fX5sIeuoWxQBZkajtgreQmypZtrJQKXbG6s"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6","value":"05x3RQfWJvuhp_Vdr3I3U1iG_xdMgy65hm3l8YvfYTRkMAYtCNHgu4Qt6L5giZAMk1d_BTeRg1KL0LvNTETVmg"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9581ab51-0ec4-4bbd-80ea-a7c7cffeb557',
  'x-ms-request-id',
  '4799d162-dcf1-4160-949e-9dc8883c25ae',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '199'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6/verify', {"alg":"ES256K","digest":"6jjjD3V2fX5sIeuoWxQBZkajtgreQmypZtrJQKXbG6s","value":"05x3RQfWJvuhp_Vdr3I3U1iG_xdMgy65hm3l8YvfYTRkMAYtCNHgu4Qt6L5giZAMk1d_BTeRg1KL0LvNTETVmg"})
  .query(true)
  .reply(200, {"value":true}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f7312294-14ab-4cd9-99f3-5ed34da2f141',
  'x-ms-request-id',
  'b850ba20-092c-4b00-a457-ff7c299a6652',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6/sign', {"alg":"ES256K","value":"6jjjD3V2fX5sIeuoWxQBZkajtgreQmypZtrJQKXbG6s"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6","value":"-X_iYcCqTiZGF5XEWFdvnVHzMbsH-BfToCVTKKEroA9kTZxw5glemhT_B09XiQTvI9qeFo1e3ni3Y26BA2hhtg"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'b53dd420-ce23-45c4-9f5c-6fb098bfb7f1',
  'x-ms-request-id',
  '7a167699-24d0-4adb-99da-15f2986165d5',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '199'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6/verify', {"alg":"ES256K","digest":"6jjjD3V2fX5sIeuoWxQBZkajtgreQmypZtrJQKXbG6s","value":"-X_iYcCqTiZGF5XEWFdvnVHzMbsH-BfToCVTKKEroA9kTZxw5glemhT_B09XiQTvI9qeFo1e3ni3Y26BA2hhtg"})
  .query(true)
  .reply(200, {"value":true}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9d640cc1-c4a7-48fb-a275-c5f738e625f3',
  'x-ms-request-id',
  '5d66dd84-2fbf-4440-a194-b309da9402f1',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:36 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/EC162542139619007515')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/EC162542139619007515","deletedDate":1625421397,"scheduledPurgeDate":1633197397,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6","kty":"EC","key_ops":["sign","verify"],"crv":"P-256K","x":"WVBsV3Yp8w4N13MTbiR1lGRqt1al32t7Cwh3iLOCQU0","y":"lbmnNH8AfhrSq1weWWwT_lTOTRhbe7YEh1cyK2skS5A"},"attributes":{"enabled":true,"created":1625421397,"updated":1625421397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9ffdde66-a710-4d50-8373-e7533ec38949',
  'x-ms-request-id',
  '0c6ff8a5-f2a1-4ebf-96be-5ac8f4df071e',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:37 GMT',
  'Content-Length',
  '536'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '6a14d203-d434-4c17-8402-397d9d2a1166',
  'x-ms-request-id',
  '7c306f45-3118-4bf2-82f0-6d6ff49be036',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '54e45344-0900-4450-82a4-23cebc7ee8d3',
  'x-ms-request-id',
  'adecc988-316b-4439-9077-dfbf9ba99db1',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '76ac87bd-474f-466a-9643-aaf52dcde415',
  'x-ms-request-id',
  '74457056-b01a-4cd9-8c8f-e10ef549fc7a',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'cc24212a-84cd-4ca4-887e-39172c6e6e9d',
  'x-ms-request-id',
  '9587598d-ec42-47ab-909a-848195e5e7b2',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'fa2ee6c5-0864-4527-b02d-e0422b15355a',
  'x-ms-request-id',
  '8ef22fda-6cea-48ac-968d-72e69890b94f',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '1a1ad4e8-cb3b-4fa7-96bd-e219bdaa273d',
  'x-ms-request-id',
  '728564dd-7fe5-46c0-ad8c-0bf1a8f66a26',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '156c292c-9d40-41e6-b205-6d6162f95329',
  'x-ms-request-id',
  'f9b00a3e-b59a-4f73-9d83-42500b388098',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'cd3aa4a1-874e-4e6f-80cc-85252162f35b',
  'x-ms-request-id',
  'c7e7bc59-30ba-42a3-9af2-1fe105c988f2',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'cefb2d1b-8cbc-453c-8f29-f992f0317424',
  'x-ms-request-id',
  '3322238c-2c2c-46a1-9592-db226676f066',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'd5044ed7-a714-4801-90ac-a6272aefc048',
  'x-ms-request-id',
  '46fe383a-4aa2-46a3-ad26-52c3867d7894',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '83412941-d97a-475a-9f32-a46b350895a3',
  'x-ms-request-id',
  '8f5b4111-0b91-4b3e-9191-3615aeca694d',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'd69f86c4-865e-4538-979f-ea6b431385ae',
  'x-ms-request-id',
  'c23c0e80-330f-4d0a-94e5-63dd060059a7',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:56:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '0072b5f1-71c0-4bb4-bc24-33594753a994',
  'x-ms-request-id',
  'd4feb859-0e2c-4c22-aab4-5561dc7d3938',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'ccf56b50-a2c4-4dee-8ac6-659f5cf38f73',
  'x-ms-request-id',
  'd2f7b921-98d3-4d51-91c4-fffeb5c96504',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f387677d-fe26-497a-b82d-f6f1ebb5637f',
  'x-ms-request-id',
  '7315e463-9e31-44d5-af08-c00cebdf2686',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '99f6499a-95ec-4e59-8b5a-29fc97d4c7ba',
  'x-ms-request-id',
  '2d742ef5-1988-4040-acaa-922cfe7b447c',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9fec0300-d288-4f3c-81a8-0a1b4219dfed',
  'x-ms-request-id',
  'bfb12384-6088-4570-989e-84a31d9cf720',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'bb6cba4c-afde-40a1-be8f-fb5f70ea2370',
  'x-ms-request-id',
  'f364a5d7-8577-4666-a447-b216fec45f07',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '386a0c79-75e8-4d91-96f7-00558b0ebc1e',
  'x-ms-request-id',
  '994b8b1d-5181-48bf-8ae8-958f92304d16',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '0b520c34-eeb9-42c3-85a8-2f94855f08a7',
  'x-ms-request-id',
  '4f5cbc5b-9cb4-4c27-b9b4-866e2e8de851',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '8ee9bb94-f0ad-4fa7-b086-ef1888f17337',
  'x-ms-request-id',
  'bce2fb84-2b71-4fd5-be02-e1f5295caff9',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '4a8d3bb4-adff-4ef7-92ff-dd9c0e1e3c42',
  'x-ms-request-id',
  '22d9d5a2-e06f-4a70-9d91-6ed076c3a70d',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '45090e61-0858-4b4c-af1d-5339ce388706',
  'x-ms-request-id',
  '741d88ff-8871-4b76-9c6d-2653055b57dc',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'cfdce676-db58-436c-be83-e7b49b1c4820',
  'x-ms-request-id',
  'e5a0f62a-f525-4c82-bb46-a4faf90df73a',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '2fe5f556-7042-461f-9ff4-f6022209c223',
  'x-ms-request-id',
  '2d8f4aa8-e56f-4a59-9a7a-803cb3ee63b6',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'cc522f28-9d5c-4a58-b693-f45342cf64a0',
  'x-ms-request-id',
  '76a93da8-f19b-4078-872b-c207ffda2c10',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'aae4e2fe-20c7-4fea-b1b6-cbaca2b4bc20',
  'x-ms-request-id',
  'ec6deb0e-6e58-4c74-bac6-d349040521cd',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '882620df-f3c2-44ab-b7d0-3ffc63832461',
  'x-ms-request-id',
  '83f2f6c7-710e-4ff6-964a-4c4feac43ff9',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '6e5cdaae-67b8-47fb-b675-f2a5e7e42df7',
  'x-ms-request-id',
  'c8130f0e-abaf-4c5a-a2a4-9fc83c5df999',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '44a5f5b5-670f-45e7-ab79-71c7a09f4236',
  'x-ms-request-id',
  'ba3ca8fc-3cc6-4b5c-9b37-9ec20e3ba108',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542139619007515"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '5910f470-814f-46f9-82f1-5f2e39f907ee',
  'x-ms-request-id',
  'fd34c672-3dfc-45d5-9a07-55c9a3e3e245',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/EC162542139619007515","deletedDate":1625421397,"scheduledPurgeDate":1633197397,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542139619007515/ca9d690612804336b055f471b37b7bf6","kty":"EC","key_ops":["sign","verify"],"crv":"P-256K","x":"WVBsV3Yp8w4N13MTbiR1lGRqt1al32t7Cwh3iLOCQU0","y":"lbmnNH8AfhrSq1weWWwT_lTOTRhbe7YEh1cyK2skS5A"},"attributes":{"enabled":true,"created":1625421397,"updated":1625421397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '94b6a90e-c64a-4e42-9507-4b9ab7c7a5f4',
  'x-ms-request-id',
  '696c29af-b73f-4409-aa31-89a4baece161',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:39 GMT',
  'Content-Length',
  '536'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/EC162542139619007515')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '4cd8a8fe-8289-42fc-b6f7-0241e22cc715',
  'x-ms-request-id',
  '67ebba81-aa4d-4cf4-adf0-0244d80463c4',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:57:39 GMT'
]);
