let nock = require('nock');

module.exports.hash = "daa28e891c2c76bbcb338d13dbfcf750";

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
  'f3edfea5-2534-40e9-bc13-f4ee47cc8600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuOfk344ff5Lm-GIDMTpVx0; expires=Sat, 05-Feb-2022 03:11:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBMhObAn4wwgQDLpIBtdTOHO-hLQzvnGZ9a48GjP9mYx_DNXdwGsUV6LbnGlVo-7oM3IzOJXDEtqIVbObh68n3UHUTHNF_U866v_G8C-egRBO33y0AdKYgV01umVVroHFMVTijiGqVG_j_4EPPZOHXj3hRXn5YOzfIFkrBv7tSaUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:11:07 GMT',
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
  '89e2e4b5-6ede-4472-8671-6d7ef26b0800',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ark47qff-hBJkPDWqv4BM5g; expires=Sat, 05-Feb-2022 03:11:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhjT8Uoh-imw2lT2LTPhMotw4RmudF6lMrkvroD58Lqe0aCy_40ckOGI9TEK1_ChJo0oAqKbRsJSMz8SNhiiMpakwmqJae5lDDCdiGxS0jpGaJLGAC3QQTZMXUzEmkKNsUS5EqvW2BpMeVK-WRzsywFZ0ycUchJBMDNZzIrcuktogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:11:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fb78dec8-820f-4d36-84ef-6232aef14b90&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '70f2d6e6-a657-4463-8780-7124ace69000',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtvDdcWBw3BLsZbVF4MkwMDLj78gAQAAAMtUaNkOAAAA; expires=Sat, 05-Feb-2022 03:11:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:11:07 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.VirtualMachineImages/imageTemplates/myimageTemplatexxxz')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e71927eb4aaab555eb745de7cf428a50fd28f9a6a5d4f73fd2bfda8586417f9d98cfefee86eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff76e9d0bbccfeb6abd6aee2eae7fba69f3a6bd4bfd5e16b3bc6eee7e514cebaaa9cedbf149b558addbfc2e7789b6fc4b96651f8d1895f67a05bc3efa225bd2e7b3337cfb117df34bf0f547d375d3568be20768f23dfa40f04f3f5a660b7cf4d1eb795e96e9896955a7a7efb2c5aacc05388d9b47f6555da0f1bc6d57cda3bb772f8a76be9e8ca7d5e2eef10fd6757e37c3bfdbbf685d4cdf366d56b7db6d4e40321ad3dd49594dee2e321a5f7dd735a071d80112181ee0e5627bd11477a5c7e66eb1a49665b99d2d67dbf57ab93d2d8bedbd7133b798cdb3bdfb9f9ecc7302b95e00bdbdf3dd7b3b937bd9e4e0fe838793f3fd87b3fbe7e7d9fee4def9cea793fbbb3bf70e669f3e3c98dc9bdd9bed9eefef7dfae9f96e3e393fb837d9cbee4d1ecc760d644351a60d4899fe12fae7fbf8f6a359d1b47531217ca9854f501a54719e4ddb37d985611a7a3e6ab38b174aeacbac5cf3cc103cc0a26f792aff5fc146e9476535cdd03790c969bed68df986a8ffe5baa5b7cd48f8d5dfbf687fff5551fffe3db27519d1a31e23d65027c5f2e2754bfc81f6afd7d3699ecff21903fa68b22ecad99b629157ebf66cf945b124ac41d19d84c9f6110d6cd916ed357d0422db6ebf6af2fab8698a8ba581b4f63e3993b79c447f18c52f6e41714307e9f9fa6e1c1d82415c8f7950bc40a562392d5659299cb1bfbb3bdd994c77b6f3dddd6c7bffe15ebe9de5d37bdbd3839d83d983fd7b0f1fde3be001d3ab24240458defb746f763e7d983fdc7eb8373ddfdedfdf3bd8ce76a6f7b7f77626f7679f4ef3d9c1fd033b3ff47fa52e5ebdfbb34c9a9f2cea769d955f64d379b1cc995348e0f1e38d551ccaa1e68377efdefd00a3b49a6be87bc30fefd51bbf19970088b0611afcbe4bbf7f74f6e6f77f238c8f8ff6e4a3bddfffcd1e11f49724bf","e4ff01faa5cf6944060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-correlation-request-id',
  'a1152c5a-7f28-4d44-aa6b-4b28a4a05526',
  'x-ms-request-id',
  'c24f6348-4286-4ba3-85d0-0c013d921008',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'nginx',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031108Z:a1152c5a-7f28-4d44-aa6b-4b28a4a05526',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:11:08 GMT'
]);
