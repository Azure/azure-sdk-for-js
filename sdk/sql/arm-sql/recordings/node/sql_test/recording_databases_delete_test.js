let nock = require('nock');

module.exports.hash = "b940acbe255cadb97fa7b66280e08853";

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
  '3f76efec-d9f9-4647-86a7-ec15c09c3f00',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao0KVSaZj1FDneORJhrG9EY; expires=Thu, 30-Dec-2021 08:41:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjsXNrPzww1cWO_rm_s5UwBBNTROpeqUfe0H9TdXZKHzlHkyS0Dq5zaFtR5aFEJzlvSEV7_a1HDq-F1zWG--876l1EsUerc58jBErQrezrnhBDHkAke9kC9a3xB-XikcrvuT1lJcjwNviJd8br7WgTb7TMPmL3Cs3yGjRU_6xkIogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:41:03 GMT',
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
  '5b488c79-f9a8-47a9-a65f-6a889cce3c00',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AomeSI3thBRFrldGw4gFqbo; expires=Thu, 30-Dec-2021 08:41:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrk-MXp2ntpGHMU_4ZXfi-nqDA6zsyoi2nKE4XO14j_mWCDpCEE__OUc43b74Jp4Q7t-UOKuzwVXCQX0GO0fB1GQ6Jq_tyQ_oKsCNF2UZmAQFpe6APpJxg64bRXxS4-jQxO9riYy8FfFazmabEyoxwLENniKGuPhtA9d0cAWsH87sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:41:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=24463473-55b8-4c2d-83ca-41acec4e391a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '146ce323-3136-49fa-8253-0d99704f4100',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoZaZAFgqRhIq4mrFUfrw_UWPr5BAQAAAKDaN9kOAAAA; expires=Thu, 30-Dec-2021 08:41:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:41:04 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/servers/myserverppp/databases/mydatabasezzzz')
  .query(true)
  .reply(202, {"operation":"DropLogicalDatabase","startTime":"2021-11-30T08:41:06.07Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/databaseOperationResults/8596fda7-a569-4772-b4b3-8b631d794833?api-version=2021-05-01-preview',
  'Retry-After',
  '0',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/databaseAzureAsyncOperation/8596fda7-a569-4772-b4b3-8b631d794833?api-version=2021-05-01-preview',
  'x-ms-request-id',
  '8596fda7-a569-4772-b4b3-8b631d794833',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14997',
  'x-ms-correlation-request-id',
  '555486ff-0a19-48b3-8fcd-ab51197c9a7d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T084106Z:555486ff-0a19-48b3-8fcd-ab51197c9a7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:41:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/databaseAzureAsyncOperation/8596fda7-a569-4772-b4b3-8b631d794833')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a383fb0f3f3d9f650fb6b3fb9f3edcde7ff0606f7bb23fb9b77d30f9f4deeeecc1c3fd837bf73e1a7dd4b459bb6ea8fdd9f2655d5dd479d3c8a775fba660407b3b7bbbdbbbbbdbf776deec1c3cdadf7db4f3e978e7c14f7df44b","fe1f2d964f8a6b000000"], [
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
  'Retry-After',
  '0',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '6ac35fba-72c0-40b5-a6df-1c5483656b66',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10771',
  'x-ms-correlation-request-id',
  '94fe3075-0b34-49e8-a46e-4bbd83d95a2b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T084106Z:94fe3075-0b34-49e8-a46e-4bbd83d95a2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:41:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/databaseAzureAsyncOperation/8596fda7-a569-4772-b4b3-8b631d794833')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a383fb0f3f3d9f650fb6b3fb9f3edcde7ff0606f7bb23fb9b77d30f9f4deeeecc1c3fd837bf73e1a7dd4b459bb6ea8fdd9f2655d5dd479d3c8a775fba660407b3b7bbbdbbbbbdbf776deec1c3cdadf7db4f3e978e7c14f7df44b","fe1f2d964f8a6b000000"], [
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
  'Retry-After',
  '0',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '7a0dde61-23b2-4ed8-b6ac-458f332ffba8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10770',
  'x-ms-correlation-request-id',
  '735859de-7d27-4af4-98ca-2d75547f9f57',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T084106Z:735859de-7d27-4af4-98ca-2d75547f9f57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:41:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/databaseAzureAsyncOperation/8596fda7-a569-4772-b4b3-8b631d794833')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a383fb0f3f3d9f650fb6b3fb9f3edcde7ff0606f7bb23fb9b77d30f9f4deeeecc1c3fd837bf73e1a7dd4b459bb6ea8fdebf5749ae7b37c261fd6ed9b82e1ecedeced6eefee6edfdb79b373f0687ff7d1cea7e39d073ff5d1","2ff97f00c56e384b6a000000"], [
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
  'Retry-After',
  '0',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '48c81ac7-d295-4182-8e43-c20626535c6c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10769',
  'x-ms-correlation-request-id',
  '7b9858ca-ee28-424f-8109-fbf852f7e158',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T084107Z:7b9858ca-ee28-424f-8109-fbf852f7e158',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:41:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/servers/myserverppp/databases')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc51f376fdd1a35ffcd1325bd0df1fbdbe6eda7cf1d1e8a3b6c86bffef69b6caa6457bfdd1a39d5f32fae86db19cd1b797bb7be39d5163da2cb2657691cf9e50a38fee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f13e0a6bdbbaaabcb6296d7cddd2f8a695d35d5793b7efd8bcabb4d5e5fe2d3c5b5fcb65aad080b6abdca6bc2bfc1b8a6555966c081707afd13cf7fffe7f4c772f7f7ff3c5fe67556fefe272f777fff93b3dffff835bdb8c8debd2e7e903fb9a64e3f7a74ffdea7070f761eeeeeedec8c3e6adaac5dd3871f7db92c8b654e8d67599b4db2263f031d7667f7cf673b0f76b7f7679f4eb7f73fbd3fdbceeecdee6defededce76f7efed7e7aefe12ebd33ad73eabd5a3ecd5ad07a6f676f777b7777fbdece9b9d8347f71e3cdadb1d1f7c7aefa7d0725dd7f9b27d4dc32aa6f997939fcea76d7199bff027698fdad5f92f5a1385f2d98d2d67f979b62e09e2b45aceb2fafa7935655ca8d11541a0c151af34a6b2ba38b93dc97e502df357f96c4d2097ed478fceb3b2c98155367b3dcd4a60f0b468b24999cfa8b119d4d761387df749367dbb5ebd6eab9a18cd743ca5361f613c25bd66297273d345562cdb7c499fe627d5f2bcb858d734d26ac9537af76bf02f715e8f4fbf709ddc5dad276531f53e09ba6dee82d84f659e08bda2799ecf2ef2fa4b9a07256cd19c2dcfebec7439adaf19b1d3a510571a109d4a1a1bbea011e4994e6b41df7fadf17c03f278d7c8097d4af8d0148fccccdbbfdbeb15fe8ec3b2ef7ff44bbeff4b","fe1f51488847b8040000"], [
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
  '88a8a91a-56b8-439a-a62e-cf6ff7abc0e3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10768',
  'x-ms-correlation-request-id',
  '258b56b1-86ce-44b5-b694-28e84245718c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T084107Z:258b56b1-86ce-44b5-b694-28e84245718c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:41:07 GMT'
]);
