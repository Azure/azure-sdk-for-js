let nock = require('nock');

module.exports.hash = "ed0144555258e44db57c40caad94ff21";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy162646264627803123"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh2d2xRVk9UZWJJZGgtU3Jyb2JuUGlEZTF4THZyeENteDBVMjM0bHBkUjAiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ2UHdXeGhRMzItLW9aTEx5SC1MUG9NY3JyaC1rU1lkQlV2Tk43YTROeTdtcTZ0d0RCMXNLR1NtVWMwTlZMZVVOcTFlYW5TM0tsWWRnWjg4ZkVVbWVXdUpONTdtdWloVm9ETHIzVWdPMkVEUHVJQjVpdTVYZkJvMHRxcUwyX1FKMS1XQzNtVW1KZURzUTNhZExaWkUycy1NaTVlNjN5dlctMkdSaWdGUGFWVDdaamg4Nk1td0xvMlJEb255R3RmSTg2VmtxaTZ1TTNlaXdDaG9CRUx4WXJKWHBBMzdjdUJjSGFKM0ZpV050akxlWXV1N3U4NzVpWGlERHo0b0lOWUFwUFZ6RFV1OUpJZmx4ZU1UY2Qxa1U0S2NjMmR0YjQ3ZEkwVDlXeld1UkF3SjFaVHhQOVY5ZXI4amxWb0ptZzJFcTVEVk5zQ0ZmLW8zQmhSSnJXSERVNlEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjY0NjI2NDUsImV4cCI6MTYyNzA2NzQ0NX0.60k1KwtMykAtQiFXL32Rx8vEqB4GX2R-IxeHxD0UCugsbta55T54mO-HaxrGoghiXf5GT9pTU9bKKjXUIv56S_D00_kEDhpC6UZL1d3bBOUC1iDCHRPByrEdmSCk-qhl74ySkovqyBFMH_EsuZnsuU6kYXXSvZUv0UcV0GdsqXUEzpPg_kNotjrhpoVVOkaJ2YS_eOhfElxIrTcXZflokm7j533q1Tdk47PnmnqaOfAHjcCDcD8fSr0Vin1G9WD_wCZW-SJXt2M8CRowkd3ZQ3KzcRISm7uJsJptZijzJeWZmu4yRWjRshPiq9pLoBIj6-5qPxzG9eB6Ky5h0WstAg"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-KbjsvBHfCztCfb7BWpysNxEP0mU"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Fri, 16 Jul 2021 19:10:45 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162646264627803123/create')
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
  '85c2aaac-e669-11eb-a44d-000d3ae28186',
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
  '986a18b7-914d-4a9b-8c1f-1fe17c322d00',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkonlhTI8OlJrTg_UEVAeTkuyjXLAQAAALLQg9gOAAAA; expires=Sun, 15-Aug-2021 19:10:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVY0GV-D_GkdqYzsr6jPv-2v6rz_BH1kRv05pjxYeaHFEPFqTQYjSSSPxogWHd3jBVBKvfx_a-pIsJRScv7vMo6WY1JYAGeidHm6QP5D1B3La5AOFjR-PRJDe7TS_Ep8_noVHaZaR5tXqhxbJD1MY1ugbDZ0193l_tHG_uZC58_ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 19:10:44 GMT',
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
  'ba615789-0f97-4911-9eed-96fdad1b0002',
  'x-ms-ests-server',
  '2.1.11898.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkonlhTI8OlJrTg_UEVAeTkuyjXLAQAAALLQg9gOAAAA; expires=Sun, 15-Aug-2021 19:10:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJ8w2z4odCx6Ke77Z8Qa_yzKlOQsaPh548wkIWw15RVUjHhoTQOc_1FA-vjirYK6QLCwkv_OYmPxEUZLYlWAoyQeZ-WWatyRqgsZAoMCUz4w55CB5k4WA4mGMXyCI4OlkaR44os6Zhs8fYasKKctvHQ2fKL2IWIpH2qUW0i6ydkggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 19:10:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=82bc13a2-68e3-4177-bfdf-441d3ae3791a&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1322',
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
  '2e9f4320-dc8a-458e-a36a-2cc1fd130702',
  'x-ms-ests-server',
  '2.1.11898.8 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkonlhTI8OlJrTg_UEVAeTkuyjXLAgAAALLQg9gOAAAA; expires=Sun, 15-Aug-2021 19:10:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 19:10:44 GMT'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162646264627803123/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: 85fa92fa-e669-11eb-a44d-000d3ae28186)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '24',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '138',
  'x-ms-request-id',
  '85fa92fa-e669-11eb-a44d-000d3ae28186',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
