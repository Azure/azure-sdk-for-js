let nock = require('nock');

module.exports.hash = "3d002ffb633f8952a71c359b5b5d1db7";

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
  'b3c86951-a9f7-4277-be0c-141e5d6e1700',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AoW7cAd2-XNPs2K_cB6ap2Y; expires=Sun, 19-Dec-2021 07:07:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevresUw1OzxEY5kULPKC5Wg3CIk2qWI44l88VuPdeRjTokiWA0UB0AO4m0LYDI9AkQDiTcwZbOkNqdQPGj-uVROKx8LVWOSn0EIaG0ag-7XhsqPEEuDMqKXfXjhivH8VaCVkaEen-OcwPtH1jH-NFTtM6zpDUyTqYz5WgYsVK79dNogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:25 GMT',
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
  'b7b271c6-fddd-4f57-a418-98cb75243700',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiN7BR2UmqNLgNHvLGba_bE; expires=Sun, 19-Dec-2021 07:07:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrb1yIsDmorDyPVXdKRJ4SIQg-Asvs9pi9VU8asIhlnfYmhhI-pHgSAS9LWgWFJELAe7z_wu0gWnJkGcqxRIdrJwMvs7Oq3bO3NVuZxSwXYW2AV8xJoZGsyQTeujKt2krgK0r5DIAvS3w03-kkeDZTtbnUZLLsWbai2L3LZ_0bYZAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c2c6bf33-9ab3-4948-8348-d839619a8dd1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f2cd5188-710b-40eb-b71f-1e616f891900',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtQtFMdZ_xBCgjdvuCndpf4WPr5BAQAAAC5EKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:25 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/batchAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e327593b9ddf9de0dfe3e9b45a2f5bbc90c9afefdebdfb68f4d1325b10421f753e6daf57f87423246a5656d30ca853d33c6bda353e233c5679dd1679f3d1a35ffc91423d5dce5655b16ca9a1dfd358de1a33dc71f683759d8fa7d542a05c160d812e9617afdbac0536afd7d3699ecff2197d4fff16d4773e3ba9eafc27d6559b7df4e8fece4eec8b9779fd935f3ccb164579cd94d711376db69c65f5ecf8724fbf1c7d3435ef30b05f32ea357e1a6fbc773fdef85eac711cf2e9fb347efafabdf078fd3eb04fdfabf5b3014c76a3ad5f9cc4daeeedc79afee4ad9b3e7d7ab91f6b1cc7e12991e33d9a9fbe17f0d3f7037ebcf3fb1f3f88358f363ef8fd8f77776fdbfae96d1b7e7e53c349d614d3e39b5a1970cf6edbf0c54fbeacab4575ebe627efd5fcdbb76ef85e60bf787ddb964f6fddf2d9ad5b7e7eeb96cfdfa3655c80636d5f9cbc4fe3db530070a33a27d6f8db4f6e0df7db27b76efae227df0b85bab93d219e1ec75542bced80fe88353e7d0fc0a7ef03f88bf798e6d3b3dbd30d44be1109b2f6dc387d714238dffbfddfeca737bd62e0ffdea76743fad76fee7a60729356ddd9b9751f4f89576f4d9c6f3f790fe2bcbc35b33efbbdbf78fa9303adbf7f830b74ba3cafc87b24efb3add7395cb8ab977551d5457b6d9bb3b1271facaa4afd9b2834225fae2d2ef3ef5493e3e58cfe7d3d9de7b375695eb9c74dd66df5baadeaec82f0fdc58430ffaa1ee31975fab3eef26aef77c3aef1927ee2bc4f225d9935edef955fbfbe5e4e09b7bd9dbddded5dfadfc3373b0f1ed1fff676c6bbfbf7761fecfe14b5a5b1cdf3650bd212ea5f54331a22f112032518cd47bf4448765c1ab758dbb0effc3aaf2f8b694e7056eb49594c5fe4ed5555bf25fcf2863ce58f4e97d9a4a469197d942fa7f5359307247c4bd8f1e0a98d1b2583448719757695cf8e7bb811ccef7df47a9ed5f98c9023b0c7c74fe9df3759f3366cfca67a9b2f3ffa3ec12252d2a72d79c9bfd804002faa65fed12ff925dfff25","ff0fa0c5f849bb0c0000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-request-id',
  '1e248aae-2bb1-4f94-8d81-bae7b661a785',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'e7a0c548-2843-47f6-b18e-71473120062a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070727Z:e7a0c548-2843-47f6-b18e-71473120062a',
  'Date',
  'Fri, 19 Nov 2021 07:07:26 GMT'
]);
