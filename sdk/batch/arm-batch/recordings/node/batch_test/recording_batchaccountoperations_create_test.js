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
  'a948f454-99d5-49f9-bdb6-60fda55a0100',
  'x-ms-ests-server',
  '2.1.12231.9 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkE0B45X1tVJqRBA6EvnvYk; expires=Sun, 19-Dec-2021 02:07:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWBTesYtFI14tofxhxSWAdLOQjMroo_VoAWCkki1MfcZSrSPi6j-OH9TJrO-BIjNqKbc1STFuxDNqELGKEeynVN76uvnbRHEOfwQ3wo4laYAhDSt6n8BLY5phJr_7leYetV4Y1xxuwhG5wmiFgmG6NQg0axnD5vP7i-v_ReI37JogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 02:07:08 GMT',
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
  '5d962cca-0f12-4c08-9fed-43875ce40100',
  'x-ms-ests-server',
  '2.1.12231.9 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsK0OXNicehMiJXsSe09yTg; expires=Sun, 19-Dec-2021 02:07:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9YKhzkkgKwmTFAEjamKoxiJmDCbrGtjESKwqzTf8mdHnmtk8LxwvT3vPHyA2C1Hw5SFqgEMN9oHsMHOiMNJcqJl5PxJHyVlS0r_cbha-nMoSW4BOjX48DMQnmjhaildjeUEhvg7uCgxeFrTYF9nr2CGApQRI7rXouH9vvaim0BsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 02:07:08 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=040d45e8-fa78-43a0-a017-3b6cb203be41&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '39528652-4741-44b9-9f03-94421c680100',
  'x-ms-ests-server',
  '2.1.12231.9 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuLzH7CjSuBIg9SvVDdm97wWPr5BAQAAAMz9KNkOAAAA; expires=Sun, 19-Dec-2021 02:07:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 02:07:08 GMT',
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4fa02923-039f-4914-8b10-6f3ac26679f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'd1fa1c17-745f-49a0-b4d4-c8e6b2b8b530',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020717Z:d1fa1c17-745f-49a0-b4d4-c8e6b2b8b530',
  'Date',
  'Fri, 19 Nov 2021 02:07:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6b9cc60c-edb5-4245-99cb-3d8ba7e3f582',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '7abb3c35-b938-4518-92fe-2827bd973e74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020717Z:7abb3c35-b938-4518-92fe-2827bd973e74',
  'Date',
  'Fri, 19 Nov 2021 02:07:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8271ed38-8606-42b2-8fc5-9ecd4c471c20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  'fd6332c4-7d24-4251-8fdb-a56b2b355662',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020717Z:fd6332c4-7d24-4251-8fdb-a56b2b355662',
  'Date',
  'Fri, 19 Nov 2021 02:07:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1a7c6353-b075-43cd-9e68-02c079e86d08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  'edb87fa4-4c06-43c9-8899-4c646a7ba8a2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020718Z:edb87fa4-4c06-43c9-8899-4c646a7ba8a2',
  'Date',
  'Fri, 19 Nov 2021 02:07:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '12db092e-70a2-46f6-9877-2e86a6ffc86d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  '0149ad96-2cb8-4c49-8b99-6b24ee262421',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020718Z:0149ad96-2cb8-4c49-8b99-6b24ee262421',
  'Date',
  'Fri, 19 Nov 2021 02:07:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '657470d6-e786-46a0-b95c-c78612dc0e09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  'db9071c0-451f-4e8f-8801-838033c824f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020718Z:db9071c0-451f-4e8f-8801-838033c824f1',
  'Date',
  'Fri, 19 Nov 2021 02:07:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3cc51edf-ad88-4864-9f05-9288e2816461',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  'cea5cc57-30a0-4e2e-af3d-7b55dc73482b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020719Z:cea5cc57-30a0-4e2e-af3d-7b55dc73482b',
  'Date',
  'Fri, 19 Nov 2021 02:07:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cef101eb-52ab-4f4d-8fdc-74862d0494b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-correlation-request-id',
  '18c5756c-de9f-4ee5-a738-737198719b19',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020719Z:18c5756c-de9f-4ee5-a738-737198719b19',
  'Date',
  'Fri, 19 Nov 2021 02:07:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd6f29566-97d3-4075-ae88-148bd8718bee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  '61dfbba5-8a20-4028-9ded-a1fe70aee87d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020719Z:61dfbba5-8a20-4028-9ded-a1fe70aee87d',
  'Date',
  'Fri, 19 Nov 2021 02:07:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4c2a684c-bccc-45e9-9174-bcf0c9debeb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  '2d9cb972-eca6-4f4e-819b-19949a3171e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020720Z:2d9cb972-eca6-4f4e-819b-19949a3171e2',
  'Date',
  'Fri, 19 Nov 2021 02:07:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/4fa02923-039f-4914-8b10-6f3ac26679f8')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eea3d147cb6c9113269d4fdbeb153edd08899a95d53403ead434cf9a768dcf088f555eb745de7cf4e8177fa4504f97b355552c5b6ae8f73496b7c60c779cfd605de7e369b51028974543a08be5c5eb366b81cdebf5749ae7b37c46dfd3bf05f59dcf4eaa3aff8975d5661f3dbabfb313fbe2655effe417cfb245515e7ff4e87bbfd88cb869b3e52cab67c7977bfae5e8a3a9798781fd9251aff1d378e3bdfbf1c6f7628de3904fdfa7f1d3d7ef85c7ebf7817dfa5ead9f0d60b21b6dfde224d6766f3fd6f4276fddf4e9d3cbfd58e3380e4f891cefd1fcf4bd809fbe1ff0e39ddffff841ac79b4f1c1ef7fbcbb7bdbd64f6fdbf0f39b1a4eb2a6981edfd4ca807b76db862f7ef2655d2daa5b373f79afe6dfbe75c3f702fbc5ebdbb67c7aeb96cf6eddf2f35bb77cfe1e2de3021c6bfbe2e47d1adf9e02801bd539b1c6df7e726bb8df3eb975d3173ff95e28d4cded09f1f438ae12e26d07f447acf1e97b003e7d1fc05fbcc7349f9edd9e6e20f28d4890b5e7c6e98b13c2f9deefff663fbde91503fff73e3d1bd2bf7e73d703939bb4eaceceadfb784abc7a6be27cfbc97b10e7e5ad99f5d9effdc5d39f1c68fdfd1b5ca0d3e57945de23799f6dbdcee1c25dbdac8baa2eda6bdb9c8d3df9605555eadf44a111f9726d71997fa79a1c2f67f4efebe93c9fad4bf3ca3d6eb26eabd76d55671784ef2f2684f957f518cfa8d39f7597577bbf1b768d97f413e77d12e9caac697faffcfaf5f5724ab8ededeced6eefd2ff1ebed9d97bb4f3e0d1eea7e3879f3edcfff4defe4f51631adc3c5fb6a02de1fe4535a3311233315402d27cf44b8466c7a5f18bb50d3bcfaff3fab298e60467b59e94c5f445de5e55f55b42306fc855fee874994d4a9a97d147f9725a5f337d40c3b7841e8f9edab86132487498516757f9ecb8871bc1fcde47afe7599dcf0839027b7cfc94fe7d93356fc3c66faab7f9f2a3ef132ca2257dda929bfc8b4d04f0a25ae61ffd925f","f2ff0037e8789ab00c0000"], [
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
  'Fri, 19 Nov 2021 02:07:20 GMT',
  'ETag',
  '"0x8D9AB0151E8A867"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-request-id',
  '21d05bf3-219a-4723-b5d9-041866206d72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '82f3c0c9-e2b4-48b0-9109-c0568e3168e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211119T020720Z:82f3c0c9-e2b4-48b0-9109-c0568e3168e2',
  'Date',
  'Fri, 19 Nov 2021 02:07:20 GMT'
]);
