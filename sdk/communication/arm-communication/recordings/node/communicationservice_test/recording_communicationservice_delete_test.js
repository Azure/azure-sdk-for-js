let nock = require('nock');

module.exports.hash = "6076ab1a2072703c20395ffe8bdb361a";

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
  '8b4f67d0-f248-41dc-b7e7-4e8a503e1d00',
  'x-ms-ests-server',
  '2.1.12381.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao_p96FK17VGl_IKWv5fxYE; expires=Thu, 10-Feb-2022 03:19:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPYg5JVJguCbHiBLIanSjZy82CNXu3qx7-NH4gXawNGeERpvWbj19XZ0aOfYKRoNqf84VS2sUsYD_dDCWseSIEbnsrkp4ye9Pi0riLQYeYD65vkYfoV-UKkrojl9nvRNUBGQ_rU5odhFno2ITzGYxopWIRGamijGwkQpEIUYCIF0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 11 Jan 2022 03:19:33 GMT',
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
  'c3b629f0-4963-4c38-ad6a-8e7aa3531d00',
  'x-ms-ests-server',
  '2.1.12381.10 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AoVYbqa2qiVEn9Q83ss3Iq0; expires=Thu, 10-Feb-2022 03:19:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvPfg02wu4Xg5q6Xqreo-LxWVTTrJQs9B42gEXDgIatbt_P48t0VJHTpr2EaE_3mSbj0rYbPf0HVMmTuukhTn29OuD0_XVlbtUPVsz_2rFtjxa8qipszBFyxRiZ9Vp06D2hK3yFTT6uzJjJsY_F3CWMcjHtmZN9sovx-dPYeRHmYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 11 Jan 2022 03:19:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e57db1e8-0dd0-4674-b88d-1b12cc8578ec&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e932c718-57f8-4ebb-b2ed-4ce1ab851d00',
  'x-ms-ests-server',
  '2.1.12381.10 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aj2zSDagokxNmklJ1G3R2VPLj78gAQAAAEbubtkOAAAA; expires=Thu, 10-Feb-2022 03:19:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 11 Jan 2022 03:19:34 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx')
  .query(true)
  .reply(202, null, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '4',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"37003464-0000-0700-0000-61dcf74b0000"',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96?api-version=2020-08-20',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-providerhub-traffic',
  'True',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96?api-version=2020-08-20',
  'x-ms-request-id',
  'eea616f1-8b2d-4736-a09e-536e7b2b2f75',
  'x-ms-correlation-request-id',
  'b2c94c03-25f6-43ad-9e87-dcff54d6bc9b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031939Z:b2c94c03-25f6-43ad-9e87-dcff54d6bc9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-request-id',
  '67fcde72-a37a-4c2d-bb98-17ca122bc768',
  'x-ms-correlation-request-id',
  '95dcb0bd-ec8f-4bde-8f21-c0ddf8a93dd8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031939Z:95dcb0bd-ec8f-4bde-8f21-c0ddf8a93dd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-request-id',
  'e937e2ab-fe7a-422e-9bb9-5e23d106aa0d',
  'x-ms-correlation-request-id',
  '0087dd25-7950-4c2f-9ca5-d6dbe7057789',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031941Z:0087dd25-7950-4c2f-9ca5-d6dbe7057789',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-request-id',
  '8023704e-cdc0-482a-aa49-1699f4516e44',
  'x-ms-correlation-request-id',
  '33de0e6b-adce-4b51-af1d-cb7aa9e5dc46',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031944Z:33de0e6b-adce-4b51-af1d-cb7aa9e5dc46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-request-id',
  '50120b31-a465-4ad7-8e0d-bfa94830c1ac',
  'x-ms-correlation-request-id',
  '31daada7-fc13-4d65-b2f4-f5de79bf3831',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031946Z:31daada7-fc13-4d65-b2f4-f5de79bf3831',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-request-id',
  'b6fbf9f0-c250-4b7d-a1d1-9be5e54b9b4e',
  'x-ms-correlation-request-id',
  '3982de59-f99d-4215-be85-db139fa6eb11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031948Z:3982de59-f99d-4215-be85-db139fa6eb11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-request-id',
  'a8827368-642e-4187-b6ac-8830751ddbf2',
  'x-ms-correlation-request-id',
  '6a953884-67ef-43ad-a391-7b9f6760e56a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031951Z:6a953884-67ef-43ad-a391-7b9f6760e56a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-request-id',
  'e6e39f84-64cb-4b28-b5d4-d4b363c5982e',
  'x-ms-correlation-request-id',
  'dd8f1744-f122-4bf0-9857-d224c511360d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031953Z:dd8f1744-f122-4bf0-9857-d224c511360d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-request-id',
  'f3402acb-1d4c-43cb-9c91-9c09f4607e49',
  'x-ms-correlation-request-id',
  '4c90b908-610e-4a05-9b64-c46ca148717d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031955Z:4c90b908-610e-4a05-9b64-c46ca148717d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-request-id',
  'a3698a0d-4665-47f1-85bb-d028ee30917b',
  'x-ms-correlation-request-id',
  '7d50e623-cb12-4e12-a2a1-bb5fe8ed5c7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T031957Z:7d50e623-cb12-4e12-a2a1-bb5fe8ed5c7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:19:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-request-id',
  'b54368d6-bfca-4ed3-8658-e66566136631',
  'x-ms-correlation-request-id',
  '62b76a8e-0bdd-495f-b3f5-620c1c74366b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032000Z:62b76a8e-0bdd-495f-b3f5-620c1c74366b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-request-id',
  '5c0580fe-543a-4c8a-bf83-e039ac8423f7',
  'x-ms-correlation-request-id',
  'ad9a0d0b-ba04-4a81-a100-2bb9bd1b791f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032002Z:ad9a0d0b-ba04-4a81-a100-2bb9bd1b791f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-request-id',
  'b2bcc2b4-73e8-41eb-a7df-6a737acd40bb',
  'x-ms-correlation-request-id',
  '84c295fd-0b22-4732-a326-b2073446f794',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032004Z:84c295fd-0b22-4732-a326-b2073446f794',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-request-id',
  'd036299f-29f4-4914-89c5-981032266a9d',
  'x-ms-correlation-request-id',
  'a58fdf76-0e90-428e-be3e-d65bd8feedc9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032007Z:a58fdf76-0e90-428e-be3e-d65bd8feedc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-request-id',
  'a7231f3d-bea8-4b6c-b491-ed699a2cab3b',
  'x-ms-correlation-request-id',
  'fbf74fe4-0542-4d20-9f2f-6bc0765d8f81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032009Z:fbf74fe4-0542-4d20-9f2f-6bc0765d8f81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-request-id',
  '16c51994-36a3-41ff-aadf-12c0c5a9e45e',
  'x-ms-correlation-request-id',
  'b127cc52-0826-45b6-9635-7cb07fadd7c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032011Z:b127cc52-0826-45b6-9635-7cb07fadd7c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-request-id',
  'ee8d3fb9-6d4a-471d-92ed-10abb80ec6e1',
  'x-ms-correlation-request-id',
  'e9fd0d72-452d-4bf8-b505-0e933afe4f31',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032013Z:e9fd0d72-452d-4bf8-b505-0e933afe4f31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-request-id',
  'a96b15d5-3c35-49d9-9909-b6ae374db1ad',
  'x-ms-correlation-request-id',
  '27d8e227-afc3-4bc1-b1a1-d933ebfd4efe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032016Z:27d8e227-afc3-4bc1-b1a1-d933ebfd4efe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-request-id',
  'c6cf328c-934e-4d3b-8f7b-5b6c331cf045',
  'x-ms-correlation-request-id',
  '6d15e4bc-a2be-4471-b24c-d72afb8c5621',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032018Z:6d15e4bc-a2be-4471-b24c-d72afb8c5621',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-request-id',
  'a6aae89d-0679-49c5-a9d3-a0d43b81335f',
  'x-ms-correlation-request-id',
  'c3172c72-202f-4b6a-a62b-c5ac068f441e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032020Z:c3172c72-202f-4b6a-a62b-c5ac068f441e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-request-id',
  'ae6a6376-28be-440a-99d1-a4c8c51b2675',
  'x-ms-correlation-request-id',
  '3f2c6462-b792-4889-8a0b-1ba344c3f8bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032023Z:3f2c6462-b792-4889-8a0b-1ba344c3f8bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-request-id',
  '4a609da0-2c3f-4587-8d8f-adb0da9a7319',
  'x-ms-correlation-request-id',
  '60bcb9e2-7b78-47a5-86dd-69d18045caf5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032025Z:60bcb9e2-7b78-47a5-86dd-69d18045caf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-request-id',
  'f0e83542-755d-43b5-9043-fdeaa3f3bd4c',
  'x-ms-correlation-request-id',
  'ea602aff-b8d4-4312-b3e7-c704ca3828e5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032027Z:ea602aff-b8d4-4312-b3e7-c704ca3828e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-request-id',
  '17716185-4400-4642-9e36-233a4fbf267b',
  'x-ms-correlation-request-id',
  'f57ad8f2-2ab3-4830-9451-7bf994db3937',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032029Z:f57ad8f2-2ab3-4830-9451-7bf994db3937',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-request-id',
  '70518cc8-2ccd-4c3f-89cf-e4cc9754d8bd',
  'x-ms-correlation-request-id',
  '8b711e5d-4a8b-4d0d-8599-e1ac986c9a61',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032032Z:8b711e5d-4a8b-4d0d-8599-e1ac986c9a61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-request-id',
  '44c064c5-2eac-47b4-aebb-28d03aee7ae8',
  'x-ms-correlation-request-id',
  '122521ef-3f7b-4225-a773-d1acb3e68baa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032034Z:122521ef-3f7b-4225-a773-d1acb3e68baa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-request-id',
  '87f74a10-a302-423a-b380-82bed6c62353',
  'x-ms-correlation-request-id',
  '74841c60-912a-4e8a-97f4-085dae5b800e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032036Z:74841c60-912a-4e8a-97f4-085dae5b800e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-request-id',
  '53635680-380e-4302-a885-cf7af3e55a55',
  'x-ms-correlation-request-id',
  '166c0276-a6e8-4723-af96-68eeffe6c870',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032039Z:166c0276-a6e8-4723-af96-68eeffe6c870',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-request-id',
  'd8489231-a3f8-4d9c-9c2c-f69ec98ef3da',
  'x-ms-correlation-request-id',
  'a60437c0-4873-454b-b8fd-4640540ab116',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032041Z:a60437c0-4873-454b-b8fd-4640540ab116',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-request-id',
  '936efad9-ab41-4a77-a442-dd2a9cef1193',
  'x-ms-correlation-request-id',
  'f2aa1080-e4b1-4bc2-8ad4-845693c127f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032043Z:f2aa1080-e4b1-4bc2-8ad4-845693c127f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-request-id',
  '07e42bca-34a0-4f94-bdf5-51c99f0ef63c',
  'x-ms-correlation-request-id',
  '6f8dc296-cd5e-490e-9c5e-2cea28f19366',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032045Z:6f8dc296-cd5e-490e-9c5e-2cea28f19366',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-request-id',
  '58269c4a-bdad-4200-abba-f6df8ed632f9',
  'x-ms-correlation-request-id',
  'ab1610d8-80a3-4e75-801d-8c5a9a0e5360',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032048Z:ab1610d8-80a3-4e75-801d-8c5a9a0e5360',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-request-id',
  '3b3f6b85-3e36-4a1d-ba81-c0174762aa93',
  'x-ms-correlation-request-id',
  '14ff2878-7a14-4786-85b0-99a768393366',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032050Z:14ff2878-7a14-4786-85b0-99a768393366',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-request-id',
  'dc7a5866-535f-4b87-94a8-c4706031bc7a',
  'x-ms-correlation-request-id',
  '977d38d5-a871-4ba2-be3a-958da97a9069',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032052Z:977d38d5-a871-4ba2-be3a-958da97a9069',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","name":"eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices/mycommunicationServicexxx","status":"Deleting","startTime":"2022-01-11T03:19:35.753192Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '578',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"63003f43-0000-0800-0000-61dcf74a0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-request-id',
  '1e4af147-2172-4613-beba-1942c82d844a',
  'x-ms-correlation-request-id',
  '77b7c872-c6f1-45e3-b688-6ae3c6258e9b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032054Z:77b7c872-c6f1-45e3-b688-6ae3c6258e9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Communication/locations/WESTUS2/operationStatuses/eea616f1-8b2d-4736-a09e-536e7b2b2f75*E948DC6ECB3E6938C6CEAB9AB78B701067D77BFD95D64F4DD88F18FF3BF65F96')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde5dd5d56531cbebe6ee17c5b4ae9aeabc1d9f548bc57a594c33c0b95b56f24b73f7bba7afdf7cf57aef6eb5ca6bfee8759bb5eb266feee679f6e9eea7e7bbdb0793bdd9f6fe837b9f6e673b0ff3edfbf73ecd1f4cf6267be70fee7febf4e1fec1d3934f4f4f9edc3bfdf4e1bd83934f4f4e8f9f3c3c7ef2e0e0c9839ddd9d4f1f3c7df0e0c9b3a70fef3ffd74ffd9fed3a70707cf760f9e3dbbf7e4d9a7f79f3dfcf4a3d147cb6c91d3407f58ddd57953adeb697ef675a96b007c5e57eb55737771fdd34d9b37ed2da83ef5ff7a9dd797c594e8bcb88e7dfeeedd3b42b6e1c920445fafa7d33c9fe533f9b06edf144cb5bd9dbdbded9dddeddddd373bf71eed3e7c74effef8c1fd7bbb0ff77e8a5a124a34ad6d911388e5ba2c","7fc9ff03b5063d3755020000"], [
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
  'ETag',
  '"6300cf43-0000-0800-0000-61dcf7970000"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-request-id',
  '7e8b77be-2ffe-4a56-b90b-96fac93cbcfb',
  'x-ms-correlation-request-id',
  '3e7f7333-d395-4d0b-8ae0-ad3a1d35bc34',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032057Z:3e7f7333-d395-4d0b-8ae0-ad3a1d35bc34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Communication/communicationServices')
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
  '11925',
  'x-ms-providerhub-traffic',
  'True',
  'x-ms-request-id',
  '98c8f052-499e-4206-9b62-162f285876d5',
  'x-ms-correlation-request-id',
  '4b04ee1e-5cfe-4d9a-a28c-bbfd8de2af86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220111T032057Z:4b04ee1e-5cfe-4d9a-a28c-bbfd8de2af86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 11 Jan 2022 03:20:57 GMT'
]);
