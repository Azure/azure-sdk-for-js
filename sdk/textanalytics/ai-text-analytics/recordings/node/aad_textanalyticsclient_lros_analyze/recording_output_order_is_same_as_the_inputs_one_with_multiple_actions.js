let nock = require('nock');

module.exports.hash = "101177c62b25837df25e0afe621c85ca";

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
  '9aad06e3-d507-4b55-8aaf-345464160903',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:09:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWu7gl6yX60JuoutBto7bcytj10yFyAVVq83q7OhjesrzK7ot7KNjWGIzh6KotI3SNK9o3_u2udERrEsApdE2NjkBW5ePmw86uEiL8DxeKtA8qbLBrDKeQW3za0GKz_3YZ0b5nD_GKmMzWegJFalV2J6ngIAtnGpL3hrLbS_elR4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:59 GMT'
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
  '2dfdbea5-5f8a-4f79-b84c-e767dc8e4b01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:09:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLadryKJK7rWRGl2yWLIFKOwm01de3Ge_MJ3ku-fFOtmfCzDcfQvDXhfZBZz8rkJJVs0tPrj6TFhRrORgiXpBlMkagKx8qpQapyOBmLCbs41ef8DMxK1FcynicfVZTunmxiLZLrUKvja1qeZI5mfbOE1EjrPxmn9BXV8JbnFid9ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:59 GMT'
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
  '75c18ada-a07c-4691-ad52-c189e86f9f00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:09:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836',
  'x-envoy-upstream-service-time',
  '343',
  'apim-request-id',
  '399ef607-09da-43f4-9ad1-8d014cc9f90e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:00Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:00Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '3e333342-9638-4335-bac8-be85422d18a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:00Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:00Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'ac7c600b-6c79-45eb-b105-9a70b40f9c7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:00Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:00Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e5ef6419-dc07-4b41-a722-f722a3dd1461',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '5d0ce539-7415-4cce-8cdd-5a6e6e77b8cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  'f3c0afb0-060d-4cff-8357-2788b2112ab9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'b8d5b18d-23dc-4c93-87aa-5e48969fcd3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '81463c02-a108-448d-a133-3ce18936b5c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '9559a235-0153-46d0-91d5-6033e7d0cf69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '95fdf8b9-6943-4404-af9b-bf1bd92a444c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '256',
  'apim-request-id',
  '5362d0b1-e0d8-4f50-bd08-b221d89caa68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '6eb0a463-72e1-4c21-a8b1-55402d091275',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '84bfae70-8aa2-4616-8f00-9114668d514f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '1e98cc3e-a8ec-48b7-9058-3371ecbf33c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5339',
  'apim-request-id',
  '9148635d-c822-462b-85b9-70b1c29b3044',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6b35d109-c8a8-45a2-bc94-613ff0334836')
  .query(true)
  .reply(200, {"jobId":"6b35d109-c8a8-45a2-bc94-613ff0334836","lastUpdateDateTime":"2021-04-28T21:09:04Z","createdDateTime":"2021-04-28T21:09:00Z","expirationDateTime":"2021-04-29T21:09:00Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:04Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:04.212773Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '337',
  'apim-request-id',
  'd47bd57b-7c78-4822-ac58-303d5f061734',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:32 GMT'
]);
