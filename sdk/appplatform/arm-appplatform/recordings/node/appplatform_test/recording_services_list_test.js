let nock = require('nock');

module.exports.hash = "d903f0345530aec940f6e2b63153a5c1";

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
  'a444db9c-be57-4307-a10e-33a27dcf1e00',
  'x-ms-ests-server',
  '2.1.12529.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmZAX1mxa9lJjFDLv65LYTo; expires=Thu, 31-Mar-2022 06:23:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRmW9emlWZCVT7ZzsuGdId-5mpmVeQW5IKy3jMV8UjSk3TaQSiRSBNOpABNMUGNlzO34ZyYrabDepJSI-4Y8atn7SL5z4CHkDSnbQqCR-qtvMWoOOEpCverro2BlnMB6LhbDW5kZUxPIGkgvRifg3_XMF631K9WqFq8xXDZsse20gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:59 GMT',
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
  '88b0213c-f179-47c7-bdb9-21873e7f1c00',
  'x-ms-ests-server',
  '2.1.12529.16 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjHA2pwigXtGoGqxUMASGHc; expires=Thu, 31-Mar-2022 06:23:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQssE1GTYEQA2jEqnHro_avb2Mv0jAXaJAVLaYd19A8qvXTX8FrFyQjHsG2ysILiqDFSPxJnBgSMFsF8cUUC0e2lk81V_Usz2kMYxlTnLLuvjiCVuD3uxvv4IGnuTs4RTqTLUmIjvgQW5aKjT1GQef6IiFJb42-br8ln-tEpYu2UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d9d8cf54-9cd3-411f-b4e5-cc24502c9869&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '17f397b0-cc05-413e-95af-cd76fb3c1f00',
  'x-ms-ests-server',
  '2.1.12529.16 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiZHDlmgQdNIjARkY-3sWOjLj78gAQAAAP-yr9kOAAAA; expires=Thu, 31-Mar-2022 06:24:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:59 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d123feebb2688a6a592c2f5eb7594b6d3e7abd9e4ef37c96cf3e1a7df4836a99bfca67ebe52c5bb61f3d3acfca261f7d7499d778e7a347f7461f35797d594cf3b319bd99cdb2839d07f7f6761f3eb8bfffe0e1f964f73cdb9bcd1eecdcdb7f9867d387047099b75755fdf6655d9d1725f5f68b3faad6eda4a20ece5e0a46eb49594cf98fef7db4b733fe746fbc77efd3f1eec11ebd6dfe7e307eb0f3d1f77fc92f197db4aaaef2da60fe6abdc440a8e1f92f9a117a1f2dae15bd77efde8db31faceb7c514ceb4a3f6cc645f511c168af5778fb0bfeaa3a6fc7c7abd5cb326bcfab7a71f7f5aa1690cddb35f05b660b347ebd431f11156bfcde66449f7a06586535cd5aa6cd4779d6b4eb06cdb20b1acd2ffee86d7ebd4b9ff35ceca27101a2dd6dd693665a172bbcd6dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9bbb8fee9a6cd9bf62e4fe78c66e7eea6c1507ba5009185f0d321753e6dae09e6e269d666c07d5ae744e3d9936b6a98ef6484c73d42ecd3dde9f6fe6c776ffbe0fcd3e93621fce0fececeeef4fe342300f69537425f42846656a863bf3d26aea269dddbdbdeb9b7bdb3fb66e7d347bb0f1feded8f0f0eeeefddbbff53d4b2243a7e51cd8af302c0a8f92dfb0fdf8b22e137b911935ff24bbeff","4bfe1f71d907374a030000"], [
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
  'Vary',
  'Accept-Encoding,Accept-Encoding',
  'x-ms-request-id',
  '21c667fa-9530-4ed4-96af-997fd7736e74',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11998',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  '99626357-554f-4a9c-acac-8e865bc6e637',
  'x-rp-server-mvid',
  'ebc692a4-c2cd-44f5-bba2-1b5e5f04cb14',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  '21c667fa-9530-4ed4-96af-997fd7736e74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220301T062400Z:21c667fa-9530-4ed4-96af-997fd7736e74',
  'Date',
  'Tue, 01 Mar 2022 06:24:00 GMT'
]);
