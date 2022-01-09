let nock = require('nock');

module.exports.hash = "66b8283b39ba3069aafcfa850b2bf803";

module.exports.testInfo = {"uniqueName":{"aes-cbc-crypto":"aes-cbc-crypto164175392295706046"},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/aes-cbc-crypto164175392295706046/create')
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
  '50efc1ae-717c-11ec-903e-000d3afc9d4a',
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
  'b0aa6e0d-45a6-4ba0-91a3-bd63c45d2000',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap7tWTA1LyZHongpxco2iXw; expires=Tue, 08-Feb-2022 18:45:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNJIa4wDuWijTn8UU7Q-Tl2D-MO2oJI_HMTA0TbYMjxesf7-95G5rG9Ard5aZmHn2l7QLjmcUY64UniiUD_jee10fD5BoFSmqrBpUzJ8VIFRvFjn8Dqqeye-RPOH49L4TAeVkMrEVryEL3udMqJ3sylu2V0HmEfq1Mq6DI4VzlXsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:28 GMT',
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
  'e61c8a2d-7e4e-43b6-b5a5-950704ff0300',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag1Q6nl-3W1EtSDeuy8PkQY; expires=Tue, 08-Feb-2022 18:45:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHrAwix__V6_RIBYmpb-OCjExx-7TayLHUWDrk6kTyoBT-D3kku3JILSvhdjTTkDb-1R0_pD-qls2UO6RNXRqiO2lqV2bYelaVMxHkM1QZxE2BWh8wEJDaUJhLyyGh-To1X4Ikuj_CD0Zz2dIa0_ZPbrFTZI4YropNtLQjLNbKCggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6f17ebf6-9232-4176-a717-d34ce164ad27&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1192cc78-4902-41b8-98f9-a14c5d09e902',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AncLmGxydRFMoCZGD0n8_VPdGw97AQAAAEkkbdkOAAAA; expires=Tue, 08-Feb-2022 18:45:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:29 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/aes-cbc-crypto164175392295706046/create', {"kty":"AES","key_size":256,"attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1641753929,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753929},"key":{"key_ops":["deriveKey","wrapKey","verify","sign","unwrapKey","encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '389',
  'x-ms-request-id',
  '512d16c6-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '173',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f')
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
  '514f3d64-717c-11ec-903e-000d3afc9d4a',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20211206-1-be739728-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '0'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f')
  .query(true)
  .reply(200, {"attributes":{"created":1641753929,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753929},"key":{"key_ops":["deriveKey","wrapKey","decrypt","encrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f","kty":"oct-HSM"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '515670fc-717c-11ec-903e-000d3afc9d4a',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westus2',
  'content-length',
  '389',
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
  '71'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f/encrypt', {"alg":"A256CBCPAD","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1DQkM","iv":"eHh4eHh4eHh4eHh4eHh4eA"})
  .query(true)
  .reply(200, {"alg":"A256CBCPAD","iv":"eHh4eHh4eHh4eHh4eHh4eA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f","value":"IZkv3r_9TJgpnBeJmc08uR-4lkkHwLJ7TyPulp3N0FszwXAVzL2jswxJnGEfSbWJ"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '246',
  'x-ms-request-id',
  '5168bc6c-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f/decrypt', {"alg":"A256CBCPAD","value":"IZkv3r_9TJgpnBeJmc08uR-4lkkHwLJ7TyPulp3N0FszwXAVzL2jswxJnGEfSbWJ","iv":"eHh4eHh4eHh4eHh4eHh4eA"})
  .query(true)
  .reply(200, {"alg":"A256CBCPAD","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aes-cbc-crypto164175392295706046/7031924e1d9e4eff2aaa9edb9a87ba4f","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1DQkM"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '199',
  'x-ms-request-id',
  '51707c86-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
