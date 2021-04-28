let nock = require('nock');

module.exports.hash = "c686773b099b6fa962ac83db7f0aaaa2";

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
  '677b3ad0-30a8-46a1-a99c-437acc708f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:17:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrA_-qatY0ATy9ZwZlEqJ7dsBg0dztGRK_4z0dK1YFNc3Zt9tR0AImLJbK2tQ4XRmUWKa3qRPtmc0h4ld_AF8D8mgHCtSu8OX69l1qfKidxYI4GGP_rMYXjAbu9x7ziVumkMVmKKu7Klcap552MFymdRpPu1I5740EYKTwyUkzLVsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
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
  'b546b8c6-ac63-499b-b61f-48473db19c01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:17:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOaO-pWIkrnQSSrSRPxjVJd4hibpIRnlc3lJtZo-2DoJaQF74cW90UuK5tUr_cXwJHkI2kmRO7KG2oPsbkFoPV6UIXvgHPpXvDHFMwPzXC16RUlbscBARrSd1Zd6LYUxUaThBP4rirYqhOUXd3URoBfMRHOkJTY60fGLm6-fEVU4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
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
  '9030de1d-87b0-4dd6-a4cf-4c08f0692b01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:17:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  '032542b0-b3c5-4e38-847a-ea08418ac98e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:35Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:35Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '3b137a75-bcbe-4817-bcbe-bf8728aab7cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:35Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:35Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'dde9e423-2fe8-4ef4-ae13-3ffff5b82f68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '48ba34b3-6f31-46c1-b274-7434755eede5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'de19d767-4b67-487c-b8d9-a3861b88fff6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'e554b52d-2b2e-42f8-b1c4-4aa74ec768fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'f6b15cf9-6077-491d-b36c-6ad039904a8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'b1511551-f7c7-4d2a-bdf1-998dcffa2649',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '2d488504-ded4-4927-8914-569ae7c33739',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '9b2855b6-bec5-4779-a74c-cf4cd798d096',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '03661d1d-7c3a-4fc7-a624-0d9482583f50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '23ae2f8f-cda8-406b-a4bf-a016798dfb67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '41430c26-5cec-45bd-9e29-556074790d88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'eb0b2d96-7665-4b78-81d1-f8906fcad5c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '4da7955c-3151-4886-a4f9-268013c130e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:18:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '582412a4-99f1-4894-bda8-9e0a6ac1f837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:18:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T20:17:36.3294133Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '8523ab66-4d7d-4a75-a379-275c3e211e38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:18:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/e1d271d7-9578-45d8-ae55-3a56903c6bd7')
  .query(true)
  .reply(200, {"jobId":"e1d271d7-9578-45d8-ae55-3a56903c6bd7","lastUpdateDateTime":"2021-04-28T20:17:36Z","createdDateTime":"2021-04-28T20:17:35Z","expirationDateTime":"2021-04-29T20:17:35Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:36Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T20:17:36.3294133Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '314b52b2-7673-498b-9db5-1ac13f156161',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:18:05 GMT'
]);
