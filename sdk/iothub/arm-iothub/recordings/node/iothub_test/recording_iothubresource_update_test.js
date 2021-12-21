let nock = require('nock');

module.exports.hash = "e3cd214a3cbe23dd7ad2cb121caa5d1a";

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
  '4150cca7-f51d-4a39-827d-43dbafc10f00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsqrYJbCBPNGuofLlZaFOLg; expires=Sun, 16-Jan-2022 06:44:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr79VTas2biSySqB-BVP5p3cmM4P_w2iMLIIWCrKWYtDMBOzFnIf0Qfs6XTPvjr8dKukI3qORLoPnjeeoDkuHMBqIBOKtLM5um1zKDQVx4Gj3aZhJBMU3e3q20jn_TZprfPTsalua6gn62RiFm4EU1zRm0oaetEtWIfXBsocfZbYggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:26 GMT',
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
  '653645f0-3ec7-4ea4-98be-8ae41f150b00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Asi3yICY47FFgiKHmVy_Dmo; expires=Sun, 16-Jan-2022 06:44:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrhf6rAU7u8aeLCh2MYNFDHyIJvd9XiZQKP5Zedj9fBeZyQG-a-GVQFa0VgHtbi6IHvh5e7n2JfazXVaQNWORWclXe7R1PU7LiWOQKIvVazqaSEUgV4_NtxkHLbQ4401A0qkXKUF1p8R2XKuyW6XEwMh9T0OfLj0-Ubvo-usMEAMMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3f3f1031-f0d8-44ce-a07e-214989462ef3&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd3033c4a-b30b-4222-a25d-93df20770a00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkNvo0gZSkBAlVptCrkrVazLj78gAQAAAMooTtkOAAAA; expires=Sun, 16-Jan-2022 06:44:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:26 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac5f8b94b9f5f66e53adffde8978c3ef247cc34b8cda009a019f605864daf9971d3573975429fd06f4483555eb745ce7d1bbce88fefb9bfa8e52961997ef59a5ea8ab12a35bd5c522abaf09bfa0dd77097ed0aec9a7d572c62dbf4f4369b3169f1e4fdbe232a756d4fd65d1d0bbc5f2e2b57ef97a3d9de6f92c9fd1f7c5ea5951b679fd6a5d024342ea9cff7e91f104d4f431869a113ceeff985e5d6184c5ea8bac794b9fecdedb1defee3e18efde7f38be7f8fb158e6ed5555bf05ccd7794b607ff147b3fc3c5b972df062384ff3e53541c956abf2fa4df5644d9d9e2d4f2ff32566f074395b55c5b2fde8515baf73f4055004e766f4cab2baa20f86b1a3f99e574dab00220c36ce7eb0aef3ed99f0d498c642f0f20e6684cb2f960ff9b73a6fe95742e14db1c8cf964fb36bfa7897a89fd1cce3f3936a8de1ec791f9dcda8cdf73eda21e8bb1f11d156593b8f63442d72ed971a34934777ef4a9bed65b3edda6fef7eba7f6feffebdbded83070ff3e9647f277f306ef21ae398ac9bf155b19c55573ca2bb1ffd12a203b16d4b6c810118f884d22ffe48df79b26e7e629daf99ee849ffbf44db52aa6fa29d38008a37f366d556717f949b56cb36249928f8fb52b03e83c2bcb49367dfb0a9fa13f15f6dfcd7c41e315c1a20f45b4bfc89b86c0428ac1ed4c3ffa12dc411f19e431a7e843906a40d4a2395d66939258fd11416f720c5b710ca6f27753fec4ef4dd6bc69cbe3e6aca90e3edd81aa78f966f7dbd40f75bdcc99d35eb735130e024e9fca58d13d3e421f8408214c6d825e8877f317555b9c1722cffc2109f7dba7eb9a3fe874fa05816fa3a82cb2774ff39244bcbe56d6dadd41bf398f96443aff6a5556d9acd31bd380502eabf5ec4d25b4050e31702323b371629c9306e1c9a2d7bfd1219ce7594b0248d87ef4a25a627e17c5f24dd9fc247113c1a78f77c77bf429314b7595cf9efda2d9f279414a97788bde6edeae8191b2d46b2887b6c86bfcde66d093507ad36c954d8bf69abaa457c84291ece22fb20d625ab8e35ff2","4bfe1f97e5720713070000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '4998',
  'x-ms-request-id',
  '3f766c8b-3cbc-475e-9d39-036311c76ada',
  'x-ms-correlation-request-id',
  '3f766c8b-3cbc-475e-9d39-036311c76ada',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T064430Z:3f766c8b-3cbc-475e-9d39-036311c76ada',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 06:44:30 GMT'
]);
