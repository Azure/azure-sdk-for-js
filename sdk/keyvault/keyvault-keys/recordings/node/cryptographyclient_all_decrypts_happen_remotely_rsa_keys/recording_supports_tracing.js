let nock = require('nock');

module.exports.hash = "97a02a7e14c94f2ec6c4e23d9da62158";

module.exports.testInfo = {"uniqueName":{"RSA":"RSA162542927697303561"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/RSA162542927697303561/create')
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
  '73dde72e-b02f-4394-8188-d19ca05872fa',
  'x-ms-request-id',
  'ebbe29b8-a103-406f-bc4c-de6f68de521d',
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
  'Sun, 04 Jul 2021 20:07:56 GMT'
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
  'f5378a86-6600-47cd-9c94-2a3a435efd01',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am3w-FTxGxRKjVaNMxFbIvM; expires=Tue, 03-Aug-2021 20:07:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHbuhGn_ELpMOOwTc2BiAfss00cTgaZ3CVA1vMpQgPqKtHc7Oem-1FhVmQaDxlozIqurmm446MO3wCpfacZ4lSJMpTe2_Nm-N3BRd2iavb1_Ve9I3H8_XzgqveK3zlpJqZjieYBoZrNMigraLKqwXDSJy3hb8zwNYxdUgoGXvxJYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 20:07:57 GMT',
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
  'b223425b-649f-4ade-ab87-791f6fef4b02',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Am3w-FTxGxRKjVaNMxFbIvM; expires=Tue, 03-Aug-2021 20:07:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCd7bkhGCkvjujklOC3e8cRUxn5O7dTssGhMaTDUfIKVtcCnesO57lR4lp60C2PwSYhou7v7E3Lh9PkNAwaIS6xvYfgLo4La56l2V40YHv2_ohdmFX9-avOyA9Gn5619skl72il1xmApDTKCfJ_74lJOLOkXgo_LwzuhuLB5jM1ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 20:07:57 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=02f16bf3-53aa-408f-b654-e8b21314b81f&client_secret=azure_client_secret")
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
  '750a5384-c545-4d19-8678-df77260e5402',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Am3w-FTxGxRKjVaNMxFbIvP1qjVDAQAAAB0MdNgOAAAA; expires=Tue, 03-Aug-2021 20:07:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 20:07:57 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/RSA162542927697303561/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/RSA162542927697303561/7a1a513a87684a30b73b8b6943c387fb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zUtM1gvIGu8ynQ3EzLWbAnl_cm0lXHWsQOfhVmp_izzb8wLiVAu-i9ZI38MpSw3N-HmfybAtZElLSpndcQo-gXGlSnKEkHTloNQA79M6NisC9s9ovyUJKh_uucfBQb5IuAOBySheYr6_ZZnSLRD0XiIVonwHXS34NDmk-Zp5BNnQPXk5kSfOeJorlPtFAXH3XzBtpEDSTAwlyLc-87jJAfuCDfTj5ofsppVUpIloOo5n7t_hZkXaVRTumGx_mT9sxf5QtjN7i-Djc4scfZ9I1XmeGBj6fGa2hvpLtPKGLKP7XzEixRVNebcNz-UrUpjztHMn2AMcf_XchmeStD8orQ","e":"AQAB"},"attributes":{"enabled":true,"created":1625429278,"updated":1625429278,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '73dde72e-b02f-4394-8188-d19ca05872fa',
  'x-ms-request-id',
  '110f2fcc-c8b6-4ca0-a37a-06f85d5e20b5',
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
  'Sun, 04 Jul 2021 20:07:58 GMT',
  'Content-Length',
  '686'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/RSA162542927697303561')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/RSA162542927697303561","deletedDate":1625429278,"scheduledPurgeDate":1633205278,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/RSA162542927697303561/7a1a513a87684a30b73b8b6943c387fb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zUtM1gvIGu8ynQ3EzLWbAnl_cm0lXHWsQOfhVmp_izzb8wLiVAu-i9ZI38MpSw3N-HmfybAtZElLSpndcQo-gXGlSnKEkHTloNQA79M6NisC9s9ovyUJKh_uucfBQb5IuAOBySheYr6_ZZnSLRD0XiIVonwHXS34NDmk-Zp5BNnQPXk5kSfOeJorlPtFAXH3XzBtpEDSTAwlyLc-87jJAfuCDfTj5ofsppVUpIloOo5n7t_hZkXaVRTumGx_mT9sxf5QtjN7i-Djc4scfZ9I1XmeGBj6fGa2hvpLtPKGLKP7XzEixRVNebcNz-UrUpjztHMn2AMcf_XchmeStD8orQ","e":"AQAB"},"attributes":{"enabled":true,"created":1625429278,"updated":1625429278,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '65715d66-b7b2-489c-8e25-d90ee0c33b83',
  'x-ms-request-id',
  '14db6924-eed9-403d-a5a4-9a4faa96d20c',
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
  'Sun, 04 Jul 2021 20:07:58 GMT',
  'Content-Length',
  '826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'de36a60b-528e-4e59-a4f7-8c43cf1f88a6',
  'x-ms-request-id',
  'f9fb890b-8425-4e93-8f6a-23b78d13fd6e',
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
  'Sun, 04 Jul 2021 20:07:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f3b2a812-46ab-4ab1-82e5-0cd1f0aaf508',
  'x-ms-request-id',
  '5a22bea2-054c-4d81-9f35-a745db13ab95',
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
  'Sun, 04 Jul 2021 20:07:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'ad7f95ad-027b-4991-9e14-886518399c14',
  'x-ms-request-id',
  'e985fddd-73dc-44e8-a6df-07843938b503',
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
  'Sun, 04 Jul 2021 20:08:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '83e963e6-2157-4e83-855d-b837b3a8f4a6',
  'x-ms-request-id',
  '0317a5b8-093c-4a4a-8f07-464e468ef7f5',
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
  'Sun, 04 Jul 2021 20:08:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '3da37ad2-d824-4d9c-ade2-eb1c25e5b464',
  'x-ms-request-id',
  'c172640c-31d8-4557-b440-ff0d7e3eb7f3',
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
  'Sun, 04 Jul 2021 20:08:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '644829ae-6332-475f-aedc-40e336be6530',
  'x-ms-request-id',
  'a6d96236-b139-46fc-8fdc-16f0e101bae1',
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
  'Sun, 04 Jul 2021 20:08:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '3899e424-24db-4f83-adf0-edf36d03463b',
  'x-ms-request-id',
  '2d5ea1a4-4e9f-498e-ac87-ac0ecc47f628',
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
  'Sun, 04 Jul 2021 20:08:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'fb66a233-e874-480f-8fef-72c5af084170',
  'x-ms-request-id',
  '7b19f7ae-24a2-4344-8e94-2f17fd773e59',
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
  'Sun, 04 Jul 2021 20:08:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '62687e3a-2ce1-4231-988e-d7da83dd0099',
  'x-ms-request-id',
  'b4126380-6f4c-4fea-93c6-ec36090f0952',
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
  'Sun, 04 Jul 2021 20:08:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '06629e75-6c2b-4cea-8f45-134a69c2145b',
  'x-ms-request-id',
  '21948c6e-ff74-4cfd-a3c5-4677dbf68c24',
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
  'Sun, 04 Jul 2021 20:08:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'b3a4ccf2-cf1c-43d3-9fff-907a5aa243cd',
  'x-ms-request-id',
  '4ae8ee88-0325-4d91-97e5-56a8442d006e',
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
  'Sun, 04 Jul 2021 20:08:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '953f0155-1196-4555-9fb9-f6fb2e21f643',
  'x-ms-request-id',
  '382c9003-b61e-49d9-ac3f-41e0bda49465',
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
  'Sun, 04 Jul 2021 20:08:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '7f54b001-ae41-4ae6-bd75-4d44b892f6ab',
  'x-ms-request-id',
  '444d9c40-bb7c-4ea7-aee7-8fcc2c8be185',
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
  'Sun, 04 Jul 2021 20:08:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '756ab8de-0f95-4a7e-a6cf-67e2870a497e',
  'x-ms-request-id',
  'a77e8285-7ac3-4757-bb34-13247e7f815c',
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
  'Sun, 04 Jul 2021 20:08:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '286ae736-fff6-42d2-97d8-b9575a8d91ff',
  'x-ms-request-id',
  '6eb2cd4e-a508-4f40-9c76-364fc65824ac',
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
  'Sun, 04 Jul 2021 20:08:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '3b1cc261-72ad-4512-921d-af1384f66e90',
  'x-ms-request-id',
  '20e16395-0dec-44c5-8dcf-3b9ef13f5263',
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
  'Sun, 04 Jul 2021 20:08:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '646cb533-f9ea-4efb-98bc-072db5931d24',
  'x-ms-request-id',
  '4fc23e33-9e6e-46bd-a24e-564e642b52dc',
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
  'Sun, 04 Jul 2021 20:08:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '552fa728-fcf4-42f9-b25c-8c0ed0e51707',
  'x-ms-request-id',
  '5b9a50d0-8b84-45c1-af4d-f3858b5125cf',
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
  'Sun, 04 Jul 2021 20:08:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'e4257cfa-7866-4229-a621-2c870715321b',
  'x-ms-request-id',
  '77026726-140e-43bf-a9de-8f27e06fd782',
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
  'Sun, 04 Jul 2021 20:08:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '1758f1b0-7c2f-4306-9f9f-b631161902f5',
  'x-ms-request-id',
  '1baa2adb-3378-4811-92b8-3f53c77af699',
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
  'Sun, 04 Jul 2021 20:08:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '8d0cbcdf-1b20-4703-90b4-a8a7a840102d',
  'x-ms-request-id',
  '697cdf7c-95d9-419f-a12d-b0043365de21',
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
  'Sun, 04 Jul 2021 20:08:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '30ee0115-87cf-4360-a02b-d44b59073d96',
  'x-ms-request-id',
  '600da13a-e8a6-4b80-8a73-03b0489073e8',
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
  'Sun, 04 Jul 2021 20:08:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f608fa2b-a764-4c07-a814-b7771c0b0459',
  'x-ms-request-id',
  '3bcd2acf-4fe4-4d1e-9973-0cb957494f47',
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
  'Sun, 04 Jul 2021 20:08:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'eeb961f5-34f0-467c-9ddc-4a20c869a043',
  'x-ms-request-id',
  'ad0aa816-bbb3-46c4-90a3-89760c8edad3',
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
  'Sun, 04 Jul 2021 20:08:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '6a3cf7d6-c6ce-4998-a734-eff3225a4ca1',
  'x-ms-request-id',
  '8e6b9807-bdd6-432d-876a-8bb1514e4c6d',
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
  'Sun, 04 Jul 2021 20:08:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '327e3bcb-a997-432e-b3a1-b570242a689d',
  'x-ms-request-id',
  '189f29d2-ccaa-49e3-8bbb-1da671d1f879',
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
  'Sun, 04 Jul 2021 20:08:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '559d7ae3-2436-4895-a1ab-e45c3f84c41f',
  'x-ms-request-id',
  'a6982cb1-32e5-42e0-9e23-7003437bb30a',
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
  'Sun, 04 Jul 2021 20:08:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'b5214b5e-edcf-4967-a443-78d1e4cf1c90',
  'x-ms-request-id',
  '34a4bf43-3fed-4ed8-89b3-a3f13896ee10',
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
  'Sun, 04 Jul 2021 20:08:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '3efc3d92-80c4-401d-94a4-d6d9c4a1ccc1',
  'x-ms-request-id',
  '95d45fb1-d4be-4409-8aca-57f44a9bcdb9',
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
  'Sun, 04 Jul 2021 20:08:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '17dbefce-6166-4ba7-a9ea-51565f30e0cd',
  'x-ms-request-id',
  '365d5cb5-1369-4a04-befd-fde32a1b086f',
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
  'Sun, 04 Jul 2021 20:08:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'c17575e1-2bcb-4b94-b889-4e02db22608c',
  'x-ms-request-id',
  '58c41546-fc1a-478a-a53c-bbd08bb14482',
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
  'Sun, 04 Jul 2021 20:08:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'b71945b1-9b6b-4b93-9bb1-74c3ed12ee3c',
  'x-ms-request-id',
  'b135593b-2bef-4cfd-84fa-6129faf59ab7',
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
  'Sun, 04 Jul 2021 20:08:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '73585a35-820e-496a-bdae-8a67b87b7d27',
  'x-ms-request-id',
  '4deef342-6de3-4752-afb1-6f04c37112b6',
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
  'Sun, 04 Jul 2021 20:09:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '157cf2cc-d5dc-458d-830f-f095239e3fec',
  'x-ms-request-id',
  '2af8e143-6c45-44c4-9242-9449137fe6ab',
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
  'Sun, 04 Jul 2021 20:09:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '98a1c589-7e45-49ea-96b7-4bd88c6a455f',
  'x-ms-request-id',
  'ec0debf6-22fe-4658-93dd-f12f6e748841',
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
  'Sun, 04 Jul 2021 20:09:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'c9bcf136-abeb-4575-87ff-634e7d19cf24',
  'x-ms-request-id',
  '37212839-2814-4238-8341-55bf1122e550',
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
  'Sun, 04 Jul 2021 20:09:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '0522167d-1018-431d-a5e6-dc2cbbb2a539',
  'x-ms-request-id',
  '44d4cab5-7523-48ca-81b5-7675ce537038',
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
  'Sun, 04 Jul 2021 20:09:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'c5e28b03-6ba4-419c-ada2-c28b7b08ded6',
  'x-ms-request-id',
  'f18b7788-c632-404b-949b-014683f45e52',
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
  'Sun, 04 Jul 2021 20:09:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '151e6298-016d-4f51-80b5-73a2a33f83f8',
  'x-ms-request-id',
  '5dee77af-0613-497d-8eb0-f64329adee0d',
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
  'Sun, 04 Jul 2021 20:09:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f74bcc5c-d871-4bac-a076-752f0b9d3209',
  'x-ms-request-id',
  '87294595-41d8-4557-820d-a7536c7ada20',
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
  'Sun, 04 Jul 2021 20:09:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '4bd5951d-4f57-4920-b2c3-14692194191c',
  'x-ms-request-id',
  '6ae86e02-7312-47a2-a861-b2de03728713',
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
  'Sun, 04 Jul 2021 20:09:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '25710c4c-9d3e-43de-8e1f-1b13e43b9f23',
  'x-ms-request-id',
  'c5997fbd-635a-420e-8057-3a78a547aea8',
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
  'Sun, 04 Jul 2021 20:09:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '6386bebb-7b94-4d98-9947-3a7bd600b079',
  'x-ms-request-id',
  '3245f2e2-1a1c-4613-93fe-5bf4531d4793',
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
  'Sun, 04 Jul 2021 20:09:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9ddae197-19be-4d61-a05a-5a52a3560f02',
  'x-ms-request-id',
  'a8dee22c-eaee-4714-84cc-9cb8bd35cf59',
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
  'Sun, 04 Jul 2021 20:09:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '6061ef31-b0fe-4ff9-b4fe-0205a7eff8da',
  'x-ms-request-id',
  '13e15595-1188-4a44-bbb6-27b1996796ec',
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
  'Sun, 04 Jul 2021 20:09:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: RSA162542927697303561"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '89',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'aea14785-7cd3-4365-9e66-971e60a36e32',
  'x-ms-request-id',
  'ef595464-daca-427f-b4b0-51fcf555ef60',
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
  'Sun, 04 Jul 2021 20:09:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/RSA162542927697303561')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/RSA162542927697303561","deletedDate":1625429278,"scheduledPurgeDate":1633205278,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/RSA162542927697303561/7a1a513a87684a30b73b8b6943c387fb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zUtM1gvIGu8ynQ3EzLWbAnl_cm0lXHWsQOfhVmp_izzb8wLiVAu-i9ZI38MpSw3N-HmfybAtZElLSpndcQo-gXGlSnKEkHTloNQA79M6NisC9s9ovyUJKh_uucfBQb5IuAOBySheYr6_ZZnSLRD0XiIVonwHXS34NDmk-Zp5BNnQPXk5kSfOeJorlPtFAXH3XzBtpEDSTAwlyLc-87jJAfuCDfTj5ofsppVUpIloOo5n7t_hZkXaVRTumGx_mT9sxf5QtjN7i-Djc4scfZ9I1XmeGBj6fGa2hvpLtPKGLKP7XzEixRVNebcNz-UrUpjztHMn2AMcf_XchmeStD8orQ","e":"AQAB"},"attributes":{"enabled":true,"created":1625429278,"updated":1625429278,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '0b3197e9-b89d-4ad7-8df9-c52d5c028245',
  'x-ms-request-id',
  'fdfd32d7-b3d7-4ab3-8050-022ffa977043',
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
  'Sun, 04 Jul 2021 20:09:31 GMT',
  'Content-Length',
  '826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/RSA162542927697303561')
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
  '9c9454cf-458c-44a2-b522-5dd1bd4fa880',
  'x-ms-request-id',
  '64784804-fb9a-4fe2-ac6c-63e18997f9da',
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
  'Sun, 04 Jul 2021 20:09:31 GMT'
]);
