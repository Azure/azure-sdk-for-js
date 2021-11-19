let nock = require('nock');

module.exports.hash = "99485d9ce6c4fa29518ff210a58e35b1";

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
  'a81c5db7-88c5-428c-b371-e60731cad600',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Avmijh2iayVEm1aDdz6a83c; expires=Sun, 19-Dec-2021 07:07:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnaM_k1FYP7wx0cuYsHnWApWh9mwpvtfF61j8x2fYgD3sMDYTk70NXkCo_Sn9ozCODfzXyp2QnyUL9yum3EcPPO1DTlxUL9Xbt9FKjXK60eh1igM12WibX4kZONdaTuOPMQCkB3TBMKqQGVIfw9HvnVQtgdl_l6DVN4dCXXUP7wwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:08 GMT',
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
  'f2cd5188-710b-40eb-b71f-1e6124861900',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkdDwuFMvktOg6WLc_CTlZ0; expires=Sun, 19-Dec-2021 07:07:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrE2T9lu2OhDYYt8hO4IvRgZfPLxvDz71AUpTI1wptKcBmIll3Cjjt4tlxinA_RSV-LylaNAV46S7vAFdT3vWP9VS7XegP-zBXCfQMz6nanj6B3OuQ3yuTOL14ijpw4Wsfly4GiIkFevXDKcsfymMYcq0QNXBriG7Rw8JdEiAki6EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=cf47d16e-d55d-4b33-b655-9ea9bd563b9b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'b50fe2c2-7565-429c-b06f-0aac4df23f00',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiNSH2g3sLpNghvyR4z-Y5MWPr5BAQAAAB1EKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:09 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx', {"location":"eastus","properties":{"autoStorage":{"storageAccountId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/mystorageaccountxxx"}}})
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '96659cec-c1d8-41dd-8ddb-bd091c6c0a9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1196',
  'x-ms-correlation-request-id',
  '0ca11698-677b-4c85-ba1d-6278ba411279',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070720Z:0ca11698-677b-4c85-ba1d-6278ba411279',
  'Date',
  'Fri, 19 Nov 2021 07:07:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ac9ee686-ac4f-45be-aa7d-b6489da37a33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  '61918c10-243d-4d99-a100-df1f0e13e3c4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070720Z:61918c10-243d-4d99-a100-df1f0e13e3c4',
  'Date',
  'Fri, 19 Nov 2021 07:07:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '02805f37-c3b7-4ec0-8fd9-fc3fa019f78a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  'c926cef3-f2e3-41d3-b687-98250daff37c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070720Z:c926cef3-f2e3-41d3-b687-98250daff37c',
  'Date',
  'Fri, 19 Nov 2021 07:07:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e745360b-f0d9-48ee-be91-22536e01794e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  '459d3191-7f74-4c71-8499-143f673d2a45',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070721Z:459d3191-7f74-4c71-8499-143f673d2a45',
  'Date',
  'Fri, 19 Nov 2021 07:07:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '60e203d3-71ef-4aae-b242-2c807623f090',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  '79c3327f-765e-46b5-9ad9-09a2096711d4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070721Z:79c3327f-765e-46b5-9ad9-09a2096711d4',
  'Date',
  'Fri, 19 Nov 2021 07:07:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7b73dd5c-3dd4-47cb-a767-e075034f7996',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-correlation-request-id',
  'a88553a5-2af6-4c2e-8128-d7102ba9a249',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070721Z:a88553a5-2af6-4c2e-8128-d7102ba9a249',
  'Date',
  'Fri, 19 Nov 2021 07:07:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '57b481e2-4690-4d81-a7c4-50a98b00533b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  '6a0c1d22-41d6-4026-99ca-c10f74f333a9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070722Z:6a0c1d22-41d6-4026-99ca-c10f74f333a9',
  'Date',
  'Fri, 19 Nov 2021 07:07:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '2e0c8f12-57d7-49ee-8c83-992a473c8ea4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  '5caf9bfb-2e2f-4ec8-8e59-c1c82c5905e2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070722Z:5caf9bfb-2e2f-4ec8-8e59-c1c82c5905e2',
  'Date',
  'Fri, 19 Nov 2021 07:07:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b6e0970a-a09f-47d2-a681-596b076d9e82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-correlation-request-id',
  '1d61ffe2-7f87-47d9-8a1e-42bf3a30941f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070722Z:1d61ffe2-7f87-47d9-8a1e-42bf3a30941f',
  'Date',
  'Fri, 19 Nov 2021 07:07:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '97877af1-726b-4b7f-b68a-19df854e9543',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11989',
  'x-ms-correlation-request-id',
  '098d6b98-a0dd-470d-ae73-88839ce0956e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070723Z:098d6b98-a0dd-470d-ae73-88839ce0956e',
  'Date',
  'Fri, 19 Nov 2021 07:07:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6c26d509-e627-495a-b323-9791f9cb669c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11988',
  'x-ms-correlation-request-id',
  'cff99f2e-bf29-437a-a473-8b721a5b2bdb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070723Z:cff99f2e-bf29-437a-a473-8b721a5b2bdb',
  'Date',
  'Fri, 19 Nov 2021 07:07:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '300650fc-9039-495a-8ac2-21fdc79cd344',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11987',
  'x-ms-correlation-request-id',
  '8d142da9-98c9-4e57-804b-d87fb613fcd2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070723Z:8d142da9-98c9-4e57-804b-d87fb613fcd2',
  'Date',
  'Fri, 19 Nov 2021 07:07:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/96659cec-c1d8-41dd-8ddb-bd091c6c0a9c')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eea3d147cb6c9113269d4fdbeb153edd08899a95d53403ead434cf9a768dcf088f555eb745de7cf4e8177fa4504f97b355552c5b6ae8f73496b7c60c779cfd605de7e369b51028974543a08be5c5eb366b81cdebf5749ae7b37c46dfd3bf05f59dcf4eaa3aff8975d5661f3dbabfb313fbe2655effe417cfb245515e7ff4e87bbfd88cb869b3e52cab67c7977bfae5e8a3a9798781fd9251aff1d378e3bdfbf1c6f7628de3904fdfa7f1d3d7ef85c7ebf7817dfa5ead9f0d60b21b6dfde224d6766f3fd6f4276fddf4e9d3cbfd58e3380e4f891cefd1fcf4bd809fbe1ff0e39ddffff841ac79b4f1c1ef7fbcbb7bdbd64f6fdbf0f39b1a4eb2a6981edfd4ca807b76db862f7ef2655d2daa5b373f79afe6dfbe75c3f702fbc5ebdbb67c7aeb96cf6eddf2f35bb77cfe1e2de3021c6bfbe2e47d1adf9e02801bd539b1c6df7e726bb8df3eb975d3173ff95e28d4cded09f1f438ae12e26d07f447acf1e97b003e7d1fc05fbcc7349f9edd9e6e20f28d4890b5e7c6e98b13c2f9deefff663fbde91503fff73e3d1bd2bf7e73d703939bb4eaceceadfb784abc7a6be27cfbc97b10e7e5ad99f5d9effdc5d39f1c68fdfd1b5ca0d3e57945de23799f6dbdcee1c25dbdac8baa2eda6bdb9c8d3df9605555eadf44a111f9726d71997fa79a1c2f67f4efebe93c9fad4bf3ca3d6eb26eabd76d55671784ef2f2684f957f518cfa8d39f7597577bbf1b768d97f413e77d12e9caac697faffcfaf5f5724ab8ededeced6eefd2ff1ebed979f088feb7b733deddbfb7fb60f7a7a82d8d6d9e2f5b909650ffa29ad11089971828c1683efa2542b2e3d2b8c5da867de7d7797d594c7382b35a4fca62fa226fafaafa2de19737e4297f74bacc26254dcbe8a37c39adaf993c20e15bc28e074f6ddc2819243acca8b3ab7c76dcc38d607eefa3d7f3acce67841c813d3e7e4affbec99ab761e337d5db7cf9d1f7091691923e6dc94bfec5260078512df38f7ec9","2ff97f00fb9db93eaf0c0000"], [
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
  'Last-Modified',
  'Fri, 19 Nov 2021 07:07:23 GMT',
  'ETag',
  '"0x8D9AB2B3CA27C97"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11986',
  'x-ms-request-id',
  '720a201d-0fed-4dd3-88f0-9d3769cd989e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'a7630e0b-3bd2-48b5-8950-c6ca4fa6f1ce',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070723Z:a7630e0b-3bd2-48b5-8950-c6ca4fa6f1ce',
  'Date',
  'Fri, 19 Nov 2021 07:07:23 GMT'
]);
