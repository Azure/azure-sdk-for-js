let nock = require('nock');

module.exports.hash = "0d0220320898553ba2b19148d77076f4";

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
  '1a9341fe-d51a-43f2-bedc-f5b28a62ce02',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:39:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDfQgSW9q2sNfNfnFrMsxbsC19tGJxf3soR6_GbrOI2AdfC6ABl2m_IwldBi9ekPF4N18MC8Y_kxTmY7nmoJKYSWbTC80uiMnqIhfITr1YUQ2EHZE4xWD-nzTRwLjV1vBrUCrSvPOn-Z9BO5sII6-G-AOSQ5KLnXYn2R1wlUsY1ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:39:33 GMT',
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
  'b7dd8c02-11f5-499e-bdfc-a9fde00d7500',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:39:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevry5RHFktXD13DPmOCsSamBtC5rcowaoADh37hIEoBxVpQopJLj29e0GIKsFuGJgxWaRMHGUbV2HCTlPg71msEem03oRR0mwsK2nzklIMv7fv3ifrDOU1Si4LGsZ8_6Shw4tHj2WQPIK7AU-DpAXwzZNTrt4AH8T7-YpUObYYwC50gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:39:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=39f75db3-400a-435e-9589-57edc146df7c&client_secret=azure_client_secret")
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
  '1e233fee-f232-4e03-820f-8a8c39d76e00',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:39:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:39:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  '3ecdbf5e-62bb-4b1b-8c4c-fec3cb80f3c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:34Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '90c18855-7797-4977-bd87-97d1db6bc4b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:34Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6ac52025-b34a-415b-a921-8b53def4f6a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:35Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '78ca4050-75fe-4ca6-bd08-db5c286db09b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:35Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '02efebc4-bbe5-48e7-a9cd-7822d34e8662',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:35Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e2a7771b-48bb-4091-a117-bb2bf6977376',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:43Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'eae9eb71-7e14-4f9c-9437-6920a8556e3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:43Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '33bbee40-79c2-4871-b630-ee3b194b279a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:43Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '0a28942b-9a12-4232-bedd-4e170a67d2f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:48Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'be445b58-05aa-42db-9c34-3c7e3dc6aa7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:48Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  'f4fa377a-a90b-41f0-bb75-ee5222f94aa3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:48Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '867527d6-97a6-47a0-9de9-bec57719c560',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:48Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '1d2640c6-5a3e-40e7-b1a9-a985b22c15e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:48Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  'f0034346-7eda-4d7b-90ad-a6a77b40c7bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:39:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:39:48Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '2f63a3d0-1ae1-4e30-8a2c-607b6ef48ea2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:40:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:40:01Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:40:01.9119115Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  'c59aade7-f6ff-476d-8014-79aced785421',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:40:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dcd43c7c-8a5d-4439-88f3-4cbf8653fa15')
  .query(true)
  .reply(200, {"jobId":"dcd43c7c-8a5d-4439-88f3-4cbf8653fa15","lastUpdateDateTime":"2021-06-25T19:40:01Z","createdDateTime":"2021-06-25T19:39:34Z","expirationDateTime":"2021-06-26T19:39:34Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:41.8293815Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:40:01.9119115Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:39:48.257419Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '266',
  'apim-request-id',
  'f2036f2b-30fb-4fda-8787-9a04f968309c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:40:03 GMT'
]);
