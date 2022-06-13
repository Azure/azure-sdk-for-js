let nock = require('nock');

module.exports.hash = "4a978ac64a46254e1b7f0f347da49006";

module.exports.testInfo = {"uniqueName":{"keyrotationtracing":"keyrotationtracing164849174583703175"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotationtracing164849174583703175/create')
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
  'a34afcfe-1620-46e3-8e40-7483a71f2c00',
  'x-ms-request-id',
  'a1718fb2-fa90-4da3-95f2-20db0d850b9d',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 28 Mar 2022 18:22:26 GMT'
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
  '5b174505-cc97-4b92-ad7e-5ad20d8e6100',
  'x-ms-ests-server',
  '2.1.12570.11 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApD6-epmYt9Kg7uQ2l8_0UE; expires=Wed, 27-Apr-2022 18:22:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDw4zDCracPoBSSAqyTmVWwi5THVHUyyM5XPKla5Ms3i0LFqiV7FmweGt1jweE53f7ieQQtE9YCFBH_hTBYlDVvlXW8LadRqH2fl85bLMz3qf3a0dmBJ3p4lz1kfRxI_I51ZpQEljCtnSXhXWPayXgafr2CIXzAK4JjrWJSKRNpEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Mar 2022 18:22:25 GMT',
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
  '940b8438-e087-4c2e-8660-3b45622cc700',
  'x-ms-ests-server',
  '2.1.12570.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhajQQyWMklBpDGewbNzals; expires=Wed, 27-Apr-2022 18:22:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevromBmM-Vein_E-2K3Fv9bVsKFnOLo58MuxyZ-73wnFrRv7e4srJGDFvLtwUkQsKvAhfhBh7sDAJFI0ALcOhq-wkNnR6UeWdaLbuaUPOEejHP0ZqLo0nP7vLyY7mATaNDyfua53yt7LBL0eqjHBPChElSB6n3b0G6xRYDV-b5p9Z4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Mar 2022 18:22:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f516d323-2757-4a5c-bc99-2dc0f1444571&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '0c08c54d-2f6b-4ae3-9a73-a858a9fbd200',
  'x-ms-ests-server',
  '2.1.12570.11 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuBe-_bgamtKmkTOjG6aZHsFlOOGAQAAAOHz09kOAAAA; expires=Wed, 27-Apr-2022 18:22:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Mar 2022 18:22:26 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotationtracing164849174583703175/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/keyrotationtracing164849174583703175/56aef1db795845a3872b424fcd32c1b1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vOapswV3WcDiu7iTFPwG0wj9nlND2RsWLXCmRdp5nvXvr9ll9dV0ncsmEBtcCxnwgTpOK_QbF-rHAFSm9lYxt0HJg6bUT3BMLIto5Rv6xPQJaZWakmn3QGwjURdMdIuQKQAQu8NoIFmMyOSBioDPWMUKYw1y9au_7CGmaPr-8iastns-igSklFzhf5304gfY5A9YZCeRHi92LlznCdzHoAhtUSibLacE6jiYNa3JM6Vz619e8Crj0ETSgDX3d25A-ZuuErD6yncK-SVdGmkdVpYtvyYE0agYPCO8Jl1nec0qOZ3H9MXd-AkTzfVe2stRcQ-QUip5-GkG4YgI7LYQQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1648491746,"updated":1648491746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'a34afcfe-1620-46e3-8e40-7483a71f2c00',
  'x-ms-request-id',
  '49423e5e-3f72-4c3d-a30e-47b53c4ac991',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  'f4e2dde1-5ff5-56c6-8923-012f34e01597',
  'x-ms-keyvault-rbac-cache',
  'ra_age=154;da_age=2994;rd_age=2994;brd_age=21607;ra_notif_age=1020;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 28 Mar 2022 18:22:26 GMT',
  'Content-Length',
  '712'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/keyrotationtracing164849174583703175/rotationpolicy', {"lifetimeActions":[{"trigger":{"timeAfterCreate":"P50D"},"action":{"type":"Rotate"}}],"attributes":{}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/keys/keyrotationtracing164849174583703175/rotationpolicy","lifetimeActions":[{"trigger":{"timeAfterCreate":"P50D"},"action":{"type":"Rotate"}},{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"created":1648491746,"updated":1648491746}}, [
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
  '3811de95-917c-41e5-9a98-d4aeaa80a628',
  'x-ms-request-id',
  '49ed756d-656a-49db-8d01-e6baa9e95764',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  'f4e2dde1-5ff5-56c6-8923-012f34e01597',
  'x-ms-keyvault-rbac-cache',
  'ra_age=154;da_age=2994;rd_age=2994;brd_age=21607;ra_notif_age=1020;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 28 Mar 2022 18:22:26 GMT',
  'Content-Length',
  '311'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/keyrotationtracing164849174583703175/rotationpolicy')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/keys/keyrotationtracing164849174583703175/rotationpolicy","lifetimeActions":[{"trigger":{"timeAfterCreate":"P50D"},"action":{"type":"Rotate"}},{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"created":1648491746,"updated":1648491746}}, [
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
  '9dfb4cd4-f05f-4310-9b82-1609d458df08',
  'x-ms-request-id',
  'b5914095-b133-4e85-a6e7-3034436fffa1',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  'f4e2dde1-5ff5-56c6-8923-012f34e01597',
  'x-ms-keyvault-rbac-cache',
  'ra_age=154;da_age=2994;rd_age=2994;brd_age=21607;ra_notif_age=1020;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 28 Mar 2022 18:22:26 GMT',
  'Content-Length',
  '311'
]);
