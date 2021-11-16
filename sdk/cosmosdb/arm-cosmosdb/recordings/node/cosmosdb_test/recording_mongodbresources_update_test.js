let nock = require('nock');

module.exports.hash = "f7278ea84712afd9068e196bac5da99c";

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
  '5bbba508-99e8-4683-b2bf-ca9cb42d0200',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtdyFBgB-8tAvzXii1-7tLM; expires=Thu, 16-Dec-2021 05:27:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryhpyXr2v6yoXo99-FnUoLKRaAaj8fHYaRQEa4eTO3TSfpFt3KreUTm-tZWUB14WI88bfZdsiP-ABGL1VCV4pFPZ_CpzexFuvd2bhvL06FGOcz_9TMxqFJpalcuqahhOi__wqKeFr7LKQina8_URsdHiAimJSO9BXWfnqTER-OOcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 05:27:04 GMT',
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
  'f96763da-090c-48e0-95c9-d9c9115c0200',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmFibjxZGlVOtN7lOtHPFN0; expires=Thu, 16-Dec-2021 05:27:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKXUGsAWOcb4JCtG4D2ajFSjE_dFl3RvFMpUJuFb04zf0jzAEq48GxDjEpUGpsimBg7DzGJadMP6y3CDoyc4OvHiF7KtWIQVRDpVyx5scuxE9GWMcsA9n2EJskpguYhv5cE3vJSHIoGNXaWhZPaTBIqoxQDsY4PwCz6P18ef_WrMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 05:27:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0eca76bd-62e3-449f-b134-6cd2aac74f01&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '749d6ae1-80c5-45a9-bd7d-cc6585a60200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjQPscSR-pJNgSMGyPSe904WPr5BAQAAACg4JdkOAAAA; expires=Thu, 16-Dec-2021 05:27:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 05:27:04 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx6/mongodbDatabases/mydatabasexxxx/throughputSettings/default', {"location":"eastus","properties":{"resource":{"throughput":400}}})
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx6/mongodbDatabases/mydatabasexxxx/throughputSettings/default/operationResults/2605c8c3-fc98-44b3-9efc-9f53706f78fa?api-version=2021-10-15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/2605c8c3-fc98-44b3-9efc-9f53706f78fa?api-version=2021-10-15',
  'x-ms-request-id',
  '2605c8c3-fc98-44b3-9efc-9f53706f78fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  '77464c4c-ae8d-4518-bd10-45a8600bc097',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T052705Z:77464c4c-ae8d-4518-bd10-45a8600bc097',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 05:27:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/2605c8c3-fc98-44b3-9efc-9f53706f78fa')
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
  '10813',
  'x-ms-request-id',
  '6955f1d7-1214-47a8-b85e-36fdf3130155',
  'x-ms-correlation-request-id',
  '6955f1d7-1214-47a8-b85e-36fdf3130155',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T052706Z:6955f1d7-1214-47a8-b85e-36fdf3130155',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 05:27:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/2605c8c3-fc98-44b3-9efc-9f53706f78fa')
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
  '10812',
  'x-ms-request-id',
  'cdc4ea15-8bac-45b3-b05b-e4019f37aa3f',
  'x-ms-correlation-request-id',
  'cdc4ea15-8bac-45b3-b05b-e4019f37aa3f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T052708Z:cdc4ea15-8bac-45b3-b05b-e4019f37aa3f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 05:27:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/2605c8c3-fc98-44b3-9efc-9f53706f78fa')
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
  '10811',
  'x-ms-request-id',
  '396298d4-3043-48ff-b24c-2f0dab7e9156',
  'x-ms-correlation-request-id',
  '396298d4-3043-48ff-b24c-2f0dab7e9156',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T052710Z:396298d4-3043-48ff-b24c-2f0dab7e9156',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 05:27:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/2605c8c3-fc98-44b3-9efc-9f53706f78fa')
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
  '10810',
  'x-ms-request-id',
  '536c8beb-127a-47b9-86f8-2f4af8b10a1a',
  'x-ms-correlation-request-id',
  '536c8beb-127a-47b9-86f8-2f4af8b10a1a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T052713Z:536c8beb-127a-47b9-86f8-2f4af8b10a1a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 05:27:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx6/mongodbDatabases/mydatabasexxxx/throughputSettings/default')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77ef3ebdbba89617d56cf2545be1eb99fe4edfbfbbdbcea9bb8bf96addbecedbb6585e347767f979b62edb8f461fb5d7ab9c4673cb7ebb3df54113c865b600c879f1dd2fe82f1adb2aafdb226f3e7af48b3f3214c0efeee58f1eedefec8c3e5a14cb62b15ebcf13eff88bef8e897fc925f","f2ff00078e3e0f75010000"], [
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
  '10809',
  'x-ms-request-id',
  '60c90221-ab94-4698-8a65-2a18b2f7e2e5',
  'x-ms-correlation-request-id',
  '60c90221-ab94-4698-8a65-2a18b2f7e2e5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T052715Z:60c90221-ab94-4698-8a65-2a18b2f7e2e5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 05:27:15 GMT'
]);
