let nock = require('nock');

module.exports.hash = "911230e858263a0086ce3c1d50fc429c";

module.exports.testInfo = {"uniqueName":{"EC":"EC162542145924705124"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542145924705124/create')
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
  'ffbe7247-33d0-4876-90a1-8d1e45488bd2',
  'x-ms-request-id',
  'd0d0b0a5-87ed-4f0a-973e-2ceef857d097',
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
  '8d2bd012-d9be-40cc-8195-f8babe894802',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAgAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:57:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0najQgGVu6Lt28DFVYt7TmvvIbTeso7NyvGf1wKYrYpTIXZGyuVIH0zyW6_c2ZYB0kcD49RrfT8RlAEglkfOnBlsBmvgm-wtPKWu-pfPQEUxXEQ6uUVAkjIjws1Ek_Gh1zTxc2fC4HNMcPNAyeqbAijQXN89Z6rS5Pfiitk-vmcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:57:39 GMT',
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
  'c2e38669-47f7-4c26-af10-31285ad54700',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAgAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:57:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrN9X4eAD2d9LQqOT08XqsZ2NQyKBLu_uE2pzvypMuuOSogkc6NpCl64Yy4K-T53OcjF1Di0J0GnIpO42Y3S1ilrp18oSpp4cF_oWO9rbcqbuvw6NzevPD3PlRh9IBh6HQxRhBCQshw4-yfTkVLHd4tOuz_Qxk8DTecVWucIIUKP0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:57:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=d4db1d47-35c6-48a2-9da8-cb5b54d27a6c&client_secret=azure_client_secret")
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
  'e9f9907b-6541-4963-bdb7-46e950c54402',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAwAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:57:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:57:39 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542145924705124/create', {"kty":"EC","attributes":{},"crv":"P-384"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf","kty":"EC","key_ops":["sign","verify"],"crv":"P-384","x":"Q-Mx9KYYKKEMRToubyPnPSHGQvVg_Pt8U___rF26UYWXGFBU0FJQOq2RKsGjkTaK","y":"Qb83ttsY8HdC9G2nWaNnmVwThW6y5hhMkeGsMr4EtIKhKD818iMzeBWTlqkrS9D3"},"attributes":{"enabled":true,"created":1625421460,"updated":1625421460,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'ffbe7247-33d0-4876-90a1-8d1e45488bd2',
  'x-ms-request-id',
  'a43a6e9b-dd24-49a0-bfa3-59f063a70bbd',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf')
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
  '196aaa5a-2011-4d40-bd95-ec624f3c5892',
  'x-ms-request-id',
  'c009c086-c0f4-45d1-9fc8-44409c982e80',
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
  'Sun, 04 Jul 2021 17:57:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf","kty":"EC","key_ops":["sign","verify"],"crv":"P-384","x":"Q-Mx9KYYKKEMRToubyPnPSHGQvVg_Pt8U___rF26UYWXGFBU0FJQOq2RKsGjkTaK","y":"Qb83ttsY8HdC9G2nWaNnmVwThW6y5hhMkeGsMr4EtIKhKD818iMzeBWTlqkrS9D3"},"attributes":{"enabled":true,"created":1625421460,"updated":1625421460,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '196aaa5a-2011-4d40-bd95-ec624f3c5892',
  'x-ms-request-id',
  '2f570985-5dd0-4dbd-9076-0b5aa8c8b6b1',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf/sign', {"alg":"ES384","value":"l5EEZHPWD5RHC5I7FUe0x1esxlN4fcmEyn3joYOIt6UH_TnIqQWs76Uo9hFFXWlk"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf","value":"Mdhq7AjeAFq6wEJn1d4cnEPbXL834R7t1FtGr4V2evsk2ZLsbI89YuNEDYqaNmqqMipdm3zI8Gkj-ZWTwM7nS9ez63R0WdADEAjCqk90YbIOZDD-l8rXm4rZ8OcgE4DD"}, [
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
  'd60eda6c-80fd-4563-93ec-4fe612d545d3',
  'x-ms-request-id',
  'a29956ee-bf5c-49ff-b536-178151edd356',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '241'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf/verify', {"alg":"ES384","digest":"l5EEZHPWD5RHC5I7FUe0x1esxlN4fcmEyn3joYOIt6UH_TnIqQWs76Uo9hFFXWlk","value":"Mdhq7AjeAFq6wEJn1d4cnEPbXL834R7t1FtGr4V2evsk2ZLsbI89YuNEDYqaNmqqMipdm3zI8Gkj-ZWTwM7nS9ez63R0WdADEAjCqk90YbIOZDD-l8rXm4rZ8OcgE4DD"})
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
  '9b776bd4-bdb0-46ea-ad7a-7f8156eeca14',
  'x-ms-request-id',
  'ff413ba0-6589-4a72-82a4-1d0b4c7c3a8e',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf/sign', {"alg":"ES384","value":"l5EEZHPWD5RHC5I7FUe0x1esxlN4fcmEyn3joYOIt6UH_TnIqQWs76Uo9hFFXWlk"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf","value":"kx_iHPSovHN4jaDKks3nQ9Yp6EGnj4c772UiqB4hMWZ2bP1iL6zoaS0GYG85GQflMMSQsoE4P0VVMa19VJxVDwOupX3y-xFhRkUtPMUkJsR0BQgAYENnV7sViMHarRQu"}, [
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
  '38af6033-8ced-410a-a8ff-892fee083972',
  'x-ms-request-id',
  'e64573b3-53f7-48ac-8443-9615027b5e31',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '241'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf/verify', {"alg":"ES384","digest":"l5EEZHPWD5RHC5I7FUe0x1esxlN4fcmEyn3joYOIt6UH_TnIqQWs76Uo9hFFXWlk","value":"kx_iHPSovHN4jaDKks3nQ9Yp6EGnj4c772UiqB4hMWZ2bP1iL6zoaS0GYG85GQflMMSQsoE4P0VVMa19VJxVDwOupX3y-xFhRkUtPMUkJsR0BQgAYENnV7sViMHarRQu"})
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
  '7702d2b5-ffc8-41f5-92a6-7cf49c7b765f',
  'x-ms-request-id',
  'b3b8cf5d-52ca-4818-b36a-b00dc1b4a006',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/EC162542145924705124')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/EC162542145924705124","deletedDate":1625421460,"scheduledPurgeDate":1633197460,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf","kty":"EC","key_ops":["sign","verify"],"crv":"P-384","x":"Q-Mx9KYYKKEMRToubyPnPSHGQvVg_Pt8U___rF26UYWXGFBU0FJQOq2RKsGjkTaK","y":"Qb83ttsY8HdC9G2nWaNnmVwThW6y5hhMkeGsMr4EtIKhKD818iMzeBWTlqkrS9D3"},"attributes":{"enabled":true,"created":1625421460,"updated":1625421460,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'cb6f8ec2-f049-4512-894d-eeb86bd65615',
  'x-ms-request-id',
  '5c671ed6-ea63-4068-9f08-879aea0c2ea4',
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
  'Sun, 04 Jul 2021 17:57:40 GMT',
  'Content-Length',
  '577'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'f28e0cb4-aa5a-4193-ae1c-77d2b629bc34',
  'x-ms-request-id',
  '4e1a7b60-b22d-4420-b0f0-39cbfea66ed9',
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
  'Sun, 04 Jul 2021 17:57:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '24d3530a-0f0b-4a25-83c0-e310a3d29fac',
  'x-ms-request-id',
  '5bc53a22-a7a1-4054-a725-6ec4089fbaf8',
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
  'Sun, 04 Jul 2021 17:57:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '2a303a31-e2e1-4e89-aae6-3d102672cb09',
  'x-ms-request-id',
  '805fcd2d-5f1b-442c-90cc-45e6bf7d953b',
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
  'Sun, 04 Jul 2021 17:57:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'b87e24b0-25a3-46f4-a4a3-2d8c081ad58e',
  'x-ms-request-id',
  '2d163c86-73aa-4020-8736-c20792dbfd02',
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
  'Sun, 04 Jul 2021 17:57:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '0d8a6490-f2d7-4824-8b2d-4221f7d86d03',
  'x-ms-request-id',
  '0d8e6c31-a06f-40ce-be34-01ce1dcc5370',
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
  'Sun, 04 Jul 2021 17:57:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '387ba914-76f4-44de-92e5-28669ebb67f8',
  'x-ms-request-id',
  '888694f5-5a44-47e5-abdf-87dd3b40b9fe',
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
  'Sun, 04 Jul 2021 17:57:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'c590d3f1-72ca-4910-ac25-3733ee1044f1',
  'x-ms-request-id',
  'e6b9e913-1f80-4b16-b797-63a2d3e2526e',
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
  'Sun, 04 Jul 2021 17:57:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '1c854b2d-7f5b-4da0-a8ff-1f3c76bf285c',
  'x-ms-request-id',
  '33bfa6b9-65f9-42ce-96a7-a9e53ec472d9',
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
  'Sun, 04 Jul 2021 17:57:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '409f1d06-30b5-4870-8da2-f3727226529e',
  'x-ms-request-id',
  'fa302133-9d30-4162-af50-f7cc46cd3415',
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
  'Sun, 04 Jul 2021 17:57:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '708ed4cb-41b4-4ac1-9e36-ff02d7411fbc',
  'x-ms-request-id',
  '96f93d2f-08bb-475f-940a-566d7e3c9870',
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
  'Sun, 04 Jul 2021 17:57:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'f6daf593-2539-4937-8025-d3648a949d12',
  'x-ms-request-id',
  '49ad1d9f-fc2d-455d-bdbc-0756d5d43913',
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
  'Sun, 04 Jul 2021 17:57:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '21656ff4-ac95-47df-bd08-e7c239ce30a1',
  'x-ms-request-id',
  '16ecb4df-62fb-43bc-884b-99c6313f839b',
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
  'Sun, 04 Jul 2021 17:58:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '0286a623-0886-4da4-b63c-4ac212d6bf22',
  'x-ms-request-id',
  '550ac7db-fe72-47be-a248-eb507544f105',
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
  'Sun, 04 Jul 2021 17:58:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '719f927c-c213-4631-a3b4-a3fe11bcbd45',
  'x-ms-request-id',
  '41744b89-e390-46b2-904b-d98bcfecfdc8',
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
  'Sun, 04 Jul 2021 17:58:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'd89bdcdb-86e5-4b7b-850d-fbd5bbcfc906',
  'x-ms-request-id',
  'bb768887-0e8d-49ea-836d-8682bf19d082',
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
  'Sun, 04 Jul 2021 17:58:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '3b5bfd06-457f-4a8b-95dc-b75b49a5a824',
  'x-ms-request-id',
  '4db4d24a-00db-4dee-b632-c1a84e272200',
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
  'Sun, 04 Jul 2021 17:58:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'ba59d26c-811e-4efb-ac17-d24d5abae78c',
  'x-ms-request-id',
  '80cd8525-ce8b-401e-8ce5-714bfd4ed327',
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
  'Sun, 04 Jul 2021 17:58:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'f54d7607-460b-4278-9b28-88079b511e49',
  'x-ms-request-id',
  '31a624da-ea75-453c-8b70-3721a75ca0d9',
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
  'Sun, 04 Jul 2021 17:58:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '677ce8e1-ee51-4e8c-8a9d-9626495d6a99',
  'x-ms-request-id',
  '5555fc9e-afc7-4ab8-9baf-e5338cfa997e',
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
  'Sun, 04 Jul 2021 17:58:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '4a612d5d-9b6e-45f4-a098-33d6d9c9c4f0',
  'x-ms-request-id',
  '33877951-51e4-4ba4-aa79-6720992842bb',
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
  'Sun, 04 Jul 2021 17:58:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'c5f2f53d-9e19-41e5-81fa-e1de5a60715b',
  'x-ms-request-id',
  '12231570-90ec-410d-af28-0e5937e39880',
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
  'Sun, 04 Jul 2021 17:58:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '37d1e80a-290e-4f95-ba8f-12d8c3e04dcb',
  'x-ms-request-id',
  '331086e6-61f1-42b9-ae27-f66e30401009',
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
  'Sun, 04 Jul 2021 17:58:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '93a7bd60-04a5-4db2-9adb-8e28ee4141f5',
  'x-ms-request-id',
  'ff264225-8d61-43d6-99fa-29179a3e0729',
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
  'Sun, 04 Jul 2021 17:58:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '910e0684-a283-49e1-bc1b-24f43d0cc1c3',
  'x-ms-request-id',
  'ff69b8e3-cf0b-4617-9983-971e320ff2ef',
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
  'Sun, 04 Jul 2021 17:58:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '2b307b64-5dba-4b66-a0e1-15322995322e',
  'x-ms-request-id',
  'd4bf0551-ddc1-4c3c-a9ef-bae7f7069f81',
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
  'Sun, 04 Jul 2021 17:58:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '457e21d9-1db4-4080-b6b0-b31f5ef12009',
  'x-ms-request-id',
  '788fc127-fddf-44e1-bd7b-38900773324a',
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
  'Sun, 04 Jul 2021 17:58:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '6059ed48-9bed-4e35-affd-005876cdf953',
  'x-ms-request-id',
  'e9d367ba-201c-43e8-83f3-1af409ab3093',
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
  'Sun, 04 Jul 2021 17:58:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'a4c79115-b1d3-4680-b953-5f9acb367262',
  'x-ms-request-id',
  '99e84728-23a6-46e7-bcef-d88154eb47b1',
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
  'Sun, 04 Jul 2021 17:58:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'e60cd417-02d7-459e-900c-59cd750125a8',
  'x-ms-request-id',
  '444094e2-b6f0-4309-b920-8278e9dea65e',
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
  'Sun, 04 Jul 2021 17:58:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '785e5746-450c-4d65-87ad-44840732979c',
  'x-ms-request-id',
  '99c51e7b-4a55-4192-bfe4-fcaff4b76d45',
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
  'Sun, 04 Jul 2021 17:58:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'cdd64d7f-a6e0-4a5f-b05f-968e2ff31653',
  'x-ms-request-id',
  '534d160e-9cc5-4c60-a36c-903df93cfdbf',
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
  'Sun, 04 Jul 2021 17:58:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'baf6a27d-23f8-4336-8895-247632448ec4',
  'x-ms-request-id',
  '1a5642bd-3d89-437d-8a1a-0f416ae4f368',
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
  'Sun, 04 Jul 2021 17:58:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '2e13cf65-f9e7-46c0-9f89-400819aa654b',
  'x-ms-request-id',
  'b04accb3-def9-4026-8d07-707dec3bf756',
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
  'Sun, 04 Jul 2021 17:58:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  'a9dc47f3-ee0a-434e-b2c9-841d249a834c',
  'x-ms-request-id',
  '14ed4dbc-b31e-462c-bdb4-48a6d40652d4',
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
  'Sun, 04 Jul 2021 17:58:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '794a5a13-8fd3-4a08-9b87-bfbe01fd0a26',
  'x-ms-request-id',
  '163da3a2-772e-4dec-ad87-b2c1ade70378',
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
  'Sun, 04 Jul 2021 17:58:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542145924705124"}}, [
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
  '9fa31c02-01d7-47de-8aba-2dea5a577c62',
  'x-ms-request-id',
  'c5820f1a-cb6d-4054-9250-706c21bc7340',
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
  'Sun, 04 Jul 2021 17:58:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542145924705124')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/EC162542145924705124","deletedDate":1625421460,"scheduledPurgeDate":1633197460,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542145924705124/fa87cc03d57f4f63b04dfc1764a8aabf","kty":"EC","key_ops":["sign","verify"],"crv":"P-384","x":"Q-Mx9KYYKKEMRToubyPnPSHGQvVg_Pt8U___rF26UYWXGFBU0FJQOq2RKsGjkTaK","y":"Qb83ttsY8HdC9G2nWaNnmVwThW6y5hhMkeGsMr4EtIKhKD818iMzeBWTlqkrS9D3"},"attributes":{"enabled":true,"created":1625421460,"updated":1625421460,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '56227f76-13ca-470d-8174-cd6ffd112f25',
  'x-ms-request-id',
  'feee0c6d-ff15-4211-81a4-508e8fdb3b15',
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
  'Sun, 04 Jul 2021 17:58:52 GMT',
  'Content-Length',
  '577'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/EC162542145924705124')
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
  '160c100f-4652-4d2a-8cbe-ebbe28f9936f',
  'x-ms-request-id',
  '14c6101a-75ae-458a-b6b3-0c4588b30758',
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
  'Sun, 04 Jul 2021 17:58:52 GMT'
]);
