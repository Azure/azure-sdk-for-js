let nock = require('nock');

module.exports.hash = "cc4404137b16b5a4d48267cfb85164f8";

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
  '9d8a3241-62cf-4f39-8643-a983df4aac01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:11:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryUi6MEdxrQhRXkRboLOP_tNurxEjXqMvXMR7TyfJDiWBjQAajQ1VYYscTiOkxASHBcO1zYh9ER2FcOD6DjMUUfIpxwKtfMcUhfkvkjIv_VezR3x35aWjeoTlZgl0ARziXd7LGjusmYLUw7MT7md-RbBife4R1efvvBGKDVgdT8wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'fe2755ab-c61d-46f7-8ed8-cbd1f45f6201',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:11:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2-qwMRSXP3nqRFFZGf2mSPLhKRjZS2vw_xjM-G_wN2dRrOGX5bWjN0WWlY2DbNeFWGrbTiPEXX1xK2mdVTJ9e_vyo6Ps9gasoNKLZ_FzwdjGUgnnbzmO3H6RCjPSkHn9GuLkHvDHb26xJ0vT5IpR8lLgRW9HXGLtvTDOwE9mq5EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'a7c5989c-c622-4b94-971d-bb3e6ca26401',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:11:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'ecdf5c5e-fa76-4ec2-ae8a-6428d423d587',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:24Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:24Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'df0d1b8f-0540-4dde-aa85-d130a33dce9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:24Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:24Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '54c0be43-de12-4e01-8572-036df6261435',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '40f719f5-1cca-483b-bbcd-b0c7fd830c1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '5597a73a-484e-45ff-b1ef-7e55dfed635b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '9e5ba443-b71f-411e-9772-0145a387c364',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '320',
  'apim-request-id',
  '5c63e6b4-2998-4cc7-bd96-e54b6da94889',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '505',
  'apim-request-id',
  'e029be7e-aa59-4cfa-895c-9112c899c8c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a?$skip=10&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  'a874cc95-d475-4baa-b476-ded7d4453d18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a?$skip=20&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  'c6386f97-a26d-4bbc-819c-4072a3e0099c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6266a605-9a1b-4836-92ee-461ec7b5d34a')
  .query(true)
  .reply(200, {"jobId":"6266a605-9a1b-4836-92ee-461ec7b5d34a","lastUpdateDateTime":"2021-04-28T21:11:25Z","createdDateTime":"2021-04-28T21:11:24Z","expirationDateTime":"2021-04-29T21:11:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:11:25Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:11:25.8733718Z","state":"succeeded","results":{"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '78d65dce-bfb9-4bd2-a9f4-e4bcd74fd211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:37 GMT'
]);
