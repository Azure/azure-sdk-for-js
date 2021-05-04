let nock = require('nock');

module.exports.hash = "e02332145f6c6188b35b4758067b255f";

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
  'cab013f6-e79f-47c2-b1e9-63627ec3c600',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsaaPmMomjBDsg-6UB1UCM5z_bg1EAAAALSoI9gOAAAA; expires=Thu, 03-Jun-2021 20:44:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlmoGIgatmQpUM4LsVltSDM9K16gp0WNKLDQ3O6YyZlV2irHCV6DqM7A01bb_upaQ7AHX4ZZxnYn3LR_SpKry2Q9Azqa8aylOLUBQ37jcnLKhINEYKRIaxgReecgDeSJMFzstBd3h1yG2hfgOVJSz22xfP59ERV3zL9ic8FflZREgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 20:44:12 GMT',
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
  'e7050470-0d85-4f59-85fa-ae03159e3000',
  'x-ms-ests-server',
  '2.1.11654.25 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AsaaPmMomjBDsg-6UB1UCM5z_bg1EAAAALSoI9gOAAAA; expires=Thu, 03-Jun-2021 20:44:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFlwC4X1xbkF8-Lc8Pj0fm_pJzhSti0714St8d3J074Z-18MY_Xki7VhstieIaAfV3O2wMzFmIJB9_7J5EtRmB5sCjvA_0lPA0fY3QMEP22tdtpqmQ05Dz-aqI6oNxzaU2XWCgHaq9z5liU3C2QWB5dUa4U3p5xZoFAGVNxJvA3IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 20:44:12 GMT'
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
  'e16d5eb5-9857-4c6f-915a-bb9f31a20700',
  'x-ms-ests-server',
  '2.1.11654.25 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsaaPmMomjBDsg-6UB1UCM5z_bg1EAAAALSoI9gOAAAA; expires=Thu, 03-Jun-2021 20:44:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 20:44:13 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"displayName":"testJob","tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '929ebc7f-8696-4b2c-a80a-ab0806dea721',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:13Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:13Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b91fe44f-ef89-4098-939b-5557d00077c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:13Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:13Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5adfe6c3-24bd-4e12-8fef-a47d3a1a2dbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:14Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:14Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '15d354f4-e815-40fc-b054-e426a1abd45c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:14Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:14Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a16e18d1-154d-4c5a-8c20-7e402ce2c27f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:14Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:14Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a4ea4ea1-7720-4a9f-9d67-0b72e45a1f54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:14Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:14Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '088a5024-8afb-4e93-9e35-6c1899df5835',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:14Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:14Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '14bae7d2-3ed1-4e13-8ea9-b0ee171c27a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:14Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:14Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ac4a7557-458d-4aba-979f-f6ea165bb1b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/b6704290-ca0c-4d0f-b0c3-821b8a0b2afb')
  .query(true)
  .reply(200, {"jobId":"b6704290-ca0c-4d0f-b0c3-821b8a0b2afb","lastUpdateDateTime":"2021-05-04T20:44:27Z","createdDateTime":"2021-05-04T20:44:13Z","expirationDateTime":"2021-05-05T20:44:13Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T20:44:27Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-04T20:44:27.5778276Z","name":"testJob","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '5cffd5fc-a670-440e-8bef-54dbee6faa55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 20:44:28 GMT'
]);
