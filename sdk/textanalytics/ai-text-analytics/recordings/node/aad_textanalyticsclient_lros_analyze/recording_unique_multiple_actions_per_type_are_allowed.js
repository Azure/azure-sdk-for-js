let nock = require('nock');

module.exports.hash = "5eb1f48c0b2ff864b7682bef634467f1";

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
  '1393c460-f40f-4782-a14e-9beb4fd36700',
  'x-ms-ests-server',
  '2.1.12171.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ami9ZMq-wwpPm5H020DrzF0; expires=Sat, 27-Nov-2021 02:47:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9yzoSuOOf9_v-tuSJYwliNkMN4wCicww5WK38X2jDscxPY4PpwwgR9hDQn0rYbxLijrdjv5xDpzL8VF8CO3VC2CeQoUKyXipGID92nQkiS8B5eeSAqQ3DZASkzFNU39RwREa8JFF3ONu0l_5OSINOmXT50QdPFz83GmwHSBk1CggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 02:47:04 GMT',
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
  '2526a5be-8e08-490f-9911-ddb9c70aba00',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Auk0ezeOt-JNu71zmbM5nWg; expires=Sat, 27-Nov-2021 02:47:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAh9V5dpzapQbjy2csZXmvBM_iSwOpa-XDwphJp9anjSWRO9oTJoVISuN-g83-CIvSYrFJnZTCpo1R8DkOl4ABvjfCeYb3jU5cBmKXYSepuXUCVOXvsOvmIxW1yJ3LOVQ2rmqheJOXKAYczIB0hdydFNBLxVsMUW_WSFgX4PvC64gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 02:47:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=02fc277e-c34e-4ed3-a0b7-2d7deec3dfb9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a224a3d5-f16b-4788-9790-f4316c821301',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsRBQNnUVUFMtGAokrnTt6lz_bg1AQAAACgGDNkOAAAA; expires=Sat, 27-Nov-2021 02:47:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 02:47:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action1"},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action2"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '3df2c40f-cd82-47cf-ac35-4ac09eeb1838',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:05Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'a6873d6a-77c9-48fc-968c-c2db5d2c3513',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:05Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '306f0daf-961f-45b3-a051-b3a839f4bedc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:06Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:06.9681832Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '3517044a-50bc-4fb8-87bc-ae02ffa7a5e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:06Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:06.9681832Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'ec98299c-77a3-4f78-a076-9f96637d2479',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:06Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:06.9681832Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '086fa0be-fbbd-4550-876d-8b5b276879c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:13Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"succeeded","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:06.9681832Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-10-28T02:47:13.2331925Z","taskName":"action2","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  'a4c09af5-a219-4fc2-af87-82bbc41aea04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a33fee6e-f701-483d-8a93-81387863e048')
  .query(true)
  .reply(200, {"jobId":"a33fee6e-f701-483d-8a93-81387863e048","lastUpdateDateTime":"2021-10-28T02:47:13Z","createdDateTime":"2021-10-28T02:47:05Z","expirationDateTime":"2021-10-29T02:47:05Z","status":"succeeded","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:06.9681832Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-10-28T02:47:13.2331925Z","taskName":"action2","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '2a68163c-3ed2-40d6-adc5-3fb6b2dd2935',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:13 GMT'
]);
