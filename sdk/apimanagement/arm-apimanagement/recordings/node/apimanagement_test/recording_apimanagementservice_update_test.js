let nock = require('nock');

module.exports.hash = "c2ab3c5609fb62b8e584c536f3c53006";

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
  '1306231f-1899-4d48-aeca-90014c472000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AquMKi6XBDhJorfhFEjYnwE; expires=Wed, 12-Jan-2022 04:04:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQSvoEaTbpf9jCIWzsvTtBrkahArfVGUrDM-hbc0YXVyqeVVkPh6vdA1nvve801keMNHwCJfFUQNDRXgdc2y3VMvwY_spSYYgSv86dNdPQDprhOhsBYYw3RFkc502NmpVUoHjIcEFRJLHqk6Z3mPmkbAy8QewTbaGfx6ANis7qfAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:41 GMT',
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
  'd23ce388-4b2d-4a91-bf43-5a2da3022100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aq9-d03XYJxAkKnllm2sm4M; expires=Wed, 12-Jan-2022 04:04:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_TTi8TSUlbWq0lrVn5wY9ZMeiF3dRejaqUh1JVBpAb51vvXrnxgWGo02HTi9ydEBgaudfZhgL579U5IlyyCe4B0LHR84qK2mQNyvEL1U3azoIZWldUGzWqC1SdfXqbAbQlWqp7ze770oyVfoo3kc7MJIAh6snrxt6dEgRWuTW88gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:41 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2920a777-9fbf-43f5-89d5-b319f493448c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a342d017-372f-49fe-b224-962c214f2000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApJDO_CVHNRDk3WaiY46oJYWPr5BAQAAAFq9SNkOAAAA; expires=Wed, 12-Jan-2022 04:04:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:41 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedfafa7aefa3d147cb6c911332dd8fdbeb153ebe011a1a6617cd478f7ef12f197d5456d30c43a1d74eb3a64dbf7a4d5fe7f43d7d70cccf93efacafabcfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d60bf5e4fa7793ecb67f47d9bd51779fb32d28abe9cd639fd3e3b6ebf6aa7f4c9decedeeef6eedef6eebd373bf71eeddd7fb4b7373eb8b7b7fff0debd9fa2d617d4f62abbfeaa067ef3b65d358fee86b33166ccb609f7f1326fdd2baff20bea3b2b37bcba9d13c5d7cdf6ceeeb8d6d63d68abaa6e3702194b8bde8bb3fc322f31612ff9fb4d106cd31e9085651ee2a44d205cc31e8c66bad8f4267ddd7b655e352d58fca45a9e1717eb9a7985b8ee7bbfd8b0384deebb6b6da9dc1582ed82cc97d38ab8e3040cccdc47af2cd76539fae86d7efd93d9ba6ccf48bce593a96bf4326b9aabaab65f2df30b625ffae2a42c68b001b8f3ac6cf2e06df3d62c3f470faf9bf2097133f1e3478fda7a4d6d49fa976dd15e0bb42806af5975d0f89eac0b42724963f1bf25c65e1365f0da2ff93eb10b446e7af6f2783623add34054bf473c4e2c3ddebdb73bdebb77f0115ad5c525bd1c340384d147d96c5680d859f95c1583fdeab2a8db7556bec85b22c8db606a4c93e9ba69ab05cd0df192d1134e197d97c64e927c8c990935d3f873c2866466fc3a9fae6ba2c79860b4d5b42a9bf19bb2d9dda1e13f037569f0df04bcdd6f101e4deabd0fc7efa458919e24ecc8b294f9d3bcd9fdf4e083813ec9a66f49c17ac862f01f8e6c1cee8713b50ff78388eb8121c540daeddba480f62c34327e214bbf11d5f2a25aa22b4fc8888f85bf6745934dca5c3bb0124f5ae62769f24810482a9ab6ce8a650bd65f144bc24cbf1218d4a98ae84a65cf09bd7ca1c81c93396ba8e38f4e97e812664da5f674395b55d403f5b5cca7103f6aa610caac3dafea85edf2a3a6bddcc3489bb76b6004a54a9f92d658ce32d26a34cc6c954d89f81f3ddaa566461f19803f205a58e8cd35b92d8ba7599b0194dad127d4f6a3f36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87f80becc2b4ae9e3d58a062c1ac47e7b4ca4238dd5b7ca3bbb0ff77677d82a9759d37e51cd687a008ddadf1281f0bd28167e939b51f925bf","e4ff014e8e54a5170a0000"], [
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
  '"AAAAAABJuyo="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96f0235c-2ea3-4e83-9b2c-c09bea943831',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6186',
  'x-ms-correlation-request-id',
  '49a816c4-c9a6-4681-88c2-86d48e56e4dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040443Z:49a816c4-c9a6-4681-88c2-86d48e56e4dd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2', {"properties":{"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"false"}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedfafa7aefa3d147cb6c911332dd8fdbeb153ebe011a1a6617cd478f7ef12f197d5456d30c43a1d74eb3a64dbf7a4d5fe7f43d7d70cccf93efacafabcfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d60bf5e4fa7793ecb67f47d9bd51779fb32d28abe9cd639fd3e3b6ebf6aa7f4c9decedeeef6eedef6eebd373bf71eeddd7fb4b7373eb8b7b7fff0debd9fa2d617d4f62abbfeaa067ef3b65d358fee86b33166ccb609f7f1326fdd2baff20bea3b2b37bcba9d13c5d7cdf6ceeeb8d6d63d68abaa6e3702194b8bde8bb3fc322f31612ff9fb4d106cd31e9085651ee2a44d205cc31e8c66bad8f4267ddd7b655e352d58fca45a9e1717eb9a7985b8ee7bbfd8b0384deebb6b6da9dc1582ed82cc97d38ab8e3040cccdc47af2cd76539fae86d7efd93d9ba6ccf48bce593a96bf4326b9aabaab65f2df30b625ffae2a42c68b001b8f3ac6cf2e06df3d62c3f470faf9bf2097133f1e3478fda7a4d6d49fa976dd15e0bb42806af5975d0f89eac0b42724963f1bf25c65e1365f0da2ff93eb10b446e7af6f2783623add34054bf473c4e2c3ddebdb73bdebb77f0115ad5c525bd1c340384d147d96c5680d859f95c1583fdeab2a8db7556bec85b22c8db606a4c93e9ba69ab05cd0df192d1134e197d97c64e927c8c990935d3f873c2866466fc3a9fae6ba2c79860b4d5b42a9bf19bb2d9dda1e13f037569f0df04bcdd6f101e4deabd0fc7efa458919e24ecc8b294f9d3bcd9fdf4e083813ec9a66f49c17ac862f01f8e6c1cee8713b50ff78388eb8121c540daeddba480f62c34327e214bbf11d5f2a25aa22b4fc8888f85bf6745934dca5c3bb0124f5ae62769f24810482a9ab6ce8a650bd65f144bc24cbf1218d4a98ae84a65cf09bd7ca1c81c93396ba8e38f4e97e812664da5f674395b55d403f5b5cca7103f6aa610caac3dafea85edf2a3a6bddcc3489bb76b6004a54a9f92d658ce32d26a34cc6c954d89f81f3ddaa566461f19803f205a58e8cd35b92d8ba7599b0194dad127d4f6a3f36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87f80becc2b4ae9e3d58a062c1ac47e7b4ca4238dd5b7ca3bbb0ff77677d82a9759d37e51cd687a008ddadf1281f0bd28167e939b51f925bf","e4ff014e8e54a5170a0000"], [
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
  '"AAAAAABJuyo="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4cd267d7-bd36-4a20-896b-72311def7738',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '4a5dd64f-25a3-4948-b647-ef8d79446965',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040443Z:4a5dd64f-25a3-4948-b647-ef8d79446965',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:43 GMT'
]);
