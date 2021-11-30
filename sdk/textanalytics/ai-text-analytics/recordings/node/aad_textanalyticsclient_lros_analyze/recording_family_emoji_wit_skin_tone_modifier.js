let nock = require('nock');

module.exports.hash = "586a571f3405fc4a91192c8057f26eba";

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
  'cbb9eb5b-8328-4a0b-b8b9-195d975dd900',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkUry271SxpLnt_Wo3dhj78; expires=Mon, 22-Nov-2021 00:48:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdJxkwfrYg6qWANPrpg7ZSPzM3zSchRQcHqtZifkyLF1NP1oYvBWXe6ejO_TcsIWUZk-aXy3qBSwWRia--rps-9Uw3G5cEeizH3f1zu52R-jdM2xghjU11OMJuZ5S-_F6kpo2m-67Fg_G0fGPPA-RLncwLeJjRcBjdrPR93xchqcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:48:21 GMT',
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
  'dd2e89b6-166f-4ea2-997a-95886f430300',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApaZfLg9gbVLpRHEM_S3VFs; expires=Mon, 22-Nov-2021 00:48:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr91c1DpT3g9osuBHqrxWUWZECt4dNQlaeS-cP4WfgW_hUfSo_S0odtQV-ewrcCX5zwLsYqQ2-lX1VUak0fi0gdVbThp4z_Tug2wr82W5bhJ-grJbTVsLts-6SZ_TmWdlEq17Yl2mMA5acENBgO50IkMGVrYEhs9ODwRblgGh6h3sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:48:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=90e93548-6cdc-4264-ba6e-41833d07e890&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4e12589e-050b-4fb3-8971-406961eb0500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArnOVsRyQSZNihoUDO8JKBY; expires=Mon, 22-Nov-2021 00:48:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:48:22 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  'b6016de1-8d69-477b-a214-c4f6461d8644',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:23Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a7393981-ffb4-45c3-b394-fd925ae381c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:23Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c925b5e4-69fe-45b2-9bc5-8dadc9ebdda6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:23Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '2558dedb-3146-411e-b55b-6cf6590b63c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:23Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '322aeed3-f3b1-4c69-8a4d-1c61ed110d31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:23Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '40ff3a14-49f5-4ed0-972a-3a6b6b1a7b18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:30Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:48:30.981834Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '82b83307-a6a5-415a-ba4f-203cb1071574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/10839397-309a-4a25-85c4-d28835c66a9e')
  .query(true)
  .reply(200, {"jobId":"10839397-309a-4a25-85c4-d28835c66a9e","lastUpdateDateTime":"2021-10-23T00:48:30Z","createdDateTime":"2021-10-23T00:48:23Z","expirationDateTime":"2021-10-24T00:48:23Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:48:30.981834Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '6b8e0571-6019-464e-965a-fa565c932f90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:48:30 GMT'
]);
