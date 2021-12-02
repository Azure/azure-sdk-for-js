let nock = require('nock');

module.exports.hash = "05b039d548203e49e411303dc3a0e94f";

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
  'ecded233-cb77-483b-8803-eff4cf660000',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmItVJOCZUxJnxueXzaI9KQ; expires=Sat, 01-Jan-2022 02:08:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZAp7IcS-EOyKl8-ATFB3Bunm36mmsYOddD1l5cNpJxBju3UXtmCDzSud5vLBb_WqiBVhRs3FBOk0MsyRiBCH0owNYuxt0eQXQ_PMQDxMDIWtzoe0rwGes8hernLiMiGH1TZgCeVkuOiiTpCYy33UgzHZPWbT0r9vionQWxOPJUQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 02:08:33 GMT',
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
  '00892697-ca54-4b6a-8e2e-cdd509460000',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsXNckSPxzpGsAybsD2yqgg; expires=Sat, 01-Jan-2022 02:08:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrym2JY33_QwpTtRmNXQuT30l5nKZSez8oehMEqUVrAcwYRpLLac7bvyZRaVib173CIXvDety1z2W4hP9RwGYvSVQR7cCuswiaTvTF1TUxteC5KpHJ67Xdy719tf9EIf8WnnUDucuYFHFCCczxA2sRDf1h59wVjGuz49y563a9t0AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 02:08:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=660442e2-7535-4c0f-840d-068cebc7ea2a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '756c58a1-2400-406a-9f9d-1ff6450e0000',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ar0qqWOh3j9Bk6M3ulva15gWPr5BAQAAAKEhOtkOAAAA; expires=Sat, 01-Jan-2022 02:08:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 02:08:33 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DevTestLab/labs/mylabsxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef147b3fc3c5b97edebb6aab38bfc783aadd6cbf6a3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbd4e36531cb6bfaa898d655539db7e3463abcab3f33e9b8b99b2daecb6cd2bc7bf76ef7c1bddd8f4606c19775be28d68bfff7e2991149cfb369dbfcbf17c595d0f069d6664f8be6edff7b11bdc48cbfc816f90f01a9b7f935777797ffa56f0c2efb0ff6ef132ef49712eacdf50a082927d2578b6c39cbe8bbeb6333f7afb4e3b359f3bc58aedf7df4e87bdfbfa1dd778be5acba225944cb699d676d3ea319424f7b3b7bbbdbbb7bdb3b7b6f76f61eed7cfa686f77fc70e7c1eea77bf73ed9d979b4b3433874e694e07c443fb34999cfe8db7c7959d4d572912fdb9779bd289a8688484d5ee51991811a64cb25cdc134470ba883b6684b744d5f2db2fa2d6186e6f457be149821f877aba2a6df1e9d676593ff92d147cd7ab5aa6a86147dc18749cd793e8052b1bc78ddcaa05fafa7d33c9f71f3f5b2f8456b221221579c1784f0a38f663b7be7fbd3fde9f6c1fef421cdff39a67efffef6f9cefebdecfebdf3f3fb3b394017e8f9eecf32efccf24b7c576693bbf47ffac6f00ee1be14f6f53f6a8581beb0ef3fcd2fdfd0fbcff57d6a5256d30cc852b33c6bda75f3d12f","f97f00803923e8b2050000"], [
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
  'Accept-Encoding',
  'x-ms-request-id',
  'c94fd6c2-d83c-49b1-b996-12364c02ceaf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'Request-Context',
  'appId=cid-v1:9e8cebda-9c88-460b-b55d-9410c4648f9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-correlation-request-id',
  'c94fd6c2-d83c-49b1-b996-12364c02ceaf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211202T020834Z:c94fd6c2-d83c-49b1-b996-12364c02ceaf',
  'Date',
  'Thu, 02 Dec 2021 02:08:34 GMT'
]);
