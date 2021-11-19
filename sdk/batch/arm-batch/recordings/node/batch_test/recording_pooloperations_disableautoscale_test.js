let nock = require('nock');

module.exports.hash = "373af4d4cc9abbc63997ee30fd3d79ab";

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
  '252c3b4d-43bf-4910-b497-74d5f1321600',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhOLFIotY5RMow9CxAJSH3Q; expires=Sun, 19-Dec-2021 07:07:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr18nURrwkIre9fXLbTA0I5YXSD2Msf_rr0GLRTK34laL4F8fbqf5IiJqHHn1_Z0RM5GMQYClBB6U3y54Uru-QqshIWbW9865mB6g7HX3vtE2C2b0SqZf6nOd1Q1iV1FsHqopjyIVbdj5IR2q9p-UcRkinHsXjpKovHIlQuRXmsFUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:42 GMT',
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
  'a6af092e-d9ef-4345-8611-2f0fda784400',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AicX9n_O0ZJHhcHzIB3hXYw; expires=Sun, 19-Dec-2021 07:07:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrTo1aiufsATen7n47cK6w4l_WwEY5wLZSFy3XqBjx7pN_mieCcB4G4IbEwdAvGNQiLjgSYwJPqdPuSXnzedWRGp94VysrBPDAoTfcHtnGRvOvsZbn0csxH8xVVunXsjEv8ZIKJ_Pb4t4hNNsUZYzR6Zu3LFPu98bUDZ20ZwnUOJMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:42 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a2f677f4-4656-4fa3-9435-5be841208c86&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'cb0f8a18-9cf2-4235-8927-6ea9be573e00',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqIPO0bzWZ9OnJhv-K1WFowWPr5BAQAAAD9EKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:43 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .post('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/pools/mypoolxxx/disableAutoScale')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eeeeaaaa4a7c849ff4f747a38f96d92227ccfc8fdaeb153eda0c16cd1b6a9cb7d90535feeedddff7a39d77074f1f1e3fd97bb27ff074e7fefed393dff7236a4078aef2ba2df2e6a347bff8a3326bda2faa59715ee420c8decedeeef62efdefe19b9d078fe87ffbfbe37bbb0fe9e3839fa277a7759e81546f0a46923ea6a6f43fdb7a67fc70efc1eefec13e5a534f974543cd8be5c5eb366bf1caebf5749ae733ea2cf2fd9b3a5b36c5ed3bc8cab29a3242fc3abdf02a6f8a1f10b8fe97b7801d0cf572f1baf801dabd7e73fce2e9f1aba7bfffd37dfab858b679fda29ae527d562b15e16d203357b5a34d9a4e471b559f3f67559b5cd4b69fad1a35dfd703acf67eb92f07b5995c5f41a13b0a406cf8ab27c2393fc7a45249e7df44b461fcdf255595d2ff2657b522dcf8b8b75ad5dfde28fa665b59ebdceebcb624a7874beac9a67d9a22809f847f70999aaf949e249feeea36f7df44b087033cdcafc75deb68407f3c079f12e9fbdc6a7f8abcdea8bbc7d9acf30b67c860150ab1d8c005f3cafae5ed6455517edb5fb8a64828805c256eb963a7af966f7fe17dcd9745dd734840838fd2602ef97","fc92ff079f1b4c3e9f030000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Last-Modified',
  'Fri, 19 Nov 2021 07:07:44 GMT',
  'ETag',
  'W/"0x8D9AB2B48D054DC"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1195',
  'x-ms-request-id',
  '6a15eff8-2db3-4c63-8288-7cbc03815a1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '2f8adb36-8cb6-4649-816f-af86f84289e7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070744Z:2f8adb36-8cb6-4649-816f-af86f84289e7',
  'Date',
  'Fri, 19 Nov 2021 07:07:44 GMT'
]);
