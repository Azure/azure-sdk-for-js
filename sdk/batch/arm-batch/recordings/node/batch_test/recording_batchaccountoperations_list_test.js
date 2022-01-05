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
  '32ea23f5-8af6-4214-946f-0c69f79c2000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Al99kZV4PERKkx4vb6o-_28; expires=Sun, 23-Jan-2022 02:18:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrguXW7n8ZW3arSQu42VUV6jnt_W5yN7HK9Z5vCwOiQb3vTN6cV2MBUhIpNoQpCpwMNhQ6Sc6ChXIT2dBi5D27iKszawcXhN9nT6uUHLL-p7jvxX4fFUq8ztDLDbL3d42F9YiAvTyxYpCGydjyk6WW2AKRwj-RkVhWctCfp-CWM0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:53 GMT',
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
  'f480e226-70a1-4283-a533-9f5eb63d2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiXU0ibmSeVBrfQiJoSWmSA; expires=Sun, 23-Jan-2022 02:18:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrsrd48VCrmITJw91Rs2Po2nCQMde-XNENXoMHBD-ed3PuJw2xqLnmOZy2lfECPtUGjYtnGbeAX1UOKiW3yTtKd1Cd9QkzNpPt6-6_p4h146ev0J5gpzhUXF8MPmPIJ-SGQWcjiSPWJP5QqygjZr2bt0RcQ_JkCg-HLxHVYruFaaYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=af573074-f874-49de-bffe-9445e0abaa84&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7777f699-653d-4eb0-b230-12e580b51900',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Agry7jFLNshJrANwoeqE2QvLj78gAQAAAA4lV9kOAAAA; expires=Sun, 23-Jan-2022 02:18:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:54 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/batchAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e327593b9ddf9de0dfe3e9b45a2f5bbc90c9afefdebdfb68f4d1325b10421f753e6daf57f87423246a5656d30ca853d33c6bda353e233c5679dd1679f3d1a35ffc91423d5dce5655b16ca9a1dfd358de1a33dc71f683759d8fa7d542a05c160d812e9617afdbac0536afd7d3699ecff2197d4fff16d4773e3ba9eafc27d6559b7df4e8fece4eec8b9779fd935f3ccb164579cd94d711376db69c65f5ecf8724fbf1c7d3435ef30b05f32ea357e1a6fbc773fdef85eac711cf2e9fb347efafabdf078fd3eb04fdfabf5b3014c76a3ad5f9cc4daeeedc79afee4ad9b3e7d7ab91f6b1cc7e12991e33d9a9fbe17f0d3f7037ebcf3fb1f3f88358f363ef8fd8f77776fdbfae96d1b7e7e53c349d614d3e39b5a1970cf6edbf0c54fbeacab4575ebe627efd5fcdbb76ef85e60bf787ddb964f6fddf2d9ad5b7e7eeb96cfdfa3655c80636d5f9cbc4fe3db530070a33a27d6f8db4f6e0df7db27b76efae227df0b85bab93d219e1ec75542bced80fe88353e7d0fc0a7ef03f88bf798e6d3b3dbd30d44be1109b2f6dc387d714238dffbfddfeca737bd62e0ffdea76743fad76fee7a60729356ddd9b9751f4f89576f4d9c6f3f790fe2bcbc35b33efbbdbf78fa9303adbf7f830b74ba3cafc87b24efb3add7395cb8ab977551d5457b6d9bb3b1271facaa4afd9b2834225fae2d2ef3ef5493e3e58cfe7d3d9de7b375695eb9c74dd66df5baadeaec82f0fdc58430ffaa1ee31975fab3eef26aef77c3aef1927ee2bc4f225d9935edef955fbfbe5e4e09b7bd9dbdddedddbdedbdfd373b7b8f760f1eed7f3a7ef8e9fd9dfb7bf77f8a1ad3e0e6f9b2056d09f72faa198d919889a11290e6a35f22343b2e8d5fac6dd8797e9dd797c5342738abf5a42ca62ff2f6aaaadf12827943aef247a7cb6c52d2bc8c3eca97d3fa9ae9031abe25f478f4d4c60d9341a2c38c3abbca67c73ddc08e6f73e7a3dcfea7c46c811d8e3e3a7f4ef9bac791b367e53bdcd971f7d9f60112de9d396dce45f6c228017d532ffe897fc92ef","ff92ff07d291cf0cbc0c0000"], [
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
  '11988',
  'x-ms-request-id',
  'd23b8193-aaa5-42b4-a51a-4630f1668ada',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '6a31705e-9b00-4c00-9800-b59629331a71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021854Z:6a31705e-9b00-4c00-9800-b59629331a71',
  'Date',
  'Fri, 24 Dec 2021 02:18:54 GMT'
]);
