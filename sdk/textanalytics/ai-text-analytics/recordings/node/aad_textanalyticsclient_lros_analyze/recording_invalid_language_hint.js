let nock = require('nock');

module.exports.hash = "387cb21fad98ffac7889cbc112d6734b";

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
  '70a1be9f-215a-43a7-8635-a28242ec0b03',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9zU0ogogySPEa5m3-8RxYkOO1iYFi9Wie2l0F6Q9xi6Dus21IS2Vlie0nydXEDNWDofJ5k6VVS85Xgxz_sQWR1737HsYz3K1C7MTSh5S3gcwltgytNxRHfg0Itu9ghHX21r-FC03sMql8Y_OlMhOzZabMMj7Pb4OKLIlqM2mWj4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:58 GMT'
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
  'dde6a87a-7569-470a-b447-9985fb563201',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpGfPaPpw1kYRxjoOV_SQCB5IXcEEE2agvr9i5Ged3bJlt96DFiFpumX847Lgl4QUoIWJEkQ-JboCMduiAFLpA2QOdgcwYLLUEWRNKY8g3leGctlWhTu7ub4yiBfkWo8BQVWbelxT7gJivUesAY_0bY4v8p_0OQtA02d8En-7CT0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:59 GMT',
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
  'df10e011-eaf8-471d-8637-d07658aec001',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'ff885530-9d0a-4dde-9187-c7a4ecc961a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '21d5c2e9-9f62-42ff-b9c2-d7681e51ec52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '6b2e677c-e411-4179-9c4c-3ec57cf0c2e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '8256a81e-91f3-4fe4-9912-e803a5044935',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '95049129-3f3e-4968-9bf6-b31a9216c413',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'cf772102-f4bf-42c5-9eeb-b77920827e7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  'f8c9dcf7-06b2-4b6b-96db-0144541800e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '62751450-1d07-4287-8a44-718a5fd90279',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  '68417da1-1891-4a1e-a7f5-bcbaf053a1bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  'a1733af9-97ac-42b6-97f7-65fe043b44a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'c3ad1917-2321-40ca-aabe-d76d66ce2e6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  'ea9530b2-c24d-406d-840d-42029d617d87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '2a2e7f81-25c8-4b6e-b983-057063ee79c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '254',
  'apim-request-id',
  '05432353-6438-4c0f-be64-c12733e92fc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7e546bd0-85f8-4368-902f-b43455ed2c5e')
  .query(true)
  .reply(200, {"jobId":"7e546bd0-85f8-4368-902f-b43455ed2c5e","lastUpdateDateTime":"2021-04-28T21:10:59Z","createdDateTime":"2021-04-28T21:10:59Z","expirationDateTime":"2021-04-29T21:10:59Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:59Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:59.6804637Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,pl,pt-BR,pt-PT,ru,sv,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '211',
  'apim-request-id',
  'b15fec15-dcbe-4fb3-a987-90114d2a2c53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:11:24 GMT'
]);
