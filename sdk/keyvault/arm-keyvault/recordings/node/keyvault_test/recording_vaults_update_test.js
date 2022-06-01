let nock = require('nock');

module.exports.hash = "25c02deb3922f3f44af759d390994741";

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
  'a73b2be4-50b0-4a77-a5a2-7a8c9ad11100',
  'x-ms-ests-server',
  '2.1.12261.22 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Agtbu2Uhsd5HtLUK7MICO84; expires=Wed, 16-Feb-2022 03:40:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrB_dA7zFqFwYUpwgC5WpJRbSPy8r3W1rJ5AvAXk2keq5DDKhW5PNgxF45-eATONoGtEL8qvfyKSzAhd7ru712ORqRVpXbvXBYi_SYpYGH7iyYD5jjW9NPemWQotxmw5qPSlOnbYn0McEMR3Vb1kHT8pBdlmTRVsIRJc60Y2Y2Z2YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 17 Jan 2022 03:40:57 GMT',
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
  'fa9321e2-b6a3-41da-9a3e-caa33bb31100',
  'x-ms-ests-server',
  '2.1.12261.22 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjFAVyWz-I1MlH0JsXq_SfI; expires=Wed, 16-Feb-2022 03:40:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFUPQzVPboiyOL17_cVPg97s95Ybo-HwHmPeHNL40uZqaRxP3eigYPF9Rx5r_MSXaQ2Ovtb-Yr49d1RtZF4i0cZltQ-7x4eB9_ST_JK2Gc1mKH_VjQeGKztigstj52AuufwtMW-NDZkjI5OFPVxfq7X8xjDhZ0JhIRRDF5NFQ0QogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 17 Jan 2022 03:40:58 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6795e80f-87b4-41a6-a98f-b21c6490c693&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd7cce6a8-899c-4837-be4a-a0ef0ad31100',
  'x-ms-ests-server',
  '2.1.12261.22 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApP192VhK0BCl6WawVmT2nnLj78gAQAAAEncdtkOAAAA; expires=Wed, 16-Feb-2022 03:40:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 17 Jan 2022 03:40:58 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.KeyVault/vaults/myvaultzzzz', {"properties":{"tenantId":"88888888-8888-8888-8888-888888888888","sku":{"family":"A","name":"standard"},"accessPolicies":[{"tenantId":"88888888-8888-8888-8888-888888888888","objectId":"00000000-0000-0000-0000-000000000000","permissions":{"keys":["encrypt","decrypt","wrapKey","unwrapKey","sign","verify","get","list","create","update","import","delete","backup","restore","recover","purge"],"secrets":["get","list","set","delete","backup","restore","recover","purge"],"certificates":["get","list","delete","create","import","update","managecontacts","getissuers","listissuers","setissuers","deleteissuers","manageissuers","recover","purge"]}}],"enabledForDeployment":true,"enabledForDiskEncryption":true,"enabledForTemplateDeployment":true}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e7faffcfa27b375d9debdc4bf68ccbffc809e8f461f2db3454e48841fb6d72b7c3808839a94d53403c2d42ccf9a768dcfdaeca2f9e8d12ffe25a38f9a6bc267f1346b33fafba3699d676d3e7b724d8dcfb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff0181b2afbc11548e57abb2d01eedb7c72d7db3b7b3b7bbbdbbb7bdb3fb66e7dea39d878f7677c7f7eedffb296a5612625f54b3e2bc00246a9bef6444c07b44d14f77d139bd7670fee9749b28fde0fececeeef4fe34ebbd17c5c06f62d0000edbbb0f80c6fecea3fb07e3073b84065183666595d76d91833a1f356fd7f8719e2d8a12481d13389d85a6cd96b3ac9ee1a5365f66cbf60c1cf28058e2e06072be7df0e9f92eb144764e2c914db6f766c4103bbbbbb309d32c9b4ef3a67959119adcd5f77ef1d700524d7e3a9fca1b3bfa6cd3ffbbff9887dea0a12d8aa621ba509fbff8a3b7f935fdfcde47f9725a5faf5a6a30cbcd6f5775b62256a2dfd64bf77b535c80a497795d9ce3ef8b1c6dcba2c10f996afa65bd9ac92fc56255d5f86a9697397f32c9a66fd72bfa85c4a2ad6a7c54e7d38a00d26fab757d917ff47dea86d0c8897709b7a08786ff784f6053cce739f881291d42b4b0a8436a40bf589ced2816d932bb20b8cb369b12523c6aa2e29a6497fe0020f71761e8fe10e0ee6f01e4feee21fb4b7e09e14b7c3029f3d9b3aa7e9aafcaea7a912f896bdb7a9d07df15cddb5399379acefef76ff2c5aa24fc8760bc265df194f1339fb3bef8aa2e889de66dbb6a1eddf5f5cf987f1b673f58d7f97899b77781355418b8a9585ebc6ea9337af5f59a583b9fe5337cbf9e1083bfc8dbabaa7e7b4c9f3734011f9d72ff2438bf","e4ff01dea3c75e56050000"], [
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
  '8f480a78-2322-4d9a-a9ab-e8f0f210072d',
  'x-ms-keyvault-service-version',
  '1.5.252.0',
  'x-ms-request-id',
  '8af65228-271b-4f4f-8a7f-a282a8cc76a8',
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
  '1198',
  'x-ms-correlation-request-id',
  'bfb7bb18-a56e-4de2-a0fe-6e9b86e2bbc1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220117T034059Z:bfb7bb18-a56e-4de2-a0fe-6e9b86e2bbc1',
  'Date',
  'Mon, 17 Jan 2022 03:40:58 GMT'
]);
