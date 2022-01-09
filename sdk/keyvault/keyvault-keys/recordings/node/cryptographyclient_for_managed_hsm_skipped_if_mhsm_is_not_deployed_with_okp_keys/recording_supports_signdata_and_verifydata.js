let nock = require('nock');

module.exports.hash = "7108365d96c701a303658078fc8c9792";

module.exports.testInfo = {"uniqueName":{"okp-sign-verify":"okp-sign-verify164175392482903773"},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392482903773/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '520d5a7e-717c-11ec-903e-000d3afc9d4a',
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
  'fae5b672-7b24-41a8-9662-07a8508c7700',
  'x-ms-ests-server',
  '2.1.12261.17 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvsiNfUp1tJMphcp6yul31s; expires=Tue, 08-Feb-2022 18:45:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcvTDM1O8VfKCLu1msOtJAmtdcC4W7BObil_4QPd9JZ7vFG0gMduXMxHA4lyo_A6tvVXYnNU2Q1uO65Xv0YoX65Dm4qzY4vkgZ12YiobsS1ZRszZnyqi83x8ZqV3efyzlRaOgrolG63y_EFYrRe6TzRv9gRqBQYCFWaFHMr3TGLAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:30 GMT',
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
  '0a6e0799-fa1f-4d2b-97a1-c97db58b0603',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlxhgtPdzu5Pr1QHmVyH6QM; expires=Tue, 08-Feb-2022 18:45:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNzoAVMv2ct75EdlQkkm37cd--Vp9qUL2HTT6j7ML-IRt4VWFIiHKn3zWo8QLYu982oolfLxVfvLgZ0L97F0_NIFj0TBfyf3JjCSM7KCYMvKSxnfRA3Lh8J5065sVj7tJAJnq4XTtm1j2-IjpJ41REcoSgPbFVuNnHM7dAsu1mD8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:30 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9a2b1203-932e-4e18-9f12-f5063845ed49&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '113e42c1-b566-4edb-9d34-3bb6c53f3300',
  'x-ms-ests-server',
  '2.1.12381.10 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmxxIz3wnxZJok9xj-O8wlvdGw97AQAAAEokbdkOAAAA; expires=Tue, 08-Feb-2022 18:45:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:30 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392482903773/create', {"kty":"OKP"})
  .query(true)
  .reply(200, {"attributes":{"created":1641753931,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753931},"key":{"crv":"Ed25519","key_ops":["verify","sign"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392482903773/a1c654d7b95904d0a5ef77c0d3eceaa5","kty":"OKP-HSM","x":"ggSCf95AB6facFY7K-KsArU-60YGzeL22VxoQOf3zgs"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '402',
  'x-ms-request-id',
  '525277bc-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '243',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/okp-sign-verify164175392482903773/')
  .query(true)
  .reply(200, {"attributes":{"created":1641753931,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753931},"key":{"crv":"Ed25519","key_ops":["sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392482903773/a1c654d7b95904d0a5ef77c0d3eceaa5","kty":"OKP-HSM","x":"ggSCf95AB6facFY7K-KsArU-60YGzeL22VxoQOf3zgs"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '527ec218-717c-11ec-903e-000d3afc9d4a',
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
  '81'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392482903773//sign', {"alg":"EdDSA","value":"MV9b23bQeMQ7isAGTkoBZGErH853yGk0W_yUx1iU7dM"})
  .query(true)
  .reply(200, {"alg":"EdDSA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392482903773/a1c654d7b95904d0a5ef77c0d3eceaa5","value":"4K7lIH7HqV6m9nwxgEEEokh5w1sJqtpgdeMx7cAXGlD7TGFRVrvioMun-FtQsK5441Jk1BI2MP0z9yjghfoUAQ"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '234',
  'x-ms-request-id',
  '529478ec-717c-11ec-903e-000d3afc9d4a',
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
  .post('/keys/okp-sign-verify164175392482903773//verify', {"alg":"EdDSA","digest":"MV9b23bQeMQ7isAGTkoBZGErH853yGk0W_yUx1iU7dM","value":"4K7lIH7HqV6m9nwxgEEEokh5w1sJqtpgdeMx7cAXGlD7TGFRVrvioMun-FtQsK5441Jk1BI2MP0z9yjghfoUAQ"})
  .query(true)
  .reply(200, {"alg":"EdDSA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392482903773/a1c654d7b95904d0a5ef77c0d3eceaa5","value":true}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '150',
  'x-ms-request-id',
  '529d5336-717c-11ec-903e-000d3afc9d4a',
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
