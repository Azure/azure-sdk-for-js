let nock = require('nock');

module.exports.hash = "c6b29871814e2ed17055893a0e240b0f";

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
  '4d7470ee-53f9-4114-a588-81d0d3537d01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:16:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8YPWMTFDG8mp7K0GtIRfF_VgdQi_wvcbzAXek44q6z2imhmEtA8-_ox3dytUwkkEAplzXq5pBI4Jm3-yO8svpQefhqJk6B7BmSqIwWJXOZNxrjzlUiHWLo7mau1H77xw3y1Mk9xo9c-oPXFvcF8aEY8EEwtmu6QIZbg3aeWnt_EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:16:36 GMT',
  'Content-Length',
  '980'
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
  '391cdb66-abf0-4e94-a630-a40177063a01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:16:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAGCOayFPeithE3i3ClfVemSkY4cdgghwYsxySgugs6mPP9ukfrLauWa3MRbXGoWU0xwljxHGs-ZlmMm3Ds8e-fr6HVh-ijtUeh1UYaKG37tp061nUAjFbc8M0Rl8cmgCc5unjNsvRWDXoIH3CIZmWQqgxRU8jRmkt1A5D0-prOggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:16:36 GMT',
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
  '90904e39-7df4-4f2e-ae2b-9e71d7d06201',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:16:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:16:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76',
  'x-envoy-upstream-service-time',
  '677',
  'apim-request-id',
  '15ad98a2-20f5-4fae-a99c-7a8578b747cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:37Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:37Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  '5de39460-84be-401d-84c7-3d474ed3e499',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'c370c73d-b4b4-4475-a03d-6232b6278d28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  'cd68527a-b23a-4573-b630-4725863da212',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  '3b279586-fd48-4274-b0dd-b5fff406917e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '86238ae5-1cad-4bf5-9877-38e7cbfd90ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'a2ea4d1a-27ad-4964-be65-5209c255bfc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'd96405ac-9ca4-49ba-b65c-3ad7a0c53fc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'd46a8303-381a-4c04-b7f6-ffbefa93bdff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'a75583ee-40aa-45fa-9343-f3fbc89dcf61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'd9c200d7-02d6-428c-a0a2-974a9ec49f84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '6b332646-595c-4d75-a265-352f9463f248',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '207cd3fc-88ee-46c4-9664-2a3fa0595412',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:16:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '983ebf10-1f34-421f-9c54-53b9c8e39cef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '0425ac9c-1bde-42a0-8e53-accd899cc511',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '1a528f9c-a4a0-4463-9986-a0bc4452359b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'cecd4076-c793-4c25-ae42-37f8fd22becd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T20:16:38.4082076Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '10a5b971-7e16-4c57-a2c1-25638abe5fa3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/91b6d69c-3d66-4259-b7ec-81803ff6cc76')
  .query(true)
  .reply(200, {"jobId":"91b6d69c-3d66-4259-b7ec-81803ff6cc76","lastUpdateDateTime":"2021-04-28T20:16:38Z","createdDateTime":"2021-04-28T20:16:37Z","expirationDateTime":"2021-04-29T20:16:37Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:16:38Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T20:16:38.4082076Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '23d5c9aa-bd9a-46cc-9293-e95094ea010c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:10 GMT'
]);
