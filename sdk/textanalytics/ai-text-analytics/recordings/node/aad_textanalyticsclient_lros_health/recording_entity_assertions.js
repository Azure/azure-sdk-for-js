let nock = require('nock');

module.exports.hash = "6c84b95328582df279435043ada9d912";

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
  'a1e31c6c-19cc-431b-992e-d07e8f708801',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:07:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlsLJHMeWP8_zLQ3orPRrl7JNGaIm1xqBM7HF03F3AYkTo8MZ8prosI6XVt5_F1rRFEvJWjucuFmuk7fpE3_rdVaC79Z7Pzs_qlG4px80aoVe-HVRsiJaunhlT-PlHPrbazLQcm-pWM8arGRinNozzhFHGgzM14Pc0Ot_5cmuNq0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:07:51 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '14112c50-6ebb-4eff-9ee3-d00e86f8fc00',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:07:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtudOis0bFxXv-b3hv11Ex8VLbdCFRBjDOkmwoG02eLt1uvveByRmfiS11nEl6sVM_3zkJZ_fw5S70tV0fdskY4cgrO95U1kLwOKcXJz9yqhTQ7_Vo3B8MhdHh8UWFRXrMUeKZcQ6AsHhpnGgRKm1kqYYeSLPKtacTn0fYPtuvusgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:07:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=d4fc855f-c5fb-43e0-9626-12eac947b54a&client_secret=azure_client_secret")
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
  '9083cfcd-1486-4a3d-a71b-ee8ea90a0001',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:07:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:07:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"Baby not likely to have Meningitis. in case of fever in the mother, consider Penicillin for the baby too.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  'ffd60245-6f04-4e9c-955d-a8df03ea84d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '166837f2-ab46-42b8-9188-2d0258c46187',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '20ed17c1-a5fe-4e9e-967a-c23f2505bec3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4870a83e-bf88-4bf1-94ae-f60bfcbf3f08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bea70a61-6c35-484b-a606-920c70911411',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'b8f90a0c-2a83-4125-8a4d-54431cd745c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '25fb05c9-f74e-471e-b0e6-1b7784ced6e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:07:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '81a9d551-c420-4ac5-87fa-b659358e013e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:07:51Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'da2a47d2-51ef-4de6-a827-ef674a232297',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:08:05Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'f9decc6b-3f0d-45ff-8a8e-3776ddb82aad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:06 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:08:05Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd571c28f-fa3d-4ff5-aa1e-797cfc74d764',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:08:05Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '966e5772-d623-4783-8e17-f6b600145948',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:10 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:08:05Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '989f06ee-d92f-4545-ba55-6ec77c237e4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:12 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:08:12Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":0,"length":4,"text":"Baby","category":"Age","confidenceScore":0.94,"name":"Infant","links":[{"dataSource":"UMLS","id":"C0021270"},{"dataSource":"AOD","id":"0000005273"},{"dataSource":"CCPSS","id":"0030805"},{"dataSource":"CHV","id":"0000006675"},{"dataSource":"DXP","id":"U002089"},{"dataSource":"LCH","id":"U002421"},{"dataSource":"LCH_NW","id":"sh85066022"},{"dataSource":"LNC","id":"LA19747-7"},{"dataSource":"MDR","id":"10021731"},{"dataSource":"MSH","id":"D007223"},{"dataSource":"NCI","id":"C27956"},{"dataSource":"NCI_FDA","id":"C27956"},{"dataSource":"NCI_NICHD","id":"C27956"},{"dataSource":"SNOMEDCT_US","id":"133931009"}]},{"offset":24,"length":10,"text":"Meningitis","category":"Diagnosis","confidenceScore":1,"assertion":{"certainty":"negativePossible"},"name":"Meningitis","links":[{"dataSource":"UMLS","id":"C0025289"},{"dataSource":"AOD","id":"0000006185"},{"dataSource":"BI","id":"BI00546"},{"dataSource":"CCPSS","id":"1018016"},{"dataSource":"CCSR_10","id":"NVS001"},{"dataSource":"CHV","id":"0000007932"},{"dataSource":"COSTAR","id":"478"},{"dataSource":"CSP","id":"2042-5301"},{"dataSource":"CST","id":"MENINGITIS"},{"dataSource":"DXP","id":"U002543"},{"dataSource":"HPO","id":"HP:0001287"},{"dataSource":"ICD10","id":"G03.9"},{"dataSource":"ICD10AM","id":"G03.9"},{"dataSource":"ICD10CM","id":"G03.9"},{"dataSource":"ICD9CM","id":"322.9"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU048434"},{"dataSource":"ICPC2P","id":"N71002"},{"dataSource":"LCH","id":"U002901"},{"dataSource":"LCH_NW","id":"sh85083562"},{"dataSource":"LNC","id":"LP20756-0"},{"dataSource":"MDR","id":"10027199"},{"dataSource":"MEDCIN","id":"31192"},{"dataSource":"MEDLINEPLUS","id":"324"},{"dataSource":"MSH","id":"D008581"},{"dataSource":"NANDA-I","id":"02899"},{"dataSource":"NCI","id":"C26828"},{"dataSource":"NCI_CPTAC","id":"C26828"},{"dataSource":"NCI_CTCAE","id":"E11458"},{"dataSource":"NCI_FDA","id":"2389"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000471780"},{"dataSource":"NCI_NICHD","id":"C26828"},{"dataSource":"OMIM","id":"MTHU005994"},{"dataSource":"PSY","id":"30660"},{"dataSource":"RCD","id":"X000H"},{"dataSource":"SNM","id":"M-40000"},{"dataSource":"SNMI","id":"DA-10010"},{"dataSource":"SNOMEDCT_US","id":"7180009"},{"dataSource":"WHO","id":"0955"}]},{"offset":47,"length":5,"text":"fever","category":"SymptomOrSign","confidenceScore":1,"name":"Fever","links":[{"dataSource":"UMLS","id":"C0015967"},{"dataSource":"AIR","id":"FEVER"},{"dataSource":"AOD","id":"0000004396"},{"dataSource":"BI","id":"BI00751"},{"dataSource":"CCC","id":"K25.2"},{"dataSource":"CCPSS","id":"1017166"},{"dataSource":"CCSR_10","id":"SYM002"},{"dataSource":"CHV","id":"0000005010"},{"dataSource":"COSTAR","id":"300"},{"dataSource":"CPM","id":"65287"},{"dataSource":"CSP","id":"2871-4310"},{"dataSource":"CST","id":"FEVER"},{"dataSource":"DXP","id":"U001483"},{"dataSource":"GO","id":"GO:0001660"},{"dataSource":"HPO","id":"HP:0001945"},{"dataSource":"ICD10","id":"R50.9"},{"dataSource":"ICD10AM","id":"R50.9"},{"dataSource":"ICD10CM","id":"R50.9"},{"dataSource":"ICD9CM","id":"780.60"},{"dataSource":"ICNP","id":"10041539"},{"dataSource":"ICPC","id":"A03"},{"dataSource":"ICPC2EENG","id":"A03"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU041751"},{"dataSource":"ICPC2P","id":"A03002"},{"dataSource":"LCH","id":"U001776"},{"dataSource":"LCH_NW","id":"sh85047994"},{"dataSource":"LNC","id":"MTHU013518"},{"dataSource":"MDR","id":"10005911"},{"dataSource":"MEDCIN","id":"6005"},{"dataSource":"MEDLINEPLUS","id":"511"},{"dataSource":"MSH","id":"D005334"},{"dataSource":"MTHICD9","id":"780.60"},{"dataSource":"NANDA-I","id":"01128"},{"dataSource":"NCI","id":"C3038"},{"dataSource":"NCI_CTCAE","id":"E11102"},{"dataSource":"NCI_FDA","id":"1858"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000450108"},{"dataSource":"NCI_NICHD","id":"C3038"},{"dataSource":"NOC","id":"070307"},{"dataSource":"OMIM","id":"MTHU005439"},{"dataSource":"OMS","id":"50.03"},{"dataSource":"PCDS","id":"PRB_11020.02"},{"dataSource":"PDQ","id":"CDR0000775882"},{"dataSource":"PSY","id":"23840"},{"dataSource":"QMR","id":"Q0200115"},{"dataSource":"RCD","id":"X76EI"},{"dataSource":"SNM","id":"F-03003"},{"dataSource":"SNMI","id":"F-03003"},{"dataSource":"SNOMEDCT_US","id":"386661006"},{"dataSource":"WHO","id":"0725"}]},{"offset":60,"length":6,"text":"mother","category":"FamilyRelation","confidenceScore":0.99,"name":"Mother (person)","links":[{"dataSource":"UMLS","id":"C0026591"},{"dataSource":"AOD","id":"0000027173"},{"dataSource":"CCPSS","id":"U000286"},{"dataSource":"CHV","id":"0000008266"},{"dataSource":"CSP","id":"1124-5492"},{"dataSource":"HL7V3.0","id":"MTH"},{"dataSource":"LCH","id":"U003028"},{"dataSource":"LCH_NW","id":"sh85087526"},{"dataSource":"LNC","id":"LA10417-6"},{"dataSource":"MSH","id":"D009035"},{"dataSource":"NCI","id":"C25189"},{"dataSource":"NCI_CDISC","id":"C25189"},{"dataSource":"NCI_GDC","id":"C25189"},{"dataSource":"PSY","id":"32140"},{"dataSource":"RCD","id":"X78ym"},{"dataSource":"SNMI","id":"S-10120"},{"dataSource":"SNOMEDCT_US","id":"72705000"}]},{"offset":77,"length":10,"text":"Penicillin","category":"MedicationName","confidenceScore":0.9,"assertion":{"certainty":"neutralPossible"},"name":"penicillins","links":[{"dataSource":"UMLS","id":"C0030842"},{"dataSource":"AOD","id":"0000019206"},{"dataSource":"ATC","id":"J01C"},{"dataSource":"CCPSS","id":"0014106"},{"dataSource":"CHV","id":"0000009423"},{"dataSource":"CSP","id":"0199-8025"},{"dataSource":"GS","id":"4011"},{"dataSource":"LCH","id":"U003521"},{"dataSource":"LCH_NW","id":"sh85099402"},{"dataSource":"LNC","id":"LP14319-5"},{"dataSource":"MEDCIN","id":"40319"},{"dataSource":"MMSL","id":"d00116"},{"dataSource":"MSH","id":"D010406"},{"dataSource":"NCI","id":"C1500"},{"dataSource":"NCI_DTP","id":"NSC0402815"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000045296"},{"dataSource":"NDDF","id":"016121"},{"dataSource":"PSY","id":"37190"},{"dataSource":"RCD","id":"x009C"},{"dataSource":"SNM","id":"E-7260"},{"dataSource":"SNMI","id":"C-54000"},{"dataSource":"SNOMEDCT_US","id":"764146007"},{"dataSource":"VANDF","id":"4019880"}]},{"offset":96,"length":4,"text":"baby","category":"FamilyRelation","confidenceScore":1,"name":"Infant","links":[{"dataSource":"UMLS","id":"C0021270"},{"dataSource":"AOD","id":"0000005273"},{"dataSource":"CCPSS","id":"0030805"},{"dataSource":"CHV","id":"0000006675"},{"dataSource":"DXP","id":"U002089"},{"dataSource":"LCH","id":"U002421"},{"dataSource":"LCH_NW","id":"sh85066022"},{"dataSource":"LNC","id":"LA19747-7"},{"dataSource":"MDR","id":"10021731"},{"dataSource":"MSH","id":"D007223"},{"dataSource":"NCI","id":"C27956"},{"dataSource":"NCI_FDA","id":"C27956"},{"dataSource":"NCI_NICHD","id":"C27956"},{"dataSource":"SNOMEDCT_US","id":"133931009"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '9bcfbac6-fa4c-48ff-826a-4f197621af7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a43738a1-8a27-4491-9608-01ea1aec2d29')
  .query(true)
  .reply(200, {"jobId":"a43738a1-8a27-4491-9608-01ea1aec2d29","lastUpdateDateTime":"2021-08-03T03:08:12Z","createdDateTime":"2021-08-03T03:07:51Z","expirationDateTime":"2021-08-04T03:07:51Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":0,"length":4,"text":"Baby","category":"Age","confidenceScore":0.94,"name":"Infant","links":[{"dataSource":"UMLS","id":"C0021270"},{"dataSource":"AOD","id":"0000005273"},{"dataSource":"CCPSS","id":"0030805"},{"dataSource":"CHV","id":"0000006675"},{"dataSource":"DXP","id":"U002089"},{"dataSource":"LCH","id":"U002421"},{"dataSource":"LCH_NW","id":"sh85066022"},{"dataSource":"LNC","id":"LA19747-7"},{"dataSource":"MDR","id":"10021731"},{"dataSource":"MSH","id":"D007223"},{"dataSource":"NCI","id":"C27956"},{"dataSource":"NCI_FDA","id":"C27956"},{"dataSource":"NCI_NICHD","id":"C27956"},{"dataSource":"SNOMEDCT_US","id":"133931009"}]},{"offset":24,"length":10,"text":"Meningitis","category":"Diagnosis","confidenceScore":1,"assertion":{"certainty":"negativePossible"},"name":"Meningitis","links":[{"dataSource":"UMLS","id":"C0025289"},{"dataSource":"AOD","id":"0000006185"},{"dataSource":"BI","id":"BI00546"},{"dataSource":"CCPSS","id":"1018016"},{"dataSource":"CCSR_10","id":"NVS001"},{"dataSource":"CHV","id":"0000007932"},{"dataSource":"COSTAR","id":"478"},{"dataSource":"CSP","id":"2042-5301"},{"dataSource":"CST","id":"MENINGITIS"},{"dataSource":"DXP","id":"U002543"},{"dataSource":"HPO","id":"HP:0001287"},{"dataSource":"ICD10","id":"G03.9"},{"dataSource":"ICD10AM","id":"G03.9"},{"dataSource":"ICD10CM","id":"G03.9"},{"dataSource":"ICD9CM","id":"322.9"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU048434"},{"dataSource":"ICPC2P","id":"N71002"},{"dataSource":"LCH","id":"U002901"},{"dataSource":"LCH_NW","id":"sh85083562"},{"dataSource":"LNC","id":"LP20756-0"},{"dataSource":"MDR","id":"10027199"},{"dataSource":"MEDCIN","id":"31192"},{"dataSource":"MEDLINEPLUS","id":"324"},{"dataSource":"MSH","id":"D008581"},{"dataSource":"NANDA-I","id":"02899"},{"dataSource":"NCI","id":"C26828"},{"dataSource":"NCI_CPTAC","id":"C26828"},{"dataSource":"NCI_CTCAE","id":"E11458"},{"dataSource":"NCI_FDA","id":"2389"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000471780"},{"dataSource":"NCI_NICHD","id":"C26828"},{"dataSource":"OMIM","id":"MTHU005994"},{"dataSource":"PSY","id":"30660"},{"dataSource":"RCD","id":"X000H"},{"dataSource":"SNM","id":"M-40000"},{"dataSource":"SNMI","id":"DA-10010"},{"dataSource":"SNOMEDCT_US","id":"7180009"},{"dataSource":"WHO","id":"0955"}]},{"offset":47,"length":5,"text":"fever","category":"SymptomOrSign","confidenceScore":1,"name":"Fever","links":[{"dataSource":"UMLS","id":"C0015967"},{"dataSource":"AIR","id":"FEVER"},{"dataSource":"AOD","id":"0000004396"},{"dataSource":"BI","id":"BI00751"},{"dataSource":"CCC","id":"K25.2"},{"dataSource":"CCPSS","id":"1017166"},{"dataSource":"CCSR_10","id":"SYM002"},{"dataSource":"CHV","id":"0000005010"},{"dataSource":"COSTAR","id":"300"},{"dataSource":"CPM","id":"65287"},{"dataSource":"CSP","id":"2871-4310"},{"dataSource":"CST","id":"FEVER"},{"dataSource":"DXP","id":"U001483"},{"dataSource":"GO","id":"GO:0001660"},{"dataSource":"HPO","id":"HP:0001945"},{"dataSource":"ICD10","id":"R50.9"},{"dataSource":"ICD10AM","id":"R50.9"},{"dataSource":"ICD10CM","id":"R50.9"},{"dataSource":"ICD9CM","id":"780.60"},{"dataSource":"ICNP","id":"10041539"},{"dataSource":"ICPC","id":"A03"},{"dataSource":"ICPC2EENG","id":"A03"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU041751"},{"dataSource":"ICPC2P","id":"A03002"},{"dataSource":"LCH","id":"U001776"},{"dataSource":"LCH_NW","id":"sh85047994"},{"dataSource":"LNC","id":"MTHU013518"},{"dataSource":"MDR","id":"10005911"},{"dataSource":"MEDCIN","id":"6005"},{"dataSource":"MEDLINEPLUS","id":"511"},{"dataSource":"MSH","id":"D005334"},{"dataSource":"MTHICD9","id":"780.60"},{"dataSource":"NANDA-I","id":"01128"},{"dataSource":"NCI","id":"C3038"},{"dataSource":"NCI_CTCAE","id":"E11102"},{"dataSource":"NCI_FDA","id":"1858"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000450108"},{"dataSource":"NCI_NICHD","id":"C3038"},{"dataSource":"NOC","id":"070307"},{"dataSource":"OMIM","id":"MTHU005439"},{"dataSource":"OMS","id":"50.03"},{"dataSource":"PCDS","id":"PRB_11020.02"},{"dataSource":"PDQ","id":"CDR0000775882"},{"dataSource":"PSY","id":"23840"},{"dataSource":"QMR","id":"Q0200115"},{"dataSource":"RCD","id":"X76EI"},{"dataSource":"SNM","id":"F-03003"},{"dataSource":"SNMI","id":"F-03003"},{"dataSource":"SNOMEDCT_US","id":"386661006"},{"dataSource":"WHO","id":"0725"}]},{"offset":60,"length":6,"text":"mother","category":"FamilyRelation","confidenceScore":0.99,"name":"Mother (person)","links":[{"dataSource":"UMLS","id":"C0026591"},{"dataSource":"AOD","id":"0000027173"},{"dataSource":"CCPSS","id":"U000286"},{"dataSource":"CHV","id":"0000008266"},{"dataSource":"CSP","id":"1124-5492"},{"dataSource":"HL7V3.0","id":"MTH"},{"dataSource":"LCH","id":"U003028"},{"dataSource":"LCH_NW","id":"sh85087526"},{"dataSource":"LNC","id":"LA10417-6"},{"dataSource":"MSH","id":"D009035"},{"dataSource":"NCI","id":"C25189"},{"dataSource":"NCI_CDISC","id":"C25189"},{"dataSource":"NCI_GDC","id":"C25189"},{"dataSource":"PSY","id":"32140"},{"dataSource":"RCD","id":"X78ym"},{"dataSource":"SNMI","id":"S-10120"},{"dataSource":"SNOMEDCT_US","id":"72705000"}]},{"offset":77,"length":10,"text":"Penicillin","category":"MedicationName","confidenceScore":0.9,"assertion":{"certainty":"neutralPossible"},"name":"penicillins","links":[{"dataSource":"UMLS","id":"C0030842"},{"dataSource":"AOD","id":"0000019206"},{"dataSource":"ATC","id":"J01C"},{"dataSource":"CCPSS","id":"0014106"},{"dataSource":"CHV","id":"0000009423"},{"dataSource":"CSP","id":"0199-8025"},{"dataSource":"GS","id":"4011"},{"dataSource":"LCH","id":"U003521"},{"dataSource":"LCH_NW","id":"sh85099402"},{"dataSource":"LNC","id":"LP14319-5"},{"dataSource":"MEDCIN","id":"40319"},{"dataSource":"MMSL","id":"d00116"},{"dataSource":"MSH","id":"D010406"},{"dataSource":"NCI","id":"C1500"},{"dataSource":"NCI_DTP","id":"NSC0402815"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000045296"},{"dataSource":"NDDF","id":"016121"},{"dataSource":"PSY","id":"37190"},{"dataSource":"RCD","id":"x009C"},{"dataSource":"SNM","id":"E-7260"},{"dataSource":"SNMI","id":"C-54000"},{"dataSource":"SNOMEDCT_US","id":"764146007"},{"dataSource":"VANDF","id":"4019880"}]},{"offset":96,"length":4,"text":"baby","category":"FamilyRelation","confidenceScore":1,"name":"Infant","links":[{"dataSource":"UMLS","id":"C0021270"},{"dataSource":"AOD","id":"0000005273"},{"dataSource":"CCPSS","id":"0030805"},{"dataSource":"CHV","id":"0000006675"},{"dataSource":"DXP","id":"U002089"},{"dataSource":"LCH","id":"U002421"},{"dataSource":"LCH_NW","id":"sh85066022"},{"dataSource":"LNC","id":"LA19747-7"},{"dataSource":"MDR","id":"10021731"},{"dataSource":"MSH","id":"D007223"},{"dataSource":"NCI","id":"C27956"},{"dataSource":"NCI_FDA","id":"C27956"},{"dataSource":"NCI_NICHD","id":"C27956"},{"dataSource":"SNOMEDCT_US","id":"133931009"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'ff2e7765-6155-4899-af57-3021904a2f33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:08:15 GMT'
]);
