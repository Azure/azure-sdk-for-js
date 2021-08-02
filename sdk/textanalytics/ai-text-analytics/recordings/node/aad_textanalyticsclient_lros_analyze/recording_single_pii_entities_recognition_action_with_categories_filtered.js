let nock = require('nock');

module.exports.hash = "b9f03905f298e24c61f205d65ba5d0af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  'f3300709-67bb-4e12-bc8b-ebbab6556500',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjIoYvtotA5Jh9h40R_fDgk; expires=Sat, 31-Jul-2021 17:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryTMdyEevFBbwqPth8_vl-1UN7XyPgqIF81atPpRAYGvrM8slE6o5Q-g1ley8YwO-wc4FCtHH9iqQPXQC71DLvw1AJi9GoPXQOGTbb7DABS7r9UyZ9mPyqt6bDAttTqXqppaSt8RsraVNrB9CebQ_1epN6iKb4Z7OCxCXxn9OZrMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Jul 2021 17:49:30 GMT'
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
  'c410173e-1b24-48d0-b926-c9955a9bc401',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjIoYvtotA5Jh9h40R_fDgk; expires=Sat, 31-Jul-2021 17:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPef9b7Z2Lr2uR_9nW7dtYOQEZakpVsVA7jJSp5qWGp_9WXFmRjxMpzpK_DQYY_YHZUdSfvZ6uUG63NUParbMcHv6r3QwPHtnu5gA0XuomMyFemjpfWAoyiQ4QY2iH8sgLxQYGL20y0cCgVo8wDz6aPRtle0RvPZHlrT1xo2sc20gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Jul 2021 17:49:30 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=413a9c2c-5959-40dd-b653-70138ab61fd9&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '76a1fa0c-212b-4bcf-9690-a0b506721b00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjIoYvtotA5Jh9h40R_fDglz_bg1AQAAACv3b9gOAAAA; expires=Sat, 31-Jul-2021 17:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Jul 2021 17:49:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","piiCategories":["USSocialSecurityNumber"],"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6',
  'x-envoy-upstream-service-time',
  '10483',
  'apim-request-id',
  '58b29ea3-904c-4b6c-b891-83e91cd2072e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:49:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:43Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '816bcd4a-b2cb-46b4-898e-946d87f742e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:49:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:43Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7718',
  'apim-request-id',
  '8f35919b-e584-4af5-a146-7cfd72ab6ecc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:49:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5089',
  'apim-request-id',
  '16b4e74c-188a-4f9c-9730-1adc77bd0592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:49:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '88d8e295-9c31-4b41-9b08-9edb30ad4728',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f5e8101b-8a9b-4c33-afb6-dc1fd337a18a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '75e91fd2-36ca-412a-97c3-e83b0a7b4c87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '61fd233e-cbd6-45a7-9bcd-5f7e5e36699f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3c18426e-9b33-4cc3-98b8-ba091d3f1783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '05abddb1-c3d5-434f-9db8-6b6d48b4b8da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1f4d2f4b-8750-41b9-ba94-239a4edd5a0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '567ea10a-fe22-4166-96b6-aa278abdf8d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '45da5b32-3e8b-4490-8001-efe7197e0f0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ea859881-5d20-4a44-ab6d-1e5f6ee73cbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:49:51Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ac3f5fd8-ea83-45cf-8bcd-65b558fcbbf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:50:23Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-07-01T17:50:23.0405867Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'c68a91fc-8b8a-488b-b29d-59895f12c0f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/84c55860-da97-432b-981e-7e2322e2e4f6')
  .query(true)
  .reply(200, {"jobId":"84c55860-da97-432b-981e-7e2322e2e4f6","lastUpdateDateTime":"2021-07-01T17:50:23Z","createdDateTime":"2021-07-01T17:49:33Z","expirationDateTime":"2021-07-02T17:49:33Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-07-01T17:50:23.0405867Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  'ddd787d3-7450-4df3-93c6-000c95ffcd9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:23 GMT'
]);
