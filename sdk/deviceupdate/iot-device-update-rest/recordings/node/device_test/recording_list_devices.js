let nock = require('nock');

module.exports.hash = "bf51cf1649157b9e74d607d846e4a591";

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
  '1f2df8b9-c018-4027-a8cf-837bdaf20000',
  'x-ms-ests-server',
  '2.1.12381.18 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuoP_QOFoklLtQ9zSGZfyeI; expires=Sat, 19-Feb-2022 05:37:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxbSsyAtXkD0BOhUZG7g-ls5Y6pqgIbMfbFf1Xn72jWt8A-IcGreaTwPKgrN9w4WFYqf-kA-Ts1sQfHpfGMuWVjEs4ZwkihxBdSycus4iLDv8KZUc3I60drK44ukXVHloUo6NKPsaVJWBa3R6-uMMtyL3IQtfIIQF7l3ddt2GNwYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 05:36:59 GMT',
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
  '7956be68-d9f2-43c8-8066-4ff1b6dd0000',
  'x-ms-ests-server',
  '2.1.12381.18 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqlCW07Gq6ZIt67cjAfRtIk; expires=Sat, 19-Feb-2022 05:37:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8-gY9dU1zKGD5pNBf3vjijU7WUpJtEp75JRtYRkicjNjVdd1gar2kmgZyrCGVrufUJwBLH8c0gZU2MSDZZSOrv5pmOIqoTJ1jjYAjQPfpdbA4ZgzDdtrwhhVuVjNbZQdlBlSWqmR85kPlxr9bxyFbZY2FjgczZXGTsQo0MpcX88gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 05:36:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=11f25e6a-a9ce-49af-af06-ac81b24e370c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1f2df8b9-c018-4027-a8cf-837be1f20000',
  'x-ms-ests-server',
  '2.1.12381.18 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtEmtrL26X1HqOSVa-tJ7A_zixNsAQAAAPzretkOAAAA; expires=Sat, 19-Feb-2022 05:37:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 05:37:00 GMT',
  'Content-Length',
  '1701'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/devices')
  .query(true)
  .reply(200, {"value":[{"deviceId":"adu-sdk-test-device-1","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":null,"installedUpdateId":null,"onLatestUpdate":false,"deploymentStatus":"Succeeded","groupId":"testgroup","lastDeploymentId":null,"lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}},{"deviceId":"joseph-edgevm2","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":{"provider":"fabrikam","name":"vacuum","version":"2022.106.1154.40"},"installedUpdateId":{"provider":"fabrikam","name":"vacuum","version":"2022.106.1154.40"},"onLatestUpdate":false,"deploymentStatus":"Succeeded","groupId":"joegroup","lastDeploymentId":"joegroup-2022-106-1154-40-0106075652","lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}},{"deviceId":"dpokluda-test","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":{"provider":"fabrikam","name":"vacuum","version":"2022.113.1702.54"},"installedUpdateId":{"provider":"fabrikam","name":"vacuum","version":"2022.113.1741.7"},"onLatestUpdate":true,"deploymentStatus":"Succeeded","groupId":"dpokluda-test","lastDeploymentId":"dpokluda-test-2022-113-1702-54-0114010507","lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}}]}, [
  'Date',
  'Thu, 20 Jan 2022 05:37:02 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1697',
  'traceparent',
  '00-7f71ef9267348f439ddea7e3c9fc3d8f-645f57cc01fb094f-00'
]);
