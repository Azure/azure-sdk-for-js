let nock = require('nock');

module.exports.hash = "a3ac12ad61cd9d14a530990ff87069d4";

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
  'b2fe5ec1-78eb-4763-a8a5-c258044b0f00',
  'x-ms-ests-server',
  '2.1.12071.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjLpBd0CtYRGioleSsFObp0; expires=Sat, 23-Oct-2021 04:32:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpqQMSCHK6C80-9teAzZy_YxUp9ThlgE18d8CQ_2Y25fu-Esh7lNAMH4BhtNyV4ACJUrroC7g4l5yj48oCks9Af9zAbg2eIaJSbpRoWiuxx3dJnlWdWfeRU8ACMJ9PHhN8-kAoAEV7GZeVW_w-m_2ql-XBfcthM9_HL_COy8tgG8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:44 GMT',
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
  '1f67b240-fa2e-4567-a131-a66437940000',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuTQc3szmNhIvIbueJEmmtQ; expires=Sat, 23-Oct-2021 04:32:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0rROfXaV6etqLE4OAdHdLFRcAaJkqGDvaLzEjvAIbmaxtN0iABOrJIPyLdD6gbgi_rypN_QMgzf9mQZCmOmyAbR3AmyIzKG1tpI7aaYbyjzIfDNcq6oy5HO3Aq-IhT6uv54PCtAAasZxcSsJTi3Q37kQCcPD7USio7HKweOTTyQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f1cd5d45-efef-460e-ac52-be61b06ffa2d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '3105a264-14ec-46bb-9be7-ef66d0bb0e00',
  'x-ms-ests-server',
  '2.1.12071.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aqo75Y_YZfxDuJRUH3B_31UWPr5BAQAAAG363dgOAAAA; expires=Sat, 23-Oct-2021 04:32:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:45 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedddbb777b1f8d3e5a668b9c90e97edc5eaff0f10dd0d030bb683e7af48b7fc9e8a3b29a66180abd769a356dfad56bfa3aa7efe983637e9e3cf9fcd5179fd1a784ee2aafdb22c7ab1fadd693b268e6797dbac88a925a9f57d5ef39ad962df53c9e560bbc609abc1074a9057dbaacdae2bc905e5fe74b1abf8190ad8ac5c5a2dd5e5675be2aaf7f4f7c3cbe2a96b3eaaac97eb0ae730317746be8f56279f1bacd5ac07ebd9e4ef37c96cfe8fb36ab2ff2f665a4157d39ad73fa7d76dc7ed54ee993bd9dbddded9d87db7bf7deecdc7bb4bfffe8fefef8e1c183839d7b0f7e8a5a5f50dbabecfaab1af8cddb76d53cba1bcec69831db26dcc7cbbc75afbcca2fa8efacdcf0ea764e145f37db3bbbe35a5bf7a0adaabadd08642c2d7a2fcef2cbbcc484bde4ef3741b04d7b4016967988933681700d7b309ae962d39bf475ef9579d5b460f1936a795e5cac6be615e2baeffd62c3e234b9efaeb5a5725708b60b325f4e2be28e133030731fbdb25c97e5e8a3b7f9f54f66ebb23d23f1964fa6aed1cbac69aeaada7eb5cc2f887de98b93b2a0c106e0ceb3b2c983b7cd5bb3fc1c3dbc6eca27c4cdc48f1f3d6aeb35b525e95fb6457b2dd0a218bc66d541e37bb22e08c9258dc5ff96187b4d94c16bbfe4fbc42e10b9e9d9cbe3d98cb44e0351fdde47fb3be3079f8e771fdc1befdebbff115ad5c525bd1c340384d147d96c5680d859f95c1583fdeab2a8db7556bec85b22c8db606a4c93e9ba69ab05cd0df192d1134e197d97c64e927c8c990935d3f873c2866466fc3a9fae6ba2c79860b4d5b42a9bf19bb2d9dda1e13f037569f0df04bcdd6f101e4deabd0fc7efa458919e24ecc8b294f9d3bcd9fdf4e083813ec9a66f49c17ac862f01f8e6c1cee8713b50ff78388eb8121c540daeddba480f62c34327e214bbf11d5f2a25aa22b4fc8888f85bf6745934dca5c3bb0124f5ae62769f24810482a9ab6ce8a650bd65f144bc24cbf1218d4a98ae84a65cf09bd4ae5e972b6aa0802c15ae6538897f64fef366fd7000cdd489892f02f67192927c2365b6553a2e1478f76a999512bf2dee8a31fd090","0c90ff0710415befc8080000"], [
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
  'ETag',
  '"AAAAAABBGRM="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0db336c1-3a87-4994-9205-4e2ad2978c86',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4908',
  'x-ms-correlation-request-id',
  '4f5e8304-0a71-43bf-ab0d-04b98034a3fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043246Z:4f5e8304-0a71-43bf-ab0d-04b98034a3fd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:45 GMT'
]);
