let nock = require('nock');

module.exports.hash = "6a29d933f7dcc9b2bee835d1e8fc6ffa";

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
  '5b0c8332-3344-49da-a2bd-2aba609e0100',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ah3RN-hH4M1Cm-6dahHjwVA; expires=Thu, 16-Dec-2021 04:15:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrZiGangd2d0m_Vk2UAfQTodbK1KeAVZxuIQ34ouPqWB6QtBnpugyrYHl4SFt6cG2bBKpThJDCRZfYCcBbmLFc8MiRTdr4NNer1889p-laCdTw9LaU5A-16M-xxAuNfbJN40FErKAWeiAaB2YW9fxoOlBPvrVONhRklkJmikMD48gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:15:11 GMT',
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
  'd4ef46f0-e630-4a94-8bdf-49314ef10100',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtmBZ19kUKZAnvrjQ8TpRzg; expires=Thu, 16-Dec-2021 04:15:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9heD_wzzaFrW0wWoU_Tv8fM99QK-PZX1koB1LQdRdh8Py9cesCa1_IxoUDQjQfRO1hTS24lkzPVK2PZ9AblbkULiM9dmXP6pHHrGzZnZVzHTDGAw_Eo_xaRhtLN0YhFELJMAZOq11I4KsnjwwiBgw4fmxzlewwZ0m1cGgBRYglsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:15:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=41885d5e-6fcb-4218-9cb5-b1d04a6ef690&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b6c22fcc-f8b3-486c-8b1a-746d8e1c0200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsI-pm0nQLdPhfmDoSeeWZQWPr5BAQAAAE8nJdkOAAAA; expires=Thu, 16-Dec-2021 04:15:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:15:11 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default', {"location":"eastus","properties":{"resource":{"throughput":400}}})
  .query(true)
  .reply(202, {"status":"Enqueued"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default/operationResults/da604d5b-8e1b-456f-8273-487b0538146f?api-version=2021-10-15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/da604d5b-8e1b-456f-8273-487b0538146f?api-version=2021-10-15',
  'x-ms-request-id',
  'da604d5b-8e1b-456f-8273-487b0538146f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  '44a335c9-851c-474b-aa04-48b14762a115',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T041513Z:44a335c9-851c-474b-aa04-48b14762a115',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:15:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/da604d5b-8e1b-456f-8273-487b0538146f')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2e7fd13a5fe7b38f7e","c9ff0340d7f1c015000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-request-id',
  '60b8f418-77a5-42b8-9e21-dc14d521146e',
  'x-ms-correlation-request-id',
  '60b8f418-77a5-42b8-9e21-dc14d521146e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T041513Z:60b8f418-77a5-42b8-9e21-dc14d521146e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:15:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/da604d5b-8e1b-456f-8273-487b0538146f')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2e7fd13a5fe7b38f7e","c9ff0340d7f1c015000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-request-id',
  '7b38e3c7-290a-4155-a6ff-f4c097e4c972',
  'x-ms-correlation-request-id',
  '7b38e3c7-290a-4155-a6ff-f4c097e4c972',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T041515Z:7b38e3c7-290a-4155-a6ff-f4c097e4c972',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:15:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/da604d5b-8e1b-456f-8273-487b0538146f')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f3dcd7fd13a5fe7b38f7e","c9ff03a32266ad15000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-request-id',
  '84e27fbe-d050-47ed-8440-8e23fdf86c07',
  'x-ms-correlation-request-id',
  '84e27fbe-d050-47ed-8440-8e23fdf86c07',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T041518Z:84e27fbe-d050-47ed-8440-8e23fdf86c07',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:15:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/da604d5b-8e1b-456f-8273-487b0538146f')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671ffd","92ff0720887be416000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-request-id',
  '22958de5-26b3-4537-8f85-3707b64ddd5d',
  'x-ms-correlation-request-id',
  '22958de5-26b3-4537-8f85-3707b64ddd5d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T041520Z:22958de5-26b3-4537-8f85-3707b64ddd5d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:15:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77eff6ef4eb3a6c996b33afbbdf2eb66954d733478abbf538bbbed9cfabb98afd6edebbc6d8be5457377969f67ebb2fd68f4517bbdca6938b7eb38d2551f38015d660b00bd3ebebca4bf6878abbc6e8bbcf9e8d12ffec81001bfbb973f7ab4bfb333fa68512c8bc57af1c6fbfc23fae2a35ff24b7e","c9ff0382311dbb78010000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-request-id',
  '04371957-d824-42c0-aee9-8bc0028372e3',
  'x-ms-correlation-request-id',
  '04371957-d824-42c0-aee9-8bc0028372e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T041523Z:04371957-d824-42c0-aee9-8bc0028372e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:15:22 GMT'
]);
