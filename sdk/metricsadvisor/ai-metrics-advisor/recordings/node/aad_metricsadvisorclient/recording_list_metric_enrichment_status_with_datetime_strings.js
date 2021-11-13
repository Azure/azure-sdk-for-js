let nock = require('nock');

module.exports.hash = "a4ec064bf670af11de93034cf27c3a77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '12381711-be11-4c99-af0b-31247a1b6700',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkR2632PpDdEpOYhGGdYIxk; expires=Sun, 12-Dec-2021 00:57:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreYI2HTavNGflEEEZULLUhdhARxBZot_6xcWIW_3EwPfJto4dEfVqHfKJjq60nnYgpMU7wkGaykNvGrYGqvvw3cMyMM3jakQGjygwLMaZH9_KjDJkktImb8CCpIaScEk9Pit6bieZmPIZ1CCX3xN41l6cBmyb1KV7oocVHOkgqgAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/72698866-8641-4147-9144-24744011447/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/72698866-8641-4147-9144-24744011447/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'f76e4043-03d1-4290-bd16-a55a7b7a6a00',
  'x-ms-ests-server',
  '2.1.12231.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhuEcZff1sVBuVnWomHGBjo; expires=Sun, 12-Dec-2021 00:57:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwTadVHaw7vnlOawLy23dj5-evKQl7fvwiuKe9RtoOfiF-zuEkyNg5P3w4UGCJqIb6436T0Ab65AFlMBgw_tQPWk8SuipgzcTPtmZhiFCmhOftguIAm_PuFLaWwUGQh6lXrNZiXGSXhWynGFpfSvM4hEtMryVUWXbcbxHlRejlKwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=da57d065-5c39-4262-b950-fdfc1358c2db&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a488f365-9b09-458a-b3ec-51afa3766900',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Arc9BvQ9It9HhGtHAZk1QvfGLH8mAQAAAPqyH9kOAAAA; expires=Sun, 12-Dec-2021 00:57:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2021-01-01T00:00:00.000Z","endTime":"2021-09-18T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2021-08-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-17T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-19T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-13T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-15T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-16T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-18T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-20T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-21T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-22T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-23T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-24T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-25T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-29T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-26T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-27T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-28T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-30T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:38.043Z\",\"CreateTime\":\"2021-09-07T23:50:38.043Z\"}"},{"timestamp":"2021-08-31T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:38.043Z\",\"CreateTime\":\"2021-09-07T23:50:38.043Z\"}"},{"timestamp":"2021-09-01T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:38.043Z\",\"CreateTime\":\"2021-09-07T23:50:38.043Z\"}"},{"timestamp":"2021-09-02T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:58.044Z\",\"CreateTime\":\"2021-09-07T23:50:58.044Z\"}"},{"timestamp":"2021-09-03T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:58.044Z\",\"CreateTime\":\"2021-09-07T23:50:58.044Z\"}"},{"timestamp":"2021-09-04T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:51:38.047Z\",\"UpdateTime\":\"2021-09-07T23:51:38.047Z\"}"},{"timestamp":"2021-09-05T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:51:38.047Z\",\"UpdateTime\":\"2021-09-07T23:51:38.047Z\"}"},{"timestamp":"2021-09-06T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:51:38.047Z\",\"UpdateTime\":\"2021-09-07T23:51:38.047Z\"}"},{"timestamp":"2021-09-07T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-08T00:09:21.194Z\",\"UpdateTime\":\"2021-09-08T00:09:21.194Z\"}"},{"timestamp":"2021-09-08T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-09T00:04:14.700Z\",\"UpdateTime\":\"2021-09-09T00:04:14.700Z\"}"},{"timestamp":"2021-09-09T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-10T00:03:55.244Z\",\"UpdateTime\":\"2021-09-10T00:03:55.244Z\"}"},{"timestamp":"2021-09-10T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-11T00:32:38.587Z\",\"UpdateTime\":\"2021-09-11T00:32:38.587Z\"}"},{"timestamp":"2021-09-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-12T00:32:36.822Z\",\"UpdateTime\":\"2021-09-12T00:32:36.822Z\"}"},{"timestamp":"2021-09-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-13T03:35:38.036Z\",\"UpdateTime\":\"2021-09-13T03:35:38.036Z\"}"},{"timestamp":"2021-09-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-15T00:04:33.596Z\",\"UpdateTime\":\"2021-09-15T00:04:33.596Z\"}"},{"timestamp":"2021-09-15T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-16T04:36:39.931Z\",\"UpdateTime\":\"2021-09-16T04:36:39.931Z\"}"},{"timestamp":"2021-09-16T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-17T00:05:03.602Z\",\"UpdateTime\":\"2021-09-17T00:05:03.602Z\"}"}],"@nextLink":null}, [
  'Content-Length',
  '5788',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f2ea8885-789a-46b7-a6d5-55e9d11c3f67',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'f2ea8885-789a-46b7-a6d5-55e9d11c3f67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 12 Nov 2021 00:57:30 GMT',
  'Connection',
  'close'
]);
