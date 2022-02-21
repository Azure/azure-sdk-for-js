let nock = require('nock');

module.exports.hash = "d51e0ada81606a978f748fb0d60cf77b";

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
  '9d7d25b4-f5cf-461b-8d07-f5f259550d00',
  'x-ms-ests-server',
  '2.1.12507.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvS49275TilBrSxy71qK_IU; expires=Wed, 23-Mar-2022 06:34:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevri_iWaMG5h7HqN4GsUBJb8kqlCL7DZ_yfZVBjltHdNFo8yORmxXIf53KhvGFx747MT59GevbSTqH9y69cFxR-zAfMr7bP89iybHO96kf8LDWzLKWFfzey8yl6vQU_1yRJSpBq86T9Iwtxv5cV8uBumci57pyEqO-GXi31EGdcz6ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 21 Feb 2022 06:34:17 GMT',
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
  '9d7d25b4-f5cf-461b-8d07-f5f25b550d00',
  'x-ms-ests-server',
  '2.1.12507.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Anq9XvX3eApItoeYGStVB7A; expires=Wed, 23-Mar-2022 06:34:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrx0xy-6VsbMObNXVG4iTtmT1vrqClsNRFyW4tRItDsgBOSIOAGnzHQqizLxTMEOaR44vtM2hfRRWvtDWNfefh6dUAiaNMm4L-nHTBmtHNITZiPvJvG3t0raROQZQntfQkoR4f_2QoSsJI4AYi4DYRyBiPeuOvd_vv6w5UfkEMOsQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 21 Feb 2022 06:34:17 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=123e23ec-aed3-4a61-9db9-21ccae18121a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9d7d25b4-f5cf-461b-8d07-f5f25c550d00',
  'x-ms-ests-server',
  '2.1.12507.13 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmzPIlQI26hHoFccVUE6HKnLj78gAQAAAGoppdkOAAAA; expires=Wed, 23-Mar-2022 06:34:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 21 Feb 2022 06:34:17 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.KeyVault/vaults/myvaultzzzz', {"location":"eastus","properties":{"tenantId":"88888888-8888-8888-8888-888888888888","sku":{"family":"A","name":"standard"},"accessPolicies":[{"tenantId":"88888888-8888-8888-8888-888888888888","objectId":"00000000-0000-0000-0000-000000000000","permissions":{"keys":["encrypt","decrypt","wrapKey","unwrapKey","sign","verify","get","list","create","update","import","delete","backup","restore","recover","purge"],"secrets":["get","list","set","delete","backup","restore","recover","purge"],"certificates":["get","list","delete","create","import","update","managecontacts","getissuers","listissuers","setissuers","deleteissuers","manageissuers","recover","purge"]}}],"enabledForDeployment":true,"enabledForDiskEncryption":true,"enabledForTemplateDeployment":true}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e7faffcfa27b375d9debdc4bf68ccbffc809e8f461f2db3454e48841fb6d72b7c3808839a94d53403c2d42ccf9a768dcfdaeca2f9e8d12ffe25a38f9a6bc267f1346b33fafba3699d676d3e7b724d8dcfb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff0181b2afbc11548e57abb2d01eedb7c72d7db3b7b3b7bbbdbbb7bdb3fb66e7dea39d878f7677c7f7eedffb296a5612625f54b3e2bc00246a9bef6444c07b44d14f77d139bd7670fee9749b28fde0fececeeef4fe34ebbd17c5c06f62d0201cf6b6f7088d4f1fdddb7fb4f7607cefc1fe4f7d44d4a05959e5755be4a0ce47cddb357e9c678ba20452c7044e67a169b3e52cab6778a9cd97d9b23d03873c20963838989c6f1f7c7abe4b2c919d134b6493edbd1931c4ceeeee6cc234cba6d3bc695e56842677f5bd5ffc358054939fcea7f2c68e3edbf4ffee3fe6a13768688ba269882ed4e72ffee86d7e4d3fbff751be9cd6d7ab961acc72f3db559dad8895e8b7f5d2fdde141720e9655e17e7f8fb2247dbb268f043a69a7e59af66f24bb1585535be9ae565ce9f4cb2e9dbf58a7e21b168ab1a1fd5f9b42280f4db6a5d5fe41f7d9fba213472e25dc22de8a1e13fde13d814f3790e7e604a87102d2cea901ad02f16673b8a45b6cc2e08eeb2cda684148f9aa8b826d9a53f00c8fd4518ba3f04b8fb5b00b9bf7bc8fe925f42f8121f4cca7cf6acaa9fe6abb2ba5ee44be2dab65ee7c17745f3f654e68da6b3fffd9b7cb12a09ff2118af49573c65fccce7ac2fbeaa0b62a779dbae9a47777dfd33e6dfc6d90fd6753e5ee6ed5d600d15066e2a9617af5bea8c5e7dbd26d6ce67f90cdfaf27c4e02ff2f6aaaadf1ed3e70d4dc047a7dc3f09ce","2ff97f003ccc0b8f56050000"], [
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
  'x-ms-client-request-id',
  'ce684a95-7aa6-4fb4-9154-3af273cecbf4',
  'x-ms-keyvault-service-version',
  '1.5.286.0',
  'x-ms-request-id',
  '7f7b5c6b-8774-4ad1-9394-12bc9684de77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'fb3027b5-62d5-4b64-86d3-11172b5adaf6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220221T063430Z:fb3027b5-62d5-4b64-86d3-11172b5adaf6',
  'Date',
  'Mon, 21 Feb 2022 06:34:29 GMT'
]);
