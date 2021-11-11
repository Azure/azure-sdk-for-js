let nock = require('nock');

module.exports.hash = "4e47848003a4f74b73262cd4a838afa8";

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
  'f2cafb6b-d1c8-49d0-ac4c-d67f8c121700',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArD1U4vYAcdFqf28hysbn50; expires=Sat, 11-Dec-2021 08:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0_g23FkrAukfK5I5tubklD63QqSbbeGSkne2KEjBkDqRrHtH667ly3crCH3pDu_Gk2tofRWLNNXxCGJqlugzywUot0ZVg4FbVhL98XfP0BA_-x2F-Kx1a0BRD2RCObpqDY33T9W0Pfd_JbICObS59zGfS_Zm1Pzp2Y3hqW6fyTAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:42:47 GMT',
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
  '5555d975-dc1a-4491-bd25-162d9f881900',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiRt6Ixv0FlNpPX2JfkP0Vg; expires=Sat, 11-Dec-2021 08:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUW0w2t0BIhOXYUWKKIsOdhVTOa6Ce4QZvZUOW0Xj9fRQoZRFMjWJfI39XQylP9dsu09saMl2y0d2WgZm6vSr5oUM5hgtBkE7HR-UilqMRkbpFtRUypjaryJW7_rnrAGOXeND4VYFkM8JPsxhV6Ush3jK8MVSDzIskNmsVIAJQcQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:42:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=610277e2-ed56-4674-8a50-a00a22f996bc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b57e063f-9326-4e85-827e-41fdf93e1600',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aqgvic_T4y1FsBCuUkkRgZIWPr5BAQAAAIfOHtkOAAAA; expires=Sat, 11-Dec-2021 08:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:42:47 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77efee7f34fa68992d7242a9fb71594d3360475f9d664d9b7ef59a3e6caf57687bab8ea8f9db6289d17e5e5693ac744de99b36bb683e7af48b7fc9e8a3e69a86b1784a2fd3df1f4deb3c6bf3d9714bafededeced6eefe27f6f760e1edd7bf868e7c178ffc1c387f73ffda98fe8451af72aafdb220720fc755934846fb1bc78dd120c02f07a3d9de6f92c9f518733edfd74395b55c512f0e76dbb6a1edd0d0932360d9b71f683759d8fa7d5e2d1fefebdbb0463b59e94c5f445de5e55f55b1a66de50d71f9d2eb349c97de4fcdbf1baad1644bae9b3ac28abcbbcfee8d1795636b9f9fe8b75d916ab32ff6e5db4f973a532010a1abdcc6864f8e2f7caafbfa041b5950353343f59d4ed3a2b15936745d9e6b541c3b4ba0cdabc5a97a0d3f7be3f32f81eaf8a37349bf4e147af7f5149d8cf8a065f50874f6816675fe46d86296534cd6015b6e0f8accef337456f7cc7cbacbca6e167e56bc23abba099d0efb3ee3727d5f2bcb858d74c02cc62339de78b0c78115adfcdcbf2697e5e2c695434dfc5b269b3e5343fa3317e746fff7cf2e9a779be7d9ee52431e7e7d3edc9f9bdbdeddd07fb079f4e3fcd673bf7a718130dc0e3c92fcfcff35aa113932c67598d799be5e7194dcad98ca6bd68afe9cb6745ddb498836bfb21098a90f2785a3eb95e6520c7472faa654edf28e93099254dffdc8e784a335b107f2fa7d72f2be21d82fd8b4d773478f3ddf3fc322f09dc6b22322831fa6891bd3b5bd2ac5e66e5d9f2754e7066d4df7dfe82302ff325357d591375de7df468776787e8436d1c31bf24beab492bd04b10b22b4c22d0c377f4d9f7540f05acbf7d45ea640db935b2ff4254c377e973917f231c37499182da284c3708ecb94acfcbbaa8087ba2dc0ef140f35344f157f96c4d7387ee99cebf84b89af4c6ecffbf031c458743f6a09d4fa9f73a2b63c37a8defd31369f09ee30b617fb3e3dc7bcf71e619684da03ae37376c9a077e3b004d4373b9cddc1e1105f1a947fc493190feb473cd91b9680fa6687b391276d739824f69fbe2e6b5a48b663b2445158e1dcd1ab1d9811bee803df1b002e14a4573a40dd64f461ed8212d3aac6e8f15bb6ca2645493e17d3833e29569ed334c9a66fd72b2618bdfb8b8d23fc322778b302ae06f9a2fceb17d52c7f19b8a6f2ae33e75f14cb3579ee349c7d922ef9f6554e8e003077cdbe4dde3e353a304dd46732130a3c3efa3caf3efa2564dfbbaec92b8d15cee0357ceffbd4827c01828f815be4d979f925bf","e4ff01a0e9b24c930c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11313',
  'x-ms-request-id',
  'f1358e3a-a994-4a2a-9f4b-7285245c8e2d',
  'x-ms-correlation-request-id',
  'f1358e3a-a994-4a2a-9f4b-7285245c8e2d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T084248Z:f1358e3a-a994-4a2a-9f4b-7285245c8e2d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:42:47 GMT'
]);
