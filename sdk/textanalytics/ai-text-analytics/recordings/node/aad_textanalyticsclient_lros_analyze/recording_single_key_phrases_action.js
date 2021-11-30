let nock = require('nock');

module.exports.hash = "61c6632849c9566300af4ee3c143eac6";

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
  'c6b8a727-829d-4772-91b0-01cfa8650400',
  'x-ms-ests-server',
  '2.1.12171.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Armn_27uZgBBid1aNlVQ7_4; expires=Mon, 22-Nov-2021 00:44:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8PrJQ7LukMRm3Ry6dDTdgOVw73BA00KDgSfgKANOOElZHKmZlcxPM6HTA50gnavxBZ6YO8qSjyms-ZfCkBc4fw9KQu_nLjqQV8Iex3GYffTvG8baLq4gn2eJ0Z10q1euikMJ7hLUTfdV7L9M8YTxurQUtt2arU-cElJW9v3vh9IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:44:27 GMT',
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
  'c64caa61-3fcc-4dcd-8dea-7ea192500c00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Auf1aIPMRiVIu06QqPaS_xs; expires=Mon, 22-Nov-2021 00:44:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqEBmJmWq7yDiTwI9Wz-R3FomHOxm_ttEA9gjdghJCQw376MHNQEsTB0y4b8vCMjmkClFy7dn1QAgBTf9ThZr-0ERh12191ctGbo6pGR_pMVCf-3Hxgh48Dz2iO5Qmf3--vPnlzIrvkDQIuA6K2FgN5ThEoNNAjw9mqNz7sgl8LYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:44:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4208bf23-c365-4e58-af58-f5e49f850cac&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '09364d5f-a8b6-4b54-821f-993e4e020d00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aj4mv5gAfoRFsTbeqNN8HmU; expires=Mon, 22-Nov-2021 00:44:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:44:28 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'ffe6eadd-b0c6-4af1-be06-1e2d99db0196',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:28Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ce8fbb48-e6c1-4fa7-805c-dd6d692dd405',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:28Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8fe1f880-33c3-4f65-bedd-3d5b7cadc70e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ee11e60a-2f68-4d07-a0f5-8d85d451148b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7ced19ca-08b3-4f56-9c03-207be06282fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd67d3a46-89d4-4c40-abf9-c97a1a6a67a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'dc57fff1-5676-40be-bd9a-38084ad5793f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'cf86467b-7ca5-4e2d-8f45-6f645db737f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '809bdbcb-eddd-4398-97f9-f39a317613e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9e46691b-146f-40c2-afac-bee53c147d67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:29Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'de9f0e11-debb-4247-a2dc-0ba19a5eb204',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:46Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:44:46.551289Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'c6d3e375-5234-4438-9c49-ee01b54b7b6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/82520780-a4f6-4b51-8875-134767ec15ab')
  .query(true)
  .reply(200, {"jobId":"82520780-a4f6-4b51-8875-134767ec15ab","lastUpdateDateTime":"2021-10-23T00:44:46Z","createdDateTime":"2021-10-23T00:44:28Z","expirationDateTime":"2021-10-24T00:44:28Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:44:46.551289Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'ea9fc193-c4b0-43a2-8305-a18c13f3f0e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:47 GMT'
]);
