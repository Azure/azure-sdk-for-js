let nock = require('nock');

module.exports.hash = "49142639d1052c4e36eed86a677039a2";

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
  '2e9f030b-95b4-439d-a496-a354e5e96401',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1CQAAAHK6G9gOAAAA; expires=Fri, 28-May-2021 20:22:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrtnptmr9AhI-l8DcPORPMpkvAvdzdFjkUkLuW6WKlt0wSJCtGowiT8aC3Hme998IEH5O8KsYDoe94DvgLryl3iiVGsP-Ph2kYsi9QE13E02-twDh7Ge3a0mpVU7uH-juHL1G8rN9bzk1PEVowchIphmq6Fi94mRk0Tk6GyHldibIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:22:18 GMT',
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
  '971f755a-4f10-41a8-a558-cfc11e563b01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1CQAAAHK6G9gOAAAA; expires=Fri, 28-May-2021 20:22:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEeJwWcU2RkGWagdV-_oo703fLXBrAw-YlEAJLQ_sjToWwvQkO0BZMBHYgploSQchWYV3I82DUNDhwb3DmKpgqnP5gl-TkjRLsp4T29QvabQ9BVJ3GnMMElgd0uPoGRrBvPQsjjPbk9RPCCvgh2mEqIOUNKK7oN5OEN9NwO3aa8UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:22:18 GMT',
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
  '9344c809-d294-4bf4-9093-4ecc54162001',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1CQAAAHK6G9gOAAAA; expires=Fri, 28-May-2021 20:22:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:22:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"bad","stringIndexType":"TextElements_v8"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '80a1e208-28ad-4a81-a1a9-f60ae6b29911',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e0208332-1929-4a9b-a292-cba1a8dd77a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'c430198a-c50a-4a1f-96ac-d1e031679a2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'e39f4f94-9a05-4b93-98a8-1416fece3021',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'c33f261c-a026-4d73-882e-233a02bb3d43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '8e0ae3a1-b381-4af9-807a-07c969ef3bf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '01cdeeb6-b802-4c5d-9a86-8bf35a4110d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '5251cf99-4286-472d-8030-2fc676e95a4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '16343115-d4c3-4178-93ae-af94267ae8f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'e0c3d0bf-1f05-4e77-82d7-ca0a7fda2c46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  'afba1b08-a725-4cc1-81c7-48df4debdd4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'facf3b2d-6637-49a0-9af9-f9c752ea30d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '0e1a1fd3-723d-466d-9359-601f147dd2d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'd3caba3d-dddd-4df1-8a59-b65825c25554',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'a0a643e2-4df8-40f1-a437-59d58cd15095',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'f5e31d1c-be27-4e09-8ab2-5a9cc24b02dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '948fa5dc-cdc0-4486-bf5c-eaf4f71d5384',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'd8dfdf17-73d9-4d5b-b3aa-89677a2aacd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '77984663-c5aa-4256-a03c-012a749ebac8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '94700a03-0a11-4081-af9c-1a3b269778c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '31b0ce34-937d-432a-93d4-99ac62e98fad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '7bd74308-1267-4a72-b8f1-31879ee9d4a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'b4d99954-84ea-456e-8dd5-0ce8cd9fa14d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '65beb50f-d960-464e-90d1-1464dcb75ec6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '840b8865-b6a6-4a33-85b5-db5c93bc3118',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'aa69cc01-a37a-4f97-8012-d70c073a2bc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '1d3880ae-5c81-4453-adf5-e18e2bc1504c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '12da1a8c-1c40-470c-a471-7f0857993a67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '8d9eee80-dccd-4f18-837e-ffdacd2a69f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '4526eff9-1317-4d05-9be4-73894850730f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'dcac7759-3819-4c2f-b609-d68868b7dc37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '4bfc1fc4-52cc-4c4e-897a-bcb580b028d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '5812ed68-5391-4604-8db7-3b797ee11eaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"partiallyCompleted","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '4b47feaa-38c7-4195-9177-5ce6a6e0a185',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d31afdb4-1747-421a-80de-9f600bb2faad')
  .query(true)
  .reply(200, {"jobId":"d31afdb4-1747-421a-80de-9f600bb2faad","lastUpdateDateTime":"2021-04-28T20:22:19Z","createdDateTime":"2021-04-28T20:22:19Z","expirationDateTime":"2021-04-29T20:22:19Z","status":"partiallyCompleted","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:22:19Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-04-28T20:22:19.7275873Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '98a0f69b-7e21-4526-b05c-5bf5aa7143c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:25 GMT'
]);
