let nock = require('nock');

module.exports.hash = "4d8d4295ef3385d33632cac7a5192841";

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
  '8a7e66d8-9da3-450e-a604-2fb17370b602',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1DAAAAClHItgOAAAA; expires=Wed, 02-Jun-2021 19:35:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrflqBjSaDHMEodVS3aaXwKz-hXblhlYxxsKjcR01wGLlAtiEdk-wOZynt8z411KTB-_te8I3GSqBB6z9cTKpd-74ckuZzELcQCsvcWKKy1maKjInBF5YUtJGOmZJBfQPTh7PpKpmaje0IPC46AvWei6XmY73bwWF8BhAYRZOCEzIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:35:42 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  'c47a26d8-fbeb-4813-95a6-6ade51bff901',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1DAAAAClHItgOAAAA; expires=Wed, 02-Jun-2021 19:35:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr64KaYBj1_FC3o8eUaxM11L-AjhWWgaEZ5kcDgVLRVOHxXuWNAEaY8RMmOI9k-p36eAd3gNstZrHxWX_R5RADZ6W_3npCIfvXgBjr5zB7phePAM1BBxX5opqbT7TIwxDxh2592RjegKw6Hge-6imsLbwD6uf6KbRJLyVtoroNz6ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:35:42 GMT'
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
  'c47a26d8-fbeb-4813-95a6-6ade55bff901',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1DAAAAClHItgOAAAA; expires=Wed, 02-Jun-2021 19:35:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:35:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '006daa6a-f174-4fb7-bd84-0fb4386b8b7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:43Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '400a2f3f-4c84-4d2b-80cb-1a8a539887a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:43Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c56943fa-df41-47d7-b0bb-a9d22dfc5dcc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:43Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9c9bb5dc-6ca6-46bc-841f-904d8f3e9893',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:46Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:46Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '042999d8-9634-4e77-8c03-88bca8ed3fde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:46Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:46Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e4f73d2f-c926-436c-a532-82db5c0ed2e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:46Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:46Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5fc9b9c2-4a7c-4b63-ae11-a9a5eff22300',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:51Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:51Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'b1e4a76d-72c6-4564-a3ab-63ab95d68857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:51Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:51Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'dea26de8-4c02-4147-9b40-ff928712135c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:51Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:51Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '95ae095b-41f8-4eec-9731-23980d4dc593',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:35:51Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:35:51Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'dc6c543e-2ff6-4798-932c-47b596e9cfb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:35:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '654538e4-8abb-4e15-a4d3-6a5072724191',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '42d6225f-a7a8-4f9f-9226-507992f830f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '7eb884be-42be-4526-b3e2-2985ea88911d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '085a724c-ef82-4388-977a-15e8d3500217',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '235ca851-50d7-4ae1-82f2-b85eb57400e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '851f53aa-2a14-4856-97cf-fb43340a310e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  'e2a69993-6867-450f-bfc1-2da1bf62c36f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'ba0a78ee-cb08-4966-9f3b-81212b5fd6b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '713ed150-4f4c-4c5a-bb04-d4100cbc8001',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '64a35b16-08be-4c1e-a0b1-56ab62beb536',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '13a13199-2c20-4ab6-bab0-390197ff87a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  'b26806b5-75f3-4f70-8346-f089f4a5e198',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'd90eeb09-8483-41ad-a57c-c3de7000f504',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '85e99a66-224c-4b8a-bcae-45bf8f67e29a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'e0c8dcc1-1abb-4f7c-a749-eb81492f9472',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '0b270108-2a11-4b67-a5c0-b66077208f2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'a9c42eb7-8364-4ab6-b90b-8afe2a99469c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'a879cdaf-7bf5-49bd-abde-12c8a7ec84c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:01Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:01Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '7388d3c4-5bf1-4e8b-80fa-1d282f26eaab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '115f9a22-0151-4f6f-8cf3-fe1a3c0c8f85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '1a14c163-2b3d-4b1f-8701-e252edb2cb34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '689d24fd-c097-411a-8e5a-e90d6203107f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '60709f15-c269-484a-8b49-959ad74911f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'a97464e2-8c5c-4d29-afc1-6e642e72c7f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '76d0c8ef-96a2-4c34-a7c2-090b4db77adb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '4ed1b6a5-4ff3-4061-a666-a223912e2cdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'ff293e7d-4452-4b0b-9b2e-17d2963c2f7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:36:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:36:43Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:36:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  'b259eae2-bae9-4ba1-86b4-e3a10d8c9c97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:37:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:37:02Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:37:02Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-03T19:37:02.4860668Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '1b2221e3-c033-44ea-92af-549ffc1b58af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:37:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/e57e2729-8cd1-4d4b-b856-6d9f5b229562')
  .query(true)
  .reply(200, {"jobId":"e57e2729-8cd1-4d4b-b856-6d9f5b229562","lastUpdateDateTime":"2021-05-03T19:37:02Z","createdDateTime":"2021-05-03T19:35:43Z","expirationDateTime":"2021-05-04T19:35:43Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:37:02Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-03T19:35:51.6727729Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:36:01.062378Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-03T19:37:02.4860668Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '2b206857-d516-45b2-a310-8bb2e3973445',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:37:03 GMT'
]);
