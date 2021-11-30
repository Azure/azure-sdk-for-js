let nock = require('nock');

module.exports.hash = "34768fac2bb75dc4122ce0d2edd00969";

module.exports.testInfo = {"uniqueName":{"RSA":"RSA162542886970606986"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/RSA162542886970606986/create')
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
  'd685427c-7161-40b3-bc04-91a2a369e4be',
  'x-ms-request-id',
  'eb003cf4-c081-4d4f-972e-d882a05eaf37',
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
  'Sun, 04 Jul 2021 20:01:09 GMT'
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
  '91007324-9a05-46c0-af17-d719e8b55902',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aog5G6E35LZCjKsfjQ2Gxds; expires=Tue, 03-Aug-2021 20:01:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrf5nzvAKygbAz90qsSMAld8SYPUdPEEuPXnBTdNKxCYDOXiYqCk_f6YQinqZJIZ5eTqW7M-xk4gMLRy6ox6UpGuAGAxvbA5ZtFzGd-x7BZVHj4dxN0VJQZvq-PJ1yWNqoGdUvbg3FgCBKh9HMj_nOS_cZ28iXit0XC88BIvbH4QUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 20:01:10 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '779cdc20-d366-4112-b1ed-fce8427b2902',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aog5G6E35LZCjKsfjQ2Gxds; expires=Tue, 03-Aug-2021 20:01:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrkd1G_8neyv6hvitafzgnDzGC9l_aMFxAMLri3jIc3sGMuxROifI3Jy0JqZU3ExL1yWDx_MDnNb9Rs9EpA9uzy21p0Kxqawwqo5-9aSjBzl8hsQThHIzlzYCOTg-XUqic4XFJgKuUMZ_vUAPoHSAlagLbzNexvfb2oWjU35Wtun4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 20:01:10 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=a5b9b33b-0ac4-4b39-8ebd-3744da3cf7c7&client_secret=azure_client_secret")
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
  '779cdc20-d366-4112-b1ed-fce8447b2902',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aog5G6E35LZCjKsfjQ2Gxdv1qjVDAQAAAIUKdNgOAAAA; expires=Tue, 03-Aug-2021 20:01:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 20:01:10 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/RSA162542886970606986/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/RSA162542886970606986/205022905887474ebdb2b713abd5bdcb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"w6L_Qe1NJC2xG9f1-P951b27rT2NpKdRjw_cjf6xUBMDd7VTXSiYdsEMqVzjvyeE0AaUuDTSnGuVxHvHnE9ip0tu0RZqyw0gnENBJs0fVivZcPn8xVVc4vkGhfLopWNqGhWr05Uwps-ZvBdb5qVuK66a_3mwKjyfUvoqwGWcu4yaXlhWVrR0lM8cCJzUPeKVRWzjr337bef2q5_CZ5vrwp25gy02NICMbRESzgwA30WGBTTeX1X3xdHFRyiAMtAfpsE30R6uhRbZV6ws205KfJnjSpNVXYEzLx6kUIAGDDut7VbF3_ZWhlYn3pUU33AqV-IlNlhqvBRqxGIMd2OiFQ","e":"AQAB"},"attributes":{"enabled":true,"created":1625428870,"updated":1625428870,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'd685427c-7161-40b3-bc04-91a2a369e4be',
  'x-ms-request-id',
  '662a7643-2d29-44f4-980d-8a08c05d0177',
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
  'Sun, 04 Jul 2021 20:01:10 GMT',
  'Content-Length',
  '686'
]);
