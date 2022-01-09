let nock = require('nock');

module.exports.hash = "26be7e83a77bb5712e615395ec0df1f2";

module.exports.testInfo = {"uniqueName":{"okp-sign-verify":"okp-sign-verify164175392584103257"},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392584103257/create')
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
  '52a80c54-717c-11ec-903e-000d3afc9d4a',
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
  'a65cec23-887f-4e7d-a967-36856dd8ca02',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArqcCLfOHW9BmLSYYg_baVc; expires=Tue, 08-Feb-2022 18:45:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxmuNOyUiyI3xrZQijzW5x7N0sbm8CrWFwmGSBsEJL7TWEMLwxI8oT4ohZDt8q1RTemJaEGvSHm8hXkC9RAXtLFcwjVfT7_XbhLhl4VDQZZO2MxturFZQIFBOeDjX1QX8BV0ask_iuavxRJEQgUUbdMEk0SLAEdv7a_2brPq7FVogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:31 GMT',
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
  '0a6e0799-fa1f-4d2b-97a1-c97dde8b0603',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArtBh0lJ-P5JmGV62nmbvfk; expires=Tue, 08-Feb-2022 18:45:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq3z_xhbJq0Oueo3klLAFJ00xVP-tMAxl39Tn0VSoDZFyOIldeg9-ffaI9dS0-j3w7hFkkE2Jd13Lcp6SkmNbxkzdVzXrAtdO2F9FaOBfEhBjaS614SIDQHabH6cMBN8xKdhG-iDwTk2hWb67ETkW5EAr6vPmcggum_uuAzjKrOcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:31 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6cf7beea-9b57-48cb-84f2-9e2cff6e9982&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e61c8a2d-7e4e-43b6-b5a5-950758ff0300',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=At6jE8dtIfxClwXCwT-17V_dGw97AQAAAEskbdkOAAAA; expires=Tue, 08-Feb-2022 18:45:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:31 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392584103257/create', {"kty":"OKP"})
  .query(true)
  .reply(200, {"attributes":{"created":1641753932,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753932},"key":{"crv":"Ed25519","key_ops":["verify","sign"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392584103257/61b74bdf54c44c0e382480a5d6da2ea3","kty":"OKP-HSM","x":"pPKAMITO--ylS3tIZ6yK0nsHR_0ULr2d2WLqR4E71ac"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '402',
  'x-ms-request-id',
  '52e4a6b4-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '241',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/okp-sign-verify164175392584103257/')
  .query(true)
  .reply(200, {"attributes":{"created":1641753932,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753932},"key":{"crv":"Ed25519","key_ops":["sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392584103257/61b74bdf54c44c0e382480a5d6da2ea3","kty":"OKP-HSM","x":"pPKAMITO--ylS3tIZ6yK0nsHR_0ULr2d2WLqR4E71ac"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '53105764-717c-11ec-903e-000d3afc9d4a',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westus2',
  'content-length',
  '402',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20211206-1-be739728-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '92'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392584103257//sign', {"alg":"EdDSA","value":"hVLYt6fcVHbLniXe5pqAkSkHZLfypk_m546VaA"})
  .query(true)
  .reply(200, {"alg":"EdDSA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392584103257/61b74bdf54c44c0e382480a5d6da2ea3","value":"D4DmoVRKXW9G0cO16W8a3uiCBsxz42Kmm2xwTumnyuW5KHgNmFUOCl7Bx1EWjesbq3vmyDbyy9eZcsAlVxbZAg"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '234',
  'x-ms-request-id',
  '5325ffec-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '7',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392584103257//verify', {"alg":"EdDSA","digest":"hVLYt6fcVHbLniXe5pqAkSkHZLfypk_m546VaA","value":"D4DmoVRKXW9G0cO16W8a3uiCBsxz42Kmm2xwTumnyuW5KHgNmFUOCl7Bx1EWjesbq3vmyDbyy9eZcsAlVxbZAg"})
  .query(true)
  .reply(200, {"alg":"EdDSA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392584103257/61b74bdf54c44c0e382480a5d6da2ea3","value":true}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '150',
  'x-ms-request-id',
  '532e3db0-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '13',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
