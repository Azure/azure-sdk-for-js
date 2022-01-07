let nock = require('nock');

module.exports.hash = "f28d96f33a82d81aa63673cd5d92488b";

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
  '54d4de93-04fa-42b5-8de4-5f95f0092300',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap2EOAtwytBCmGbjAE6RwV8; expires=Wed, 29-Dec-2021 02:46:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrqj0UBnNn4qvCFVSbuIa16KY6pSfXpsCNl8Cxberw6yWZNihypGH2JKinDD4_aYktkCrqHYWY8nbPwWSyB8hVmTHwLJtt4K-epGiMx7_rFz3zpdlPyZPuAi65XuI6uhl6BdeyMsgTgdVcnxvHuy9FNSNQ5hILkfec2fe3-LUXcPEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 29 Nov 2021 02:46:25 GMT',
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
  'ea12fb6c-020f-492c-bf02-c8f8960f2000',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap44ga6uOL9Bu3PrtRospOk; expires=Wed, 29-Dec-2021 02:46:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrU3E1x6BHk-F_nBprfuz32ZWUyVmkU-8xrDsy9gcVYHog8BqrXrZJ3qRmWrcY2tQoS6RESukCa35WJsG0zwc-UzjgS7tUv5f63u5iGStel4FiviViVuu2Jr3tCyErs8Hjr2UQsM-akCaXoxsfrSE1TfRsb2DN8fKTYB-F2jhH5cYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 29 Nov 2021 02:46:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0c20927d-a6f5-41e8-a777-1bc5287036bc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '5c20cdd3-2e65-4999-871b-c9367a2a2300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApafUu64NttMvNVhfssj7BHzixNsAQAAAAE2NtkOAAAA; expires=Wed, 29-Dec-2021 02:46:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 29 Nov 2021 02:46:26 GMT',
  'Content-Length',
  '1701'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/devices')
  .query(true)
  .reply(200, {"value":[{"deviceId":"adu-sdk-test-device-1","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":null,"installedUpdateId":null,"onLatestUpdate":false,"deploymentStatus":"Succeeded","groupId":"testgroup","lastDeploymentId":null,"lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}},{"deviceId":"dpokluda-edgevm","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":null,"installedUpdateId":null,"onLatestUpdate":false,"deploymentStatus":"Succeeded","groupId":"dpokluda-edgevm","lastDeploymentId":null,"lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}},{"deviceId":"joseph-edgevm2","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":null,"installedUpdateId":null,"onLatestUpdate":false,"deploymentStatus":"Succeeded","groupId":"joegroup","lastDeploymentId":null,"lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}}]}, [
  'Date',
  'Mon, 29 Nov 2021 02:46:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1374',
  'traceparent',
  '00-bf8edc300cf3fa46a257adf154cbc815-2504b9ac7c9a7445-00'
]);
