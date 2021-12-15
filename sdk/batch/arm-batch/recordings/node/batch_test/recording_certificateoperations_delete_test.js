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
  '9d247688-040d-4d92-b3d3-0bd0a02d5a00',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AktAlxNh1z9PtmQGVBWARZ0; expires=Sun, 19-Dec-2021 07:07:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWeZ7QUbjo05DWXcUJIG6ijIAOooS-jmt_ZMAEIBISXd7sYOKkweBxwCpDLNFDuKHBSGkykxq2CQRIVBRU7FYjnE31hvsMjDAqLuYGSNnyV--_xolyjM8uVkj7981rzMR_6NATrWK5PXOckZ58uEz-r_IGsfH3W8S5S7yJCujU04gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:47 GMT',
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
  'a928a7b3-5033-4d2f-a2fd-cb4b6a6b4100',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Am0EFXFBvytIkEnoLdWi22E; expires=Sun, 19-Dec-2021 07:07:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4krJ4IiPyZutB2io3qs2toIwjTP3EUuMZ4YOji0y073Qmh_9ZOgER-pqn6L8NBnb_UXM4Bat7AjBkpFtDRKpIB-SDc_4xC7dwbqm87W0FduI8MZn8NCloJUMSVSrDPNqduF0a2JtzEBXL-QawdBcEwmZ8-6Kgv1BtG86XaJFjG8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a71d8a84-bb09-40cf-b9d8-ae54e7e9a7bf&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '3c88997b-98c8-4a59-9b64-19da92e43f00',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmtQTDER0TZGqyD1VkZyhk0WPr5BAQAAAEREKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:47 GMT',
  'Content-Length',
  '1351'
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8D9AB2B4B9DF498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a37c6761-1401-464b-a7da-df4df458d82c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'a88b8db3-3796-475b-b70a-edb9db77c2c4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070749Z:a88b8db3-3796-475b-b70a-edb9db77c2c4',
  'Date',
  'Fri, 19 Nov 2021 07:07:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8D9AB2B4B9DF498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a8502eef-1427-4c40-be00-959c5e6b9fab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '3690c090-ca6d-4cc4-b0bb-9ec3d0830b59',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070749Z:3690c090-ca6d-4cc4-b0bb-9ec3d0830b59',
  'Date',
  'Fri, 19 Nov 2021 07:07:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e347fbf6-f3f4-4684-8539-7649b557bd92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  'f80c0f60-8071-475a-a420-8cdef459d1e6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070749Z:f80c0f60-8071-475a-a420-8cdef459d1e6',
  'Date',
  'Fri, 19 Nov 2021 07:07:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'eb1d89a5-6af4-4a9e-90ea-0a4e029f9a0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  'beb1845b-d4de-480a-ad70-db108ecc5028',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070750Z:beb1845b-d4de-480a-ad70-db108ecc5028',
  'Date',
  'Fri, 19 Nov 2021 07:07:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6408fb07-acba-40ff-9249-79daa5d417dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  'fea8ac18-b341-4f56-a6b5-2b2076a71007',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070750Z:fea8ac18-b341-4f56-a6b5-2b2076a71007',
  'Date',
  'Fri, 19 Nov 2021 07:07:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f7f66760-cd67-4663-88f6-0f647309fca4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  'ee71a09e-8f03-46d9-9832-844c84ad2dc3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070750Z:ee71a09e-8f03-46d9-9832-844c84ad2dc3',
  'Date',
  'Fri, 19 Nov 2021 07:07:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e7f6ab00-b730-4ed6-af20-463728c01796',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  '4217d214-3930-49b1-993e-ad741fbf1e68',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070751Z:4217d214-3930-49b1-993e-ad741fbf1e68',
  'Date',
  'Fri, 19 Nov 2021 07:07:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '03097422-59c2-4af7-b8d6-3ceadac93b32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  'f4bf642d-9877-46ee-a0b8-041069d2160f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070751Z:f4bf642d-9877-46ee-a0b8-041069d2160f',
  'Date',
  'Fri, 19 Nov 2021 07:07:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8beeeae3-dea4-468f-970b-08bf6bfee285',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  'a4817196-1622-42e3-8f0e-96595bb8bccf',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070751Z:a4817196-1622-42e3-8f0e-96595bb8bccf',
  'Date',
  'Fri, 19 Nov 2021 07:07:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cbf07865-4ac1-4960-9ce3-298466ed8420',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  'ff8ab803-19f0-4df3-8407-06cfa178f0bc',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070751Z:ff8ab803-19f0-4df3-8407-06cfa178f0bc',
  'Date',
  'Fri, 19 Nov 2021 07:07:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8e12b7f2-d4ea-4acb-ae30-93bc83c717b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  'f51e0a61-82f1-47f2-a11d-144afab1b8f1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070752Z:f51e0a61-82f1-47f2-a11d-144afab1b8f1',
  'Date',
  'Fri, 19 Nov 2021 07:07:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '70de58dc-2a92-4dcb-a4bb-9a163d6be9a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  '9a536bee-52c9-4f66-ba84-d25a0f925a5c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070752Z:9a536bee-52c9-4f66-ba84-d25a0f925a5c',
  'Date',
  'Fri, 19 Nov 2021 07:07:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fcb9b658-b71c-4a7a-953e-71370cca748b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  '405457b5-9208-4ffe-aa7c-95dadd5b1f89',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070753Z:405457b5-9208-4ffe-aa7c-95dadd5b1f89',
  'Date',
  'Fri, 19 Nov 2021 07:07:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7d93aa34-6bee-48b3-a71d-0f421257c9cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  'a709b717-6be4-473c-a5ad-b36aa1827e07',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070753Z:a709b717-6be4-473c-a5ad-b36aa1827e07',
  'Date',
  'Fri, 19 Nov 2021 07:07:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '579984bd-9e26-40ae-8961-97401871064c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  'bf71e115-8dc7-4f43-aae5-e17efa704c8c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070753Z:bf71e115-8dc7-4f43-aae5-e17efa704c8c',
  'Date',
  'Fri, 19 Nov 2021 07:07:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '21a3d2e4-d6fd-494e-a07c-3142380bc603',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  '3e5c3c0b-6a8e-4154-900e-474a5f73e358',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070753Z:3e5c3c0b-6a8e-4154-900e-474a5f73e358',
  'Date',
  'Fri, 19 Nov 2021 07:07:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b7404fd6-7be5-4bc5-8627-876374072e73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  '00eb0c45-edaf-40af-97b4-275b0cc48821',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070754Z:00eb0c45-edaf-40af-97b4-275b0cc48821',
  'Date',
  'Fri, 19 Nov 2021 07:07:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a97b4eb5-2752-4db6-8308-2deaf4d14903',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  '8140c1dc-b0ed-46c2-8c19-4aa84c3007a0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070754Z:8140c1dc-b0ed-46c2-8c19-4aa84c3007a0',
  'Date',
  'Fri, 19 Nov 2021 07:07:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '669de15e-110b-45f9-a63b-fbba4837136e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  '5d90fe1c-dcc1-47eb-918a-753f0ec1c816',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070754Z:5d90fe1c-dcc1-47eb-918a-753f0ec1c816',
  'Date',
  'Fri, 19 Nov 2021 07:07:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '839368e9-4c68-487d-813b-83b1bb99a02c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  'c9ea6c77-9eb1-4a61-b7ee-486d925f25db',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070755Z:c9ea6c77-9eb1-4a61-b7ee-486d925f25db',
  'Date',
  'Fri, 19 Nov 2021 07:07:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e8d5668a-e40b-4d76-a6ef-0e5080f76862',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  '99b061bc-90e9-40d9-91c6-6bce4de5dc35',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070755Z:99b061bc-90e9-40d9-91c6-6bce4de5dc35',
  'Date',
  'Fri, 19 Nov 2021 07:07:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '231007d9-c761-4cc3-9db7-90c6af7665b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  'c0f925cc-906d-4f60-baad-443a8be52197',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070755Z:c0f925cc-906d-4f60-baad-443a8be52197',
  'Date',
  'Fri, 19 Nov 2021 07:07:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3d410aed-dc13-48e0-bc3d-7fedd19e5085',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  '26d149bd-2b81-4ed3-8417-65dda0c2667f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070756Z:26d149bd-2b81-4ed3-8417-65dda0c2667f',
  'Date',
  'Fri, 19 Nov 2021 07:07:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '64fc12dc-69b8-436e-a94d-214ae9579f78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  '63682d38-c8e7-407c-bfb8-bc45ab221a85',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070756Z:63682d38-c8e7-407c-bfb8-bc45ab221a85',
  'Date',
  'Fri, 19 Nov 2021 07:07:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0d1e6855-df8c-4e9c-b6e4-703c5a78cee9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  'a0d238a0-ba27-4043-9e63-5a7d31715204',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070756Z:a0d238a0-ba27-4043-9e63-5a7d31715204',
  'Date',
  'Fri, 19 Nov 2021 07:07:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f080e2da-f9c7-4b71-aaee-9d37901d8938',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  '337b3a5e-edbe-45de-a7fe-ff0f5d31aae9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070757Z:337b3a5e-edbe-45de-a7fe-ff0f5d31aae9',
  'Date',
  'Fri, 19 Nov 2021 07:07:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd0d8030e-2974-480c-9824-854df8d22d09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  '193c376a-e54e-4c6d-8550-ed73d235ebd1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070757Z:193c376a-e54e-4c6d-8550-ed73d235ebd1',
  'Date',
  'Fri, 19 Nov 2021 07:07:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f80b9dff-46e6-4234-9987-f74d87129732',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  'ccc956b7-6991-49da-94fb-6e59f5298c68',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070757Z:ccc956b7-6991-49da-94fb-6e59f5298c68',
  'Date',
  'Fri, 19 Nov 2021 07:07:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '448797a3-06b7-4e90-9ad7-70e55932ea2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  'a76546b3-0489-469d-9a08-47ca69439c5d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070758Z:a76546b3-0489-469d-9a08-47ca69439c5d',
  'Date',
  'Fri, 19 Nov 2021 07:07:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1456b8f6-34cc-4d58-b07a-8f103ef08660',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  '1749875d-a350-4458-a4e5-ff0f32760a22',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070758Z:1749875d-a350-4458-a4e5-ff0f32760a22',
  'Date',
  'Fri, 19 Nov 2021 07:07:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '53afc983-297d-43e0-b0f0-cff7c8528567',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  'f9cb847c-7556-4a2e-b9c5-71df266836c1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070758Z:f9cb847c-7556-4a2e-b9c5-71df266836c1',
  'Date',
  'Fri, 19 Nov 2021 07:07:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '46c27c9f-1762-42b6-aa0a-3d86d5b6d484',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  '18ce8e29-7df3-4b4c-aa4d-ee2776c2ad9f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070759Z:18ce8e29-7df3-4b4c-aa4d-ee2776c2ad9f',
  'Date',
  'Fri, 19 Nov 2021 07:07:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8ad569f0-d1d0-44a7-961a-0704c0d976da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  '9298fcc6-8ce8-43ff-9096-e009239ee603',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070759Z:9298fcc6-8ce8-43ff-9096-e009239ee603',
  'Date',
  'Fri, 19 Nov 2021 07:07:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7fd3c48d-2888-4ea2-a507-8d49f982a2ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  'f4821b58-c9b4-4641-b22f-49b9b8a5252c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070759Z:f4821b58-c9b4-4641-b22f-49b9b8a5252c',
  'Date',
  'Fri, 19 Nov 2021 07:07:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '93f1cb01-d410-4ff1-82ae-58c7e062837e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  'd773c32a-711a-4306-90a3-7b4411a35517',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070800Z:d773c32a-711a-4306-90a3-7b4411a35517',
  'Date',
  'Fri, 19 Nov 2021 07:07:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fc49942d-efb3-40ee-8f28-d46c16ade5e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  '7483b8b9-b277-46b7-86b4-6366b6ca579b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070800Z:7483b8b9-b277-46b7-86b4-6366b6ca579b',
  'Date',
  'Fri, 19 Nov 2021 07:07:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7d351c5a-5b13-4ea4-b146-227f9057d2ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  '991b8751-454b-4114-82e4-6618f7875417',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070800Z:991b8751-454b-4114-82e4-6618f7875417',
  'Date',
  'Fri, 19 Nov 2021 07:08:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '171d4534-745d-402a-8451-d147d5933853',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  'c2d859f5-9017-48ed-9721-88efb33ad7f9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070801Z:c2d859f5-9017-48ed-9721-88efb33ad7f9',
  'Date',
  'Fri, 19 Nov 2021 07:08:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '69d6e346-949c-457a-8842-83256448da30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  '7ae3060f-ec13-49ad-bb13-d4248918ff2a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070801Z:7ae3060f-ec13-49ad-bb13-d4248918ff2a',
  'Date',
  'Fri, 19 Nov 2021 07:08:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd38b014d-38fb-4003-936f-d1649f72d8bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  'f9348bb4-1d9a-4d52-88c2-b979cc5a021a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070801Z:f9348bb4-1d9a-4d52-88c2-b979cc5a021a',
  'Date',
  'Fri, 19 Nov 2021 07:08:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cf1bd59f-be74-4ec8-9417-4dafe5801455',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  'c2a10ff2-0fdf-4458-9208-6cc8bf4fb046',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070801Z:c2a10ff2-0fdf-4458-9208-6cc8bf4fb046',
  'Date',
  'Fri, 19 Nov 2021 07:08:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9bb13fc7-463c-4b11-a953-d6f612b445c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  '2661de93-afab-41ec-b226-30c09860dde2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070802Z:2661de93-afab-41ec-b226-30c09860dde2',
  'Date',
  'Fri, 19 Nov 2021 07:08:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '10885a1e-536f-47d1-958b-5b9135faffde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  '7098d8da-fcfc-4c2c-a65c-fc620966b412',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070802Z:7098d8da-fcfc-4c2c-a65c-fc620966b412',
  'Date',
  'Fri, 19 Nov 2021 07:08:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c8f9d91f-3772-49c1-af72-07c6ce49761e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  '7862478a-7f22-4a56-a321-dc7310fed73d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070802Z:7862478a-7f22-4a56-a321-dc7310fed73d',
  'Date',
  'Fri, 19 Nov 2021 07:08:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '90dc7552-d07b-47d4-b336-790eeb93fcc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  '07856ad1-9581-4738-91e7-0ee209056ae6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070803Z:07856ad1-9581-4738-91e7-0ee209056ae6',
  'Date',
  'Fri, 19 Nov 2021 07:08:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '95f9bf46-ca7f-475d-85d7-9296dd1da2fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  'aa21444e-4dd8-4ff4-b54a-aa8213ba10a7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070803Z:aa21444e-4dd8-4ff4-b54a-aa8213ba10a7',
  'Date',
  'Fri, 19 Nov 2021 07:08:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '37963a43-4e06-4035-a639-2c9aeb2cccb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  'd5e18188-59be-4f78-88fd-f43a1d9e7bef',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070803Z:d5e18188-59be-4f78-88fd-f43a1d9e7bef',
  'Date',
  'Fri, 19 Nov 2021 07:08:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0c8380aa-0684-440b-a037-620a8b6038f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-correlation-request-id',
  'b1e815cf-6e33-418f-93b8-e101a2f863a7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070804Z:b1e815cf-6e33-418f-93b8-e101a2f863a7',
  'Date',
  'Fri, 19 Nov 2021 07:08:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8593490c-d800-4fb8-aa69-f45383da0eba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  '800d2020-aafe-420f-ad57-df8c78ca575b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070804Z:800d2020-aafe-420f-ad57-df8c78ca575b',
  'Date',
  'Fri, 19 Nov 2021 07:08:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6b3bedb3-6075-456f-b871-bf2f29bebda9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  '1c9abc73-7b10-4612-92e5-63683b61c4bb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070804Z:1c9abc73-7b10-4612-92e5-63683b61c4bb',
  'Date',
  'Fri, 19 Nov 2021 07:08:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6747c074-fe8f-4fc1-aafb-6fb95eee59aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  'bd014f94-1696-4fa3-b5ce-baa0f9b2c761',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070805Z:bd014f94-1696-4fa3-b5ce-baa0f9b2c761',
  'Date',
  'Fri, 19 Nov 2021 07:08:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c84802d1-3f03-4912-9b8f-2c83294e3666',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  '81c630a6-3739-4a5e-ab3e-db9354df7e87',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070805Z:81c630a6-3739-4a5e-ab3e-db9354df7e87',
  'Date',
  'Fri, 19 Nov 2021 07:08:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8e848a8f-5270-4927-a710-6c98ae6444f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  'a1c78fe6-1acb-49bc-b8ab-086c47094ca8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070805Z:a1c78fe6-1acb-49bc-b8ab-086c47094ca8',
  'Date',
  'Fri, 19 Nov 2021 07:08:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ee9d227d-9106-46a3-925d-e3ecf4e967de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  '25a1874c-eeb4-484c-a241-d3706387824e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070806Z:25a1874c-eeb4-484c-a241-d3706387824e',
  'Date',
  'Fri, 19 Nov 2021 07:08:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '593c9ec3-c30e-4f8c-bc45-93434446aadf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  'd10bf6dc-afce-497e-a08a-94aa7fc93b8f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070806Z:d10bf6dc-afce-497e-a08a-94aa7fc93b8f',
  'Date',
  'Fri, 19 Nov 2021 07:08:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f0d49875-1674-44c0-b7ef-56fee94d945a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  '7461c061-aaaf-4d1a-b80d-c83ae11d941c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070806Z:7461c061-aaaf-4d1a-b80d-c83ae11d941c',
  'Date',
  'Fri, 19 Nov 2021 07:08:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1b89c18a-33e5-456b-806a-5b9a75ae81e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  '13394906-bc8f-4077-826f-07ed43cd5267',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070807Z:13394906-bc8f-4077-826f-07ed43cd5267',
  'Date',
  'Fri, 19 Nov 2021 07:08:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7e63df86-24f0-48d4-9385-1a5c5bb9e380',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  '8e433734-a26f-4bcd-8b8d-0d3a72de12e8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070807Z:8e433734-a26f-4bcd-8b8d-0d3a72de12e8',
  'Date',
  'Fri, 19 Nov 2021 07:08:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '5dda3ccf-3aed-4540-8f24-758f1bea8687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  'fadbb4e4-f096-4242-8cf2-afcf9f3be01a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070807Z:fadbb4e4-f096-4242-8cf2-afcf9f3be01a',
  'Date',
  'Fri, 19 Nov 2021 07:08:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '56eb8932-7bf3-4225-a95f-f7d01ae3c522',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  'c18efff9-9d7c-4f84-bb86-3e0c30ce54b3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070808Z:c18efff9-9d7c-4f84-bb86-3e0c30ce54b3',
  'Date',
  'Fri, 19 Nov 2021 07:08:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c3fa4367-bf9b-4a66-8933-ca42b63df989',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  'f9e3f0b9-4928-4e7d-8dcd-f4ed8aff1d70',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070808Z:f9e3f0b9-4928-4e7d-8dcd-f4ed8aff1d70',
  'Date',
  'Fri, 19 Nov 2021 07:08:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0715f543-6258-43ed-9e32-cebc90218683',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  '4bec3196-bdda-4def-a25a-a59241f74fb5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070808Z:4bec3196-bdda-4def-a25a-a59241f74fb5',
  'Date',
  'Fri, 19 Nov 2021 07:08:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f5540879-bbc1-4366-915b-0d0878746fd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '208dc318-b19c-4f2c-bc4c-f737c57b9056',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070808Z:208dc318-b19c-4f2c-bc4c-f737c57b9056',
  'Date',
  'Fri, 19 Nov 2021 07:08:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '233af61f-6d9e-4ccb-a23f-3c0509c11bd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '145e4ac2-7a18-4d4c-8eba-045f956e0dbe',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070809Z:145e4ac2-7a18-4d4c-8eba-045f956e0dbe',
  'Date',
  'Fri, 19 Nov 2021 07:08:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '586cba8f-2c3d-44a3-ae67-28e952614250',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  '2ab104e0-0584-48d0-ba83-c63915bba7fe',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070809Z:2ab104e0-0584-48d0-ba83-c63915bba7fe',
  'Date',
  'Fri, 19 Nov 2021 07:08:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '2ebccfc7-feeb-46c4-b809-5d7f16ebc024',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  '28a2589c-064c-4619-a945-02fd516fb012',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070809Z:28a2589c-064c-4619-a945-02fd516fb012',
  'Date',
  'Fri, 19 Nov 2021 07:08:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '73f37921-ecdd-4589-8414-241c2e861b7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  '4f91eb8f-234c-4c36-8316-c41f88b29936',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070810Z:4f91eb8f-234c-4c36-8316-c41f88b29936',
  'Date',
  'Fri, 19 Nov 2021 07:08:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e458b4f0-1492-4753-a62a-d771ae9edbb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  '80b20dac-b961-4261-9fa2-e2a5aa2c250a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070810Z:80b20dac-b961-4261-9fa2-e2a5aa2c250a',
  'Date',
  'Fri, 19 Nov 2021 07:08:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '76189b5d-c375-4403-a8ab-fd3b4534a403',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  'a0f15cf4-c298-4e4b-98e7-7bc9b15ebaed',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070810Z:a0f15cf4-c298-4e4b-98e7-7bc9b15ebaed',
  'Date',
  'Fri, 19 Nov 2021 07:08:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '20d5c229-f0d0-4e0b-885e-85b0e9d25810',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  '2c9a50d9-396e-4f35-888c-32764fd946c4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070811Z:2c9a50d9-396e-4f35-888c-32764fd946c4',
  'Date',
  'Fri, 19 Nov 2021 07:08:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '979bbbc9-311d-4a3b-8e3d-cbd1aa3e178d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  '540e50d8-6012-4245-b0fb-cfae392221eb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070811Z:540e50d8-6012-4245-b0fb-cfae392221eb',
  'Date',
  'Fri, 19 Nov 2021 07:08:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '68e790d7-55f8-4c2d-8c4a-495d4771b18f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  '8c43b558-48cd-4094-ac13-6482601af708',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070811Z:8c43b558-48cd-4094-ac13-6482601af708',
  'Date',
  'Fri, 19 Nov 2021 07:08:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '74262a10-eaab-418d-b5ad-2efa22ba3925',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '97fe6844-c43c-434d-9ed7-939db00ec70d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070812Z:97fe6844-c43c-434d-9ed7-939db00ec70d',
  'Date',
  'Fri, 19 Nov 2021 07:08:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'caeef8e3-63d3-43cc-a630-ef6368c77226',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11897',
  'x-ms-correlation-request-id',
  '2ed3d12e-90a6-4a15-90c2-a16f742f684f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070812Z:2ed3d12e-90a6-4a15-90c2-a16f742f684f',
  'Date',
  'Fri, 19 Nov 2021 07:08:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '81dd5d69-e70f-49d9-8313-2e4b9fd6fd48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  '3b9629e5-2838-4374-91e4-1ce2b38a1ad3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070812Z:3b9629e5-2838-4374-91e4-1ce2b38a1ad3',
  'Date',
  'Fri, 19 Nov 2021 07:08:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '910d1225-5ca7-42a5-9d51-7e4ad80821d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  '73094e36-f480-411b-97c8-6aa3000fbb1b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070813Z:73094e36-f480-411b-97c8-6aa3000fbb1b',
  'Date',
  'Fri, 19 Nov 2021 07:08:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9acfb852-41c2-429e-a050-c50f3bf96123',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  'e2110753-0ea3-45c3-a17c-b5aab5494945',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070813Z:e2110753-0ea3-45c3-a17c-b5aab5494945',
  'Date',
  'Fri, 19 Nov 2021 07:08:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '98ac70c1-ccea-460a-af58-7c6adcb235c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11893',
  'x-ms-correlation-request-id',
  '8fab8267-3d25-4853-8066-ff5df5d3fc39',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070813Z:8fab8267-3d25-4853-8066-ff5df5d3fc39',
  'Date',
  'Fri, 19 Nov 2021 07:08:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '00c9977f-bfec-4ea8-a298-3bea35e8fa43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11892',
  'x-ms-correlation-request-id',
  '098d6ed5-ed48-404d-bedb-4c716ad1745c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070814Z:098d6ed5-ed48-404d-bedb-4c716ad1745c',
  'Date',
  'Fri, 19 Nov 2021 07:08:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4d31874b-489a-4441-908d-57bf6feaab0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11891',
  'x-ms-correlation-request-id',
  '70172f40-e756-4b13-be7a-a28c81bf9fb4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070814Z:70172f40-e756-4b13-be7a-a28c81bf9fb4',
  'Date',
  'Fri, 19 Nov 2021 07:08:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8f7b29e2-58a8-4ecf-ad95-d752b7b0e394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11890',
  'x-ms-correlation-request-id',
  'bdb1e1b3-98bf-4845-8343-e04e03cab8ec',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070814Z:bdb1e1b3-98bf-4845-8343-e04e03cab8ec',
  'Date',
  'Fri, 19 Nov 2021 07:08:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '072f4102-a456-4f47-9879-1f4647d14100',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11889',
  'x-ms-correlation-request-id',
  'e807c678-68b2-4e49-8db1-b4bf88a4465d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070815Z:e807c678-68b2-4e49-8db1-b4bf88a4465d',
  'Date',
  'Fri, 19 Nov 2021 07:08:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1bae4a07-5ccf-4632-80ab-249df8924201',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11888',
  'x-ms-correlation-request-id',
  'a77d3144-bbd7-49da-b931-525078e064ce',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070815Z:a77d3144-bbd7-49da-b931-525078e064ce',
  'Date',
  'Fri, 19 Nov 2021 07:08:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e09f9ecc-01d2-4e89-9385-af91ad3f21b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11887',
  'x-ms-correlation-request-id',
  'ded5b262-8731-4aa1-8406-4a0cc60bd0e9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070815Z:ded5b262-8731-4aa1-8406-4a0cc60bd0e9',
  'Date',
  'Fri, 19 Nov 2021 07:08:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0062b8eb-5778-45ba-9646-196f1f6dc128',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11886',
  'x-ms-correlation-request-id',
  '21cc1c68-d7b6-4c4b-bb7a-1c6fa755d102',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070816Z:21cc1c68-d7b6-4c4b-bb7a-1c6fa755d102',
  'Date',
  'Fri, 19 Nov 2021 07:08:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f7ecabb8-a9c2-4b5b-a0bb-2d3f8f4c2dcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11885',
  'x-ms-correlation-request-id',
  'e759de2e-9855-40d0-b5fb-32d40738d53b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070816Z:e759de2e-9855-40d0-b5fb-32d40738d53b',
  'Date',
  'Fri, 19 Nov 2021 07:08:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e8fc4e58-9b61-4f7b-abda-3e744d589e13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11884',
  'x-ms-correlation-request-id',
  'c8c31752-dcb1-4d20-a5ec-e5bc13820bfd',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070816Z:c8c31752-dcb1-4d20-a5ec-e5bc13820bfd',
  'Date',
  'Fri, 19 Nov 2021 07:08:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a22e7fb4-22ed-4596-b359-462ae6e529ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11883',
  'x-ms-correlation-request-id',
  'cba29e6f-fb40-431a-97c2-966f624a7ff1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070816Z:cba29e6f-fb40-431a-97c2-966f624a7ff1',
  'Date',
  'Fri, 19 Nov 2021 07:08:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '06155555-b9a9-4048-8a8e-f9f34ff09aad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11882',
  'x-ms-correlation-request-id',
  '84a3758e-356c-4a38-9f6f-9a27e94836ec',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070817Z:84a3758e-356c-4a38-9f6f-9a27e94836ec',
  'Date',
  'Fri, 19 Nov 2021 07:08:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '622fe6c4-1330-4d95-b941-ff3e7d73ec6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11881',
  'x-ms-correlation-request-id',
  '9c64be44-ac9b-424b-a28d-54e26038022b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070817Z:9c64be44-ac9b-424b-a28d-54e26038022b',
  'Date',
  'Fri, 19 Nov 2021 07:08:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a539aa12-c5cc-4a81-b320-23185c201659',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11880',
  'x-ms-correlation-request-id',
  '0fe2427f-3523-4a67-a347-1e806fe1c858',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070817Z:0fe2427f-3523-4a67-a347-1e806fe1c858',
  'Date',
  'Fri, 19 Nov 2021 07:08:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'dd3176c8-e3d4-4d7d-a7b8-5a6894738da3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11879',
  'x-ms-correlation-request-id',
  '98358cb5-663e-4077-a190-2e58bba33666',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070818Z:98358cb5-663e-4077-a190-2e58bba33666',
  'Date',
  'Fri, 19 Nov 2021 07:08:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '75fe6289-65a7-45b7-aef4-0e8488233cc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11878',
  'x-ms-correlation-request-id',
  '5dd4b0a8-e6b0-4c12-9644-f443470d1ef9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070818Z:5dd4b0a8-e6b0-4c12-9644-f443470d1ef9',
  'Date',
  'Fri, 19 Nov 2021 07:08:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '29f313c4-0d7b-4a5d-b861-df38c6f31a88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11877',
  'x-ms-correlation-request-id',
  '4b791195-7022-4acf-847d-34e00cb8f6e2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070818Z:4b791195-7022-4acf-847d-34e00cb8f6e2',
  'Date',
  'Fri, 19 Nov 2021 07:08:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '928d60c1-f343-4478-8719-2e500e3c6bd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11876',
  'x-ms-correlation-request-id',
  '43c91125-6534-40df-b9f6-dc7d10006200',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070819Z:43c91125-6534-40df-b9f6-dc7d10006200',
  'Date',
  'Fri, 19 Nov 2021 07:08:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4dd5da93-55a4-4ead-8bb1-889193dd9532',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11875',
  'x-ms-correlation-request-id',
  '1fbff930-9efe-4e01-8db1-304665adae37',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070819Z:1fbff930-9efe-4e01-8db1-304665adae37',
  'Date',
  'Fri, 19 Nov 2021 07:08:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd3b18b67-8d57-4f9c-958b-d085604945f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11874',
  'x-ms-correlation-request-id',
  '6a2ec751-0fba-4860-b234-fee48e9f3ce5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070819Z:6a2ec751-0fba-4860-b234-fee48e9f3ce5',
  'Date',
  'Fri, 19 Nov 2021 07:08:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '075386c4-7155-400d-8214-7666f972994e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11873',
  'x-ms-correlation-request-id',
  'bf33b3e2-4dd2-4f9d-abe1-1bd41373ade2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070820Z:bf33b3e2-4dd2-4f9d-abe1-1bd41373ade2',
  'Date',
  'Fri, 19 Nov 2021 07:08:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1a93fdfe-c68f-4c87-894c-6a1feb098178',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11872',
  'x-ms-correlation-request-id',
  'e445626d-b46d-4459-be9e-ff5b52f9e09d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070820Z:e445626d-b46d-4459-be9e-ff5b52f9e09d',
  'Date',
  'Fri, 19 Nov 2021 07:08:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b3b36604-76c3-4b9c-a2fc-4bdc9acdbb12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11871',
  'x-ms-correlation-request-id',
  '781e3580-218f-4ebb-9bca-398899f77417',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070820Z:781e3580-218f-4ebb-9bca-398899f77417',
  'Date',
  'Fri, 19 Nov 2021 07:08:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '900f6360-995b-4b44-964f-e6a92c6ff077',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11870',
  'x-ms-correlation-request-id',
  '8cd9d076-15e4-47ec-9438-a82a0fe17506',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070821Z:8cd9d076-15e4-47ec-9438-a82a0fe17506',
  'Date',
  'Fri, 19 Nov 2021 07:08:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '974125f9-c24a-466e-a30c-a3dc80f713de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11869',
  'x-ms-correlation-request-id',
  'be7f47ae-de6b-46d2-866a-664f7c06d2a1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070821Z:be7f47ae-de6b-46d2-866a-664f7c06d2a1',
  'Date',
  'Fri, 19 Nov 2021 07:08:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '20d4c718-9373-44d9-a574-d466f879fbdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11868',
  'x-ms-correlation-request-id',
  '0c658a0f-23cf-481d-a4aa-97c827167cb9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070821Z:0c658a0f-23cf-481d-a4aa-97c827167cb9',
  'Date',
  'Fri, 19 Nov 2021 07:08:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c96ed934-bd33-445d-b731-086714f9cf4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11867',
  'x-ms-correlation-request-id',
  '3d99d229-f939-4a3e-a051-5c9d7c7c5c56',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070822Z:3d99d229-f939-4a3e-a051-5c9d7c7c5c56',
  'Date',
  'Fri, 19 Nov 2021 07:08:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'aabdb3b0-5953-496a-8844-eea54585be59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11866',
  'x-ms-correlation-request-id',
  '3bd29b94-77c7-4367-a713-1c4b6be23600',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070822Z:3bd29b94-77c7-4367-a713-1c4b6be23600',
  'Date',
  'Fri, 19 Nov 2021 07:08:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6482f53a-8ed8-4635-a252-d4e6f2016f6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11865',
  'x-ms-correlation-request-id',
  '1724cb5e-8fc2-4081-ae0b-f45a92a3f601',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070822Z:1724cb5e-8fc2-4081-ae0b-f45a92a3f601',
  'Date',
  'Fri, 19 Nov 2021 07:08:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '552738f4-e890-4ca9-a539-90fb61a2a9f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11864',
  'x-ms-correlation-request-id',
  '846ed670-38d6-4636-93ae-18e081d18650',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070822Z:846ed670-38d6-4636-93ae-18e081d18650',
  'Date',
  'Fri, 19 Nov 2021 07:08:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f7f24e1c-5803-4252-b411-b56416ee1621',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11863',
  'x-ms-correlation-request-id',
  'd366f805-9cbf-4906-ba32-a6699ef0f335',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070823Z:d366f805-9cbf-4906-ba32-a6699ef0f335',
  'Date',
  'Fri, 19 Nov 2021 07:08:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b6f9dc0f-3469-4d79-a738-81e2eb166242',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11862',
  'x-ms-correlation-request-id',
  '75bb247b-722f-4fea-a5ad-ef267fda62e2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070823Z:75bb247b-722f-4fea-a5ad-ef267fda62e2',
  'Date',
  'Fri, 19 Nov 2021 07:08:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f29923e8-2db5-41d1-94f6-1374b83a69b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11861',
  'x-ms-correlation-request-id',
  '1bd2b2f6-e4a5-4cbf-848b-010d0ba6c50a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070823Z:1bd2b2f6-e4a5-4cbf-848b-010d0ba6c50a',
  'Date',
  'Fri, 19 Nov 2021 07:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a12e6def-7c8b-4b7e-a2ac-d39b2f701aca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11860',
  'x-ms-correlation-request-id',
  '2ddefaf1-61fd-4107-9867-01f0f774c699',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070824Z:2ddefaf1-61fd-4107-9867-01f0f774c699',
  'Date',
  'Fri, 19 Nov 2021 07:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '29e6cab5-d7c6-4e9e-9841-00dad9f3db10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11859',
  'x-ms-correlation-request-id',
  '8e2a351a-5c49-4e27-8048-3e99306e6a4d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070824Z:8e2a351a-5c49-4e27-8048-3e99306e6a4d',
  'Date',
  'Fri, 19 Nov 2021 07:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6722fc69-12ec-4252-ae28-3590f047fa54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11858',
  'x-ms-correlation-request-id',
  '3605f7b6-5a70-4ec7-b6b8-afefc0533856',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070824Z:3605f7b6-5a70-4ec7-b6b8-afefc0533856',
  'Date',
  'Fri, 19 Nov 2021 07:08:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a776fa50-4130-47f4-ad0e-0a62df455a9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11857',
  'x-ms-correlation-request-id',
  '34934702-c29e-4dcf-93bf-23331c9d859e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070825Z:34934702-c29e-4dcf-93bf-23331c9d859e',
  'Date',
  'Fri, 19 Nov 2021 07:08:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c3c6647e-4dc7-496a-aa7e-23f2df53ea5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11856',
  'x-ms-correlation-request-id',
  '41a37120-b682-474a-b85d-bc5a203680d7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070825Z:41a37120-b682-474a-b85d-bc5a203680d7',
  'Date',
  'Fri, 19 Nov 2021 07:08:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3be3381a-3a85-41e2-a36d-e7b0df2af0e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11855',
  'x-ms-correlation-request-id',
  '739e2fbc-7267-4105-8a7b-c96fc3bd4c9c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070825Z:739e2fbc-7267-4105-8a7b-c96fc3bd4c9c',
  'Date',
  'Fri, 19 Nov 2021 07:08:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '581e8d05-4a15-4835-b2f9-1163752dd94d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11854',
  'x-ms-correlation-request-id',
  'f8360e54-238f-4224-bf51-17a0b99fa5b0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070826Z:f8360e54-238f-4224-bf51-17a0b99fa5b0',
  'Date',
  'Fri, 19 Nov 2021 07:08:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c29282d2-3a2e-444d-98f2-e052637246cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11853',
  'x-ms-correlation-request-id',
  '4823893c-e054-4a3c-86dd-1c45da4f0a5b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070826Z:4823893c-e054-4a3c-86dd-1c45da4f0a5b',
  'Date',
  'Fri, 19 Nov 2021 07:08:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '94668171-3ffc-4a75-af9a-fe2f75c9ba3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11852',
  'x-ms-correlation-request-id',
  '273a152e-03c2-4fc7-95e6-781361ba218f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070826Z:273a152e-03c2-4fc7-95e6-781361ba218f',
  'Date',
  'Fri, 19 Nov 2021 07:08:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0326b07e-f76c-4fe1-82c1-4320dcfe20ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11851',
  'x-ms-correlation-request-id',
  '1b1dff23-70e6-4d6c-ae5f-55997e6a6e85',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070827Z:1b1dff23-70e6-4d6c-ae5f-55997e6a6e85',
  'Date',
  'Fri, 19 Nov 2021 07:08:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '16a83600-1336-4cba-8470-fdd910aa817f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11850',
  'x-ms-correlation-request-id',
  '98d0e731-477a-44c8-b199-eee6b5184539',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070827Z:98d0e731-477a-44c8-b199-eee6b5184539',
  'Date',
  'Fri, 19 Nov 2021 07:08:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b1405039-7ff3-4eea-85af-f76773fb2fa9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11849',
  'x-ms-correlation-request-id',
  '167912b4-efb0-4895-895c-9bd2072fa2ee',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070827Z:167912b4-efb0-4895-895c-9bd2072fa2ee',
  'Date',
  'Fri, 19 Nov 2021 07:08:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a24fc80d-56c7-4bab-aea2-641215c0446f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11848',
  'x-ms-correlation-request-id',
  '40eda9b4-8198-4257-a9dd-f55ad8a0a706',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070828Z:40eda9b4-8198-4257-a9dd-f55ad8a0a706',
  'Date',
  'Fri, 19 Nov 2021 07:08:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c9506536-eaf2-4382-816e-4b27c7f15cb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11847',
  'x-ms-correlation-request-id',
  '0c4f9d47-0901-4cde-9c71-049256199e49',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070828Z:0c4f9d47-0901-4cde-9c71-049256199e49',
  'Date',
  'Fri, 19 Nov 2021 07:08:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '47a54272-bc66-44f6-8fa8-30dbb0fcda1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11846',
  'x-ms-correlation-request-id',
  '78cc605c-aa40-4cd0-88cc-9bfc70ab2640',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070828Z:78cc605c-aa40-4cd0-88cc-9bfc70ab2640',
  'Date',
  'Fri, 19 Nov 2021 07:08:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '77e2efb4-5dad-41e3-aa9a-28a2b45d50a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11845',
  'x-ms-correlation-request-id',
  '92ef94c3-0ab1-4a0f-949b-2fd10587f28c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070829Z:92ef94c3-0ab1-4a0f-949b-2fd10587f28c',
  'Date',
  'Fri, 19 Nov 2021 07:08:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '625679cc-5928-4051-a750-8503401f8933',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11844',
  'x-ms-correlation-request-id',
  'dae90de1-b3e7-4e15-898d-cec9436fd722',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070829Z:dae90de1-b3e7-4e15-898d-cec9436fd722',
  'Date',
  'Fri, 19 Nov 2021 07:08:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'c60a999b-c2b9-47bb-befa-1179021d4862',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11843',
  'x-ms-correlation-request-id',
  '87324ed5-cb17-4d45-95bc-cab6221ccdfc',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070829Z:87324ed5-cb17-4d45-95bc-cab6221ccdfc',
  'Date',
  'Fri, 19 Nov 2021 07:08:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fd0c12b0-36e3-4539-a5a4-2b25ef140298',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11842',
  'x-ms-correlation-request-id',
  'd64425a7-898e-4632-b96b-c5e3084db029',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070830Z:d64425a7-898e-4632-b96b-c5e3084db029',
  'Date',
  'Fri, 19 Nov 2021 07:08:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cf7dd791-0b4f-4ba0-b583-81cec951187f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11841',
  'x-ms-correlation-request-id',
  '21efed50-f16b-475b-bbbd-64ac7bda7df9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070830Z:21efed50-f16b-475b-bbbd-64ac7bda7df9',
  'Date',
  'Fri, 19 Nov 2021 07:08:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '58afcc58-6fb1-41bd-8e00-acc659ea62c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11840',
  'x-ms-correlation-request-id',
  'a4607812-3fa5-48cf-a0e7-42e0089158f3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070830Z:a4607812-3fa5-48cf-a0e7-42e0089158f3',
  'Date',
  'Fri, 19 Nov 2021 07:08:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '69253ab6-0a44-4577-8657-1666693be9b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11839',
  'x-ms-correlation-request-id',
  '4d88f45e-7934-4f66-9d5a-72d86b758537',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070831Z:4d88f45e-7934-4f66-9d5a-72d86b758537',
  'Date',
  'Fri, 19 Nov 2021 07:08:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9d8d5f5d-7294-42ca-973c-b48b76f19de4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11838',
  'x-ms-correlation-request-id',
  'd73a99fe-1895-4432-b8e3-0917cc11635f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070831Z:d73a99fe-1895-4432-b8e3-0917cc11635f',
  'Date',
  'Fri, 19 Nov 2021 07:08:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'dc791a36-34fb-4b4f-9e65-56725ccd3876',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11837',
  'x-ms-correlation-request-id',
  'de1b1fa2-4ba5-432f-b2aa-f18f060613c7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070831Z:de1b1fa2-4ba5-432f-b2aa-f18f060613c7',
  'Date',
  'Fri, 19 Nov 2021 07:08:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8f07bc7d-dc93-4a4b-b8ea-25a013fb10f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11836',
  'x-ms-correlation-request-id',
  '2f9f0304-e0d4-4d1f-ac91-338725a4a6e4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070832Z:2f9f0304-e0d4-4d1f-ac91-338725a4a6e4',
  'Date',
  'Fri, 19 Nov 2021 07:08:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6363aed6-5745-4823-a0a1-cd2a35b433a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11835',
  'x-ms-correlation-request-id',
  '3a1da0d7-ad0e-4805-a222-1fd176377a3a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070832Z:3a1da0d7-ad0e-4805-a222-1fd176377a3a',
  'Date',
  'Fri, 19 Nov 2021 07:08:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4fe0f614-0135-4e9c-b7cb-4012b2847525',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11834',
  'x-ms-correlation-request-id',
  'fa7fafda-d7de-4396-b0f8-dc886bb61152',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070832Z:fa7fafda-d7de-4396-b0f8-dc886bb61152',
  'Date',
  'Fri, 19 Nov 2021 07:08:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6a2ce82b-2b75-4059-8adc-2e4d236b9fd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11833',
  'x-ms-correlation-request-id',
  '8744c917-8b28-405d-a2b8-5f4d6d2ce481',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070832Z:8744c917-8b28-405d-a2b8-5f4d6d2ce481',
  'Date',
  'Fri, 19 Nov 2021 07:08:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '81c4865a-1028-4f47-929a-83ace6e13699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11832',
  'x-ms-correlation-request-id',
  '768e79e8-e02c-4157-8d0e-6789f8f0a561',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070833Z:768e79e8-e02c-4157-8d0e-6789f8f0a561',
  'Date',
  'Fri, 19 Nov 2021 07:08:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9ed01bb3-c67d-4078-b8a7-0129f67f5f20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11831',
  'x-ms-correlation-request-id',
  'b5b0f013-3997-4e76-a001-05e03351527e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070833Z:b5b0f013-3997-4e76-a001-05e03351527e',
  'Date',
  'Fri, 19 Nov 2021 07:08:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'eb314ea8-3f17-49e9-8032-23e35b3e3bb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11830',
  'x-ms-correlation-request-id',
  'c7ed352b-b06f-4b93-b8c5-361a8ec9172d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070833Z:c7ed352b-b06f-4b93-b8c5-361a8ec9172d',
  'Date',
  'Fri, 19 Nov 2021 07:08:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '33e50586-638f-4677-b125-6aa9b44f9977',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11829',
  'x-ms-correlation-request-id',
  'a067acc4-8296-44a8-ae1f-17c9ea31fcd8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070834Z:a067acc4-8296-44a8-ae1f-17c9ea31fcd8',
  'Date',
  'Fri, 19 Nov 2021 07:08:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b2978edb-4e47-4a26-b5c8-0e49b0674777',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11828',
  'x-ms-correlation-request-id',
  '53a76d86-56ae-4b2d-b068-bce728662faa',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070834Z:53a76d86-56ae-4b2d-b068-bce728662faa',
  'Date',
  'Fri, 19 Nov 2021 07:08:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '145bb52e-6ef1-4e5f-bd82-c064b4c6be91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11827',
  'x-ms-correlation-request-id',
  '27bac67e-a0ac-4151-8983-cfbdb9014ee7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070835Z:27bac67e-a0ac-4151-8983-cfbdb9014ee7',
  'Date',
  'Fri, 19 Nov 2021 07:08:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0a3f6d7b-2751-4b00-87e4-9afe0abec845',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11826',
  'x-ms-correlation-request-id',
  '35176810-d811-47c6-9ce2-2478a6ef605d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070835Z:35176810-d811-47c6-9ce2-2478a6ef605d',
  'Date',
  'Fri, 19 Nov 2021 07:08:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '07f44cc3-bcca-4d2c-ac07-63f1876b2a04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11825',
  'x-ms-correlation-request-id',
  '6b52a268-217b-4cb9-83f2-be56bf63099a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070835Z:6b52a268-217b-4cb9-83f2-be56bf63099a',
  'Date',
  'Fri, 19 Nov 2021 07:08:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '950f6d81-0372-4f15-b068-218468dcb8b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11824',
  'x-ms-correlation-request-id',
  '183525ce-6607-470b-b884-af58d30ed80d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070836Z:183525ce-6607-470b-b884-af58d30ed80d',
  'Date',
  'Fri, 19 Nov 2021 07:08:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '374fe9e2-685e-486d-a283-fdff991661ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11823',
  'x-ms-correlation-request-id',
  'b6238d0f-4402-43a9-86b9-e568eebbbc32',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070836Z:b6238d0f-4402-43a9-86b9-e568eebbbc32',
  'Date',
  'Fri, 19 Nov 2021 07:08:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6810ce79-47d3-4d8b-8cbe-22ce37f6da01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11822',
  'x-ms-correlation-request-id',
  '76441c03-bb07-4d8a-8db7-ccb680a0d6b5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070836Z:76441c03-bb07-4d8a-8db7-ccb680a0d6b5',
  'Date',
  'Fri, 19 Nov 2021 07:08:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '58a07b0c-601d-4ae4-bc1d-8b98ba71e8b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11821',
  'x-ms-correlation-request-id',
  '53dfe60d-0e7e-4882-90f8-0adbaa47d7b6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070837Z:53dfe60d-0e7e-4882-90f8-0adbaa47d7b6',
  'Date',
  'Fri, 19 Nov 2021 07:08:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '758ab0ca-a106-49db-a094-d65c75090423',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11820',
  'x-ms-correlation-request-id',
  'f3ea7a2c-177a-43c3-964f-ab1df513b907',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070837Z:f3ea7a2c-177a-43c3-964f-ab1df513b907',
  'Date',
  'Fri, 19 Nov 2021 07:08:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'aa25c770-382b-452a-b884-0fba12a0dbd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11819',
  'x-ms-correlation-request-id',
  '06868538-3519-484f-a975-5df117178297',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070837Z:06868538-3519-484f-a975-5df117178297',
  'Date',
  'Fri, 19 Nov 2021 07:08:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ed38ccb6-9126-46e5-a5fe-6e345039baa9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11818',
  'x-ms-correlation-request-id',
  '384baba6-06cc-4835-92fc-e0eb0a90ca8a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070838Z:384baba6-06cc-4835-92fc-e0eb0a90ca8a',
  'Date',
  'Fri, 19 Nov 2021 07:08:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a91d3502-b76d-4370-a0d0-a99f0251bffb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11817',
  'x-ms-correlation-request-id',
  'e16d9a26-0376-43ed-8a72-c29f4bbfef2e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070838Z:e16d9a26-0376-43ed-8a72-c29f4bbfef2e',
  'Date',
  'Fri, 19 Nov 2021 07:08:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f3895a91-6702-4d71-a26c-162108e3f17b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11816',
  'x-ms-correlation-request-id',
  '5a74e17c-f2d0-4ccb-9f5a-8f332cb7c11f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070838Z:5a74e17c-f2d0-4ccb-9f5a-8f332cb7c11f',
  'Date',
  'Fri, 19 Nov 2021 07:08:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '18ea252d-9c21-4f87-981f-4dd1030020d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11815',
  'x-ms-correlation-request-id',
  'c161b796-03f4-44a2-9c8d-bec637190311',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070838Z:c161b796-03f4-44a2-9c8d-bec637190311',
  'Date',
  'Fri, 19 Nov 2021 07:08:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '12f34976-4d4e-493a-b603-4e23c91e9efb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11814',
  'x-ms-correlation-request-id',
  '5e0eae02-4713-4215-94de-fe64beea5895',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070839Z:5e0eae02-4713-4215-94de-fe64beea5895',
  'Date',
  'Fri, 19 Nov 2021 07:08:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7911071c-73f5-4902-b8ac-4e7d876a8fa9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11813',
  'x-ms-correlation-request-id',
  '83ca6760-f5cc-4fb8-99fe-0165f54abe34',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070839Z:83ca6760-f5cc-4fb8-99fe-0165f54abe34',
  'Date',
  'Fri, 19 Nov 2021 07:08:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '03a62043-b4cf-47c3-95d4-e48ca29335fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11812',
  'x-ms-correlation-request-id',
  '78598516-a3d2-4764-a258-51e24c4827ce',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070839Z:78598516-a3d2-4764-a258-51e24c4827ce',
  'Date',
  'Fri, 19 Nov 2021 07:08:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b09a6012-e5ff-4084-895b-bd90abd60e40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11811',
  'x-ms-correlation-request-id',
  'dc4cbf5d-b677-4fa3-a1a1-ef299b726941',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070840Z:dc4cbf5d-b677-4fa3-a1a1-ef299b726941',
  'Date',
  'Fri, 19 Nov 2021 07:08:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a50a40c5-4a9b-4137-acdd-6ed03675d7be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11810',
  'x-ms-correlation-request-id',
  '05f5763e-8d5e-4420-946d-00a146fe9c49',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070840Z:05f5763e-8d5e-4420-946d-00a146fe9c49',
  'Date',
  'Fri, 19 Nov 2021 07:08:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bcbffa9d-58d3-41d4-94fc-c89108be46ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11809',
  'x-ms-correlation-request-id',
  'b1a43e1c-9c0a-4ea5-946b-f3d8e84479cb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070840Z:b1a43e1c-9c0a-4ea5-946b-f3d8e84479cb',
  'Date',
  'Fri, 19 Nov 2021 07:08:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3e7a4a0a-5e3d-40e0-97ff-430e0bd136a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11808',
  'x-ms-correlation-request-id',
  '42da12d2-60a8-44fa-bae6-b54b70a960ce',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070841Z:42da12d2-60a8-44fa-bae6-b54b70a960ce',
  'Date',
  'Fri, 19 Nov 2021 07:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e7d7afbc-a9f3-4214-9855-ddf67d382575',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11807',
  'x-ms-correlation-request-id',
  '145ef213-6ce7-4741-97f0-2737415d9e7d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070841Z:145ef213-6ce7-4741-97f0-2737415d9e7d',
  'Date',
  'Fri, 19 Nov 2021 07:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '5b475ca9-bbf7-44c3-9bcf-2fdf1140ca03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11806',
  'x-ms-correlation-request-id',
  '1f8ea5ab-1f3c-4d08-a2dc-b7cd426fa21f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070841Z:1f8ea5ab-1f3c-4d08-a2dc-b7cd426fa21f',
  'Date',
  'Fri, 19 Nov 2021 07:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '20149bb5-ca5f-450f-8a34-95fe21ed3580',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11805',
  'x-ms-correlation-request-id',
  'eda946f1-f347-4d3e-b1a6-53cc18b57ae5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070842Z:eda946f1-f347-4d3e-b1a6-53cc18b57ae5',
  'Date',
  'Fri, 19 Nov 2021 07:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'd1d9799a-0ada-4f66-9bc1-c30d2e5dbe8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11804',
  'x-ms-correlation-request-id',
  '15d5df1e-7485-49ba-854d-1bf9ad1377fc',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070842Z:15d5df1e-7485-49ba-854d-1bf9ad1377fc',
  'Date',
  'Fri, 19 Nov 2021 07:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0203b57d-ba80-4c85-ac5a-22fe5ee2ebd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11803',
  'x-ms-correlation-request-id',
  'd24b11b2-523d-48b7-b752-1ecf455ced21',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070842Z:d24b11b2-523d-48b7-b752-1ecf455ced21',
  'Date',
  'Fri, 19 Nov 2021 07:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '40566741-02e4-486c-8c4f-6382cfe86b03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11802',
  'x-ms-correlation-request-id',
  'b7c18b01-5c9a-4302-b978-f3de595770ab',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070843Z:b7c18b01-5c9a-4302-b978-f3de595770ab',
  'Date',
  'Fri, 19 Nov 2021 07:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1d40113a-4bf9-4c49-830d-3399923d39e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11801',
  'x-ms-correlation-request-id',
  'd8530dfc-b628-4f51-9ab8-23e245e63fd2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070843Z:d8530dfc-b628-4f51-9ab8-23e245e63fd2',
  'Date',
  'Fri, 19 Nov 2021 07:08:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '5cad84f6-ee1a-41d4-a346-f2c1a0fa49d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11800',
  'x-ms-correlation-request-id',
  'bbeb4b6f-9499-4c26-94aa-82698fcd5553',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070843Z:bbeb4b6f-9499-4c26-94aa-82698fcd5553',
  'Date',
  'Fri, 19 Nov 2021 07:08:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7ff6dae2-6bb3-4231-b9dc-6892eebee3f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11799',
  'x-ms-correlation-request-id',
  '8d8148a4-7331-4441-a765-54e1c937d68b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070844Z:8d8148a4-7331-4441-a765-54e1c937d68b',
  'Date',
  'Fri, 19 Nov 2021 07:08:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '599a695f-f83b-4a9c-825f-c732b22bb6c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11798',
  'x-ms-correlation-request-id',
  'bdebe7ef-fb28-4385-af2e-e0908a86522a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070844Z:bdebe7ef-fb28-4385-af2e-e0908a86522a',
  'Date',
  'Fri, 19 Nov 2021 07:08:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7366f62b-89ba-4771-9000-be4c941264c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11797',
  'x-ms-correlation-request-id',
  'a9ac53ae-007c-4565-a270-ed068c802b52',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070844Z:a9ac53ae-007c-4565-a270-ed068c802b52',
  'Date',
  'Fri, 19 Nov 2021 07:08:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '518aceec-0bc6-4b6a-a238-151bd912eebe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11796',
  'x-ms-correlation-request-id',
  'b6cac715-54b0-4bee-a036-f00523066966',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070844Z:b6cac715-54b0-4bee-a036-f00523066966',
  'Date',
  'Fri, 19 Nov 2021 07:08:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '81ae3f0c-3a16-435c-9c77-22f1657b14fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11795',
  'x-ms-correlation-request-id',
  '7662e5bc-c78e-4554-b03b-ce81da232069',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070845Z:7662e5bc-c78e-4554-b03b-ce81da232069',
  'Date',
  'Fri, 19 Nov 2021 07:08:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'b481fb24-e593-407d-bc3e-cb12a4998392',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11794',
  'x-ms-correlation-request-id',
  '1ec6f0d3-5ae0-4869-9a3a-7027107cbb4c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070845Z:1ec6f0d3-5ae0-4869-9a3a-7027107cbb4c',
  'Date',
  'Fri, 19 Nov 2021 07:08:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fc2f3a7b-37cf-42f2-ace7-91cdec0ee006',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11793',
  'x-ms-correlation-request-id',
  '70654902-143d-4470-a98e-5342e839bb79',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070845Z:70654902-143d-4470-a98e-5342e839bb79',
  'Date',
  'Fri, 19 Nov 2021 07:08:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0d02930c-4dbe-4121-a8d8-6be3f7c35e75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11792',
  'x-ms-correlation-request-id',
  '53339fbb-3a12-46f9-9b6a-6ac6af46c976',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070846Z:53339fbb-3a12-46f9-9b6a-6ac6af46c976',
  'Date',
  'Fri, 19 Nov 2021 07:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'a87cb67c-33e5-4ddc-9ca8-28498702aff9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11791',
  'x-ms-correlation-request-id',
  '93d5e1e3-2370-4dbc-a1e1-36fe4e064e61',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070846Z:93d5e1e3-2370-4dbc-a1e1-36fe4e064e61',
  'Date',
  'Fri, 19 Nov 2021 07:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '318ded48-a2e7-4e28-99dd-c248e29b967c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11790',
  'x-ms-correlation-request-id',
  '82918d40-ad64-4677-a544-2425257ab726',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070846Z:82918d40-ad64-4677-a544-2425257ab726',
  'Date',
  'Fri, 19 Nov 2021 07:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f6e01c00-81a8-4c8e-83b3-92cda57c6328',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11789',
  'x-ms-correlation-request-id',
  '6713f546-9079-4c4e-8134-2d53304f4cb7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070847Z:6713f546-9079-4c4e-8134-2d53304f4cb7',
  'Date',
  'Fri, 19 Nov 2021 07:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '624aad46-8b95-40cc-9b63-3b93c40e0907',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11788',
  'x-ms-correlation-request-id',
  '0ba2e51a-08fc-4722-bc77-1f0e8fafe26b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070847Z:0ba2e51a-08fc-4722-bc77-1f0e8fafe26b',
  'Date',
  'Fri, 19 Nov 2021 07:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '19e62fdb-07c2-439e-87c6-c4309bcb7cf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11787',
  'x-ms-correlation-request-id',
  'e6117fe7-d905-4092-81e7-696b94982e48',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070847Z:e6117fe7-d905-4092-81e7-696b94982e48',
  'Date',
  'Fri, 19 Nov 2021 07:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '86429fbc-484d-44d5-9c3f-dc42832464b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11786',
  'x-ms-correlation-request-id',
  'dffdb5f5-e7bb-4c89-9e56-40061a2fbfeb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070848Z:dffdb5f5-e7bb-4c89-9e56-40061a2fbfeb',
  'Date',
  'Fri, 19 Nov 2021 07:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '432adc2d-9eba-4ed0-b55c-90e4e671581b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11785',
  'x-ms-correlation-request-id',
  '83fa186c-950d-4291-a5f5-a0cc9221ea10',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070848Z:83fa186c-950d-4291-a5f5-a0cc9221ea10',
  'Date',
  'Fri, 19 Nov 2021 07:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '56e8ff1c-839d-4853-b10d-399593c75468',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11784',
  'x-ms-correlation-request-id',
  'ba8dbd9e-3179-40d9-a54d-ed2ce2f50a48',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070848Z:ba8dbd9e-3179-40d9-a54d-ed2ce2f50a48',
  'Date',
  'Fri, 19 Nov 2021 07:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '167b699f-f24c-4ae2-a6df-7691a6256834',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11783',
  'x-ms-correlation-request-id',
  'a2bfd5f9-eedc-444a-84a4-3fd305c8fcc8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070849Z:a2bfd5f9-eedc-444a-84a4-3fd305c8fcc8',
  'Date',
  'Fri, 19 Nov 2021 07:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '34707510-2b8f-49ab-9063-b1fd29a4cd2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11782',
  'x-ms-correlation-request-id',
  '2410783b-1dc6-426a-8915-9a7f59814873',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070849Z:2410783b-1dc6-426a-8915-9a7f59814873',
  'Date',
  'Fri, 19 Nov 2021 07:08:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificateOperationResults/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7-8d9ab2b4b9df498')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  'c888e647-a917-4b98-b803-7e19819eb96f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11781',
  'x-ms-correlation-request-id',
  '8fe75639-7571-4e16-8a09-f638e9f37670',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070849Z:8fe75639-7571-4e16-8a09-f638e9f37670',
  'Date',
  'Fri, 19 Nov 2021 07:08:49 GMT',
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
  '11780',
  'x-ms-request-id',
  '45c47c79-0ba0-4dc9-8ecb-d34c03c0a1ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '4c358d16-2493-4fb3-b99d-ecf81cb5d5a0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070850Z:4c358d16-2493-4fb3-b99d-ecf81cb5d5a0',
  'Date',
  'Fri, 19 Nov 2021 07:08:49 GMT'
]);
