let nock = require('nock');

module.exports.hash = "07f4354e7214c08dffb0a4ba6f383ede";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'cd8a2e63-fcbc-4b19-b40f-da1782b32b01',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:08:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWSJzNbeXWJbwhfXVbpGGEHTm9ZKH9-JcOEYUAYdJUHY_wHjkXEKkmTdQ9YGcqhqPpN_P2ocBf2CEQXEVY7mOuppvWAVHkHAWWJQ8s0Cwx5SL-wYw2GmJ8v08EZrcr8RpIBUQyPzSDXCNgVDDrnrGAIfcNqcQEokbRb21M8oiMFIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:08:33 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '073336bb-b142-4e8e-8104-b0c919d2e500',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:08:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQUMWXDegQkZzvKoBJ8A3XSlqc5beTib-2tYqV7Hh6zbEtsXPLOXi_FsKUKbxV2kSfJ09X5_R0LOFFI7KHmvWX6rnbnpHT50285RId9eeckDDzF1quJXkZjIDLQ5LVprCkLGfQv-GXedt3rNFdLcdWoSpbr4Aia6-7J_ImhDZE4cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:08:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=20f376a4-c8e8-41fb-b922-e2f920152191&client_secret=azure_client_secret")
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
  '86dfa25d-0226-4611-9eba-3d9b6208fc00',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:08:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:08:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/575e88b8-041e-4f5e-932e-ef70a84813ef',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '6af60808-c5f5-47b9-8944-6c2cf2b54afc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/575e88b8-041e-4f5e-932e-ef70a84813ef')
  .query(true)
  .reply(200, {"jobId":"575e88b8-041e-4f5e-932e-ef70a84813ef","lastUpdateDateTime":"2021-08-03T03:08:34Z","createdDateTime":"2021-08-03T03:08:33Z","expirationDateTime":"2021-08-04T03:08:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e1e3c278-6d3c-4c30-9c60-38622db586e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/575e88b8-041e-4f5e-932e-ef70a84813ef')
  .query(true)
  .reply(200, {"jobId":"575e88b8-041e-4f5e-932e-ef70a84813ef","lastUpdateDateTime":"2021-08-03T03:08:34Z","createdDateTime":"2021-08-03T03:08:33Z","expirationDateTime":"2021-08-04T03:08:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8f9e4178-fb58-4b17-9606-973ed2c4dfc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/575e88b8-041e-4f5e-932e-ef70a84813ef')
  .query(true)
  .reply(200, {"jobId":"575e88b8-041e-4f5e-932e-ef70a84813ef","lastUpdateDateTime":"2021-08-03T03:08:36Z","createdDateTime":"2021-08-03T03:08:33Z","expirationDateTime":"2021-08-04T03:08:33Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a9a2881a-7b00-4b67-ad15-519a9db94c7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:35 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/575e88b8-041e-4f5e-932e-ef70a84813ef')
  .query(true)
  .reply(200, {"jobId":"575e88b8-041e-4f5e-932e-ef70a84813ef","lastUpdateDateTime":"2021-08-03T03:08:36Z","createdDateTime":"2021-08-03T03:08:33Z","expirationDateTime":"2021-08-04T03:08:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '7eda78fd-bc95-458a-aff4-e38ebda56683',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/575e88b8-041e-4f5e-932e-ef70a84813ef')
  .query(true)
  .reply(200, {"jobId":"575e88b8-041e-4f5e-932e-ef70a84813ef","lastUpdateDateTime":"2021-08-03T03:08:36Z","createdDateTime":"2021-08-03T03:08:33Z","expirationDateTime":"2021-08-04T03:08:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'e8405460-d363-43ec-bc77-14125da5a1d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:38 GMT'
]);
