let nock = require('nock');

module.exports.hash = "f19b2d5753862003f4ce457e11f5a334";

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
  '861ea296-1c2c-49dd-984c-64b159840000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At0NQLvyJkZNiKDiLC6ZyKU; expires=Sat, 08-Jan-2022 02:14:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfZTRIQJxMViI3chGD9H5piRJh9NTPwdtAhkrbIMqB67JKRL1U8WZpY27cEEb4ioTH6DmFc1HCEJLZMNxG8J__-UURBbY-vcEmBtWRdSkuNF-F_wNJAyhLOWR_myRqlqNa8r3lG_QGFv3f0zb93u1zTpN1Mcmp7jyJCZokCmBiHogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:46 GMT',
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
  '35c844ca-d564-432c-ba13-b3e983af0000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlTHYG5pjvlAj0b2fPXXm1o; expires=Sat, 08-Jan-2022 02:14:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJCVCEnQ-kNARlwUDnirqyWmuAw-GE3b4XYUn9E0pqhb5WQJ8je7EeMKYBdsu3nT_vwnnA1NLZEpq1vA9H4uKg0NwuR2g4uMMWee9l35BFqY9Lhwi28mmKn3YiLo0SoTT_SM31OD6wwlcaI09Lepo86FJead67vK1upWuGSeBLacgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9390c601-fbff-4116-83aa-f721bfa6fafe&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'dcd37a9a-d598-498a-ac0d-3772144a0000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgtcSsSr0d9OkIhvOj4bScUWPr5BAQAAAJZdQ9kOAAAA; expires=Sat, 08-Jan-2022 02:14:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:47 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerService/managedClusters/myreourcexyz', {"tags":{"tier":"testing","archv3":""}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e7192a61f15b38f1ea51fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3936ad966c532af5fe7f56531cdef2eb2657691cf4eca35bd444d17d775ced0de5dffe0a311102bab69066c805e9e35edba91cf97d922c767fd37daeca2a16f30acf4a3ac9ece2fefd19f1ff197f46d91d7f8133816cb8b8fe8c35f826f3e6aaf570c7003b65f84d832c48f689cabbc26b0ae53fae8b2680869eae0759bb50cf7f57a3acdf3593ee3d7a851754590f55b7e2ffd685acdf0d747afd64bbc0be404bbf4a3b7eb495e2f7342fb27a96b828d76bbe3bd9df14305385b362febfcbc78876fb2b7cd4f37cdecad7e77fe8b66fc82f9787be7fefd7cf2f0e07c3c9faec642d771f683c5db83665c54fa52f683759dbfacea362b9ffdc4d317f1f757fcfd463017f9b27d5955e5cbba3a2f4aa6d3f7f08d8edacd2541e7c6f2227d31add6f4d7a374d77c70b9785dfc80db12e596b3ac9efdfe4f5feffdfe977bf695aa795a346fd1eaf327d46e77ef20fce68d9966994bfb1ee85be6addfe4cbd7f6db45f6ee653503e6bbbb3be643c3313f59d4ed3a2bbfc8a673e296d7d3accc5fe7adb0073d78f9c40c64c7bebd2896f653f359becc26657ebc6e2b4001073c4adb7a9d9bef6fc35868d6672dfa34c65c86bde8eb8a248564a2cedaaa1e60316ab55020afaf490416f6e3aa31447b5e2cd7efbccf5fff5e5fe1e3af2634d4b5fd7c4960ce1634015e4fc7bfd76b69b5bd7bb0b34f7cb037350238dbdedbd9db1defee8e773eb5308458cfce5ebea6b7cfb3b2c9f98b5f827fbfcf8d3e6a44705fd6c5725aac32c381d45ea8f2d1b42c88dfce58f99d67fb0fb2dd7b3bdbe7d9fde9f6fe6cb2b3fd703abdbf3d997e7a7fe7fef460ffc1fe03269a908cc7f04a95dfe735293f00f9e2e4f7371a907e71aae9f717e110e415f5574f8e4fe81d3bc11f91785f55f5db1e96e6f3727d5130a9c0acf4a140838ecc664fb2325b4e69dadfaed182669fc523d6a40b9f665584e1cb753b21969c9dbd04a7eb974424fa8cd9543e90e1d3e7f9f9793e6d8bcb3c7c4f64db4a3735fc70e3c2f4254bb299ba519bf342887777b59e94c5f4ece5f16c46509bbcb99bdd3f9fdebbf7903078b03fdbdedfdf39a709fff4def6defede6e36cbf2dd9d5c269c1ee62ae22bfea11420399b9d14333627bb3be3bdfdfdf1ce78e7eeae6151c37e5e1bfecf6b413a5b8dcbd94bafc9ee8e6d504ddfe6f593ba985d38380ff6c6bb0fd0cc8354e91c1839f427dcb4517cbd4942871edefca1c84e807de70dfeafd7be583dcb16050994dffaece5e5be36c3bf4239e2b777c724e06c15d09ad4227dce5f7ed4300333f358c3f0246b8aa98cc21af067759e0332cdcc","2ff97f006c238b67c3080000"], [
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
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T021453Z:5b276830-6d40-4518-b1aa-7c5fee296139',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '5b276830-6d40-4518-b1aa-7c5fee296139',
  'x-ms-request-id',
  'f55daa56-7ad0-45cb-84a9-d72b35418f18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'nginx',
  'Date',
  'Thu, 09 Dec 2021 02:14:52 GMT'
]);
