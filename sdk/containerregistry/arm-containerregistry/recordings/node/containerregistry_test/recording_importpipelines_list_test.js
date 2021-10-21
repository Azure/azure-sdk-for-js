let nock = require('nock');

module.exports.hash = "b2eb479644b403de342c6dc257e1f896";

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
  '862fd48a-9fb8-43a3-8f3e-d5a0640a1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsJyoORpqxtCi7NlVAC4vS0; expires=Fri, 19-Nov-2021 07:58:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrP42--QDWZdsasSD_I_HqK12P6_2WTuDQy2rEKXsypX36FTsIFkmhf5QMYJf-0qUJZCecGnbGGycEye6aJDrVqJ3iE5dooloHWNY5WpePdCfwCxwolSEZja35AfLjfDjAShxwV-oQa66ggJ9QNDpfefVDxez2y1P0XElyaASMJQYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:01 GMT',
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
  '862fd48a-9fb8-43a3-8f3e-d5a0650a1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApREq4V_wyNBmRTm5HuCCt8; expires=Fri, 19-Nov-2021 07:58:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1VuaoYH_BbW5DuUrenGt18ZW8y929OicNC9EMs3Y61yG1DH5FZ0_oqqtmqP0Twdq5sK6Pd8IhBKh3GZpKVpzaOyLquddwozdPhQoGGF1tp8a8QfRzb0o-Z0oWodYXkjjmj_uqCjB-18wbgxOllzsUvgDh4Q0l43V_6ao-ie5780gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=67ca9862-cc9d-4176-98fe-3e2a8d2b3f73&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '359d9e5b-f9ee-4993-85f2-3e0b5dea1500',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtUMHtHr5xtEgcAJTOBJIJQWPr5BAQAAAArDAdkOAAAA; expires=Fri, 19-Nov-2021 07:58:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:02 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/importPipelines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc517bbda25f3efaa298d655539db7e3936ad966c532af5fe51745d3d6d7776bf9a5c89bbbc56255d5edcb629597d4a4f968f451594db3b6a89604e3f4f8f59baf5ed367c52c5fb6457bfdd1a35ffcd1aa2e96d362959567336a3279f0f06036dbc9b6f7ce770eb6f7a707d3edc9a759b67dfee9747ff77c7a7e90ed9c1380365f66cb96df78b077fef0e06072be7df0e9f9eef6fe6e76befd70379b6cefcd1e4c673bbbbbb3c9fe03bc21c368ae9b365f1c374d71b1cc671ffd12e0421fdf6dd693665a172b60dadc7d4830efcf0eceb7ef4d3f7d4030f7f609e6f4c1f6c1f47c87a04ecef7f677efd67953adeb69fe795dad57cdddc5f54f13e8a6bdbbaaab4b1a60dddcbd25cd16d7fac7f5bb77efaeafbb34a4efe593957e42ad6840cb6c8101c5bf94613ecdda0c249ed679d6e6b32744ef8fceb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff80c9655f7923743b5eadca4227d27e7bdcd2377b3b7bbbdbbb3bdb7b3b6f761e3cba4fffbb3f3e78f0706767efde273b3b8f7676a87d9935ed17d5ac382f00925eba2516e17b5154fc26b7c487269de66895d72d511ff49179c46fca25c73f58d7f9ebb6aab38bfc49594decf45187ebbaa016f3b65d358feedecda6d36abd6c3119e309b51c4fab3a1f5f15cb5975d58c97797b776ade451b7aff6d7efd93d9ba6cbf0ae02cae2ff1e158fecdd03fbfdde444ebb6a17e6a99e7266b3000e29c8b0bc2877016ecdf781fb459bba6817d74bacc2625b89c5ea884b549a43ffaf232afafeaa2cddf641790d0a77999b7f96b0683d17eb97cbd9e4ef306df61e4c5729d7fb93cadebaa6e3efa3e13efb268085ab1bc784d7d8162fc463ee3cebeff4b","fe1ff128821d40040000"], [
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
  'api-supported-versions',
  '2019-12-01-preview, 2020-11-01-preview, 2021-06-01-preview, 2021-08-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-request-id',
  '398f5c39-176c-481c-bfcd-ec8ea249132d',
  'x-ms-correlation-request-id',
  '398f5c39-176c-481c-bfcd-ec8ea249132d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211020T075803Z:398f5c39-176c-481c-bfcd-ec8ea249132d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 20 Oct 2021 07:58:02 GMT'
]);
