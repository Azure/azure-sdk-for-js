let nock = require('nock');

module.exports.hash = "de35700ea43a39df2d66af7075d93f38";

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
  '168d60e4-0505-4fb8-b645-6b6b9917b000',
  'x-ms-ests-server',
  '2.1.11829.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EQAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:34:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruksOBQT4wyn67YZBfaszZ5mxSOR8U80-9sBue5DgX5gltxKl4PTSLl5PzeE9qTijrj-GEvoI4sQ4U2EobR_sjyJv2iuaQ8jRxDtq-Ibkx_w0X1CTBTrTP81DZP2sKGnX3mBZcdN4tcvKBH6FbpgZT1UVRvTYmC9ICmK4PsRnZEsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:34:56 GMT',
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
  '9d80f76e-26fc-421e-9776-d8e3ba875b00',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EQAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:34:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrehJxaKP4dCYW912eihkaI0RSIP79hdCu3yLS4wwT9wTw5Tx1iiK51GQuxXoWZ4yi_ihBlys-dvohOds6-0gnZsYYYXTMioP6rYqUpIn0db7nocIPZcX_sXMCEAo4fysdjevnetGcC69SwgBvl_uBS1DaWzDgNw-Dgxanr39d220gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:34:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=91692058-85fa-49a0-b16e-fba1a59fcdc5&client_secret=azure_client_secret")
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
  'a9a1e068-3c7e-4040-b4a3-695222af6e00',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EQAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:34:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:34:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635',
  'x-envoy-upstream-service-time',
  '8821',
  'apim-request-id',
  'bd6d9444-d415-42a5-b56b-7cfc1fccf852',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:06Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3325',
  'apim-request-id',
  'b47fc656-895f-457b-b2ab-769e89776a83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7583',
  'apim-request-id',
  'f5d5d060-e5ea-49e0-971f-59a683047c9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e4e3b85b-a982-44a3-83b0-f25aae25b822',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '4531',
  'apim-request-id',
  'b1b929cb-5057-4049-afd4-6b83e8809f26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0c858260-17fa-4c8e-803f-05902c75918f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '4c3a83bf-fb27-4b24-b55a-1ff6c5454896',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7592',
  'apim-request-id',
  'd8a1bea4-6088-496c-9fd6-6b57616857b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '11fd815f-f947-41c9-bb2a-67eda36792ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9fa8e5cc-58b6-481f-ab17-2cfa03414a63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '93bc6462-590d-4811-b37c-f288f9786d51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'cbd097fb-7cdb-4580-8896-c08fdf6bd54c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd2ab917b-2c19-40fd-9165-03ef7d39bf5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:13Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd15557f5-0dd8-4f69-85be-7b73bb76fc2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:52Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:35:52.9912023Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '8bcf9388-8fb9-4af9-b6d1-914827155021',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/d5d1b750-78f8-4d47-acea-598ee523e635')
  .query(true)
  .reply(200, {"jobId":"d5d1b750-78f8-4d47-acea-598ee523e635","lastUpdateDateTime":"2021-06-25T19:35:52Z","createdDateTime":"2021-06-25T19:34:58Z","expirationDateTime":"2021-06-26T19:34:58Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:35:52.9912023Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2657',
  'apim-request-id',
  'e036b07e-03ad-482b-a5cc-863df383a458',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:35:56 GMT'
]);
