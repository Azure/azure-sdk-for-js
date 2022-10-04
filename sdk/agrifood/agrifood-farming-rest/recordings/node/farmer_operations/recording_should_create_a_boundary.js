let nock = require('nock');

module.exports.hash = "4890ffd8acc8dcbe145ca1f8a90c6011";

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
  '6a9f17a2-b24f-4cd9-9cd0-6c4f2c010500',
  'x-ms-ests-server',
  '2.1.13734.8 - KRSLR1 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-XOtF8WPN6tVd0b7pYsCeEA' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjZJDWkVZBhFmWZoCEhaJ70; expires=Sat, 15-Oct-2022 12:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5cxWqrFYrC0mJ6d247Ux8M9Iqvu01Dpy_Hzd5w9uplA5RJLXjsjPLAgfDp7htyzDX4LAicWJq0u8i7ChCnYjIFYYzQN1oAN_0ocr9AhFBixhvcZhRBNsJqkJybsr_cgagmBwVfFHawvEljNc4cOtZOPnHErZ4IQr4_ziY057c8IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 15 Sep 2022 12:35:56 GMT',
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
  '1a44df23-57a4-4bc5-ae04-a7c113ab1400',
  'x-ms-ests-server',
  '2.1.13734.8 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aug--vKyXzxHpDbL1vS5Jmo; expires=Sat, 15-Oct-2022 12:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRLLo1I_nL46sEZwE9BepAju9UImvKCxJMXIiYfUSZYz-hAKrgoFr2GK5Yp8kC_jMGNUM2UFjyBBPPB4TaHZlNiqW95fgKHY2Yv9ZVb0uKo6sU65io_kLGhhT2HDiUyAnQR7uG7q1qQPrsA225-PfWfbSZ6kMNqYoYIdjgo3xYBUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 15 Sep 2022 12:35:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.13.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6dd95460-7be3-4665-a463-2a9664f1eb44&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6a9f17a2-b24f-4cd9-9cd0-6c4f2e010500',
  'x-ms-ests-server',
  '2.1.13734.8 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-WpWTwQHzveTOzznVU01TYw' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmSlhtvDp0JBkmfeFEM7KtQU3PbiAQAAACwTtdoOAAAA; expires=Sat, 15-Oct-2022 12:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 15 Sep 2022 12:35:56 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/tst103node/boundaries/jhboundary103node', {"geometry":{"coordinates":[[[-6.6730517,43.5298824],[-6.676265,43.5262614],[-6.6757983,43.5260669],[-6.6760236,43.5254835],[-6.6768819,43.5245228],[-6.6760075,43.5243322],[-6.6753209,43.5252112],[-6.6744518,43.5247095],[-6.6730678,43.525114],[-6.6723222,43.5256702],[-6.6739959,43.5264753],[-6.6726387,43.5274282],[-6.6712493,43.5279261],[-6.6703159,43.5280428],[-6.6693288,43.5277394],[-6.6692644,43.52807],[-6.6694576,43.5282256],[-6.671319,43.5294274],[-6.6717964,43.5296024],[-6.6730303,43.5298824],[-6.6730517,43.5298824]]],"type":"Polygon"},"description":"Created by SDK"})
  .query(true)
  .reply(200, ["1f8b08000000000004036c92418f9b301085ffcaca6788c633f68ccdb57ba97a59a93935ca810d26a55ac20ae8215aed7faf2d8ca3aa0509998f37cfc3f87da86b98c6b0ce77d57ca8f5fe1e54a35ea6b7fb75baa94a5da669ee865bbb864535a7d3a9e6030b81d552193a58f4cea139571b6764bbe1b8d2055bf18e3207665fe480c41bb7c6912ddc39ed376e2ca22b1c40b2bf2142dcb92584acb7a875e1c658edb28f802ffe042c995bfd6813a325e67658a0d890f736dbb3114bfbb6c8e4f214c4a02b7a8dc6e7df151fe7b0eb81f4eee3201664ce9ed0e57644c8ef63e3586bccd68f03296a63250fcd215adedd35ed33f3066537112d9eb38967781c1541bc37f3bf8ef09fa33d9f3f2bd5b7f318e6af5d8cc6baac1ae8367521a663585ee6616c5376faf66d09956a2f7368af3143640ec82e4a52d1af9fafd3ef5b17858fda706caff113c4cb7424755ad4c0e991564cbaf77d8be925e530daaea17b8e8fe330a68c2220d6e06b8d47d40d5083f4230ac7a91bfae1ff4a7bd4d8906dac24651796cb3cbcaf430c7aa3be6c1b3cbdde9fbe3f7f539f7f000000ffff","0300ff1fd15b18030000"], [
  'Date',
  'Thu, 15 Sep 2022 12:35:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'a572af87c8ae97c9f0a06c390af1af8f',
  'mise-correlation-id',
  '81be6004-f8ab-45b8-bc9a-d3ef31bd2b9f',
  'api-supported-versions',
  '1.0, 2021-07-31-preview',
  'api-deprecated-versions',
  '2021-03-31-preview',
  'x-ms-throttle-information',
  '50',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
