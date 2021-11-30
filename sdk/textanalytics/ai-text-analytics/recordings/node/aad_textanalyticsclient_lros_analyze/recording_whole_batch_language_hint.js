let nock = require('nock');

module.exports.hash = "d2c34eac441d97eba273055b1b130792";

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
  '42d11241-d656-40f1-8c81-17b92baa4700',
  'x-ms-ests-server',
  '2.1.12158.6 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkWhqBHUPxBLgu8o-0usDN4; expires=Mon, 22-Nov-2021 00:46:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWt-gPyx1oMlcbXMk644bOOahZ3K_T2CJbscWIIqRl8B7gXCeCNNQMYeDzhZIQPF0KAHipFcz22ovU1-4-itd1MEy8T6axbzCJfz1Q2Jo2d3m6lFwY32cqSzdhO8aa5I0vXOPSRIPJM35hRLhpWQaD6pA98PuiQkwL484E_67a48gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:46:37 GMT',
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
  '09364d5f-a8b6-4b54-821f-993e9e0f0d00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aod5nIkjA4JJsPpMPuMNgMo; expires=Mon, 22-Nov-2021 00:46:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFwX9yGqaNctRRa3xdQQIM6QiT7FAXzlRiO0ad063Rx8tcVucfyyCltWg1WYMfCe3pnEG-SDnjn-C0XyXElqxTpsGiG1ZBcZgCsRafikjn0C6QeOhBTiiIMPWTFaF4RvnzFtdMF0rt5LEUG8ou3mkjy8SrUtzS7SI3BJxN5Y3eiAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:46:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8264244d-17e8-4501-8cc1-64463eb3003e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '09364d5f-a8b6-4b54-821f-993ea10f0d00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiOA6FH1ne1JhIEKnPiV4bg; expires=Mon, 22-Nov-2021 00:46:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:46:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170',
  'x-envoy-upstream-service-time',
  '402',
  'apim-request-id',
  '3ffb294a-3af9-4381-a98b-1d35619c6464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:38Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '23c636d1-f795-4c85-8936-a1fc3d5d3ab9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:38Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'b4c29fba-b8ed-41bd-9446-facb3067bd27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:38Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '2b3fbeda-074f-42de-a942-319e6524ed0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:38Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f2fbc9cd-0ef9-4845-8dcc-80ca5160c580',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:38Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5d54c50c-18a1-47fc-bfaa-8f6de283ee7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:46Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:45.9369975Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:46.1217027Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '276',
  'apim-request-id',
  '80f5ce54-8980-4160-985e-17196f817cba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:47Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:45.9369975Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:47.1642701Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:46.1217027Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '370',
  'apim-request-id',
  '58e7c698-6beb-4902-ab40-1bc1de590e4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/a4a36fc8-0aab-44cb-97d8-9fbfaadb1170')
  .query(true)
  .reply(200, {"jobId":"a4a36fc8-0aab-44cb-97d8-9fbfaadb1170","lastUpdateDateTime":"2021-10-23T00:46:47Z","createdDateTime":"2021-10-23T00:46:38Z","expirationDateTime":"2021-10-24T00:46:38Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:45.9369975Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:47.1642701Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:46.1217027Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  'f8434684-848b-41be-a137-60fb169071d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:49 GMT'
]);
