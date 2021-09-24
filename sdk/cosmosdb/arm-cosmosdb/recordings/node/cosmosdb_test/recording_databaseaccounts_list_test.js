let nock = require('nock');

module.exports.hash = "de33ebb0ef19ac76d33e9ba8414e51e3";

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
  'fa7c6a37-cd96-4a17-a41d-3a39feb20600',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlVqu1jicuFGnzbEWK40xRw; expires=Sun, 24-Oct-2021 03:42:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruvnN4YTzkXZQX9fnJg78QhjdEA_8jhir617iRZW5BQj9QviPa85Tr8LZEg8PcHQ9upjdtGKsDKv7wQWiLh65WlpHkE_ySJGDbjzdkR88Ucn_kmgXyrN2z1IytH_u77WIPSe6Imj9kW0ymH1bWlntYRyOam6hIFOuKfiwf7QxvjsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 03:42:55 GMT',
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
  '38719b22-bb0c-4fad-9308-c2ad52090700',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArNaM27Rl7NAi426VmTbKVQ; expires=Sun, 24-Oct-2021 03:42:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUiJXZj18lhtgy4dKs-AJO9Bgf0c7lRFea9tWHhbc1v9drdzLlAPqvL_ofbvxFil86TVqoM5QbFio4BT-gVWkXEh7iUVopWxkJido_3oXqY7ohAYwp6_nt2zARZyh3HSbYYTRiMGNEq7RIH8ptrwoJRP9lAxhgbl94VtOEqP_7A4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 03:42:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e658031b-7298-4e25-8ee9-0106a47afbe9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1351',
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
  '6332f45a-4a68-47f2-bf85-b9e353f60700',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Atper7QPVDpGlT_-xVtqKHAWPr5BAQAAAD5A39gOAAAA; expires=Sun, 24-Oct-2021 03:42:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 03:42:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/databaseAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7d574bdc897edd3277767599b4db2263f9e4eabf5b2c58b99fcfaeeddbbfb1f8d3e5a660bc2eca3eec76535cd801d7d759a356dfad56bfab0bd5ea1edad3aa2e66f8b2546fb79594db2d235a56fdaeca2f9e8d12ffe25a38f9a6b1ac6e229bd4c7f7f34adf3accd67c72dbdb6b7b3b7bbbdf3707b6fffcdcebd47f71e3edadf1bef3ef874efe1cefd9ffa88dea481aff2ba2d7240c25f9745430817cb8bd72d012108afd7d3699ecff219f538d3ee4f97b355552cd1c1bc6d57cda3bb2145c6a66133ce7eb0aef3f1b45a3cdadfbf779760acd693b298bec8dbabaa7e4be3cc1beafaa3d3653629b98f9c7f3b5eb7d58268377d9615657599d71f3d3acfca2637df7fb12edb6255e6dfad8b367fae64264041a397198d0c5ffc5ef9f51734a8b672608ae6278bba5d67a562f2ac28dbbc3668985697419b57eb1274fadef74706dfe355f186a6933efce8f52f2a09fb59d1e00beaf0094de3ec8bbccd30a78ca619acc2161c9fd579fea6e88def789995d734fcac7c4d5867173413fa7dd6fde6a45a9e1717eb9a4980596ca6f37c91012f42ebbb79593ecdcf8b258d8ae6bb58366db69ce66734c68feeed3d38bfff60926d9f670fa72432d3f3ed832cbfb73dcbb307f7f6ee65f9fd4f7730261a80c7945f9e9fe7b542272659ceb21af336cbcf339a94b3194d7bd15ed397cf8aba693107d7f643921421e5f1b47c72bdca408e8f5e54cb9cbe51d261324b9afeb91df19466b620065f4eaf5f56c43b04fb179bee68f0e6bbe7f9655e12b8d744645062f4d1227b77b6a45925c571b67c9d139c19f5779fbf20cccb7c494d5fd6449d771f3ddaddd921fa501b47cc2f89ef6a520bf412a4ec0a9308f4f01d7d661451c0fadb57a44fd6105c23fc2f44377c973e17056084e3262952501b85e906813d57e979591715614f94db211e687e8a28fe2a9fad69eed03dd3f997105793e298fdff7780a3e870c820b4f329f55e67656c58aff17d7a220dde737c21ec6f769c7bef39ce3c03ad0954677cce3019f46e1c9680fa6687b33b381ce24b83f28f7832e361fd88277bc31250dfec7036f2a46d0e93c4fed3d7654d0bc9764c96280a2b9c3b7ab50333c2177de07b03c08582f44a07a89b8c3eac5d50625ad5183d7ecb56d9a428c9e7627ad027c5ca739a26d9f4ed7ac504a3777fb1f1845fe6046f564ca907f245f9d72faa59fe32704de55d67cebf28966b72dd6938fb245df2edab9c1c0160ee9a7d9bdc7d6a74609aa8cf642614787cf4795e7df44bc8be775d93571a2c9cc16b00feb322bb58560d395fcfab8bd779db1227d157bf587db667ebb27c93bf6b7f629dd780cb7e0d00930b4168815e76ccfaddf77f","c9ff031fafe92bd70c0000"], [
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
  '11408',
  'x-ms-request-id',
  'e1de2d16-1b94-4203-aaad-3d3612cd134a',
  'x-ms-correlation-request-id',
  'e1de2d16-1b94-4203-aaad-3d3612cd134a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T034256Z:e1de2d16-1b94-4203-aaad-3d3612cd134a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 03:42:55 GMT'
]);
