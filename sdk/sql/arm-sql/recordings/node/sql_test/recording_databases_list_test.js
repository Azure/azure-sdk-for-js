let nock = require('nock');

module.exports.hash = "98aa8918145ad5e891580f66ead4b7c9";

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
  '2aa0e74a-1391-4187-b36e-afa90da34100',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArvnfatG6NlFiqMpHo9CsbI; expires=Thu, 30-Dec-2021 08:38:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhHkUhcPa3U0Cr7iU3bsd6yorrxEc8hwSrHu1BEkYb4zaMBvoSWpX_bucDIX59Vux3rIGkz5Q7cVnZAEYBW_UdNnl4E9-kcaLeUltJ4esabIo5DK5T4qIct-juyMXuW7Dtwvn7IyuSsaPKQkxsAUVUPt7wv45hs0fqmmpU9UeRFQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:23 GMT',
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
  'c3233cd9-9248-4127-b0f2-7c6ea7c03f00',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ap7BL1gesl5IuJFOfOsP4dg; expires=Thu, 30-Dec-2021 08:38:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7E-TPi31oIZGVAFVxHJdHgiexFTyfGI94NUeoC-R3KIt5P6KGkE0QOxeNe3oyP6REHBRG0G8e4vyx9-8_JYJ70ZeYYIMDCe7QNt4iwUL8R6HkSM-spN7eb07Ql2hrEpINpZfkgC2CVFLZMxVYWE-N7PkvHc6vk1u-gSsjrGRUOcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:23 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fff2f095-ac8e-41a4-9a0d-87dea1635c70&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '4db399e4-6594-4f67-8a89-15a7440a4700',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AssJnuZ_f8pLhcU-u5CXEOMWPr5BAQAAAP_ZN9kOAAAA; expires=Thu, 30-Dec-2021 08:38:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:23 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/servers/myserverppp/databases')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc51f376fdd1a35ffcd1325bd0df1fbdbe6eda7cf1d1e8a3b6c86bffef69b6caa6457bfdd1a39d5f32fae86db19cd1b797bb7be39d5163da2cb2657691cf9e50a38fee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f13e0a6bdbbaaabcb6296d7cddd2f8a695d35d5793b7efd8bcabb4d5e5fe2d3c5b5fcb65aad080b6abdca6bc2bfc1b8a6555966c081707afd13cf7fffe7f4c772f7f7ff3c5fe67556fefe272f777fff93b3dffff835bdb8c8debd2e7e903fb9a64e3f7a74ffdea7070f761eeeeeedec8c3e6adaac5dd3871f7db92c8b654e8d67599b4db2263f031d7667f7cf673b0f76b7f7679f4eb7f73fbd3fdbceeecdee6defededce76f7efed7e7aefe12ebd33ad73eabd5a3ecd5ad07a6f676f777b7777fbdece9b9d8347f71e3cdadb1d1f7c7aefa7d0725dd7f9b27d4dc32aa6f997939fcea76d7199bff027698fdad5f92f5a1385f2d98d2d67f979b62e09e2b45aceb2fafa7935655ca8d11541a0c151af34a6b2ba38b93dc97e502df357f96c4d2097ed478fceb3b2c98155367b3dcd4a60f0b468b24999cfa8b119d4d761387df749367dbb5ebd6eab9a18cd743ca5361f613c25bd66297273d345562cdb7c499fe627d5f2bcb858d734d26ac9537af76bf02f715e8f4fbf709ddc5dad276531f53e09ba6dee82d84f659e08bda2799ecf2ef2fa4b9a07256cd19c2dcfebec7439adaf19b1d3a510571a109d4a1a1bbea011e4994e6b41df7fadf17c03f278d7c8097d4af8d0148fccccdbbfdbeb15fe8ec3b2ef7ff44b465d65f5f94b30e57d8010e6a1bfc0a22fd7f5aa6a20a5e7d9a22831e7f40dda39a6da2362055a6c4d3d8e2ea7558df76884df840eb9b77feffec307f70e4895dca843cea7f7cff7ce77f3ed9d83f3fdedfd6c3fdb9e1c1c64dbd3fd7b0759964d0e3ebd3fa57736eb908347bb0fc7b751214abadf1faac18acc2ddafe30d508c94abe6cf237c21ecfe5afb3e5b45ccf88e599d6cfab0b8fdca4b0771fee3ff8f4c1bd4f31aadb2b211d217d4d53fe351849810eab9ccff38a5eb284bea9e18f34d30de3f98635d3b5f9fd07f4105eca16bdcf6faba9beff4b","fe1f754b881762090000"], [
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
  '731a3625-81c1-47c1-a7cc-25c6a55cc43d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11195',
  'x-ms-correlation-request-id',
  '865f12c6-654f-4eb0-a0f7-97027ca4a4de',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083824Z:865f12c6-654f-4eb0-a0f7-97027ca4a4de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:24 GMT'
]);
