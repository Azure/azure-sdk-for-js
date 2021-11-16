let nock = require('nock');

module.exports.hash = "f0352c1810a8bbe7f6b6e0a2b912db95";

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
  '5367927a-fcb7-4e69-827c-c1a96efc0100',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=An6mImVcfStIhbCp9WgDEJA; expires=Thu, 16-Dec-2021 03:38:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreEsHsFuEgYabd6zHaT49OefRzy_3pDRulZbG-kBtuWxaf546pL2F17rQ8xked9YqyED4CFftbpB1IMNi0dXHu0Bnrtf20sQnivu4x9FhtHl7U3puzzT5Nawp-reZRd7EV2KG62urLkxyBvOEs7OUrE89tdgktax3omexq8iXFt4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 03:38:25 GMT',
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
  '43e96e34-bb4a-458f-9d99-3fc99b800100',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhrMrTlBtGpIvzAh4_ZBHkg; expires=Thu, 16-Dec-2021 03:38:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZUNYJLbY7GmwtMe7jFk9dEsDzhfrY6UxeGjHuZCkuK2OCulWZ5H6XgURqLHT9goxiMx_LJwAEZwktM3lkY2N9OU3zjSziQ2PY1a-ECQNEys7zjxvTKDMMtOW48Zopea-xHfxVA4Pxd2v5ETC83Zal9FapV4dtppNcqUAKtqOWbMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 03:38:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e2584893-6efa-4a36-b251-c54d0661269c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '31f6a6c5-b64f-4e07-9038-9717cb820100',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Arp1ogwMF3hKjO6UegC61KYWPr5BAQAAALIeJdkOAAAA; expires=Thu, 16-Dec-2021 03:38:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 03:38:25 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Consumption/budgets/mybudgetxxxy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4f08ea7ac1d0ef4ed6b38bbcc50bf2dbbb77efae3f1a7db4cc163961d2f9b4bd5ee1d38d90a859fe26bba066bfef47bbb307b3ece1e4d38793f3fb3b93fbbfef47f42521b4caebb6c89b8f1efde28fda6291bfcceba2a271ffe28f9a36abdba7598b4ef676f676b77777b77776dfecec3ce2fffd14bd9e2f674183bdb0c12f212409e4e775562ca9cd17d5b29d97403d5b54eb65fbd1a3dd9d9df1cee8a3e9baaef365fb7a45f0d0b3f99abf5c2f0bfaf5a3af5e3f05bc29757751d5d7f4c949d5b4046b59b5c579419fd3b07914d9b45d67e5efff799d53dbfacd3c5bfefe073bbf3f8d6b4a7da041becc26654e3db5f53a1f7d040a646d551348ef1d82dcce691ee755492d0f1895290d80a09f2eb2a2a4aebef7d14f57f3e5acca7f4f7c4173309e560b7aefa7b365de2c8a761e7cfe7dfbfeabaa04bdbf472358b6753159a3f3d147aff28c58c36b27dc430de9238bcb1b99f5631ee447bf8448725e9484330696817cdffbc51fcd88e8cbc6d043b9e795f2e4d98cfaf2c67c86a15e66e55a70bafbb3ceee8bd5bacdef5e163546f045369d17442e7ae972418cfdd1f76948c489d905616371a7d99559df84f9d3fc92fe7e5913f71210fadf","2ff97f00ddf702ffc2030000"], [
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
  'session-id',
  '69f24cdc-9e41-40f9-956f-3a576b1c7df0',
  'x-ms-request-id',
  'd2246f3a-061d-47e4-a012-60ae5d43aa6c',
  'x-ms-correlation-request-id',
  '141dead1-a1f4-48c7-a031-3d9ef54b5fed',
  'x-ms-client-request-id',
  '6187902f-168e-4daa-9ee6-56bf29c8af2b',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T033827Z:141dead1-a1f4-48c7-a031-3d9ef54b5fed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 03:38:26 GMT'
]);
