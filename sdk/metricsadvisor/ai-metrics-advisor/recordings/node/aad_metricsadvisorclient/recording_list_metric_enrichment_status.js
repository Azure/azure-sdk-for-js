let nock = require('nock');

module.exports.hash = "92bdc8e19bdff2277f6381e834b9c75b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'aa2bf00f-2896-4db7-ad78-344d13201400',
  'x-ms-ests-server',
  '2.1.12261.22 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlXF6gq4DGRGkTHWv-egyjo; expires=Sat, 19-Feb-2022 00:58:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCmO_aHsUsPM4wwH55wxvBoHksX4QxBZovV6ODgA5LzeUMR5v5-e7lNfyZhAQBjbpHL0ylK6hxRFitixbU443mtuab6u2ORzaHCxXS5ZiGPC54ODYqNfe5KZGH8hlJPXLF8JxYpOAwShRXftlMcg3wXwRTYwe58Owr_ms1jkHJkogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:35 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '8e7c26df-e68a-428c-9d48-fe2976eaf800',
  'x-ms-ests-server',
  '2.1.12261.22 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjPtzTrGUc1BsVpuq984MT8; expires=Sat, 19-Feb-2022 00:58:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQLlvwiB60ZnnT3a5dlq550N57wUFhPl9Va-PafuH-Wbo6PGRkkf6QF6yvN4FqIDIvC4UtWdgiY2OE9P42uyvCWITmBk7U0EJWIUkIL5SfHMHEyc4xQRKq32lmnXIEXo7ZXt4wpXnqBvVTQQCYsA9HMmST8TcngBX-wMCSu7WlJIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a023ecc9-8b21-4925-9bf8-c331a66e419e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1feb59fa-23a7-4857-a192-4319d49edb00',
  'x-ms-ests-server',
  '2.1.12261.22 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtmDMH29MkpKvKEhdXAycOc; expires=Sat, 19-Feb-2022 00:58:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:35 GMT',
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
  'a1e247a0-6506-490c-a159-6e6d027c0123',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'a1e247a0-6506-490c-a159-6e6d027c0123',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:35 GMT'
]);
