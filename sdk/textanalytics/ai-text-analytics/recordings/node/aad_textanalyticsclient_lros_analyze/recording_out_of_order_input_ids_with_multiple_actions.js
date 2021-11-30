let nock = require('nock');

module.exports.hash = "a4ffbed8fae59affb4b60746250e226c";

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
  'd8f7ce3e-3439-4a1b-9e70-1599547cf900',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnSTHgY0WO9Km6Fq3P5YR4M; expires=Mon, 22-Nov-2021 00:46:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrsechtp4OEXyQvYyCsbqZ-iNtK5qSZjgKy0B7MMxMrPrIp9PhWGB04fwLzkUwKBsQ8E0XwBdGU1SQRNGAdTUiXd_AAm-gW6DZScz4o_G80DIz0n9XFWwRJYzWCHfQG04r4vK-LUS2eQnaalse9Ud1cYV0R9FjSMZPF0xKA_k5WOwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:46:19 GMT',
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
  'd41fcaad-27c7-4680-8177-7f96622e0c00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjqzNhqKnLlKoPaqGOaX3t4; expires=Mon, 22-Nov-2021 00:46:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr43Pjq6pY1oxkgCsB0Ccw2i9ehDJYiMDzfCALkpnkJGZ75TMPvXDesGj_6sstIx8YyNCWM9RsPKxlfqxaFXZ7f3HbEaYdxBw6gGkb5iPyGnqvVLHE9tlIA5Tc2sHm043D3BGeKtc4HV4UldSXVyx_j-G3ve6ZLlhGjV3cWjrWWkkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:46:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=94efc2ca-98e3-495a-8e33-68e1e9c168e8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '27c22fbf-7874-4fbc-9ee5-6f0353ba0200',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArwNdGN_SM5Hm0Urr1scO30; expires=Mon, 22-Nov-2021 00:46:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:46:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":"w"},{"id":"19","text":":P"},{"id":"1","text":":D"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1',
  'x-envoy-upstream-service-time',
  '483',
  'apim-request-id',
  'a0152470-17c0-47e9-af9f-e77f119f46fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:21Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '0ad18f16-25ae-41a1-9019-1377510f92d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:21Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f8390373-5734-4592-8fdf-9aa9a742741e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:23Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'e0c57787-b1be-41ac-8a9c-09f2ae43c0cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:23Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '8f5ab071-5c04-4d4e-9042-d89cdbdb123c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:27Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'd834efcc-3525-49bb-8032-d7d333cae1b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:28Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:28.85463Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  'e3bc693d-8f10-48c1-9b79-d144996da3df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:28Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:28.85463Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '326',
  'apim-request-id',
  '20bd9ac1-38c5-494b-ab74-5a5314c5b617',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:28Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:28.85463Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '254',
  'apim-request-id',
  '36d26f9d-f3df-42d7-a69a-f1544965b826',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:36Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:28.85463Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:36.5488329Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '464',
  'apim-request-id',
  'dd8a1864-5cd4-40d8-9d68-49f3d3b10cd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b08e3d20-cbe5-450c-9269-4edf223966f1')
  .query(true)
  .reply(200, {"jobId":"b08e3d20-cbe5-450c-9269-4edf223966f1","lastUpdateDateTime":"2021-10-23T00:46:36Z","createdDateTime":"2021-10-23T00:46:20Z","expirationDateTime":"2021-10-24T00:46:20Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:23.2110431Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:28.85463Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:36.5488329Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '529',
  'apim-request-id',
  'fac280ee-3796-4f01-9811-f8fa4fc0b622',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:37 GMT'
]);
