let nock = require('nock');

module.exports.hash = "7912107dd789728b7425c517733f2253";

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
  'cb4cf183-d92b-466d-a0c9-5968cea39400',
  'x-ms-ests-server',
  '2.1.12158.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag9SEqoZfvhMlue3QF9x-vw; expires=Mon, 22-Nov-2021 00:43:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvWBC6QqNLCrC-LdG2brjFkDOV9vgkJu5KYOeScxLST5dCYvRtUflyZu9TWvUCi87fMn_CjxqQ_nCYqYSCd0f8P2BqT026M-HaZPJdFcWxzKh_67oADT7z_V6beLgweXZVOIEIUSFx10_jDm9ioLJLVNo7elx-HfiewsuIMmNPZIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:54 GMT',
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
  '4e12589e-050b-4fb3-8971-406925ca0500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkTX5KrwmYxNucVDSF0Co3M; expires=Mon, 22-Nov-2021 00:43:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9TFT6DK6UW4Oruffo_5lcC1Y50-t2z23imNfv6p7slok1joQuu0DyGf33L8k-VAcr8p1hXY7muZKpKywdmxDEyvHikJ_EzGf1tleWln7X7TtP7nMQNJZimyHB7cVroVCbkpJ_4oi9YsPcRtlHkWvUC69QCdvpg-Dgyu0b7rZFj4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=defbc2f5-4f5f-4af0-bb30-9948a7f8a2fb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4e12589e-050b-4fb3-8971-40692eca0500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AihpKQQMtndBvn9Z6WFVVsk; expires=Mon, 22-Nov-2021 00:43:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"A recent report by the Government Accountability Office (GAO) found that the dramatic increase in oil and natural gas development on federal lands over the past six years has stretched the staff of the BLM to a point that it has been unable to meet its environmental protection responsibilities.","language":"en"}]},"tasks":{"customEntityRecognitionTasks":[{"parameters":{"project-name":"project_name","deployment-name":"deployment_name","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/1f0acf98-2fce-4150-9a1e-65ef0ce5cb80',
  'x-envoy-upstream-service-time',
  '682',
  'apim-request-id',
  'f8b6507a-5c3a-4d10-ad2e-657028f43f8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1f0acf98-2fce-4150-9a1e-65ef0ce5cb80')
  .query(true)
  .reply(200, {"jobId":"1f0acf98-2fce-4150-9a1e-65ef0ce5cb80","lastUpdateDateTime":"2021-10-23T00:43:56Z","createdDateTime":"2021-10-23T00:43:56Z","expirationDateTime":"2021-10-24T00:43:56Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '06ab4ffd-0661-4af2-a3c7-f25cca466993',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1f0acf98-2fce-4150-9a1e-65ef0ce5cb80')
  .query(true)
  .reply(200, {"jobId":"1f0acf98-2fce-4150-9a1e-65ef0ce5cb80","lastUpdateDateTime":"2021-10-23T00:43:56Z","createdDateTime":"2021-10-23T00:43:56Z","expirationDateTime":"2021-10-24T00:43:56Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '21767947-30a8-40ce-ad5b-1c4f09188348',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1f0acf98-2fce-4150-9a1e-65ef0ce5cb80')
  .query(true)
  .reply(200, {"jobId":"1f0acf98-2fce-4150-9a1e-65ef0ce5cb80","lastUpdateDateTime":"2021-10-23T00:43:57Z","createdDateTime":"2021-10-23T00:43:56Z","expirationDateTime":"2021-10-24T00:43:56Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customEntityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:43:57.7714953Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"98-0987","category":"timeRange","offset":4,"length":7,"confidenceScore":0.55},{"text":"$100","category":"timeRange","offset":27,"length":4,"confidenceScore":0.15},{"text":"John owes","category":"artist","offset":12,"length":9,"confidenceScore":0.18},{"text":"Mike","category":"artist","offset":22,"length":4,"confidenceScore":0.35}],"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '138c44f5-ca61-4e5f-881c-c78778a479a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1f0acf98-2fce-4150-9a1e-65ef0ce5cb80')
  .query(true)
  .reply(200, {"jobId":"1f0acf98-2fce-4150-9a1e-65ef0ce5cb80","lastUpdateDateTime":"2021-10-23T00:43:57Z","createdDateTime":"2021-10-23T00:43:56Z","expirationDateTime":"2021-10-24T00:43:56Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customEntityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:43:57.7714953Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"98-0987","category":"timeRange","offset":4,"length":7,"confidenceScore":0.55},{"text":"$100","category":"timeRange","offset":27,"length":4,"confidenceScore":0.15},{"text":"John owes","category":"artist","offset":12,"length":9,"confidenceScore":0.18},{"text":"Mike","category":"artist","offset":22,"length":4,"confidenceScore":0.35}],"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '43a38144-a8b6-4f8c-b194-c1ad19d3ede0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:58 GMT'
]);
