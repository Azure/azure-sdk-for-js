let nock = require('nock');

module.exports.hash = "c669728e0d1db74e6165e8ee080b20d0";

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
  '49b658ee-08c8-44b0-bc55-990ca3515600',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao15j-m6vvtJo1XhGdR2PM8; expires=Mon, 22-Nov-2021 00:45:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr43RnP9SZV_k1sCStjLAuiEkp3zzPFrcVkO-Taj_Or7tlGxtz8f4RuKpB9aCUCsOXR4N3wnqdfqUR_UkZ3jPxYGU7yIoJaKuXqLw2dt0M5wZ5XJpt6HeiEOY4C6iWtAyKc0Zv3N7thHZnSlkY9DdTVU1niDMp10nTRU-s4CB3WnUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:45:12 GMT',
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
  '1c3fd893-5cba-468f-8c4a-820047010400',
  'x-ms-ests-server',
  '2.1.12171.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgrwXr3RE1lBmIsto0F4lXU; expires=Mon, 22-Nov-2021 00:45:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_QrbGgtRhW9MuX-FdCSd0TK-zq_usfVoFWlk8PjmyZ2hX_P8cQ1OPVG2az1NMJmu_1Afr_ACsBza4KTV7atHCqahhCMCN4-5KvYV9nRPBursHcSofC15IEOrmDA0v4J6L7FtzIYf7otUz0LtdwT-c8JrRz-3DHL5LYNurumnfecgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:45:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2114c525-0900-4ff4-a887-f537e22e5de5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4e12589e-050b-4fb3-8971-4069fcd30500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhW_4D-knNFBtUENF1prfEw; expires=Mon, 22-Nov-2021 00:45:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:45:13 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","piiCategories":["USSocialSecurityNumber"],"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/9e4377b5-46b3-4523-8b8a-d896dbb59464',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'a10e497e-6450-478f-9489-db54735277ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9e4377b5-46b3-4523-8b8a-d896dbb59464')
  .query(true)
  .reply(200, {"jobId":"9e4377b5-46b3-4523-8b8a-d896dbb59464","lastUpdateDateTime":"2021-10-23T00:45:13Z","createdDateTime":"2021-10-23T00:45:13Z","expirationDateTime":"2021-10-24T00:45:13Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '9a6dfb92-6028-412f-8bd0-7c825a08bb45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9e4377b5-46b3-4523-8b8a-d896dbb59464')
  .query(true)
  .reply(200, {"jobId":"9e4377b5-46b3-4523-8b8a-d896dbb59464","lastUpdateDateTime":"2021-10-23T00:45:13Z","createdDateTime":"2021-10-23T00:45:13Z","expirationDateTime":"2021-10-24T00:45:13Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '8554fdef-57c4-47c2-ad6a-6a1848cd3ede',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9e4377b5-46b3-4523-8b8a-d896dbb59464')
  .query(true)
  .reply(200, {"jobId":"9e4377b5-46b3-4523-8b8a-d896dbb59464","lastUpdateDateTime":"2021-10-23T00:45:15Z","createdDateTime":"2021-10-23T00:45:13Z","expirationDateTime":"2021-10-24T00:45:13Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:15.8866032Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '1df6fe98-98d8-4ad3-aa82-a6311ae4f3d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9e4377b5-46b3-4523-8b8a-d896dbb59464')
  .query(true)
  .reply(200, {"jobId":"9e4377b5-46b3-4523-8b8a-d896dbb59464","lastUpdateDateTime":"2021-10-23T00:45:15Z","createdDateTime":"2021-10-23T00:45:13Z","expirationDateTime":"2021-10-24T00:45:13Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:15.8866032Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '40674823-df99-414c-800a-70492f81644a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:16 GMT'
]);
