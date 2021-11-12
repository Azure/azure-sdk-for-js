let nock = require('nock');

module.exports.hash = "33fcee97175191b1a290302ad607b6d1";

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
  '83a16a01-243e-405e-8094-974a93bd1600',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqIFB-EwuWNAn8xNbHpCbhQ; expires=Sat, 11-Dec-2021 08:19:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr774GURMRohMe7uNIZOnDn8cR9R1WvPo_0HgteflNjeOXpPPs-n6UAj2n1KfdOb_rc4mg4FSVJGjnJKNwt1Y0F20-Sw62-bSqp5n-qYR5Pv5qTicq1vCfcJiblnqho2Txf5fZ6_y4DP8t2BFtbfnHUN5gpQcR3zfdrs0aTAmQ4DcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:19:11 GMT',
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
  '83a16a01-243e-405e-8094-974a94bd1600',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AroZvXGCmadMmEi-3Wf1eKQ; expires=Sat, 11-Dec-2021 08:19:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrk3LU9kf4EQL4Rs6ndqk6EENxUsFxklrsSyhyrQhBkE0rUnVLFZjr8TWHErekDkYtIkLosx3f3mO2Abd2JbMu8QXrcrw38pX0vKqp64e0n66v7z3qPy0CIGBzHKtTTV2KJfi63MaDet6wmQLJV46oueemWFx9o6WwRmtJ04bKGG0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:19:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2e389bfe-c8b4-44bf-9b0d-98d02448e738&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b01f6253-c871-4112-8788-927ec2c11800',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjtLRHwLYjVMp2SoDtt-UqQWPr5BAQAAAADJHtkOAAAA; expires=Sat, 11-Dec-2021 08:19:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:19:12 GMT',
  'Content-Length',
  '1351'
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default/operationResults/fc452ba7-c698-44db-a2dd-6c17713983a4?api-version=2021-10-15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/fc452ba7-c698-44db-a2dd-6c17713983a4?api-version=2021-10-15',
  'x-ms-request-id',
  'fc452ba7-c698-44db-a2dd-6c17713983a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  '87127a3e-2c79-42c5-ad3f-b92a68bae5db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081913Z:87127a3e-2c79-42c5-ad3f-b92a68bae5db',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/fc452ba7-c698-44db-a2dd-6c17713983a4')
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
  '11912',
  'x-ms-request-id',
  '2c46c43a-81fd-4360-8b7d-f96938999fe9',
  'x-ms-correlation-request-id',
  '2c46c43a-81fd-4360-8b7d-f96938999fe9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081913Z:2c46c43a-81fd-4360-8b7d-f96938999fe9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/fc452ba7-c698-44db-a2dd-6c17713983a4')
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
  '11911',
  'x-ms-request-id',
  '1af4f1d1-c9a4-4349-afd4-0ca59e3cf649',
  'x-ms-correlation-request-id',
  '1af4f1d1-c9a4-4349-afd4-0ca59e3cf649',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081916Z:1af4f1d1-c9a4-4349-afd4-0ca59e3cf649',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/fc452ba7-c698-44db-a2dd-6c17713983a4')
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
  '11910',
  'x-ms-request-id',
  '44021b93-a38b-42f9-be1b-5c1158d8b9d0',
  'x-ms-correlation-request-id',
  '44021b93-a38b-42f9-be1b-5c1158d8b9d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081918Z:44021b93-a38b-42f9-be1b-5c1158d8b9d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/fc452ba7-c698-44db-a2dd-6c17713983a4')
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
  '11909',
  'x-ms-request-id',
  '906a6fb6-5701-4336-b8aa-d267d52c42a5',
  'x-ms-correlation-request-id',
  '906a6fb6-5701-4336-b8aa-d267d52c42a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081921Z:906a6fb6-5701-4336-b8aa-d267d52c42a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77eff6ef4eb3a6c996b33afbbdf2eb66954d733478abbf538bbbed9cfabb98afd6edebbc6d8be5457377969f67ebb2fd68f4517bbdca6938b7eb38d2551f38015d660b007df3fad39afea2e1adf2ba2df2e6a347bff8234304fcee5efee8d1fececee8a345b12c16ebc51beff38fe88b8f7ec92ff9","25ff0fe884463f78010000"], [
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
  '11908',
  'x-ms-request-id',
  '8cfc6e8b-591f-4e79-be56-8e548ab39457',
  'x-ms-correlation-request-id',
  '8cfc6e8b-591f-4e79-be56-8e548ab39457',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081923Z:8cfc6e8b-591f-4e79-be56-8e548ab39457',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:23 GMT'
]);
