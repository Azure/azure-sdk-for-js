let nock = require('nock');

module.exports.hash = "20e51d103d3129d724daa3fee868df01";

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
  '5c2bdc1b-622e-4dcc-aa5d-622d7d1f5b00',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah9jqCfHw7RFlcyttXTGVzc; expires=Mon, 22-Nov-2021 00:43:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7O9ai489NZJekXFhJ4G8Rq3vEt36dEoj5zIO60HLhsMaZBZN3DsmPY_JRIVfJmbzxtLCqTATXVHmTQNrZE-jgccazZcvrvbeQ1KPFxdJx1lHLVFlt270df5_LKV3ePPOlh2irhvs7jni0lEWgCsFAU1b8f6z7_d3IdK8CUn21msgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:58 GMT',
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
  '8f0cf73f-2000-44a4-89ce-f29bd5000d00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aq-sa3nrFu9Es_7RGePp470; expires=Mon, 22-Nov-2021 00:43:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGYrmrUZAsMzC4TExCOfa-HpLgL0JohU2LZaN9sOlax9r8nPGcOsvbMqagyqEvLaKZItbjEXCLvlxYgYwdJHoDPhDCNqQ69eiTixZC9xmKVVd3hnI5Edi4mif6Ss0rRFJwCooJ0mFvfEaHO-LznxUjeMmzUKSBYyvGC__hUjjXVYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:58 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=564d7a7b-d6ec-48d7-b1b2-cf1ca25ecd79&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2d5d79f2-2c33-4a96-b75c-c15bce8e0500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqRc0Zu02h5Noq0PCKLSXcU; expires=Mon, 22-Nov-2021 00:43:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:58 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"A recent report by the Government Accountability Office (GAO) found that the dramatic increase in oil and natural gas development on federal lands over the past six years has stretched the staff of the BLM to a point that it has been unable to meet its environmental protection responsibilities.","language":"en"}]},"tasks":{"customSingleClassificationTasks":[{"parameters":{"project-name":"project_name","deployment-name":"deployment_name"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c',
  'x-envoy-upstream-service-time',
  '597',
  'apim-request-id',
  'b18e0b76-3299-45e4-96a0-71c7ed996084',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c')
  .query(true)
  .reply(200, {"jobId":"56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c","lastUpdateDateTime":"2021-10-23T00:43:59Z","createdDateTime":"2021-10-23T00:43:59Z","expirationDateTime":"2021-10-24T00:43:59Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '53e3e299-8af2-44ea-b078-afa064ef0525',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c')
  .query(true)
  .reply(200, {"jobId":"56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c","lastUpdateDateTime":"2021-10-23T00:43:59Z","createdDateTime":"2021-10-23T00:43:59Z","expirationDateTime":"2021-10-24T00:43:59Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '5d4166bb-06d8-4bde-a3cf-dd678d98c28d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c')
  .query(true)
  .reply(200, {"jobId":"56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c","lastUpdateDateTime":"2021-10-23T00:44:01Z","createdDateTime":"2021-10-23T00:43:59Z","expirationDateTime":"2021-10-24T00:43:59Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customSingleClassificationTasks":[{"lastUpdateDateTime":"2021-10-23T00:44:01.1040391Z","state":"succeeded","results":{"documents":[{"id":"1","classification":{"category":"RateBook","confidenceScore":0.76},"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'ed79dd9d-66a5-4735-8e0c-112efc67cedb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c')
  .query(true)
  .reply(200, {"jobId":"56c2c115-3fd6-4bb0-8a7d-cbbe21526d8c","lastUpdateDateTime":"2021-10-23T00:44:01Z","createdDateTime":"2021-10-23T00:43:59Z","expirationDateTime":"2021-10-24T00:43:59Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customSingleClassificationTasks":[{"lastUpdateDateTime":"2021-10-23T00:44:01.1040391Z","state":"succeeded","results":{"documents":[{"id":"1","classification":{"category":"RateBook","confidenceScore":0.76},"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '6639b42a-f905-4b14-bc7d-82837bcbf50f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:02 GMT'
]);
