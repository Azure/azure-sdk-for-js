let nock = require('nock');

module.exports.hash = "7a48373bbedccfca7512eef5d895bd41";

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
  '79bca180-7e9b-4281-95ff-85b4e3822600',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArF39yjbPAxNkptabJ3i9h8; expires=Fri, 26-Nov-2021 06:38:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXs0puNNIaYGhXC6S6Zzf26pMYE0FeHvVwOX_J4aG6aEP-Vmx0QOfnR2_b93qWI-v71-2Xz1_ZYYJllJH9cJWSNFL5ce6yNpBochtAIxJmwI0bmwZwxX4rIpAQfFSf5i6ORe7ls5x1rp8kODsiYmeHL5QTVo_mLvz39Vhpd5T_-MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:25 GMT',
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
  '2098487b-0f48-41e6-8c25-f80ff7cf2700',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkVP5boJYWBGh-YaBuYvbQU; expires=Fri, 26-Nov-2021 06:38:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZgv_iHe92TbUWH9wt4zp9tPv7XOECkJBz19UKqQ_ZUTJQ0TxHEIpAsrJRiNPE0G4AJGfZBmhJBxY-1YC-8y9jayfemuEbD3fdHAMdtRURMmNWM6uB68oTQIWG1HzaimFQCvxuDOUY_v-TFTcw3qoYpo73VSsZM5aaYuatk0G1GYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b1edd3d8-3588-4d3d-a29d-fb2ec5551b77&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '79bca180-7e9b-4281-95ff-85b4ea822600',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=As6OaRtapntFi3RrgX8Hiw0WPr5BAQAAAOHqCtkOAAAA; expires=Fri, 26-Nov-2021 06:38:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:26 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerService/managedClusters/myreourcexyz', {"tags":{"tier":"testing","archv3":""}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e7192a61f15b38f1ea51fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3936ad966c532af5fe7f56531cdef2eb2657691cf4eca35bd444d17d775ced0de5dffe0a311102bab69066c805e9e35edba91cf97d922c767fd37daeca2a16f30acf4a3ac9ece2fefd19f1ff197f46d91d7f8133816cb8b8fe8c35f826f3e6aaf570c7003b65f84d832c48f689cabbc26b0ae53fae8b2680869eae0759bb50cf7f57a3acdf3593ee3d7a851754590f55b7e2ffd685acdf0d747afd64bbc0be404bbf4a3b7eb495e2f7342fb27a96b828d76bbe3bd9df14305385b362febfcbc78876fb2b7cd4f37cdecad7e77fe8b66fc82f99826f37cb6fbe9de743c9faec642d771f683c5db83665c54fa52f683759dbfacea362b9ffdc4d317f1f757fcfd463017f9b27d5955e5cbba3a2f4aa6d3f7f08d8edacd2541e7c6f2227d31add6f4d7a374d77c70b9785dfc80db12e596b3ac9efdfe4f5feffdfe977bf695aa795a346fd1eaf327d46e77ef20fce68d9966994bfb1ee85be6addfe4cbd7f6db45f6ee653503e6bbbb3be643c3313f59d4ed3a2bbfc8a673e296d7d3accc5fe7adb0073d78f9c40c64c7bebd2896f653f359becc26657ebc6e2b4001073c4adb7a9d9bef6fc35868d6672dfa34c65c86bde8eb8a248564a2cedaaa1e60316ab55020afaf490416f6e3aa31447b5e2cd7efbccf5fff5e5fe1e3af2634d4b5fd7c4960ce1634015e4fc7bfd76b69b5bd7bb0b34f7cb037350238dbdedbd9db1defee8c77ef591842ac67672f5fd3dbe759d9e4fcc52fc1bfdfe7461f3522b82feb62392d5699e1406a2f54f9685a16c46f67acfcceb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff01134d48c66378a5caeff39a941f807c71f2fb1b0d48bf38d5f4fb8b7008f28afaab27c727f48e9de08f48bcafaafa6d0f4bf379b9be2898546056fa50a0414766b32759992da734ed6fd76841b3cfe2116bd2854fb32ac2f0e5ba9d104bcece5e82d3f54b22127dc66c2a1fc8f0e9f3fcfc3c9fb6c5651ebe27b26da59b1a7eb87161fa9225d94cdda8cd7921c4bbbb5a4fca627af6f2783623a84ddedcbd7f6f3a7d707e3ed9beb7bb738f26fc7c677b323b78b07dff4136c9b37b7bbb07f7cf79c2e961ae22bee21f4a0192b3d94931637342acb9b7bf3fde19efdcddfdd4105dd9cf6bc3ff792d4867ab71397be935d9ddb10daae9dbbc7e5217b30b07e7c1de78f7019a79902a9d032387fe84f32004699aea77c7245bac90315b46237d24f4516a1d934a69f0f547a7ccaa338060081f35cc603cb956713fc99a622a985803fbacce737e2b497f","c9ff036d0b8f1f63080000"], [
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
  'SOUTHEASTASIA:20211027T063830Z:5b632ba4-c521-4c45-8d14-87adbf66a5d2',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '5b632ba4-c521-4c45-8d14-87adbf66a5d2',
  'x-ms-request-id',
  'dbc9fe2b-1a60-4274-a517-d7a1ed79c9f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'nginx',
  'Date',
  'Wed, 27 Oct 2021 06:38:30 GMT'
]);
