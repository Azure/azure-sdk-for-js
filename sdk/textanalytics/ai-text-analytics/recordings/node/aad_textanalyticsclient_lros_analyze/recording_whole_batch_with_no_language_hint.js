let nock = require('nock');

module.exports.hash = "e90199fa44cc48267b328f53a759789c";

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
  '2dfdbea5-5f8a-4f79-b84c-e767fa994b01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBmIp-cG5kO1tHdHmmprnYqQJeh9rBZwmQRhSA-pXmuQEOIYs-gyXaLRf3z4Vkyeo2J1HTElq2QTcJMKu2KlwPKHYNbquUQWxyv2OAtp0E8LiAjW-hv7H9vlzY1F8JAw2tkqO1MxxPvETJKwkdAUlkBHD6BvSqaubaZTDVJDBYgAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT'
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
  '420cebe6-e414-4cc7-bd16-9eedf011df00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrsp2b-ybF-gxFuuc-i9DfnghF1f1dGmJ85Acs-Ooohu4bqm50CL2qUuYVmghQ9b_tgJMUDzr4iJxKTMryLiqpnsURlga1oCAhkut1GhM5cBCnvXiZFAJrnIKthakgMRp8auEdJm6Hzf1jxT1oAUpYBalz44YkiLWPlV2bRswIxbMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT',
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
  '2dfdbea5-5f8a-4f79-b84c-e767009a4b01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '4d7b74f5-c890-45ed-b9f6-c7833c5d96d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:16Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:16Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd96db1a9-318e-42f0-b4c9-5472f663e991',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:16Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:16Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '26a63ba2-11cd-441d-b558-47a49e02ac72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '88d35bbd-5681-4e95-8b24-35120b07d364',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  'a07e6998-0929-4b56-ae4e-b3447d3efd06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'd7ccc9a2-c70c-425c-8599-cb1087fd42fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '0f0d3c95-bd39-4c94-ac2d-a054bd2d8f56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  'ac342631-11b8-4047-ab4e-30b745bbe0b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  'aaf0d637-e3cf-4274-8352-db3fc2ef9183',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/12950870-5721-43c9-813e-298f05986542')
  .query(true)
  .reply(200, {"jobId":"12950870-5721-43c9-813e-298f05986542","lastUpdateDateTime":"2021-04-28T21:10:17Z","createdDateTime":"2021-04-28T21:10:16Z","expirationDateTime":"2021-04-29T21:10:16Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:17Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:17.3902445Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '70bcbce7-579b-4b12-b9d5-ed65b3c3eab8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:30 GMT'
]);
