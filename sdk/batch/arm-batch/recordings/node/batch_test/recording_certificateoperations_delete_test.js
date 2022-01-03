let nock = require('nock');

module.exports.hash = "47a2654c969bbea676e1176463d2f93e";

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
  '32ea23f5-8af6-4214-946f-0c69ce9e2000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj7XQiHo-0tFqrHOtdclwtI; expires=Sun, 23-Jan-2022 02:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7iUP04okuLFeQRGeMTbJw6vBYGoKDfv55TOaC1wqtIKmgGrL-kzLvjSqHcSzJPVhcN3M3yHMLBiaWQukDtzBpi4PrRsbPkjD30kIL3Hc1EMTbcAb9U4zxc6hBJKx46tWGnfpKBIg_--iYAmZR8A-E5wGNMYVLdt4Np4iiYwEWbAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:20:00 GMT',
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
  'ab800d36-9487-492e-b40d-f24bb7cc2300',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuAC4g3GR4hMutQV270_28Q; expires=Sun, 23-Jan-2022 02:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpnW5em3gaMxFHMhrCbPvFNbGfidLVaREkT7fCG-fFgl47kAm2xGtYx4ujg1BHQBmjTlnkTspZbibL2YbUhquvf2dEyHCCYgLAU6uuTxKE00HNtnsBxA3Yab3k5jMeC1DKfdC_0Oa1Vaal0UD5v-kZWtiPOJjTTK5Ib7ZXAY-xc0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:20:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c70ab27c-8b12-458d-825d-63dee9901548&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '32ea23f5-8af6-4214-946f-0c69d29e2000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqBkIZZp16hLoBhwwN4rY1bLj78gAQAAAFAlV9kOAAAA; expires=Sun, 23-Jan-2022 02:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:20:00 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificates/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8D9C683E3B91D40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f3481096-c830-4231-9d7d-e2e2f31185da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'a7695616-2879-48f1-874c-51f5b307e1e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022001Z:a7695616-2879-48f1-874c-51f5b307e1e8',
  'Date',
  'Fri, 24 Dec 2021 02:20:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8D9C683E3B91D40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'df10ed58-8112-4c55-a570-519657f318a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  'f1498a74-0fca-442d-a835-312191dc828d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022001Z:f1498a74-0fca-442d-a835-312191dc828d',
  'Date',
  'Fri, 24 Dec 2021 02:20:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '96e8d334-2737-4abe-817f-06094bfa79c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  'baa6183b-9326-4cf0-a65c-cfabb512f375',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022002Z:baa6183b-9326-4cf0-a65c-cfabb512f375',
  'Date',
  'Fri, 24 Dec 2021 02:20:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e5aa6987-6735-495e-ab4e-a558cdb9b35c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  'cf1596ca-0e0a-4fcd-8fb2-b7d9971994dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022002Z:cf1596ca-0e0a-4fcd-8fb2-b7d9971994dd',
  'Date',
  'Fri, 24 Dec 2021 02:20:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cb3c1a96-810f-4581-8e9d-f8c8ab384020',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  '7d377562-6a9a-460a-a840-d6ce90a39c14',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022002Z:7d377562-6a9a-460a-a840-d6ce90a39c14',
  'Date',
  'Fri, 24 Dec 2021 02:20:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ddb0d6bf-8dda-4ecf-8fbf-69e35d44137d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  '0bd0525c-4ff9-4fbb-9415-00195a6352bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022003Z:0bd0525c-4ff9-4fbb-9415-00195a6352bf',
  'Date',
  'Fri, 24 Dec 2021 02:20:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9e9c3622-8d95-4c7b-a9d2-5f8eadadcd0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  '30e866c4-66fd-43da-87c0-dc9252ab66fa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022003Z:30e866c4-66fd-43da-87c0-dc9252ab66fa',
  'Date',
  'Fri, 24 Dec 2021 02:20:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6eee4371-c8a6-452a-8c9e-d5e565f37ce8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  'ab8e2dcf-08c6-40aa-b543-b418f3734a9a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022004Z:ab8e2dcf-08c6-40aa-b543-b418f3734a9a',
  'Date',
  'Fri, 24 Dec 2021 02:20:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ecfcdefa-fa0d-4cd6-af5d-dbd4f4b87491',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  'f204e5c4-ff48-460c-9787-c7dbbd4c1945',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022004Z:f204e5c4-ff48-460c-9787-c7dbbd4c1945',
  'Date',
  'Fri, 24 Dec 2021 02:20:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'be280b8b-4fbf-4611-bc40-bd9e2d9731c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  '902398cd-b323-437c-b206-7d27d4d5e258',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022004Z:902398cd-b323-437c-b206-7d27d4d5e258',
  'Date',
  'Fri, 24 Dec 2021 02:20:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ff023dee-9d26-4e1f-b2b0-deebe69a2500',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  '9f8cd3b1-5659-4b98-bc1d-78db114ccbe2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022005Z:9f8cd3b1-5659-4b98-bc1d-78db114ccbe2',
  'Date',
  'Fri, 24 Dec 2021 02:20:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0ab00f0c-d3e6-4a77-8b19-974128de78a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  '32a4f307-61ce-4488-94b5-1a1d1b11ee22',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022005Z:32a4f307-61ce-4488-94b5-1a1d1b11ee22',
  'Date',
  'Fri, 24 Dec 2021 02:20:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4ad488dd-a9a9-47d7-9d20-8d96721e02e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  '6eaf7c12-c655-4f95-b142-8ec5334dedaa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022005Z:6eaf7c12-c655-4f95-b142-8ec5334dedaa',
  'Date',
  'Fri, 24 Dec 2021 02:20:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '75daafe1-fedf-4f5c-ad2e-90f6f508d713',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  '8d1bd9b1-2725-4927-9ee9-7379dcf23840',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022006Z:8d1bd9b1-2725-4927-9ee9-7379dcf23840',
  'Date',
  'Fri, 24 Dec 2021 02:20:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8c05169e-8125-4da7-9c55-2ad867d1e769',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  'f2329afc-f742-4681-b874-2aa8d84e299e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022006Z:f2329afc-f742-4681-b874-2aa8d84e299e',
  'Date',
  'Fri, 24 Dec 2021 02:20:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '5fd48081-27c3-4e86-bcd6-86487e85dc8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '607aa51b-1253-4bfa-a8d9-90a5e2de94df',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022006Z:607aa51b-1253-4bfa-a8d9-90a5e2de94df',
  'Date',
  'Fri, 24 Dec 2021 02:20:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '028e1614-b361-458a-b252-0a2439df41c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '44747320-ad5a-4710-bc6a-158ed300d89b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022007Z:44747320-ad5a-4710-bc6a-158ed300d89b',
  'Date',
  'Fri, 24 Dec 2021 02:20:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '21c87832-433a-41ff-a775-fe156653341b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  '44f535be-996a-43f9-834a-cd4e57c97331',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022007Z:44f535be-996a-43f9-834a-cd4e57c97331',
  'Date',
  'Fri, 24 Dec 2021 02:20:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b6a36043-589c-454a-9ac5-5f830e91f044',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  'a28906d0-87a6-42e5-a1ae-d6ccdf5947e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022008Z:a28906d0-87a6-42e5-a1ae-d6ccdf5947e3',
  'Date',
  'Fri, 24 Dec 2021 02:20:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e7a744af-22e2-49a7-b93e-7b3956dcee1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  'a7e41fcd-ee91-47f7-94fb-835dd80d57e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022008Z:a7e41fcd-ee91-47f7-94fb-835dd80d57e2',
  'Date',
  'Fri, 24 Dec 2021 02:20:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '209837f7-d41a-42f1-9805-abcc12348f7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  '27640f82-1a1f-4c7b-a574-b9b560560268',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022008Z:27640f82-1a1f-4c7b-a574-b9b560560268',
  'Date',
  'Fri, 24 Dec 2021 02:20:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '29d89826-f964-4a20-bdd7-1e33e15af505',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  'c18a223c-7f63-46cc-8e62-054df72fb19b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022009Z:c18a223c-7f63-46cc-8e62-054df72fb19b',
  'Date',
  'Fri, 24 Dec 2021 02:20:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '50812b59-c297-48d4-86f8-019a0d896d19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  'e1bcc30c-ac4d-49c2-9233-4afa38647d08',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022009Z:e1bcc30c-ac4d-49c2-9233-4afa38647d08',
  'Date',
  'Fri, 24 Dec 2021 02:20:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '177d5a23-be17-4fd4-bf76-04a75b7a3bab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  'f11bb31a-a20b-4a1b-a27f-a1601980298f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022009Z:f11bb31a-a20b-4a1b-a27f-a1601980298f',
  'Date',
  'Fri, 24 Dec 2021 02:20:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '40da07a2-b432-4ac6-bd17-39c5ff000a7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  '1c8cca66-eb2c-44e2-bd05-3fb1acd5fd3b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022010Z:1c8cca66-eb2c-44e2-bd05-3fb1acd5fd3b',
  'Date',
  'Fri, 24 Dec 2021 02:20:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8b5bad4b-72a4-4878-b21e-8a8a9caff924',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '3f8128d8-e448-411c-a740-1e06c1124dd5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022010Z:3f8128d8-e448-411c-a740-1e06c1124dd5',
  'Date',
  'Fri, 24 Dec 2021 02:20:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9f08b33d-f9eb-497d-9f4f-54a2b4a05803',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11897',
  'x-ms-correlation-request-id',
  '5bc56d7b-d67b-4516-aa49-72b8e13fcfa7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022010Z:5bc56d7b-d67b-4516-aa49-72b8e13fcfa7',
  'Date',
  'Fri, 24 Dec 2021 02:20:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '541fb50c-32ea-47b5-b7a4-864017fce604',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  'ad6fc79e-7fe9-428e-978c-d27f49852ffb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022011Z:ad6fc79e-7fe9-428e-978c-d27f49852ffb',
  'Date',
  'Fri, 24 Dec 2021 02:20:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1a2fa192-e1e5-4682-a144-15e63649a4b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  'b7a1d4c6-cd20-4f4a-9ea9-4b9ee6be94ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022011Z:b7a1d4c6-cd20-4f4a-9ea9-4b9ee6be94ff',
  'Date',
  'Fri, 24 Dec 2021 02:20:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c6268da7-337c-47f3-bf45-e6bc7a2a4e48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  'f4a60883-6b0f-4261-96e5-585dfde287c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022012Z:f4a60883-6b0f-4261-96e5-585dfde287c6',
  'Date',
  'Fri, 24 Dec 2021 02:20:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '97a2a89c-6115-4b1d-9564-b6578024e9ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11893',
  'x-ms-correlation-request-id',
  '2fd703d0-ae83-4f66-b889-deb7f1e2cadd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022012Z:2fd703d0-ae83-4f66-b889-deb7f1e2cadd',
  'Date',
  'Fri, 24 Dec 2021 02:20:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ab52bb77-4477-4470-9843-4dea3529ae26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11892',
  'x-ms-correlation-request-id',
  '9caf49a0-a05b-4ea8-bcf6-123a5c9a6a5c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022012Z:9caf49a0-a05b-4ea8-bcf6-123a5c9a6a5c',
  'Date',
  'Fri, 24 Dec 2021 02:20:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '299bb2e9-c9d0-4e82-92eb-1d6a0f3fc7b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11891',
  'x-ms-correlation-request-id',
  '8c818430-69a0-4788-b696-1aa39510cf09',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022013Z:8c818430-69a0-4788-b696-1aa39510cf09',
  'Date',
  'Fri, 24 Dec 2021 02:20:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1c7c75b6-d0a2-42ae-8c7d-beea9506b1c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11890',
  'x-ms-correlation-request-id',
  'c1e99263-0852-4257-b9c2-789a6dfacdc9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022013Z:c1e99263-0852-4257-b9c2-789a6dfacdc9',
  'Date',
  'Fri, 24 Dec 2021 02:20:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7cc144d8-8988-490c-a839-a2b1bcb5a84d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11889',
  'x-ms-correlation-request-id',
  'db50a6ec-4150-47cb-abef-056c52abcad6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022013Z:db50a6ec-4150-47cb-abef-056c52abcad6',
  'Date',
  'Fri, 24 Dec 2021 02:20:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '58ec29ea-77ae-4dc5-83b1-d901ff6fc687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11888',
  'x-ms-correlation-request-id',
  'a21bade1-4a0b-436b-a4bd-c6a5d1c76f00',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022014Z:a21bade1-4a0b-436b-a4bd-c6a5d1c76f00',
  'Date',
  'Fri, 24 Dec 2021 02:20:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '04c4981a-02c3-4aba-8636-3478d821bf50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11887',
  'x-ms-correlation-request-id',
  '47447859-e0e7-4a12-a0e9-6cd25d5575e6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022014Z:47447859-e0e7-4a12-a0e9-6cd25d5575e6',
  'Date',
  'Fri, 24 Dec 2021 02:20:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '82cf82dc-95d7-4b53-9b4e-a9c8a6070d27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11886',
  'x-ms-correlation-request-id',
  '8cf95110-15c8-4b54-8631-e6f5bdc66397',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022014Z:8cf95110-15c8-4b54-8631-e6f5bdc66397',
  'Date',
  'Fri, 24 Dec 2021 02:20:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8e03df9e-b730-4878-bdfc-b08310f0fde8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11885',
  'x-ms-correlation-request-id',
  '99b3eb6e-99a4-4f74-9b4d-85a47b46aa76',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022015Z:99b3eb6e-99a4-4f74-9b4d-85a47b46aa76',
  'Date',
  'Fri, 24 Dec 2021 02:20:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1f545853-8330-4745-ab27-b8f7aa8f56fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11884',
  'x-ms-correlation-request-id',
  '65bba1f3-7d39-4f90-ba5a-db3fd41d59a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022015Z:65bba1f3-7d39-4f90-ba5a-db3fd41d59a6',
  'Date',
  'Fri, 24 Dec 2021 02:20:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8e771044-925b-47ee-9577-c55d1cb59b0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11883',
  'x-ms-correlation-request-id',
  '21813f90-bce7-400c-ac4c-f6aaffb7a59a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022016Z:21813f90-bce7-400c-ac4c-f6aaffb7a59a',
  'Date',
  'Fri, 24 Dec 2021 02:20:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '2c780e13-c590-4d84-aef3-0a1ef3eb5a7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11882',
  'x-ms-correlation-request-id',
  '3d43a5af-b2ff-4015-b650-018a5465925d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022016Z:3d43a5af-b2ff-4015-b650-018a5465925d',
  'Date',
  'Fri, 24 Dec 2021 02:20:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bd12ebfa-e275-4cc3-a651-b1881d850a96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11881',
  'x-ms-correlation-request-id',
  '61818676-5330-4340-b33f-4e5a0f89cf56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022016Z:61818676-5330-4340-b33f-4e5a0f89cf56',
  'Date',
  'Fri, 24 Dec 2021 02:20:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7490f74c-d0a9-4634-9724-dab7817d9119',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11880',
  'x-ms-correlation-request-id',
  '4a0014b7-dd2b-4c6d-bafa-7b07c04bb33c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022017Z:4a0014b7-dd2b-4c6d-bafa-7b07c04bb33c',
  'Date',
  'Fri, 24 Dec 2021 02:20:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f9a2ccd1-0a7e-4f1f-a4c6-deac4778ba04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11879',
  'x-ms-correlation-request-id',
  'df9e7846-ea77-4393-bb68-1faedeb90a3c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022017Z:df9e7846-ea77-4393-bb68-1faedeb90a3c',
  'Date',
  'Fri, 24 Dec 2021 02:20:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fce0bb4d-9d44-4747-912b-431ddbfa4fc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11878',
  'x-ms-correlation-request-id',
  '5b26cbc8-7f30-4b2c-a8d8-8f3e4d0354f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022017Z:5b26cbc8-7f30-4b2c-a8d8-8f3e4d0354f5',
  'Date',
  'Fri, 24 Dec 2021 02:20:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '159a8b40-47e5-441e-93b3-f0dbb63e711c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11877',
  'x-ms-correlation-request-id',
  '849effc8-5fad-40fa-9cae-a6c64fa7eb37',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022018Z:849effc8-5fad-40fa-9cae-a6c64fa7eb37',
  'Date',
  'Fri, 24 Dec 2021 02:20:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e973d75a-b397-4e9a-9966-70d551cb9ebb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11876',
  'x-ms-correlation-request-id',
  '952558cf-d3c3-4ae4-ad28-1e719523e871',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022018Z:952558cf-d3c3-4ae4-ad28-1e719523e871',
  'Date',
  'Fri, 24 Dec 2021 02:20:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '989b2260-d9c6-4848-acd5-a166fa7940c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11875',
  'x-ms-correlation-request-id',
  'd2eaadab-3278-47e2-b395-9953ed05b480',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022018Z:d2eaadab-3278-47e2-b395-9953ed05b480',
  'Date',
  'Fri, 24 Dec 2021 02:20:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1cf243e1-0d62-4afb-8914-16b1a59b286d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11874',
  'x-ms-correlation-request-id',
  'b572d100-fea1-4177-8fbb-ac450c44accd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022019Z:b572d100-fea1-4177-8fbb-ac450c44accd',
  'Date',
  'Fri, 24 Dec 2021 02:20:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '82562b22-e18b-4171-a875-aea9c01adf2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11873',
  'x-ms-correlation-request-id',
  '3a55a536-7d81-408e-a3b3-fc9e7cf7a052',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022019Z:3a55a536-7d81-408e-a3b3-fc9e7cf7a052',
  'Date',
  'Fri, 24 Dec 2021 02:20:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7b012b9b-2841-4824-9201-c067d65cdedc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11872',
  'x-ms-correlation-request-id',
  '6c3558a0-e93c-41df-a6ca-c2ea2ead6cbd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022020Z:6c3558a0-e93c-41df-a6ca-c2ea2ead6cbd',
  'Date',
  'Fri, 24 Dec 2021 02:20:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0b7923e9-66f8-4dbd-a0b8-5dc2d85ec9a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11871',
  'x-ms-correlation-request-id',
  '5478273f-9f67-445f-b7f9-77c756991453',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022020Z:5478273f-9f67-445f-b7f9-77c756991453',
  'Date',
  'Fri, 24 Dec 2021 02:20:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd219af09-f8f8-4fe1-b6c3-9a97d830ca53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11870',
  'x-ms-correlation-request-id',
  'a5b81ca8-9760-4b65-b664-d7c1c262ca21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022020Z:a5b81ca8-9760-4b65-b664-d7c1c262ca21',
  'Date',
  'Fri, 24 Dec 2021 02:20:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7830530b-0820-45ef-ab3c-cbacfabddc3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11869',
  'x-ms-correlation-request-id',
  '3475a13a-66e3-4aff-bdd6-2cd3e04475fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022021Z:3475a13a-66e3-4aff-bdd6-2cd3e04475fe',
  'Date',
  'Fri, 24 Dec 2021 02:20:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '463ee21a-0cea-4030-8868-3ffff64c5a56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11868',
  'x-ms-correlation-request-id',
  '64a0d220-e98e-4480-bcdb-21f8d825e93c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022021Z:64a0d220-e98e-4480-bcdb-21f8d825e93c',
  'Date',
  'Fri, 24 Dec 2021 02:20:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '43844b1d-beeb-4865-a1f5-dbd1048c7f19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11867',
  'x-ms-correlation-request-id',
  '90b873b5-dc72-4062-a70c-fb353d2c845d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022021Z:90b873b5-dc72-4062-a70c-fb353d2c845d',
  'Date',
  'Fri, 24 Dec 2021 02:20:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ad094001-364c-4274-889f-582ed810ecc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11866',
  'x-ms-correlation-request-id',
  '79c9c4e5-23b4-4f54-904d-6c8fa0409dd1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022022Z:79c9c4e5-23b4-4f54-904d-6c8fa0409dd1',
  'Date',
  'Fri, 24 Dec 2021 02:20:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '10961b30-a435-48b5-bd1c-f13c08944761',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11865',
  'x-ms-correlation-request-id',
  'f746621b-59da-4f4b-9ec2-2eebf392dd27',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022022Z:f746621b-59da-4f4b-9ec2-2eebf392dd27',
  'Date',
  'Fri, 24 Dec 2021 02:20:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fbbc143d-b515-4cca-be21-857642ad7a55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11864',
  'x-ms-correlation-request-id',
  'cf8cc573-c2b7-4a88-bd78-2fafe9e51ab3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022022Z:cf8cc573-c2b7-4a88-bd78-2fafe9e51ab3',
  'Date',
  'Fri, 24 Dec 2021 02:20:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8e8ecc94-fe3d-44a1-bfc1-523c1abb6251',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11863',
  'x-ms-correlation-request-id',
  '668a778f-6289-46d1-a93f-3a170a8905be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022023Z:668a778f-6289-46d1-a93f-3a170a8905be',
  'Date',
  'Fri, 24 Dec 2021 02:20:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a5a11883-4338-4bf6-9d30-7e521c21880f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11862',
  'x-ms-correlation-request-id',
  '17e6fd59-364b-430e-a152-037c1fd9c1b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022023Z:17e6fd59-364b-430e-a152-037c1fd9c1b1',
  'Date',
  'Fri, 24 Dec 2021 02:20:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8b51eb73-8c83-46c2-a362-5078a7a44197',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11861',
  'x-ms-correlation-request-id',
  '09a545a0-e89a-440c-8555-608da33037ee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022024Z:09a545a0-e89a-440c-8555-608da33037ee',
  'Date',
  'Fri, 24 Dec 2021 02:20:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9bdec3f9-2a8d-4f1c-866a-f42290cd0eb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11860',
  'x-ms-correlation-request-id',
  '75001227-4ea5-4c9e-824a-f80842b71d59',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022024Z:75001227-4ea5-4c9e-824a-f80842b71d59',
  'Date',
  'Fri, 24 Dec 2021 02:20:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '520f6a9e-08b9-420c-925f-365d86fa8a04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11859',
  'x-ms-correlation-request-id',
  '2effab33-9ccc-4726-8869-b7f19b5d8a24',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022024Z:2effab33-9ccc-4726-8869-b7f19b5d8a24',
  'Date',
  'Fri, 24 Dec 2021 02:20:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '302560c1-3ce2-493c-bc5f-44cd9fe87e6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11858',
  'x-ms-correlation-request-id',
  '37b7a0c5-356b-4ee4-a6c2-67c3b5f6c0dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022025Z:37b7a0c5-356b-4ee4-a6c2-67c3b5f6c0dd',
  'Date',
  'Fri, 24 Dec 2021 02:20:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1c3ce624-d1c1-492e-8266-ec55eba15b6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11857',
  'x-ms-correlation-request-id',
  '6ffb7a97-782d-478c-85fa-e49b1f5142a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022025Z:6ffb7a97-782d-478c-85fa-e49b1f5142a1',
  'Date',
  'Fri, 24 Dec 2021 02:20:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fa3fabdb-230c-4be6-a185-56344daf8efa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11856',
  'x-ms-correlation-request-id',
  '497e0ab6-02ee-4205-9be3-f396d55cdbda',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022025Z:497e0ab6-02ee-4205-9be3-f396d55cdbda',
  'Date',
  'Fri, 24 Dec 2021 02:20:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '14a30df8-0b3d-42d9-a37f-3be0e6deea08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11855',
  'x-ms-correlation-request-id',
  '7ead64f6-9ab3-421a-8410-2860303deb9f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022026Z:7ead64f6-9ab3-421a-8410-2860303deb9f',
  'Date',
  'Fri, 24 Dec 2021 02:20:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '864f170f-8f21-4f5e-b3b3-cb2bd5ff7439',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11854',
  'x-ms-correlation-request-id',
  'ddccf7fa-abf1-4183-a84c-0897778cfd65',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022026Z:ddccf7fa-abf1-4183-a84c-0897778cfd65',
  'Date',
  'Fri, 24 Dec 2021 02:20:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c2c61cad-3849-4711-aa4f-e74ea1ee0a18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11853',
  'x-ms-correlation-request-id',
  'a40b8dbe-dbe3-49bd-a185-0f62cb623993',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022027Z:a40b8dbe-dbe3-49bd-a185-0f62cb623993',
  'Date',
  'Fri, 24 Dec 2021 02:20:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '52e2d8dd-d69f-4d36-b29b-0f4a13ceeca5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11852',
  'x-ms-correlation-request-id',
  '339e9f57-cd3b-447d-95cf-8bcdd3a90776',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022027Z:339e9f57-cd3b-447d-95cf-8bcdd3a90776',
  'Date',
  'Fri, 24 Dec 2021 02:20:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3fd07a37-f6b4-4cf4-8cdb-3fc267084614',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11851',
  'x-ms-correlation-request-id',
  '4a6b983f-ec14-45f5-84e5-f7b8f4a0593d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022028Z:4a6b983f-ec14-45f5-84e5-f7b8f4a0593d',
  'Date',
  'Fri, 24 Dec 2021 02:20:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c73b90d7-7a0f-4dea-8397-7e8f42617a73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11850',
  'x-ms-correlation-request-id',
  '66ae61a6-2233-46b5-83dd-dc091dbaf483',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022028Z:66ae61a6-2233-46b5-83dd-dc091dbaf483',
  'Date',
  'Fri, 24 Dec 2021 02:20:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd38ea91e-cf6b-45f5-955c-61fad726cf55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11849',
  'x-ms-correlation-request-id',
  'b3b5a93c-2793-4e3f-b1ea-2863447edfaa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022028Z:b3b5a93c-2793-4e3f-b1ea-2863447edfaa',
  'Date',
  'Fri, 24 Dec 2021 02:20:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4a0093ec-33fe-4860-9847-77b56e10bfa1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11848',
  'x-ms-correlation-request-id',
  '6a854d69-46fe-4f39-abe4-874e61c7d470',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022029Z:6a854d69-46fe-4f39-abe4-874e61c7d470',
  'Date',
  'Fri, 24 Dec 2021 02:20:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1f2c6af2-3368-4c98-b68f-1b0312542e0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11847',
  'x-ms-correlation-request-id',
  '49990b7f-9554-4800-9596-0427acf8b6c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022029Z:49990b7f-9554-4800-9596-0427acf8b6c6',
  'Date',
  'Fri, 24 Dec 2021 02:20:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '931c30f2-4c8b-48d7-a891-5214af4c28d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11846',
  'x-ms-correlation-request-id',
  '7e870482-56be-4122-8f80-311463683fa3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022029Z:7e870482-56be-4122-8f80-311463683fa3',
  'Date',
  'Fri, 24 Dec 2021 02:20:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '03217ec5-c7ae-46c1-a7ed-d8646c078f35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11845',
  'x-ms-correlation-request-id',
  '43952851-d250-4dd2-9520-4840c50b2ace',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022030Z:43952851-d250-4dd2-9520-4840c50b2ace',
  'Date',
  'Fri, 24 Dec 2021 02:20:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cbe185b3-3bfe-4141-960d-caf71287a549',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11844',
  'x-ms-correlation-request-id',
  '523ff67d-c78f-4b87-baf9-1cd878ba70cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022030Z:523ff67d-c78f-4b87-baf9-1cd878ba70cd',
  'Date',
  'Fri, 24 Dec 2021 02:20:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0f19b21e-9416-44ab-abce-e69cee39e1cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11843',
  'x-ms-correlation-request-id',
  '8ef73f59-04bd-4595-b9de-99502ddc317c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022030Z:8ef73f59-04bd-4595-b9de-99502ddc317c',
  'Date',
  'Fri, 24 Dec 2021 02:20:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e6ae07f0-14b7-444a-aea5-74bcdbec08e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11842',
  'x-ms-correlation-request-id',
  '9f2fbec1-761c-42ec-b556-53cb049bc5b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022031Z:9f2fbec1-761c-42ec-b556-53cb049bc5b5',
  'Date',
  'Fri, 24 Dec 2021 02:20:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6ae48716-7751-4d44-9309-7dff8a6da988',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11841',
  'x-ms-correlation-request-id',
  '1f480532-8ecb-4ea5-a28b-f703540f97b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022031Z:1f480532-8ecb-4ea5-a28b-f703540f97b5',
  'Date',
  'Fri, 24 Dec 2021 02:20:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '153d76f7-61f3-42f7-afc3-bcd4e0288fea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11840',
  'x-ms-correlation-request-id',
  '309da965-5ec4-4131-80be-b727baa10098',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022031Z:309da965-5ec4-4131-80be-b727baa10098',
  'Date',
  'Fri, 24 Dec 2021 02:20:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8cbec2bc-7381-4916-9730-b8f6f8c12673',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11839',
  'x-ms-correlation-request-id',
  '40b06526-47fa-47d4-ba12-322e6857f3ae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022032Z:40b06526-47fa-47d4-ba12-322e6857f3ae',
  'Date',
  'Fri, 24 Dec 2021 02:20:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd7bff501-522a-4055-b808-5a5d11563fbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11838',
  'x-ms-correlation-request-id',
  '861df6fe-a5c8-45df-bc39-b1e67b72f766',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022032Z:861df6fe-a5c8-45df-bc39-b1e67b72f766',
  'Date',
  'Fri, 24 Dec 2021 02:20:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b3a8f1ce-8b9b-4ffc-a10e-5e24063b300f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11837',
  'x-ms-correlation-request-id',
  '7c271a1b-3029-4f75-862b-789b96348908',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022033Z:7c271a1b-3029-4f75-862b-789b96348908',
  'Date',
  'Fri, 24 Dec 2021 02:20:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9df9a250-9f80-4d57-acb3-ad7db7a0493b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11836',
  'x-ms-correlation-request-id',
  'cce02ca7-46d5-4196-b61b-0f372bf38041',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022033Z:cce02ca7-46d5-4196-b61b-0f372bf38041',
  'Date',
  'Fri, 24 Dec 2021 02:20:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f8d30d32-93dd-4a5c-ad33-e7b536bfdb60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11835',
  'x-ms-correlation-request-id',
  'fd7176e7-9f4c-4be5-8716-616aa31bf1fb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022033Z:fd7176e7-9f4c-4be5-8716-616aa31bf1fb',
  'Date',
  'Fri, 24 Dec 2021 02:20:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7faff197-2e9e-4d8b-abac-c146aac89f45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11834',
  'x-ms-correlation-request-id',
  '24cfdda4-953c-47fe-bf19-d437cb8a2e8d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022034Z:24cfdda4-953c-47fe-bf19-d437cb8a2e8d',
  'Date',
  'Fri, 24 Dec 2021 02:20:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '76f1e99b-2ef1-4b2c-a3a3-b4ece33ba052',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11833',
  'x-ms-correlation-request-id',
  'a6c442c2-8da0-4c1a-969e-5c045212025c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022034Z:a6c442c2-8da0-4c1a-969e-5c045212025c',
  'Date',
  'Fri, 24 Dec 2021 02:20:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'de95da23-1ae8-450b-bdf5-05b2d9ce9926',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11832',
  'x-ms-correlation-request-id',
  '83e5b14f-a03d-4e10-b0ba-6f867bd42fac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022034Z:83e5b14f-a03d-4e10-b0ba-6f867bd42fac',
  'Date',
  'Fri, 24 Dec 2021 02:20:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4cb8c627-cbac-4501-a41b-d77192f857f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11831',
  'x-ms-correlation-request-id',
  '89528954-7c1e-4612-a21b-ed0947f4586d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022035Z:89528954-7c1e-4612-a21b-ed0947f4586d',
  'Date',
  'Fri, 24 Dec 2021 02:20:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'efb77c8b-049e-4c64-b11d-44094a3ef433',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11830',
  'x-ms-correlation-request-id',
  '87d66b56-efc0-430a-9377-fccbd1fc9baa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022035Z:87d66b56-efc0-430a-9377-fccbd1fc9baa',
  'Date',
  'Fri, 24 Dec 2021 02:20:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bd480b57-796b-430d-9682-c711621ca002',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11829',
  'x-ms-correlation-request-id',
  'bb7ab57f-6079-403d-bbd0-1b59f46436f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022035Z:bb7ab57f-6079-403d-bbd0-1b59f46436f1',
  'Date',
  'Fri, 24 Dec 2021 02:20:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd5d29807-fc49-42f4-9133-e07f4c210136',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11828',
  'x-ms-correlation-request-id',
  '81dccc26-789f-4a49-9bac-2804ad213895',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022036Z:81dccc26-789f-4a49-9bac-2804ad213895',
  'Date',
  'Fri, 24 Dec 2021 02:20:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '66cbfab0-adf5-4aa6-ae71-1cb473a542bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11827',
  'x-ms-correlation-request-id',
  '002e63e0-7145-4280-b291-955e7e7d5113',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022036Z:002e63e0-7145-4280-b291-955e7e7d5113',
  'Date',
  'Fri, 24 Dec 2021 02:20:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd451359f-c800-4b6f-bf13-3e3fccac6ae4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11826',
  'x-ms-correlation-request-id',
  '25b84de2-fb30-45ca-9c66-f468d0d7b212',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022037Z:25b84de2-fb30-45ca-9c66-f468d0d7b212',
  'Date',
  'Fri, 24 Dec 2021 02:20:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '45d8ee39-a264-4ce7-afbf-4d431d950772',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11825',
  'x-ms-correlation-request-id',
  'db3ce60e-4f1b-43b1-97aa-f5cc7d441354',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022037Z:db3ce60e-4f1b-43b1-97aa-f5cc7d441354',
  'Date',
  'Fri, 24 Dec 2021 02:20:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '44e30cee-46bd-436a-bdd7-3f1f3aa013cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11824',
  'x-ms-correlation-request-id',
  '3f499271-b6df-4de2-a2ae-d21864983b18',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022037Z:3f499271-b6df-4de2-a2ae-d21864983b18',
  'Date',
  'Fri, 24 Dec 2021 02:20:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4067a38f-7e0b-4e53-b463-00b009ea3db6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11823',
  'x-ms-correlation-request-id',
  'a54e719f-a4b4-49ca-9540-5ad251fa9d2c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022038Z:a54e719f-a4b4-49ca-9540-5ad251fa9d2c',
  'Date',
  'Fri, 24 Dec 2021 02:20:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b258222c-39a3-4bba-b714-d8c4a1bf8515',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11822',
  'x-ms-correlation-request-id',
  'ea3464d5-94f3-4191-afc1-9b2db3e4d81c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022038Z:ea3464d5-94f3-4191-afc1-9b2db3e4d81c',
  'Date',
  'Fri, 24 Dec 2021 02:20:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd33ad4e8-f59e-4c22-879c-5672b7a62a66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11821',
  'x-ms-correlation-request-id',
  '6d5928d6-92a8-465f-b689-a536c3b928d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022038Z:6d5928d6-92a8-465f-b689-a536c3b928d4',
  'Date',
  'Fri, 24 Dec 2021 02:20:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b39b52a8-5f13-4aa4-b3ed-3447bc08be04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11820',
  'x-ms-correlation-request-id',
  'c1a3e897-3fcd-443d-a569-b18454ebd7c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022039Z:c1a3e897-3fcd-443d-a569-b18454ebd7c2',
  'Date',
  'Fri, 24 Dec 2021 02:20:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '37aea279-1912-4921-9a64-6ac758ae75b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11819',
  'x-ms-correlation-request-id',
  '7c5942e8-e78f-4a5d-b39e-37bb92bf4f34',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022039Z:7c5942e8-e78f-4a5d-b39e-37bb92bf4f34',
  'Date',
  'Fri, 24 Dec 2021 02:20:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fc89d13b-b350-4e5e-a319-bfaf071c95c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11818',
  'x-ms-correlation-request-id',
  'be8bb0f4-b0bd-44b0-86cd-ab943dbb52d6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022039Z:be8bb0f4-b0bd-44b0-86cd-ab943dbb52d6',
  'Date',
  'Fri, 24 Dec 2021 02:20:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f6b4dbe8-ad91-4993-9f80-0495ebce161b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11817',
  'x-ms-correlation-request-id',
  'ee6a752b-57bd-4564-97e8-3c9d026c04c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022040Z:ee6a752b-57bd-4564-97e8-3c9d026c04c4',
  'Date',
  'Fri, 24 Dec 2021 02:20:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '03fe05da-ea1e-4c88-a06f-a3c38f8b13d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11816',
  'x-ms-correlation-request-id',
  'f4cdacd1-6bc1-4171-946f-e0a2af1caa5b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022040Z:f4cdacd1-6bc1-4171-946f-e0a2af1caa5b',
  'Date',
  'Fri, 24 Dec 2021 02:20:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e15652c8-a62a-4d63-ada3-f52166279c66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11815',
  'x-ms-correlation-request-id',
  'b63829c0-d514-4e34-980f-354b805b7d3e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022040Z:b63829c0-d514-4e34-980f-354b805b7d3e',
  'Date',
  'Fri, 24 Dec 2021 02:20:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '97a763cf-1c1e-4ef3-863d-4f87946a2739',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11814',
  'x-ms-correlation-request-id',
  '658b9969-b39a-4c21-b593-1f9f9772b527',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022041Z:658b9969-b39a-4c21-b593-1f9f9772b527',
  'Date',
  'Fri, 24 Dec 2021 02:20:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '59e5d835-c83b-441a-8262-b6aea6e6459c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11813',
  'x-ms-correlation-request-id',
  '99a581b0-a66f-49e9-b75a-2f9eb2001035',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022041Z:99a581b0-a66f-49e9-b75a-2f9eb2001035',
  'Date',
  'Fri, 24 Dec 2021 02:20:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0a8cabf1-36ab-4f64-b780-4cd3e4819282',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11812',
  'x-ms-correlation-request-id',
  'e45ee694-fe4d-4535-8bc8-b6b700a01c99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022042Z:e45ee694-fe4d-4535-8bc8-b6b700a01c99',
  'Date',
  'Fri, 24 Dec 2021 02:20:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '69060baa-0ccc-4f36-9ee0-b7437f3ba8d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11811',
  'x-ms-correlation-request-id',
  '3f9c91c2-3c61-4e11-9bce-7ef428550178',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022042Z:3f9c91c2-3c61-4e11-9bce-7ef428550178',
  'Date',
  'Fri, 24 Dec 2021 02:20:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1549e3e5-6246-4e24-8b59-436c3cdfa648',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11810',
  'x-ms-correlation-request-id',
  '034e298c-2e45-4229-8278-71efe00fc44d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022042Z:034e298c-2e45-4229-8278-71efe00fc44d',
  'Date',
  'Fri, 24 Dec 2021 02:20:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bec3c65b-4560-45c2-b0c9-afeb02768ada',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11809',
  'x-ms-correlation-request-id',
  '83409303-5e58-498e-afdd-a27280dd4b7d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022043Z:83409303-5e58-498e-afdd-a27280dd4b7d',
  'Date',
  'Fri, 24 Dec 2021 02:20:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd925f839-bc8c-4494-8c08-9d1b4d64ec7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11808',
  'x-ms-correlation-request-id',
  '62745b4b-9899-4351-b386-0f1d6e28dce0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022043Z:62745b4b-9899-4351-b386-0f1d6e28dce0',
  'Date',
  'Fri, 24 Dec 2021 02:20:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c0f32b63-a636-4759-aaa8-9a49c84bca01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11807',
  'x-ms-correlation-request-id',
  'afd0d705-d309-4466-8d67-54e2d6db6e8c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022043Z:afd0d705-d309-4466-8d67-54e2d6db6e8c',
  'Date',
  'Fri, 24 Dec 2021 02:20:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c9fcf9dd-eed2-4e58-a004-b7b9beae3d6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11806',
  'x-ms-correlation-request-id',
  '96545ddd-920f-4714-a2a9-9b9356a1beb3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022044Z:96545ddd-920f-4714-a2a9-9b9356a1beb3',
  'Date',
  'Fri, 24 Dec 2021 02:20:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1d2898eb-4a1d-45e9-b0d3-f6371c30ec25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11805',
  'x-ms-correlation-request-id',
  '0b0aab36-c969-4965-8012-0129133754c5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022044Z:0b0aab36-c969-4965-8012-0129133754c5',
  'Date',
  'Fri, 24 Dec 2021 02:20:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '38ea9af0-c311-4ca7-b455-5a5b14442461',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11804',
  'x-ms-correlation-request-id',
  '4d303e96-b8be-45a7-9a36-6d89df668ad6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022045Z:4d303e96-b8be-45a7-9a36-6d89df668ad6',
  'Date',
  'Fri, 24 Dec 2021 02:20:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '864ceab2-0407-4d29-a8c6-528d3d65cf0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11803',
  'x-ms-correlation-request-id',
  '849f4a10-ed87-4aad-a943-1adfda7de25e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022045Z:849f4a10-ed87-4aad-a943-1adfda7de25e',
  'Date',
  'Fri, 24 Dec 2021 02:20:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7d470820-a941-4e7d-b460-b36dbc773948',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11802',
  'x-ms-correlation-request-id',
  '532e0c0b-2756-41b2-8828-34d1eb1f6746',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022045Z:532e0c0b-2756-41b2-8828-34d1eb1f6746',
  'Date',
  'Fri, 24 Dec 2021 02:20:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0d1c0062-63cc-48e9-96c6-b66ec7e8cdb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11801',
  'x-ms-correlation-request-id',
  '6fe77975-e751-44f8-ac8d-c4488019e099',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022046Z:6fe77975-e751-44f8-ac8d-c4488019e099',
  'Date',
  'Fri, 24 Dec 2021 02:20:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9ee0fadf-fd54-4a85-8595-7682ba700ed1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11800',
  'x-ms-correlation-request-id',
  'c542ed4e-1e2f-4bf3-8155-6baf4996587f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022046Z:c542ed4e-1e2f-4bf3-8155-6baf4996587f',
  'Date',
  'Fri, 24 Dec 2021 02:20:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8bd431ef-d8bb-4422-a379-ee8997da469f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11799',
  'x-ms-correlation-request-id',
  '6f0b9c4e-664e-43df-ab77-15f34e0ed70e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022046Z:6f0b9c4e-664e-43df-ab77-15f34e0ed70e',
  'Date',
  'Fri, 24 Dec 2021 02:20:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '895fbd8f-03cb-42e9-adf5-e318d1d9ec13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11798',
  'x-ms-correlation-request-id',
  'd23f7e0f-e6b2-4f57-b677-468a14d4bfac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022047Z:d23f7e0f-e6b2-4f57-b677-468a14d4bfac',
  'Date',
  'Fri, 24 Dec 2021 02:20:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '05afb713-b1e7-40cd-b5ab-257e34f53b30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11797',
  'x-ms-correlation-request-id',
  '812898a8-7ff0-46d9-88a1-2df37230dbe0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022047Z:812898a8-7ff0-46d9-88a1-2df37230dbe0',
  'Date',
  'Fri, 24 Dec 2021 02:20:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '41fa61b3-5ff6-43d1-b63b-f2c4f0dfff2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11796',
  'x-ms-correlation-request-id',
  '6199a78a-b8b3-4e84-bab9-8db034b594f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022048Z:6199a78a-b8b3-4e84-bab9-8db034b594f8',
  'Date',
  'Fri, 24 Dec 2021 02:20:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '702a124c-c0f2-4e55-a23b-8c86aaba274f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11795',
  'x-ms-correlation-request-id',
  'c8cec755-f7e9-48b2-ad45-bca2ee3f532c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022048Z:c8cec755-f7e9-48b2-ad45-bca2ee3f532c',
  'Date',
  'Fri, 24 Dec 2021 02:20:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '40be5eff-2706-408d-a4eb-4f9e9c178a4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11794',
  'x-ms-correlation-request-id',
  '81b3736a-246d-45c3-bdb3-022bbb8ac55f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022048Z:81b3736a-246d-45c3-bdb3-022bbb8ac55f',
  'Date',
  'Fri, 24 Dec 2021 02:20:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '276b0f3c-0b2e-482a-a598-24af3d6aca75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11793',
  'x-ms-correlation-request-id',
  'b9714396-358e-4a2e-917c-87d2d2e39844',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022049Z:b9714396-358e-4a2e-917c-87d2d2e39844',
  'Date',
  'Fri, 24 Dec 2021 02:20:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '05ed560b-dc1c-4ffa-af10-291b279073f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11792',
  'x-ms-correlation-request-id',
  'e1dff43c-9c8e-46f0-b2a5-c919262a5472',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022049Z:e1dff43c-9c8e-46f0-b2a5-c919262a5472',
  'Date',
  'Fri, 24 Dec 2021 02:20:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cc2a04ab-392e-41b7-825e-d9ee4754e87b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11791',
  'x-ms-correlation-request-id',
  'a575a1c5-4314-4cbd-b64d-13369d44c238',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022049Z:a575a1c5-4314-4cbd-b64d-13369d44c238',
  'Date',
  'Fri, 24 Dec 2021 02:20:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f3e1bc9f-f6af-4afd-b4af-745937f5aa0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11790',
  'x-ms-correlation-request-id',
  '304eebf2-dc72-48d1-b5fa-902f84b1859e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022050Z:304eebf2-dc72-48d1-b5fa-902f84b1859e',
  'Date',
  'Fri, 24 Dec 2021 02:20:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '855e6fc6-1c9c-40e5-a62a-238340ba8592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11789',
  'x-ms-correlation-request-id',
  '34c8eda0-62d0-43a6-b4bc-871cd2915628',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022050Z:34c8eda0-62d0-43a6-b4bc-871cd2915628',
  'Date',
  'Fri, 24 Dec 2021 02:20:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bb7551be-7a61-4ec6-b434-6c28bd5c870c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11788',
  'x-ms-correlation-request-id',
  '4caf41a9-6ebd-4beb-9a73-49ef9777a9f7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022050Z:4caf41a9-6ebd-4beb-9a73-49ef9777a9f7',
  'Date',
  'Fri, 24 Dec 2021 02:20:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '612448a1-4bbd-42c7-a5a1-9000a8786672',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11787',
  'x-ms-correlation-request-id',
  '62565732-c3a9-4d7a-8625-9e7b4374625e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022051Z:62565732-c3a9-4d7a-8625-9e7b4374625e',
  'Date',
  'Fri, 24 Dec 2021 02:20:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '90a335d6-ca7b-4c4c-9e51-4e3cbfb2ec04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11786',
  'x-ms-correlation-request-id',
  '6b465e0f-98c8-4c5c-971c-edaaae764e23',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022051Z:6b465e0f-98c8-4c5c-971c-edaaae764e23',
  'Date',
  'Fri, 24 Dec 2021 02:20:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c78430b7-b604-4998-90fb-408ffd149b68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11785',
  'x-ms-correlation-request-id',
  'a07dd738-f3f9-4545-88ea-d1d58811c783',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022052Z:a07dd738-f3f9-4545-88ea-d1d58811c783',
  'Date',
  'Fri, 24 Dec 2021 02:20:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'dc9f603a-4cae-42b6-a928-d8a11682bd13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11784',
  'x-ms-correlation-request-id',
  'dd628005-bdc5-41ff-8a0f-fbe5a240cc81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022052Z:dd628005-bdc5-41ff-8a0f-fbe5a240cc81',
  'Date',
  'Fri, 24 Dec 2021 02:20:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'dea9c651-879a-46d9-af30-06dcb73ef28c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11783',
  'x-ms-correlation-request-id',
  'fcc6173e-9981-4181-b1f9-fbe5aae93af2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022052Z:fcc6173e-9981-4181-b1f9-fbe5aae93af2',
  'Date',
  'Fri, 24 Dec 2021 02:20:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '390a9170-62fa-48fc-8864-9f573abb8a53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11782',
  'x-ms-correlation-request-id',
  '941525a7-45bc-4c0e-864f-0d9b39113e99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022053Z:941525a7-45bc-4c0e-864f-0d9b39113e99',
  'Date',
  'Fri, 24 Dec 2021 02:20:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7186e77f-1e52-4d72-95cc-18edcee60aa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11781',
  'x-ms-correlation-request-id',
  'b05b231a-06ea-4052-abf7-9bb7ba1411c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022053Z:b05b231a-06ea-4052-abf7-9bb7ba1411c2',
  'Date',
  'Fri, 24 Dec 2021 02:20:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f90ecfde-d2b2-4409-9f4a-eefc6ca8f133',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11780',
  'x-ms-correlation-request-id',
  'b9560a67-d3e0-43dd-aa98-a219ddb767b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022053Z:b9560a67-d3e0-43dd-aa98-a219ddb767b7',
  'Date',
  'Fri, 24 Dec 2021 02:20:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '5c76230d-27bf-49cb-8370-5e520930d17a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11779',
  'x-ms-correlation-request-id',
  '76755141-4fb5-4a18-a4de-3844fef01b68',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022054Z:76755141-4fb5-4a18-a4de-3844fef01b68',
  'Date',
  'Fri, 24 Dec 2021 02:20:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '34918bc3-0578-43a1-b3aa-dfedafa94369',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11778',
  'x-ms-correlation-request-id',
  '925c59d2-bd3d-447a-8c6b-27e8fc3ed4fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022054Z:925c59d2-bd3d-447a-8c6b-27e8fc3ed4fe',
  'Date',
  'Fri, 24 Dec 2021 02:20:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0ae7aee8-cbb2-4a93-8bca-88575d31ffa0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11777',
  'x-ms-correlation-request-id',
  '4ba8eb3f-126f-463e-a49e-e9cdacfbf84b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022054Z:4ba8eb3f-126f-463e-a49e-e9cdacfbf84b',
  'Date',
  'Fri, 24 Dec 2021 02:20:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '349c5517-fba5-4f49-8dcd-9fd7a7f13145',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11776',
  'x-ms-correlation-request-id',
  '3a2c2f75-97f7-4756-a4c2-9d1815ad4bcb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022055Z:3a2c2f75-97f7-4756-a4c2-9d1815ad4bcb',
  'Date',
  'Fri, 24 Dec 2021 02:20:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b3152079-31d0-4d5d-9953-751029ab0743',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11775',
  'x-ms-correlation-request-id',
  '3df265d2-8705-4db5-94f0-cf56aed8aac4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022055Z:3df265d2-8705-4db5-94f0-cf56aed8aac4',
  'Date',
  'Fri, 24 Dec 2021 02:20:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '03befc4a-354f-4b64-a03e-ca86c73b1ec1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11774',
  'x-ms-correlation-request-id',
  '679d80f7-2f32-402d-b79a-7123e278e4e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022056Z:679d80f7-2f32-402d-b79a-7123e278e4e0',
  'Date',
  'Fri, 24 Dec 2021 02:20:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '64c7fb41-5bcf-4894-a28a-aafd9ec334a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11773',
  'x-ms-correlation-request-id',
  'beab7351-a151-4d89-8be7-aa7e367034c1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022056Z:beab7351-a151-4d89-8be7-aa7e367034c1',
  'Date',
  'Fri, 24 Dec 2021 02:20:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '23dc86e5-8576-4d7c-8d9f-92022c4372c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11772',
  'x-ms-correlation-request-id',
  '5e62fe35-a73a-4b36-b5e4-3b444c03a252',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022056Z:5e62fe35-a73a-4b36-b5e4-3b444c03a252',
  'Date',
  'Fri, 24 Dec 2021 02:20:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '910b7ba1-d01b-4840-8cd9-5e8154c377b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11771',
  'x-ms-correlation-request-id',
  '1190a15a-f094-4daf-ac0d-bb48eafe00a0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022057Z:1190a15a-f094-4daf-ac0d-bb48eafe00a0',
  'Date',
  'Fri, 24 Dec 2021 02:20:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9c385a07-9bb2-44cf-99cc-90b18a5b49e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11770',
  'x-ms-correlation-request-id',
  '333f2ca0-ba3d-4340-ac06-2833dc406ddb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022057Z:333f2ca0-ba3d-4340-ac06-2833dc406ddb',
  'Date',
  'Fri, 24 Dec 2021 02:20:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '74ddb65e-2f19-4d0f-be90-f0bbe1af2935',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11769',
  'x-ms-correlation-request-id',
  'fa60e2d4-9760-4d93-b14d-f5f104a898cb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022057Z:fa60e2d4-9760-4d93-b14d-f5f104a898cb',
  'Date',
  'Fri, 24 Dec 2021 02:20:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3d4cbb65-8518-4c10-98c0-09ccc841217a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11768',
  'x-ms-correlation-request-id',
  'b0736a9a-1fcd-4b8a-8403-d09f4fa62cdc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022058Z:b0736a9a-1fcd-4b8a-8403-d09f4fa62cdc',
  'Date',
  'Fri, 24 Dec 2021 02:20:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '2d174340-6964-47fb-af12-9c1cde3689b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11767',
  'x-ms-correlation-request-id',
  '70ee0540-c2c5-453e-a527-ef064e8cfddd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022058Z:70ee0540-c2c5-453e-a527-ef064e8cfddd',
  'Date',
  'Fri, 24 Dec 2021 02:20:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a9da2737-a061-4288-89ed-b634de2d059f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11766',
  'x-ms-correlation-request-id',
  '1d5eeb63-4cce-47f7-8cac-e2b02c4fcf11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022058Z:1d5eeb63-4cce-47f7-8cac-e2b02c4fcf11',
  'Date',
  'Fri, 24 Dec 2021 02:20:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '2a806c00-fa64-422d-bae0-00ffa1e73d52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11765',
  'x-ms-correlation-request-id',
  '43c08767-3206-45ef-89de-efc653376b3c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022059Z:43c08767-3206-45ef-89de-efc653376b3c',
  'Date',
  'Fri, 24 Dec 2021 02:20:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '21e36604-2584-40e2-bd2c-e1c339e4149d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11764',
  'x-ms-correlation-request-id',
  '0de435f5-e3f6-4104-a06b-06517472777a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022059Z:0de435f5-e3f6-4104-a06b-06517472777a',
  'Date',
  'Fri, 24 Dec 2021 02:20:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'db1748e7-e413-4702-8e1a-51455ee660c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11763',
  'x-ms-correlation-request-id',
  '842d7fd5-22a5-47a1-aa48-adaeb6da89d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022059Z:842d7fd5-22a5-47a1-aa48-adaeb6da89d0',
  'Date',
  'Fri, 24 Dec 2021 02:20:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd8d104c9-2af3-4587-87b5-e838b5e82803',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11762',
  'x-ms-correlation-request-id',
  'c0812a34-3749-4805-b8ac-289b9b685792',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022100Z:c0812a34-3749-4805-b8ac-289b9b685792',
  'Date',
  'Fri, 24 Dec 2021 02:21:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f1eac6ff-5ffe-41d4-96bd-84ec7b350638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11761',
  'x-ms-correlation-request-id',
  'd2034821-72a3-4915-9954-92f370f2a993',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022100Z:d2034821-72a3-4915-9954-92f370f2a993',
  'Date',
  'Fri, 24 Dec 2021 02:21:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '2aa794e3-3513-434c-9f5d-7a5c62578694',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11760',
  'x-ms-correlation-request-id',
  'e49941cf-22ad-4a8f-8424-ceb22875ede6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022101Z:e49941cf-22ad-4a8f-8424-ceb22875ede6',
  'Date',
  'Fri, 24 Dec 2021 02:21:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4d7da41a-624f-4587-abcb-fd3c6ef3bccc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11759',
  'x-ms-correlation-request-id',
  '18e8645a-72b0-4cb1-8f14-a62cf38314d9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022101Z:18e8645a-72b0-4cb1-8f14-a62cf38314d9',
  'Date',
  'Fri, 24 Dec 2021 02:21:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9c683e3b91d40')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  'ffba6241-05c2-444f-9397-1ac2676dfb26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11758',
  'x-ms-correlation-request-id',
  '72ff6427-1a92-4b56-920e-cb4a97ab2597',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022101Z:72ff6427-1a92-4b56-920e-cb4a97ab2597',
  'Date',
  'Fri, 24 Dec 2021 02:21:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificates')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bdefff","92ff0742ea40440c000000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11757',
  'x-ms-request-id',
  '355b2bf6-f359-4414-b826-64805aaa1681',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'ddf279c6-2ab6-4ca8-b965-bdb133723b37',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022102Z:ddf279c6-2ab6-4ca8-b965-bdb133723b37',
  'Date',
  'Fri, 24 Dec 2021 02:21:01 GMT'
]);
