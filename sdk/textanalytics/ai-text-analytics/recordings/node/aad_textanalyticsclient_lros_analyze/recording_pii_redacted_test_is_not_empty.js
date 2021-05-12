let nock = require('nock');

module.exports.hash = "809d8121a5c80a5f3218f36950f86872";

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
  '6b76e4cf-8f1b-42e6-b365-ca53ce9c7c00',
  'x-ms-ests-server',
  '2.1.11654.25 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnPhe69wTYVMjcXd08qS_MNz_bg1EAAAABseLtgOAAAA; expires=Fri, 11-Jun-2021 19:14:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1q_GC2opaE5HTP8iTEWx3VmGo03mDSlVDdHeabRlYzTmM0v1TKhwEAs91Pn9ObD2jr_wbR1FRH1BK6u2sTSWwh_4n1ZhULWPcdo1VUeCtWorcY-a2tXAVap9b6YhIGdcRf9_1bQzopSQxHoQdb0bkDyBDee1QFALzvblwJK4G-IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT',
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
  '428c50f7-d2da-402a-a895-3212e4e75200',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnPhe69wTYVMjcXd08qS_MNz_bg1EAAAABseLtgOAAAA; expires=Fri, 11-Jun-2021 19:14:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpVKYuOaJqdGhDaTKr1JzfyIuOo3QyBdMoJMKjGs14YzSDNThqoKv1FMUFr74V0vDmcQAnJdewL5Ipwd1rLYd_biHC7gndUm-_iWgoVt69kuKnhghOARS_Of8ZoK2NGHXP4V1HojiJfTVarT7ULBdMo2eajL1dQX39ggltqYIvwogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT'
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
  'a94baaa3-2e20-4683-8e1e-ea7a2b91c500',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnPhe69wTYVMjcXd08qS_MNz_bg1EAAAABseLtgOAAAA; expires=Fri, 11-Jun-2021 19:14:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  'db2471d0-025b-45fe-8f71-f4c47d7815b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:44Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:44Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '70a55ae7-15f4-4847-942e-31da9c7ae290',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:44Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:44Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '86c137de-6990-443f-bb85-004a1480326d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:45Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:45Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'fa248bc6-e0ad-4e37-990e-0e5dd005fb9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:45Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:45Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c1dd4f11-ec78-4abb-890a-f7eb5590daf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:45Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:45Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'fe63ded5-26d2-4cc3-af76-ce37a5b93a75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:45Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:45Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4563716d-ecbb-4a60-886b-ea375aa50a09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:45Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:45Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '57734d01-0753-4a9e-be20-fe57693b245b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:57Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:57Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:57.0461665Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'a72004dd-23c2-456f-beaf-c2ae402c1b6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/79e31766-023b-4913-a81d-3e915ba7d573')
  .query(true)
  .reply(200, {"jobId":"79e31766-023b-4913-a81d-3e915ba7d573","lastUpdateDateTime":"2021-05-12T19:14:57Z","createdDateTime":"2021-05-12T19:14:44Z","expirationDateTime":"2021-05-13T19:14:44Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:57Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:57.0461665Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '57750a60-38ea-43fa-8030-a53dc653e0a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:57 GMT'
]);
