let nock = require('nock');

module.exports.hash = "d3b11a5ef39be7f7b29bab46c27c9d07";

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
  'e7e3df85-db65-4e20-b515-394c9adf1200',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AojNUonyMGxOo91RA_3jthk; expires=Sat, 27-Nov-2021 07:21:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrs0pNvPrg4dzIuNDMrePE3VGt4rfyYVQRpQ1cW2p2K5oVVCzv28MH9rfwCiPkA4o3EoyE_nYsYNUPfNvtvHLeNgHCpCKhrxa1k6eyP2LqiH4bzZEdn9ebCkgoFFHJocAdT3ed07mgQMIzR9Kj1kbXZy5OrnJxyvDVmBkMpiLkk2kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 07:21:38 GMT',
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
  '9e3226c4-b53d-4b52-ba07-a9380ac82000',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApcLN6_1BUtGgKM7QZH4qVA; expires=Sat, 27-Nov-2021 07:21:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrw9dtpdI4DuSmKMX9K_lCIomWL8ciRd6USXuwRWiFgFadiRdKRW5A_-9rlwT-SvgAUIlB928xDzCdJIXpZTyHubq_8PF02Lqgq3EdWMeFSl70YRpdx0Sz47qwfFrwIyjI-AmEFqXyYUEnlwc4i0kYKM9OXy6LIortdZSfu4_tzPwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 07:21:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ab291b83-f848-4fe4-9c0d-06536a18a39a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '71eb1519-a097-4cde-ad06-3f5290a60d00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag-h0ZeTz0dLu8L4maYgNKIWPr5BAQAAAINGDNkOAAAA; expires=Sat, 27-Nov-2021 07:21:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 07:21:39 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/storageaccountzzzxxx', {"sku":{"name":"Standard_GRS"},"kind":"StorageV2","location":"westeurope","tags":{"key1":"value1","key2":"value2"},"properties":{"encryption":{"services":{"blob":{"enabled":true,"keyType":"Account"},"file":{"enabled":true,"keyType":"Account"}},"keySource":"Microsoft.Storage"}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a3d76db69c65f5ecf7fffcd5eb8f461fb5455e7b9f7ef44b461fbd2d9633fea8aab38bfc27f7a855810fee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc7dae1dd467e1e4fa7d57ad936e6ef4cfefec10f7ef0eedd3bc249c733f06d7bbdc2b73742a7a66535cd30246a7e45b8e5ebbaa277094476d180706ff3eb5dfaee322bd7f92e7d4e7fef99bff740301acc2aaf8992a6f9499d33c4370550e48f00616f676f777b77677befe0cdcefd47fb9f3eda3d183f7c78efe1c1c3fd9f727037b6e2de8acbaccd4f97b355552cdb936ab9cca7e88d7affdef7892e797b55d56f8fa7257df08b3f9a5cafb2867efbe8f807eb3a7f9dd797c594101d7d7459d4ed3a2b5f48f357eb923e6500c5cafb63969f67ebb23de61e00a52cab2ba0d1ac57abaa6e9b6fb7edaa795367e7e7c5f4cb6579fdd1a3b65ee7a38ff2e5b4be665601168de9977e3f2f4a439537324b3a198454becc26654edc2640caac694fe523a165843a0fc73b3b0f3fdddddd61ea4cca6af2b3049ca013d4d7cccfd4b8c75ae89ed8306f9a372254dfaed02b71c765d1101d8ae50589598b775fafa95d3e235c461f4d036689e070303e38d8ff74e7fe033009cdfe22abafcdec334167e7f4e3a33926e2d15dc3e08409862d0231a626e36955e7e32b12eeeaaa191397dc25705739516bf3ab3ff8744cada26f0bb137bf8e36d1977fd13a5f63c01bdfe646d1d75b4cdc4daf73a3e8ebc2849bdf469bc8cb34cd3a0bcf07344743d3bc6ebe3c7f29cde8ebec322b4a20836ff3690565ebbfbe24519af7de7f6d5a520b07e197","fc92ff070880f33ad4050000"], [
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
  'x-ms-request-id',
  'af5c4739-2c85-4fb3-abb1-c37f1dfaebb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'c08257fe-a90c-4e8f-8f4c-2f7a657fd6b8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211028T072145Z:c08257fe-a90c-4e8f-8f4c-2f7a657fd6b8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 07:21:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Media/mediaservices/mymediaxxx', {"location":"eastus","properties":{"storageAccounts":[{"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/storageaccountzzzxxx","type":"Primary"}]}})
  .query(true)
  .reply(201, {"name":"mymediaxxx","id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Media/mediaservices/mymediaxxx","type":"Microsoft.Media/mediaservices","location":"East US","properties":{"mediaServiceId":"b019e203-4336-4509-bf46-58ba662a6126","storageAccounts":[{"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/storageaccountzzzxxx","type":"Primary"}],"storageAuthentication":"System","encryption":{"type":"SystemKey"},"keyDelivery":{"accessControl":{"defaultAction":"Allow","ipAllowList":[]}},"publicNetworkAccess":"Enabled"},"systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-10-28T07:21:52.2975518Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-10-28T07:21:52.2975518Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1051',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'x-ms-request-id',
  '6b198b8d-f4ab-4895-ac31-8ad4447e6065',
  'x-ms-client-request-id',
  '6d8f64d1-17ea-486d-95e3-65ff1068b65a',
  'OData-Version',
  '4.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'f616bfd4-eb75-453c-9b15-50a88e760825',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211028T072155Z:f616bfd4-eb75-453c-9b15-50a88e760825',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 07:21:55 GMT'
]);
