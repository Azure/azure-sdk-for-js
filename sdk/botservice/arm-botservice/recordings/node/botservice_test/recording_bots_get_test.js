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
  '47af5f47-bd6e-4acd-b8d8-aa96bda91f00',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AucUA25AWXJJqjufXjwhKFI; expires=Sun, 23-Jan-2022 02:40:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGx9r0UFwXU_gkfF2-XiRxhkrUFrOPxW6HNhJtGAGsAmqm-TwtQLR531cq5GDmCwlEMiSOZSz8CTEIhVHgFjJ4Uj-hQ5v-onT0cXPDl4_5jhYE1UPmKsESMbbPnji0KiFRCzor6yW8ir17ZYehZfQGNytvTe9MaJShURpU_cyTZYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:40:14 GMT',
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
  'b408faf0-040e-4696-86b6-6722c59d2000',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtD4LXY-O-RNk6-kRVfqr8g; expires=Sun, 23-Jan-2022 02:40:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrS4i1Q2yS_I9yqZfKWDDaqn318zx1K5j2MCSHEbmu_044TGBQCnMrio19eceGdD0fL1wnDsCSPTj0TNyiGdSLz1h38lgJJScgg1S-3YdSaC3EyddXjwEuTuXQfFqueIYz0pVlhHyF7xqpD10yVcEF_Ogy_IxzW7wJpCOCUKshuH0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:40:14 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6250a8cb-ff84-4f52-81a4-42b0b3c77aff&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8efa0660-ddf1-4551-9d50-495723fc2400',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkZDye-tmQlDn-PM96Mpna_Lj78gAQAAAA8qV9kOAAAA; expires=Sun, 23-Jan-2022 02:40:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:40:15 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.BotService/botServices/mybotxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f54edebbcbe2ca6f9dd89fd15efd05fefdebdfb68f4d1325be48488f7497bbdc2273701a196799b5d50cbdff7a3fb9feeec1ee4937bdb3bf46cef1ed03ff4cbcef6a7bbd3fbf7eeed4ce9f79ddff7237aa3aca619864a6f5d94d5242be9b3e6edfaa347bfd820f27af7a35f32fae86db104799ad95b6a40bd3468413f77e9c3cbac5ce7bbf2f99ef97b0f6f11055679dd16841c359f15cdaaccae5f640cb79d174d4affcb52102ba5811084596e894f4ddeccf3d4fb24adced3963e92a6c5b45a7e5597d46cdeb6abe6d1ddbbb36ada8ce9cbf39a7ab8aaeab7e369b5b8dbb434c0e9dd597eb9aaea362bef4ecb225fb6778b4576913720e0b67d617b969f67ebb21daf9617d445be9cadaa62d97a7d4c8ae505835de44dc300a8dda2c98e57ab3310687f37dbdbdb993cdcfef4fe83ddedfdf39dc9f66432dbdbdebf77be3bdd9d1dec9ddf07a5e48d37f9325bb6786fb92e4bfb294fb7ffc917afcf5e298fb9c634a0bc0479a9c1d9b2292ee6edef955f130af71fdedfbd37c966dbbb3b19f1ec6c7f777bb23fdbd99eec4eefed4f3fcdceefef658442e4fd867e2d0b610874f41171f9bdfd83fd7cfbdef96cb2bd3fb99f6f3fcc660fb61fee4f66f9bdbdfc7eb6372150e5bac0ab67339ae6ef7ddfd1ed27f3ba215004e8de7887dad18c9d1717eb3a9f9dccb3e5322fd1fea3ab7c329d67ed47fc623629e3df12c2459d4fdbb258e6685a344fa303288808af739ab2b65ee768f6baadf36c41d3f67abd0207e434b0f3ac6ce8cb663acf17d99b3a5b36e755bde0713b9c77c7f7a8d7d57a5216cd9cde3f21bc89710a7ad7ccc12a03e7b4f48af9242b4beabda5e6f6a345b62cce89c59959e5a3a6ad6a629efea42e8a8b9ad17853bdcd0909f9b4684e16f9dbd32513c7623fa5cf68b03f0986f560134596df2ddaf9b76902cc67d96af5326b1a62f199ff71d19c355599f9242119452fcf492d94c7eb766ebf406fa7cb697dcda2f89a846a4d23fce8cbf37310099a0e64a371e32be2df8f5eafa7d39c28368322f841b5840ef8def7","7fc9ff0378d3a7a368050000"], [
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
  '"56018eb3-0000-1800-0000-61c5330c0000"',
  'Vary',
  'Accept-Encoding,Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10815',
  'x-ms-request-id',
  'f8db242a-f7f7-4d80-94f5-eeba0116cac6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '2018cee1-9e31-4673-b38f-bc0069d72612',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T024015Z:2018cee1-9e31-4673-b38f-bc0069d72612',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Dec 2021 02:40:15 GMT'
]);
