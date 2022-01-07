let nock = require('nock');

module.exports.hash = "3006aff38e96008fd8e6562190d7b0b1";

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
  '93ef7e08-1935-4d62-bd81-4c4977343700',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Amio4RiOP7hGjf36WhY-elc; expires=Wed, 29-Dec-2021 02:46:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevruy0SMwOCcDKfjAm34as78hnuml0JlR0rO75tE_ccWduOnFttPyB78Oj9TsMjncBcBDkiKWLmbeQ1Y_N9UNEEMfXtmaQz18V6S6J0yxqBxVfhn3MEqi-JElZbCJ23QkNbyqkkZs_dHUnR3WkzR5j3N7RjSgbnYK4E86NFOtGY20IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 29 Nov 2021 02:46:28 GMT',
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
  '93ef7e08-1935-4d62-bd81-4c4978343700',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj4Ug1G2KtBKs86NLZv2S6s; expires=Wed, 29-Dec-2021 02:46:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre9vXUexmP7SpJ732ipWoNGMqyBvJGkJ2qResEHEESOsucaXXTx48QeB7gpiYb2O778ty32L_ILCkoeCDs6vIGPVExp47yYDso758roDJKq-5jc1pliAPbgzCz_hi4E2OQTt47Kh4ChWzDSrfC-uZEQzBjVaYo1QJlppldaf9ta0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 29 Nov 2021 02:46:29 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fcb66a17-4c55-4af8-bd0f-d4735299b2b6&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7f6f33c0-2e74-490e-8f6c-dc650ed43900',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjczoXkrzCJBsmL3UytN8ZfzixNsAQAAAAQ2NtkOAAAA; expires=Wed, 29-Dec-2021 02:46:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 29 Nov 2021 02:46:29 GMT',
  'Content-Length',
  '1701'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/groups')
  .query(true)
  .reply(200, {"value":[{"deploymentId":"test20211117112017","groupId":"testgroup","tags":["testgroup"],"createdDateTime":"2021-11-16T00:49:25.141+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":2,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"},{"groupId":"Invalidtestgroup","tags":["testgroup"],"createdDateTime":"2021-11-16T00:49:25.141+00:00","groupType":"InvalidDeviceClassIdAndIoTHubTag","deviceCount":0,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"},{"deploymentId":"test1118014304","groupId":"dpokluda-edgevm","tags":["dpokluda-edgevm"],"createdDateTime":"2021-11-17T22:57:28.78+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"},{"groupId":"Invaliddpokluda-edgevm","tags":["dpokluda-edgevm"],"createdDateTime":"2021-11-17T22:57:28.78+00:00","groupType":"InvalidDeviceClassIdAndIoTHubTag","deviceCount":0,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"}]}, [
  'Date',
  'Mon, 29 Nov 2021 02:46:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1334',
  'traceparent',
  '00-e04fd12a49a22949bdbbe255dcaa6326-6ba3cf6a77b1e545-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/deviceupdate/sdkinstance/management/groups/joegroup', {"groupId":"joegroup","tags":["joegroup"],"createdDateTime":"2021-11-17T16:29:56.5770502+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"})
  .query(true)
  .reply(200, {"groupId":"joegroup","tags":["joegroup"],"createdDateTime":"2021-11-17T16:29:56.5770502+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"}, [
  'Date',
  'Mon, 29 Nov 2021 02:46:29 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '253',
  'traceparent',
  '00-37da8367f8541f4abcc87de17839c177-b7d515862a742348-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/groups/joegroup')
  .query(true)
  .reply(200, {"groupId":"joegroup","tags":["joegroup"],"createdDateTime":"2021-11-17T16:29:56.5770502+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"}, [
  'Date',
  'Mon, 29 Nov 2021 02:46:29 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '253',
  'traceparent',
  '00-1337056fad4dd146ba596e8813411ae2-14809e9f27707741-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/deviceupdate/sdkinstance/management/groups/joegroup/deployments/testdeployment1', {"deploymentId":"testdeployment1","startDateTime":"2021-09-02T16:29:56.5770502Z","groupId":"joegroup","updateId":{"provider":"fabrikam","name":"vacuum","version":" 2021.1117.1036.48"}})
  .query(true)
  .reply(200, {"deploymentId":"testdeployment1","startDateTime":"2021-09-02T16:29:56.5770502+00:00","updateId":{"provider":"fabrikam","name":"vacuum","version":"2021.1117.1036.48"},"isCanceled":false,"isRetry":false,"groupId":"joegroup"}, [
  'Date',
  'Mon, 29 Nov 2021 02:46:30 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '280',
  'traceparent',
  '00-fa0bf090d758a44389eb8b44b8d02f45-07d33db3c3322f4f-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/groups/joegroup/deployments/testdeployment1')
  .query(true)
  .reply(200, {"deploymentId":"testdeployment1","startDateTime":"2021-09-02T16:29:56.5770502+00:00","updateId":{"provider":"fabrikam","name":"vacuum","version":"2021.1117.1036.48"},"isCanceled":false,"isRetry":false,"groupId":"joegroup"}, [
  'Date',
  'Mon, 29 Nov 2021 02:46:30 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '280',
  'traceparent',
  '00-297d89400066434291f04a09c25082e3-241e96588815084f-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/deviceupdate/sdkinstance/management/groups/joegroup/deployments/testdeployment1')
  .query(true)
  .reply(204, "", [
  'Date',
  'Mon, 29 Nov 2021 02:46:30 GMT',
  'traceparent',
  '00-482ac3a3c5fc644ea760a06df7f21ad9-9b8939af292d0348-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/deviceupdate/sdkinstance/management/groups/joegroup')
  .query(true)
  .reply(204, "", [
  'Date',
  'Mon, 29 Nov 2021 02:46:31 GMT',
  'traceparent',
  '00-94f1f1a5dde78b47a2b158ad85c11a7d-383a3049e688984e-00'
]);
