let nock = require('nock');

module.exports.hash = "87d5ceaaabf7cb41fe6b8bab745c62e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdatekey-/create')
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
  'westus2',
  'x-ms-client-request-id',
  '9a6a03e9-53c0-4650-9b0e-82f0d3048357',
  'x-ms-request-id',
  '3c745141-8ed1-4750-abed-d40ce6d279a4',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:16 GMT'
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
  'b8da57ef-aecd-4849-99c2-be4d386f7b01',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAA; expires=Thu, 02-Sep-2021 17:37:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAg4v1AljXBg7ViCy8yAWmsNKIb60QaX6SGLGcs9HGHqDyyA0nEZ-mJU2zMCqM8KMjMXRiYnlNRbe9zoff3PNzvZ8LORr2rvIumqahzpFmoW027bweT0LRjQURAAyudl65SYEjMqPIfS1l5JPyugFbY32tJHzi5Q0GsjZcVNWl7MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:16 GMT',
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
  '0c994b87-eab1-4fc3-aeae-3febb1b23301',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAA; expires=Thu, 02-Sep-2021 17:37:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-v2Vu8X81464WXAB4oSUjYiiLMKp_kvGUPry9EDJ4DhnKwozSW3thXhW6iOJP7m6SSrX45Vz4gesy9DXAxL18agsSeX6ynXmbTifVrO7ojyhk4N83FeEscpQZCyg0vPvJu9WxqH_8Zub2jdlN-wPPV1ojYkkG0omJmtIt8EIyH4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:16 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=16820e6d-860f-43e9-997e-b489d6e18148&client_secret=azure_client_secret")
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
  '88cf82e3-204b-43ae-a71c-1a25c13e2c01',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAAswFp9AEAAADMdZvYDgAAAA; expires=Thu, 02-Sep-2021 17:37:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:17 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdatekey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdatekey-/7cc0db54a92d4ab697b1e7b7807d4e10","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xeHwS_7CMS-2pH29aSIypsc7Z2luTkiYxkz2fB9pZbZDxhwsKdukYIjAYzoWlRthKvo7uaQLwcBLBvq6N5LN50WGpeN_eEh_oqvbTN61MO3R4gV60gL4t4rVymobz78weJbo_CwohkB7pB8IHEOJIBFUbNpC0368Tzyy4gsofVygBWztVVm5M7psV9zexN84iF4XbFlvlLSPR3HluBVZj5e-HrqVrzYeRm30A4PEu3B_vPnq253WH81PN_erLJcFjGFs1NVf8zY3fwWyiDA-wifk_4uyhq6frQlYYx17REUQxybZgeRIxcC6YTSr7OUnHkESLOG5fzs95NlhhrknbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1628012237,"updated":1628012237,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '9a6a03e9-53c0-4650-9b0e-82f0d3048357',
  'x-ms-request-id',
  '5c4221d6-fbcb-4282-84f8-aef59fe0c7a9',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:17 GMT',
  'Content-Length',
  '717'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/CRUDKeyName-canupdatekey-/7cc0db54a92d4ab697b1e7b7807d4e10', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdatekey-/7cc0db54a92d4ab697b1e7b7807d4e10","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xeHwS_7CMS-2pH29aSIypsc7Z2luTkiYxkz2fB9pZbZDxhwsKdukYIjAYzoWlRthKvo7uaQLwcBLBvq6N5LN50WGpeN_eEh_oqvbTN61MO3R4gV60gL4t4rVymobz78weJbo_CwohkB7pB8IHEOJIBFUbNpC0368Tzyy4gsofVygBWztVVm5M7psV9zexN84iF4XbFlvlLSPR3HluBVZj5e-HrqVrzYeRm30A4PEu3B_vPnq253WH81PN_erLJcFjGFs1NVf8zY3fwWyiDA-wifk_4uyhq6frQlYYx17REUQxybZgeRIxcC6YTSr7OUnHkESLOG5fzs95NlhhrknbQ","e":"AQAB"},"attributes":{"enabled":false,"created":1628012237,"updated":1628012237,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c0a99d06-1093-45a4-b214-c6c751a5cdd6',
  'x-ms-request-id',
  '900e8d12-a070-420b-a83e-3a97f5f9ef52',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:17 GMT',
  'Content-Length',
  '718'
]);
