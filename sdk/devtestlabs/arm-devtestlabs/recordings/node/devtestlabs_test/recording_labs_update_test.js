let nock = require('nock');

module.exports.hash = "82057951557249ed6da6ade36d39762c";

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
  '7950ab3f-e40b-4ec0-b62e-34883cc70100',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmyHmfoDNLJLooUfx770s6E; expires=Sat, 01-Jan-2022 02:08:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryrjAQV9zb1tluT_hxt5WlfSTfDbo9b8xpCjsg91FMhJcPuxZibC1RgZDw0HPmQ0q1Rvbc6d3CIkgthvXP7FcPyS8H5jvj9WfbQGRhUabw4BTC7aryt-S5qsQI0Q0JrpqTjpJqpKzmw3pUsxkhEsJhao6PQiurIOEJJPUCUBQzEwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 02:08:35 GMT',
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
  'f2ff0da2-38ee-45d7-aa40-0aac7d370000',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhkO1QZhAEJJgwhvmxg26ns; expires=Sat, 01-Jan-2022 02:08:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYCBKdrpfE0cepENj-iwhbd7VbX5CZm2X7q5RfEZLfKMDvw9-btKB0KWXzZr_5x00e_gx-bM1j7EnIkkChgz0qA5A7d2lZlkWd_rBCF3KNLCRxJ3M47Engwg6LlI3vrrhx2a-eq2Jqpe-cAoAB8BgIwEUheBBdpDYdKaXkHm_AOUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 02:08:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=22ed502d-6c0e-457e-a494-d01508875bdd&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8a78a2d2-f801-416d-882b-cb3224530000',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvMBn0g-mOZHj04aPvdrBxAWPr5BAQAAAKMhOtkOAAAA; expires=Sat, 01-Jan-2022 02:08:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 02:08:35 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DevTestLab/labs/mylabsxxx', {"tags":{"tag1":"vaue1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef14797d9ba6c5f648bfca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbd4cb6531cb6bfaa898d655539db7e3b7f935777797ffa56faecb6cd2bc7bf76effc1fefd8f461fd15fafdbaace2ef237d72b20f4b2ce17c57a415f2db2e52ca3efae8f09f3f36cda36afb4e3b359f3bc58aedf7df4e87bdfbfa1dd778be5acbaa261a3e5b4ceb3369f3da57fa8a7bd9dbdddedddbded9dbd373b7b8f763e7db4b73b7eb8f360f7d3bd7b9fecec3cdad9211c56820dbd913d2d9ab704e723fa994dca7c46dfe6cbcba2ae968b7cd9becceb45d13444446af22acf880cd4205b2eabf5729aa30528df166d89aee9ab4556bf25ccd09cfeca97023304ff6e55d4f4dba3f3ac6cf25f32faa859af5655cd90a22ff830a939cf07502a9617af5b19f4ebf5749ae7336ebe5e16bf684d4422e48af382107ef4d16c67ef7c7fba3fdd3ed89f3ea4f93fc7d4efdfdf3edfd9bf97ddbf777e7e7f2707e8023ddffd59e69d597e89efca6c7297fe4fdf18de21dc97c2befe47ad30d017f6fda7f9e51b7affb9be4f4dca6a9a01596a96674dbbc6676d7641d34a73935decd2e7c4a7f9ee47bfe497","fc3fac0e49e735030000"], [
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
  '522aa7b7-79fc-46d3-ab4e-844cefe8f176',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'Request-Context',
  'appId=cid-v1:9e8cebda-9c88-460b-b55d-9410c4648f9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-correlation-request-id',
  '522aa7b7-79fc-46d3-ab4e-844cefe8f176',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211202T020841Z:522aa7b7-79fc-46d3-ab4e-844cefe8f176',
  'Date',
  'Thu, 02 Dec 2021 02:08:40 GMT'
]);
