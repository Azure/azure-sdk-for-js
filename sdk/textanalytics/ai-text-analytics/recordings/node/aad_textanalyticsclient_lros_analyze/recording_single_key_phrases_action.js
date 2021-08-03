let nock = require('nock');

module.exports.hash = "d7e8054512e98cb5ba9ae070e69b37f0";

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
  '57bf3406-964a-46bc-816a-997658be0200',
  'x-ms-ests-server',
  '2.1.11829.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EQAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2lsupO7U1vw1sHWzZRefcFVH88ZqmieeTSUVwcoRwodIyzYD_TdGW_-Qs8sG9ocwvxTj0Ee_KTGHI4HBCibtZPGHZud2i39ekPJEPcvTjy02qnoDshFzEvkNwxCwaG3hNiX9HXg2UC24JgSH3nGcYyJLJxvpmbaO_93yUuy6VtggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:35:56 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '97388d79-6103-488d-a26f-595c3baa7300',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EQAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra-K5rSh-QyNaBnIDVJgLO9jUdSbElY1B4XD1CYrR9YnhSmduTCrZ3E8lQt56X8rxIJv0idBpqJrlsXrCUFXFNkgXP8F21F3R_7YCbe8fsRBreHMle3lwspUf7Uo25IX5CMv6VnN1NMxcgn7TWdtatPc-ljh3zy_AceS_8UdtmC0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:35:56 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=bc7ad80b-c1f6-40de-b27b-5e822f602f9b&client_secret=azure_client_secret")
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
  '8fe8fb0d-d1a1-431d-a7c5-a919ba786900',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EQAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:35:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '3ef222b4-a8c7-4359-8ae8-e903a4ffe4a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:57Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c8ef53ab-64d4-453b-8d42-21cc6a5e0f56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:57Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '7e5f2704-e129-4843-954a-1c199b2058d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '09d3cf3f-ef6d-4f8a-a6f5-316cc9eb897a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '879fe2cc-166e-44f3-8702-f5e3538def0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  'e15a837c-31b7-495b-8cc0-30162b33d581',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '03b1357a-2e4b-48ec-989b-2a71d00dc6d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7083fb73-7470-4e75-89d4-a373c54f43cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'cfbf4d50-5adc-4999-b742-7c300ad9251e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ee1ddb22-17de-4ef1-a904-a8b883a5cf8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '48d04857-0b6e-4a6a-b3e1-aba242a75ed9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9c8c4dc5-ff48-46b0-bf76-f76c9024a5a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'b4fc98e2-7a85-4662-be9b-c54b650ef8b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4d5c8467-33ae-4ceb-9d87-2854487a8ae9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9b5a153f-afe1-436e-a8f6-da66367697d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ec4f884d-7106-4e76-94c1-81374bdabd9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '6c005941-e041-403e-8900-e032d288ea21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'cf93d434-e6c2-4c7f-9fc1-83aeaa4a51f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a8415067-8ca6-4de0-b788-d7858f23c635',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6ade4583-0f5e-4224-a10d-ab8dd23a888c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '409b25fe-9144-43c2-a7eb-38c390fee1de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:35:58Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '485a7443-2f9a-422e-99a6-458720acc28e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:36:38Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:36:38.2699285Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '24f1afad-cc2e-4045-b4f9-ed93912a03d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/3bddae36-e1fe-4dd5-bfba-ba96c1347175')
  .query(true)
  .reply(200, {"jobId":"3bddae36-e1fe-4dd5-bfba-ba96c1347175","lastUpdateDateTime":"2021-06-25T19:36:38Z","createdDateTime":"2021-06-25T19:35:57Z","expirationDateTime":"2021-06-26T19:35:57Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:36:38.2699285Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2682',
  'apim-request-id',
  '63a9b044-1a95-4fc6-81f4-38daaa3c4548',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:36:41 GMT'
]);
