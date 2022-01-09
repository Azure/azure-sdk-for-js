let nock = require('nock');

module.exports.hash = "39cb869dabfbc8a2ce5806e31c95ec93";

module.exports.testInfo = {"uniqueName":{"okp-sign-verify":"okp-sign-verify164175392385701781"},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392385701781/create')
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
  '5178e22c-717c-11ec-903e-000d3afc9d4a',
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
  '193b6b31-093c-4887-9716-577e220b1d00',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoUM-egEu9RPh4fEJGbm0W4; expires=Tue, 08-Feb-2022 18:45:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPUL_itUFpZpHw5F0F2GMlrGD7x9BahnZhTtK9v-3HHqXFyGfc5fb77TePbE8F0n4wBFmsri5-HnG__DV6Sib9dVhGbGHlHoF5Q4DqWDePWItyu5DGSp9pLbmr5iYJRLmiEQeICQJ5frV8HqtyiW_ckGZ9EK8tbhhU0G73HIY9M4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:29 GMT',
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
  '9d25be59-42c1-477a-857b-a47beae5f902',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuolJsfNv7BJhyBurXrYmAE; expires=Tue, 08-Feb-2022 18:45:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrG4-VwzwR2z7wK3Nw_s57DVUn0dxWhMW3arLBXX36isn_rJCJey_izb5AlFftB1ORe954q8eR9cK50DoceCOYGYIyuWGdo6XNGrmAWApl8MMN6VELJM20amCvUbF5bsUhpPqUkLN_chR9npSgm03I_hj1206aQj7WNc697gVMEMMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 09 Jan 2022 18:45:29 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e8bb09a0-33e5-4051-a4a9-d52d7eef7d74&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1192cc78-4902-41b8-98f9-a14c7a09e902',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArLXLkjJRmlLmvycSb2P643dGw97AQAAAEkkbdkOAAAA; expires=Tue, 08-Feb-2022 18:45:30 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .post('/keys/okp-sign-verify164175392385701781/create', {"kty":"OKP"})
  .query(true)
  .reply(200, {"attributes":{"created":1641753930,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753930},"key":{"crv":"Ed25519","key_ops":["verify","sign"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392385701781/7d7b8a6398c24b6ea05e135f1159d697","kty":"OKP-HSM","x":"n4HixH-lc29k5uuoff1MuDGs4JvY1ISAiKxS2wRBuQc"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '402',
  'x-ms-request-id',
  '51b40eec-717c-11ec-903e-000d3afc9d4a',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=65.50.169.108;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '248',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/okp-sign-verify164175392385701781/')
  .query(true)
  .reply(200, {"attributes":{"created":1641753930,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1641753930},"key":{"crv":"Ed25519","key_ops":["sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392385701781/7d7b8a6398c24b6ea05e135f1159d697","kty":"OKP-HSM","x":"n4HixH-lc29k5uuoff1MuDGs4JvY1ISAiKxS2wRBuQc"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '51e35c7e-717c-11ec-903e-000d3afc9d4a',
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
  '93'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/okp-sign-verify164175392385701781//sign', {"alg":"EdDSA","value":"MV9b23bQeMQ7isAGTkoBZGErH853yGk0W_yUx1iU7dM"})
  .query(true)
  .reply(200, {"alg":"EdDSA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392385701781/7d7b8a6398c24b6ea05e135f1159d697","value":"XWJloF9iqkWPjwzLRh0deqpREzMyjak5-T_9iiSwllX0N98YFKy1_ZQIxcp1_e-yDbW9QmS8ODtq63TpwoxoBw"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '234',
  'x-ms-request-id',
  '51fa7864-717c-11ec-903e-000d3afc9d4a',
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
  .post('/keys/okp-sign-verify164175392385701781//verify', {"alg":"EdDSA","digest":"MV9b23bQeMQ7isAGTkoBZGErH853yGk0W_yUx1iU7dM","value":"XWJloF9iqkWPjwzLRh0deqpREzMyjak5-T_9iiSwllX0N98YFKy1_ZQIxcp1_e-yDbW9QmS8ODtq63TpwoxoBw"})
  .query(true)
  .reply(200, {"alg":"EdDSA","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/okp-sign-verify164175392385701781/7d7b8a6398c24b6ea05e135f1159d697","value":true}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '150',
  'x-ms-request-id',
  '5202fcaa-717c-11ec-903e-000d3afc9d4a',
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
