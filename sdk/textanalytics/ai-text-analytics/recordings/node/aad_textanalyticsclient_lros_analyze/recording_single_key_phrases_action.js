let nock = require('nock');

module.exports.hash = "0ca80d72c5fc380d9c4ed2b8344fe09e";

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
  '17fa06fe-00c0-4954-b892-2a5ae05b8101',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:17:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreND50l2r98ucGdHhrvb1vNn7A_CwYOCge3V3lFwNZvahDtm2f-RTmFFP_C-w5nlQURfd6hVrQywZhKkVwUVwTGBLT9rEWi5FjXNLgWkQ01buYNPEv8cjVwovAj-E8_VwkLQiM-2i_rqJLvwGVzHvkNF5-wF6tHCukdVnhZOtP7ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:17:10 GMT'
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
  '90904e39-7df4-4f2e-ae2b-9e7130d76201',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:17:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryMjIi5ToSBSqTeLC3_HQMW_5xbC9ONLbuKWWA12X4XaUvA7mFAcbQiLG2cVgcmtfciDUHwYF-uLFwwVnjX0SXjTHtiCHOxNoaxjsIb7waci2pkrZJ7gyXLnn1GTz5Pv8c81hcJ7fYqFh9RaUne5Xdx_DIHAgty_nvNS2z_udW60gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:17:10 GMT'
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
  '9f88fbef-77fa-43fb-850a-91006fd12b01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgKzE5cIC8xDlPPRGjiTi0pz_bg1DQAAAEa5G9gOAAAA; expires=Fri, 28-May-2021 20:17:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:17:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3',
  'x-envoy-upstream-service-time',
  '292',
  'apim-request-id',
  'f4f0b19e-989f-48d1-9131-704ea795cedb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '5c138310-f1f9-4ec8-b09c-76063af15dfe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '0c18a714-f53e-474e-b1c6-6241175a86ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'ffe545fa-8fcd-485c-9d9f-3e3f4fa2a98b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '89fed3f5-abc9-40ce-af4d-42216dffc37b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '59daf921-e0f2-46b1-adb8-d6646d769b8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  'b6cfdaca-ef7d-4826-8862-1734533dd3d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '200d664f-9487-46cd-91ae-65e47ec694a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '9914b8ac-5fd1-480e-8fca-7b28427fb63a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'c1d52b61-f181-4272-9383-67b9ce851a08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '34e32640-d1a4-4227-9192-8090b946992d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '42056e6f-a226-4ab0-bbdd-a98109261569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T20:17:11.9288888Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2689',
  'apim-request-id',
  '59a8d19e-4110-4f65-aa78-bf080906a333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/756e5b6f-5abd-4efe-acc5-af31cb3d62c3')
  .query(true)
  .reply(200, {"jobId":"756e5b6f-5abd-4efe-acc5-af31cb3d62c3","lastUpdateDateTime":"2021-04-28T20:17:11Z","createdDateTime":"2021-04-28T20:17:11Z","expirationDateTime":"2021-04-29T20:17:11Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T20:17:11Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T20:17:11.9288888Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '2f91786e-4a86-44e0-b40c-a0692f3f295b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:17:35 GMT'
]);
