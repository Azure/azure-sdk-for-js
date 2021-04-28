let nock = require('nock');

module.exports.hash = "f8abc9dfdeea575231a4322e126ab3a9";

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
  'd12ec434-5ea8-46e8-bf24-1f122df75902',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:09:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMy5vyqXcu1c8eFW3Df9FSPNzz7DbbT_twNK9GJst-kO7cu71HDmPM_P0afQxlWjYZ15i0KzbBaFz1ssOACWoh4k3IRvBJmu9ACAzx8krGa2oUY8gAZXJBxNVpUYmFLXC9KB0bsgOOptbpcDQsmaNm0BItx8eLgJhS8WIpNoVOxsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT',
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
  '3c2d26e4-01dc-4b53-a39f-c792535f0f00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:09:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUIC-A5qSt_Xa7PHDas-OQ9Jmi1CfEzghL_lSyuRgWrFl2ZjrDa3j41YzbeYD-P4toIBgJhU4sf4w-VGIboMAioj-gBBItflnlAZxtDsnKSSuBEYYNGflV7NYUzIf-8sdmKNwyFm5dsN6knNtcHguDiyJpyslfFbkAQFfrk-Qd98gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT'
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
  '9cdd33bc-766f-4fd8-9607-fa08ca94d901',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:09:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  'd8457b5d-e3ab-4f25-9922-5c14165ea839',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'c03d8af1-cc9b-4cdb-be1f-90fafa1709ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'd351c445-10fa-409e-ab48-1fc6d17d373d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  'd6cd1b8e-09a0-4a46-979d-d2f67240b8d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  'eed86b62-4030-4098-ac9d-c4ad7eb6f22d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'd332c737-f8bd-44bc-998c-2a71a3abb27b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  'af4c64a0-3dea-4143-8376-0d7bc0e661e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  'd5caf900-06df-45fe-b7d5-a6f124bda7fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '374',
  'apim-request-id',
  '5b127503-0a03-4c74-990a-b7b5bdf7a45c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '412',
  'apim-request-id',
  'c1e71386-a47e-4bd2-8932-25c93e1b64cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0c29d60e-0d78-47e6-a65b-8becddf70709')
  .query(true)
  .reply(200, {"jobId":"0c29d60e-0d78-47e6-a65b-8becddf70709","lastUpdateDateTime":"2021-04-28T21:09:50Z","createdDateTime":"2021-04-28T21:09:50Z","expirationDateTime":"2021-04-29T21:09:50Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:09:50Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:09:50.7373847Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  'a8628965-119b-4ba7-946b-949460768016',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:06 GMT'
]);
