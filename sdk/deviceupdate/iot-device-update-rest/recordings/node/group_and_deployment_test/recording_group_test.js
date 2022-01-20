let nock = require('nock');

module.exports.hash = "de2fa1643a7fd3535be3fadb71a81eac";

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
  'df399e25-aea6-4e98-a5fd-c341ebca0000',
  'x-ms-ests-server',
  '2.1.12381.18 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsDTpYNDHe5Ohd5mw2WlY_0; expires=Sat, 19-Feb-2022 05:37:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9xA24JnFDoiOGu5rXzOjCvmPgfohKPQeS994zJUaIEokgVXVlNqHQRSiVaA7Fo6dZEMnEekpFXaP3IdffoZAJWJ3ytXOVAjpBd7rCL4JEYltJHchQ-KbFlQ7up-vRlaP2eaWanaz76oao1JEkmUtr8dthx61ZnRIPSqH9-NDNeQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 05:37:03 GMT',
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
  '672166d4-67f5-49e7-9581-a368262b0100',
  'x-ms-ests-server',
  '2.1.12381.18 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhPXT7GMH0ZKoThtcwWgU7o; expires=Sat, 19-Feb-2022 05:37:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrC7jpZHSNnpNBBMK2PoP8yZiggy6QTUilYQYhvh-K6jrGeKBR8aeAla33NxxtXQbf-miIb3sGpRcSyQuwhlYtV8mfxiUvFtnbSZ09u_qmx52bzQp9RkgvklYqfOKSqAOP-3x-z0KxePxZJoQ6W7-QmUleePExr03KrR5LylMLHxEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 05:37:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=16eebf93-7ebb-4f9a-aa1d-2a2998bb485c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '14e85fe1-341a-4cdf-9dc8-12a73bff0100',
  'x-ms-ests-server',
  '2.1.12381.18 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApKh4LOMcrNMo1Le5i6WxjjzixNsAQAAAADsetkOAAAA; expires=Sat, 19-Feb-2022 05:37:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 05:37:03 GMT',
  'Content-Length',
  '1701'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/groups')
  .query(true)
  .reply(200, {"value":[{"deploymentId":"test20211117112017","groupId":"testgroup","tags":["testgroup"],"createdDateTime":"2021-11-16T00:49:25.141+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"},{"deploymentId":"test1118014304","groupId":"dpokluda-edgevm","tags":["dpokluda-edgevm"],"createdDateTime":"2021-11-17T22:57:28.78+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":0,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"},{"deploymentId":"dpokluda-test-2022-113-1741-7-0114014318","groupId":"dpokluda-test","tags":["dpokluda-test"],"createdDateTime":"2022-01-12T01:10:50.868+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"}]}, [
  'Date',
  'Thu, 20 Jan 2022 05:37:06 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1076',
  'traceparent',
  '00-f2a3a758db27c140acad0f8749c3e2b7-7f409fc37cc46144-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/deviceupdate/sdkinstance/management/groups/joegroup', {"groupId":"joegroup","tags":["joegroup"],"createdDateTime":"2021-11-17T16:29:56.5770502+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"})
  .query(true)
  .reply(200, {"groupId":"joegroup","tags":["joegroup"],"createdDateTime":"2021-11-17T16:29:56.5770502+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"}, [
  'Date',
  'Thu, 20 Jan 2022 05:37:06 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '253',
  'traceparent',
  '00-d462ab9f7d4a784986afd1059a0c08df-e6b6c8a14455414a-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/groups/joegroup')
  .query(true)
  .reply(200, {"groupId":"joegroup","tags":["joegroup"],"createdDateTime":"2021-11-17T16:29:56.5770502+00:00","groupType":"DeviceClassIdAndIoTHubTag","deviceCount":1,"deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1"}, [
  'Date',
  'Thu, 20 Jan 2022 05:37:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '253',
  'traceparent',
  '00-a7dea86eca119f469f14494ba7576b2c-c4cd68b104a5d14e-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/deviceupdate/sdkinstance/management/groups/joegroup/deployments/testdeployment1', {"deploymentId":"testdeployment1","startDateTime":"2021-09-02T16:29:56.5770502Z","groupId":"joegroup","updateId":{"provider":"fabrikam","name":"vacuum","version":"2022.113.1741.7"}})
  .query(true)
  .reply(200, {"deploymentId":"testdeployment1","startDateTime":"2021-09-02T16:29:56.5770502+00:00","updateId":{"provider":"fabrikam","name":"vacuum","version":"2022.113.1741.7"},"isCanceled":false,"isRetry":false,"groupId":"joegroup"}, [
  'Date',
  'Thu, 20 Jan 2022 05:37:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '278',
  'traceparent',
  '00-5837b917230b1d4ca971048d817dfb40-5b703b431e7af94a-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/groups/joegroup/deployments/testdeployment1')
  .query(true)
  .reply(200, {"deploymentId":"testdeployment1","startDateTime":"2021-09-02T16:29:56.5770502+00:00","updateId":{"provider":"fabrikam","name":"vacuum","version":"2022.113.1741.7"},"isCanceled":false,"isRetry":false,"groupId":"joegroup"}, [
  'Date',
  'Thu, 20 Jan 2022 05:37:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '278',
  'traceparent',
  '00-e3e0e645b49adc478d21d8365b99ea1e-9f2879e64963b645-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/deviceupdate/sdkinstance/management/groups/joegroup/deployments/testdeployment1')
  .query(true)
  .reply(204, "", [
  'Date',
  'Thu, 20 Jan 2022 05:37:08 GMT',
  'traceparent',
  '00-ede35fc742fdc745ade35da395b58033-7d63bb695cc5f944-00'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/deviceupdate/sdkinstance/management/groups/joegroup')
  .query(true)
  .reply(204, "", [
  'Date',
  'Thu, 20 Jan 2022 05:37:08 GMT',
  'traceparent',
  '00-f2f9354e0531aa4d8ec59cd3bda8fd23-6c7ae76162be1e4b-00'
]);
