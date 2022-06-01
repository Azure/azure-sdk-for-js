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
  'ab800d36-9487-492e-b40d-f24b4bca2300',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AujawuslSs1LgtYvOYo8Blo; expires=Sun, 23-Jan-2022 02:18:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruKcBbLUxmrG2G_z3tQPAoeFFeyhVNMfak8D4h4opdziE59wR9FqA3nHPK6BQ-CLUTZgPQRQBqe2rpqao8bmBFTJwY0VfUxIRDUgHuRrke65N1OHq3evJ1G8TdLsVSnC9YPOcXIOzDJTvrNjsyjKX2JhGNIBIQGAOKeSrnNJGOVAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:37 GMT',
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
  'f480e226-70a1-4283-a533-9f5e483d2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap83LneQ9MhDjiB5Ogk-X2k; expires=Sun, 23-Jan-2022 02:18:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9THGFKZO0g_jsl7O1rJ_Jf2iqKFY5L0wwK-vhF7NLCuKZT_Ap-J_VWMuN9CZuVHxrKoVZpc2XCMpXrHO3g3V1M7vQl27J4dv1oQ16htWO9cldkHuur6RiShpnXAd8MSbSzq4QvmnH8D7wr3IpEtsXnX79_3vHTDTeYYIfJjlhw0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3e19b147-999f-44eb-bb34-431557135e63&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1bd63f88-8ecd-4df1-9d86-9bcfa81c2900',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AljFxG-w7DxCmNSlsDR5svjLj78gAQAAAP4kV9kOAAAA; expires=Sun, 23-Jan-2022 02:18:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:39 GMT',
  'Content-Length',
  '1393'
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'cff6e234-e660-477c-a95b-6df67cbb43e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  '238f2d74-e451-4c56-a7db-6a220939891c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021847Z:238f2d74-e451-4c56-a7db-6a220939891c',
  'Date',
  'Fri, 24 Dec 2021 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'f90c7b09-1721-4954-b92f-7ffbddedfbc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '4931d269-3706-4cc0-b82f-287c35e1773c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021847Z:4931d269-3706-4cc0-b82f-287c35e1773c',
  'Date',
  'Fri, 24 Dec 2021 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'cdbc86e5-b803-4b7a-872b-6cc90d54f077',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '1a285373-c023-4969-a4bf-dcbac6f62105',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021847Z:1a285373-c023-4969-a4bf-dcbac6f62105',
  'Date',
  'Fri, 24 Dec 2021 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'bcb7d0e0-57b7-49fd-a589-a46049cf0971',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  'd2554312-8585-4235-8ad3-723937c2ee40',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021848Z:d2554312-8585-4235-8ad3-723937c2ee40',
  'Date',
  'Fri, 24 Dec 2021 02:18:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '4f596cbd-b955-4b0d-8939-0d27571f6de9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  '49f18888-43bd-4fd6-9449-055183ccedf2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021848Z:49f18888-43bd-4fd6-9449-055183ccedf2',
  'Date',
  'Fri, 24 Dec 2021 02:18:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '9aa9d8f4-c46e-4e00-b94a-9bb8fa95b2bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  'a19bd002-7663-42c6-995f-f8fd021ff922',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021848Z:a19bd002-7663-42c6-995f-f8fd021ff922',
  'Date',
  'Fri, 24 Dec 2021 02:18:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '37cf3e97-2067-4c53-ac56-71decc475251',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  'e6c2c1e4-faca-4dae-9dec-268d9efe0d63',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021849Z:e6c2c1e4-faca-4dae-9dec-268d9efe0d63',
  'Date',
  'Fri, 24 Dec 2021 02:18:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'bb0cae7b-a26e-4606-86e6-3f724785e249',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-correlation-request-id',
  'a32ae041-a08b-40af-a2a8-a95e3390ceab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021849Z:a32ae041-a08b-40af-a2a8-a95e3390ceab',
  'Date',
  'Fri, 24 Dec 2021 02:18:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '03e25f6b-d525-4d04-9d8c-ba80142f1602',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  'd55818eb-87ea-4921-b4f5-943c5610c942',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021849Z:d55818eb-87ea-4921-b4f5-943c5610c942',
  'Date',
  'Fri, 24 Dec 2021 02:18:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '9551c78e-a67c-43aa-899c-1fe3b544c300',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  '9d3a5fca-cf2a-4ea8-be6e-7fed1347a09c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021850Z:9d3a5fca-cf2a-4ea8-be6e-7fed1347a09c',
  'Date',
  'Fri, 24 Dec 2021 02:18:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/operationResults/cff6e234-e660-477c-a95b-6df67cbb43e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eea3d147cb6c9113269d4fdbeb153edd08899a95d53403ead434cf9a768dcf088f555eb745de7cf4e8177fa4504f97b355552c5b6ae8f73496b7c60c779cfd605de7e369b51028974543a08be5c5eb366b81cdebf5749ae7b37c46dfd3bf05f59dcf4eaa3aff8975d5661f3dbabfb313fbe2655effe417cfb245515e7ff4e87bbfd88cb869b3e52cab67c7977bfae5e8a3a9798781fd9251aff1d378e3bdfbf1c6f7628de3904fdfa7f1d3d7ef85c7ebf7817dfa5ead9f0d60b21b6dfde224d6766f3fd6f4276fddf4e9d3cbfd58e3380e4f891cefd1fcf4bd809fbe1ff0e39ddffff841ac79b4f1c1ef7fbcbb7bdbd64f6fdbf0f39b1a4eb2a6981edfd4ca807b76db862f7ef2655d2daa5b373f79afe6dfbe75c3f702fbc5ebdbb67c7aeb96cf6eddf2f35bb77cfe1e2de3021c6bfbe2e47d1adf9e02801bd539b1c6df7e726bb8df3eb975d3173ff95e28d4cded09f1f438ae12e26d07f447acf1e97b003e7d1fc05fbcc7349f9edd9e6e20f28d4890b5e7c6e98b13c2f9deefff663fbde91503fff73e3d1bd2bf7e73d703939bb4eaceceadfb784abc7a6be27cfbc97b10e7e5ad99f5d9effdc5d39f1c68fdfd1b5ca0d3e57945de23799f6dbdcee1c25dbdac8baa2eda6bdb9c8d3df9605555eadf44a111f9726d71997fa79a1c2f67f4efebe93c9fad4bf3ca3d6eb26eabd76d55671784ef2f2684f957f518cfa8d39f7597577bbf1b768d97f413e77d12e9caac697faffcfaf5f5724ab8ededeced6eefee6defedbfd9d97bb47bf068ffd3f1c34fefefdcdfbbff53d4980637cf972d684bb87f51cd688cc44c0c9580341ffd12a1d97169fc626dc3cef3ebbcbe2ca639c159ad2765317d91b75755fd9610cc1b72953f3a5d669392e665f451be9cd6d74c1fd0f02da1c7a3a7366e980c121d66d4d9553e3beee14630bff7d1eb7956e733428ec01e1f3fa57fdf64cddbb0f19bea6dbefce8fb048b68499fb6e426ff621301bca896f947bfe4","97fc3f4bbdd040b00c0000"], [
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
  'Fri, 24 Dec 2021 02:18:50 GMT',
  'ETag',
  '"0x8D9C683B9875B2D"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-request-id',
  '6bcf3278-80ef-4662-9c3f-cc07ec008c2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'c0a2e61d-1d52-4e8c-af8f-56edac078ce4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021850Z:c0a2e61d-1d52-4e8c-af8f-56edac078ce4',
  'Date',
  'Fri, 24 Dec 2021 02:18:50 GMT'
]);
