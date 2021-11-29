let nock = require('nock');

module.exports.hash = "d2d5601de1b21e4768cb30d5c7d7ad30";

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
  '8cb4563b-d447-431d-9dfd-46c4dd021600',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsZ2ZFJRpuBEkrQfnBwviZc; expires=Fri, 24-Dec-2021 02:02:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrttuuGMOP1HXcAKpaFfKA9qXlgotSped-oDRoEyKShJ7zRcp8Uen7zZwPO7JliDmhsZErNpBunsn6Fma0cm58-3yXqTLIXdmILtN7l0vr-LtYjfsW-SDLKv3GXFBH6ss1cW5HWZbACnkNAvC2GaifkvRcy3dBeQZnwla03FMTDJsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Nov 2021 02:02:57 GMT',
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
  '5b83d9e2-0c83-43e0-8b24-d76be63e1600',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArdN6O0_UppIuFjv7txQvgY; expires=Fri, 24-Dec-2021 02:02:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGREa5QQC0pThVKheWFkBEPnbo8X1Y-iggR1xzLZTTssMuHS-wLbfmuDMgIpGWEpyqcRrrGwuvbXWTgCFHZlgxGnBz9LIroiAUFA3bRGCqXZF9EcZTMaNW-e3b-hyOAPqIMi6x86iFQrPJanenTwOX02zaS-cQXuVu4owr4OeHIsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Nov 2021 02:02:57 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e3c46ac1-61cd-4eac-945b-d82c6bbe37ea&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8cb4563b-d447-431d-9dfd-46c4df021600',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmG77Rh9mI1Psd8s4vTUKhAWPr5BAQAAAFGUL9kOAAAA; expires=Fri, 24-Dec-2021 02:02:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Nov 2021 02:02:57 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.BotService/botServices/mybotxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f54edebbcbe2ca6f9dd89fd15efd05fefdebdfb68f4d1325be48488f7497bbdc2273701a196799b5d50cbdff7a39dc9cecefddd9d7bdb3bf46cef1ed03ff4cbcef6a7bb0f670f67fbe7f4fbceeffb11bd5156d30c43a5b72eca6a9295f459f376fdd1a35f6c1079bdfbd12f197df4b658823ccdec2d35a05e1ab4a09fbbf4e16556aef35df97ccffcbd87b78802abbc6e0b428e9acf8a665566d72f3286dbce8b26a5ff65298895d24008c22cb7c4a7266fe679ea7d9256e7694b1f49d3625a2dbfaa4b6a366fdb55f3e8eedd59356dc6f4e5794d3d5c55f5dbf1b45adc6d5a1ae0f4ee2cbf5c55759b9577a765912fdbbbc522bbc81b1070dbbeb03dcbcfb375d98e57cb0bea225fce5655b16cbd3e26c5f282c12ef2a66100d46ed164c7abd51908b4bf9bededed4c1e6e7f7affc1ee36117ab23d99ccf6b6f7ef9def4e7767077be7f7412979e34dbecc962dde5baecbd27ecad3ed7ff2c5ebb357ca63ae310d282f415e6a70b66c8a8b79fb7be5d784c2fd87f777ef4db2d9f6ee4e463c3bdbdfdd9eeccf76b627bbd37bfbd34fb3f3fb7b19a11079bfa15fcb4218021d7d445c7e6fff603fdfbe773e9b6cef4feee7db0fb3d983ed87fb93597e6f2fbf9fed4d0854b92ef0ead98ca6f97bdf7774fbc9bc6e081401ba37dea1763463e7c5c5bace6727f36cb9cc4bb4ffe82a9f4ce759fb11bf984dcaf8b7847051e7d3b62c96399a16cdd3e8000a22c2eb9ca6acadd7399abd6eeb3c5bd0b4bd5eafc001390dec3c2b1bfab299cef345f6a6ce96cd79552f78dc0ee7ddf13dea75b59e944533a7f74f086f629c82de3573b0cac0392dbd623ec9ca927a6fa9b9fd68912d8b7362716656f9a869ab9a98a73fa98be2a26634de546f7342423e2d9a9345fef674c9c4b1d84fe9331aec4f82613dd84491e5778b76fe6d9a00f359b65abdcc9a86587ce67f5c34674d55663e494846d1cb73520be5f1ba9ddb2fd0dbe9725a5fb328be26a15ad3083ffaf2fc1c4482a603d968dcf88af8f7a3d7ebe934278acda0087e502da103bef7fd5f","f2ff00ba81ddfe68050000"], [
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
  '"0b005103-0000-1800-0000-619d9d4f0000"',
  'Vary',
  'Accept-Encoding,Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-request-id',
  '2888a206-b4af-4738-9a6b-a243262ff0b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '5578c7bc-9344-4e01-bb15-8cab168ae188',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211124T020258Z:5578c7bc-9344-4e01-bb15-8cab168ae188',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 24 Nov 2021 02:02:57 GMT'
]);
