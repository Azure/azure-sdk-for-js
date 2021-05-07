let nock = require('nock');

module.exports.hash = "49142639d1052c4e36eed86a677039a2";

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
  '7f47db16-a8c9-4ce3-838b-728c76521601',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1CgAAAFXGG9gOAAAA; expires=Fri, 28-May-2021 21:12:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLAVLzNyFvRomcznHWmI8aJHBOgv0q20IvQu3A6HcxwpCw2JXpsTZHpDfWhaH-uOjF7D8JtB7uDeCX3hhhforznPTtPtz_9yk_KrUBOtnPv7JA1luEtkQWHQu9Rqu-2bQgCEsfQCcBFwygC-0omyUXTtS_rWvJiig5ZjyIw6pxFkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:12:04 GMT'
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
  'dde6a87a-7569-470a-b447-99857a603201',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1CgAAAFXGG9gOAAAA; expires=Fri, 28-May-2021 21:12:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrur1BipnNjB345WX1j1FWFrK1dYYaVuK11TJ_BcSIJFpXfEyovUSOujskSslxlPc1DcMOIzmSwRrPsxWzqmrSsPjHTRoHterly-D5bcsTLYGmUmw8DWb5DwPN9UOhe8Umphr93yufIDIFKk9h6jgPVh5cjTuvNQi-3omGFRwYMxwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:12:04 GMT'
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
  'df10e011-eaf8-471d-8637-d076f5b8c001',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1CgAAAFXGG9gOAAAA; expires=Fri, 28-May-2021 21:12:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:12:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"bad","stringIndexType":"TextElements_v8"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8',
  'x-envoy-upstream-service-time',
  '520',
  'apim-request-id',
  'ee3dc46f-4ac2-400b-aea1-2dc9ffddea83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:05Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:05Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'debc3419-3744-4b4b-8d6e-8e0abe1b6ae1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:06Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:06Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '7b3dc5b4-a341-4b12-bf6f-c18c59ead040',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:06Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:06Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '2020267b-5573-4524-b232-0e9c6cee7d1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:06Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:06Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '6a34308f-376a-4592-a068-bcf106e41867',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:06Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:06Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'a478b2d5-bf7d-4da5-9016-3da6e1ec30ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:06Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"partiallyCompleted","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:06Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '02d843b2-f762-4bda-9c08-63688b0b88b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0ff001f2-d018-477b-a006-579d80f7b7e8')
  .query(true)
  .reply(200, {"jobId":"0ff001f2-d018-477b-a006-579d80f7b7e8","lastUpdateDateTime":"2021-04-28T21:12:06Z","createdDateTime":"2021-04-28T21:12:05Z","expirationDateTime":"2021-04-29T21:12:05Z","status":"partiallyCompleted","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:12:06Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-04-28T21:12:06.0187918Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '05d011c2-3c2b-4b4f-82f8-977261d2fe44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:12:14 GMT'
]);
