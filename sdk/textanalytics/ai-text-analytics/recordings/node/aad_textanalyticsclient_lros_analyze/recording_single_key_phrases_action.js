let nock = require('nock');

module.exports.hash = "0ca80d72c5fc380d9c4ed2b8344fe09e";

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
  '473ec333-40c5-474e-ad7b-d5e8ea1a1203',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1EAAAAP1FItgOAAAA; expires=Wed, 02-Jun-2021 19:32:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6PoFmRiq9P2DVzz1X0HlXeWS49XOwCsO0OBVJlt-EFXFvIuvU1amydycEizJ9nqW1DxrVC82VRuNJsz_6jq7sKZwiIDQeN-MYZhkNgZBIXvRdhtfwckqNiTSWCiSLm_kBHeOG66nq3f4qGg6Gt7l3HMsXnMy3TThFZLNVLEJHfwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:32:00 GMT',
  'Content-Length',
  '980'
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
  'bf647412-b432-4cd1-890b-9d7622820700',
  'x-ms-ests-server',
  '2.1.11654.25 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1EAAAAP1FItgOAAAA; expires=Wed, 02-Jun-2021 19:32:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrS8TJ0gfv0Jk4mz1hGSPkfjlW-wkvP6mz46ojeEQe60XBuBOfHyP8SwiCEzHG8LiaMCY6XDvr75rlCq3dqVBe4QqRqb0IAJ7pFrzsrPyOkFgHKpmJQKbeyx_ojY80RCZSBnlCgW81vnerDL6hmQI10GY-vgYDBOT8r6YllIzxJMkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:32:00 GMT'
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
  'dbcd66a1-a626-4f2f-a97b-68ff5fd8bd00',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1EAAAAP1FItgOAAAA; expires=Wed, 02-Jun-2021 19:32:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:32:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '60cb840c-b5aa-4b13-b30a-f3ec4dbc746b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:01Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '2f2fa065-dfc8-4285-ad0a-964e393f98c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:01Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '928e5fc2-7bc8-460e-8078-5a4cb562f6e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd94bd0f3-0af2-4ac1-93f4-3d660e451be4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bb060ac2-0486-4493-aa9e-dfc67e25e51b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '699d5e8a-1cc7-4507-a5bd-a16374f10938',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a5e53e3d-d4b1-496b-9d51-b25049d4b425',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c5087084-582d-4e7b-ba35-1eaae5ca0bc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9ee18257-a0eb-45cf-9969-9abb1079d82c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '289b0eae-f3e1-49ed-8465-549feadda2bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b0042a6d-d717-4a06-9fbb-bd94382277c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e44ff0d3-d5e1-4d0b-935d-9bc1bc6adb46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b032f41f-8418-4d9a-87d5-a7830354e62a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:02Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:02Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e6cc8353-6bea-4af9-af3b-e20319398d26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:24Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:24Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-03T19:32:24.8625344Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'a54b44d6-a757-43bd-9f1a-7c583b5f31cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/1b254f43-307f-4bd3-8f4e-43fe6802a546')
  .query(true)
  .reply(200, {"jobId":"1b254f43-307f-4bd3-8f4e-43fe6802a546","lastUpdateDateTime":"2021-05-03T19:32:24Z","createdDateTime":"2021-05-03T19:32:01Z","expirationDateTime":"2021-05-04T19:32:01Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:32:24Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-03T19:32:24.8625344Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5169',
  'apim-request-id',
  '63b8e019-0ac6-4940-952f-b110616a4c2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:32:30 GMT'
]);
