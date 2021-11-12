let nock = require('nock');

module.exports.hash = "d3adc358fe98b2bc38cf4504a3dd2320";

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
  '7636402c-909b-402c-abdd-a677ee420a00',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkC9YNesc5VFv1KabqMr9gU; expires=Sat, 11-Dec-2021 09:28:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrt5NOfYJr20s6S4ORCyBWqdRv-c5jM9nnhPzmnNkPCvk36RbZBkgDYV4pt7lu82FoaaxsbTIdJ3236v8R0sRhO3Cjv-p5KMlqYOdm2S70EopWbv_qz9R4JMA_xsxZ04IAeSPx9TAWBTstld1xCHBtUg1fyGbzqC-ilbgSxlh_jYcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 09:28:00 GMT',
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
  '7636402c-909b-402c-abdd-a677ef420a00',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtoaRN-qAahHjGw_iJlvFC8; expires=Sat, 11-Dec-2021 09:28:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8gPFYxinTnGMPslCHioTbed4ICR8uCmhTLNvI5LmEIOtg7hvb47SVCkskJSGJv2BQ1ao4rJk8gZ62hFK73H4_E8-6A5O8_vMxTXmsQ0bFXp5jfLvD7rsfGXGQxKWtgRVe-KZ7KTmOE6p1_YHaBCdowdOXUj-4guquzvdJ3zM4AQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 09:28:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=75538f8c-92be-4e2a-ac4d-98e47fd9c0d7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '7636402c-909b-402c-abdd-a677f0420a00',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiGxGjrenBRLnMWseMlRZ60WPr5BAQAAACHZHtkOAAAA; expires=Sat, 11-Dec-2021 09:28:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 09:28:01 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx6/mongodbDatabases/mydatabasexxxx')
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx6/mongodbDatabases/mydatabasexxxx/operationResults/c4a51058-c3cb-4997-9b3c-32e59f2f927f?api-version=2021-10-15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/c4a51058-c3cb-4997-9b3c-32e59f2f927f?api-version=2021-10-15',
  'x-ms-request-id',
  'c4a51058-c3cb-4997-9b3c-32e59f2f927f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  '40da3a2d-361a-4796-b85e-ddd7e4af1341',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T092802Z:40da3a2d-361a-4796-b85e-ddd7e4af1341',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 09:28:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/c4a51058-c3cb-4997-9b3c-32e59f2f927f')
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
  '10401',
  'x-ms-request-id',
  '64e9df8e-e8ce-4e9c-b333-66d7bf5cb65b',
  'x-ms-correlation-request-id',
  '64e9df8e-e8ce-4e9c-b333-66d7bf5cb65b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T092802Z:64e9df8e-e8ce-4e9c-b333-66d7bf5cb65b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 09:28:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/c4a51058-c3cb-4997-9b3c-32e59f2f927f')
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
  '10400',
  'x-ms-request-id',
  'f6b6eecd-57b4-4e15-aeb2-e37fce78a4fc',
  'x-ms-correlation-request-id',
  'f6b6eecd-57b4-4e15-aeb2-e37fce78a4fc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T092805Z:f6b6eecd-57b4-4e15-aeb2-e37fce78a4fc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 09:28:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/c4a51058-c3cb-4997-9b3c-32e59f2f927f')
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
  '10399',
  'x-ms-request-id',
  '844eadde-56e6-4f2a-be1b-748b399110a6',
  'x-ms-correlation-request-id',
  '844eadde-56e6-4f2a-be1b-748b399110a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T092807Z:844eadde-56e6-4f2a-be1b-748b399110a6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 09:28:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/c4a51058-c3cb-4997-9b3c-32e59f2f927f')
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
  '10398',
  'x-ms-request-id',
  'b2008da2-bfdb-4a08-979b-8a0d242aa807',
  'x-ms-correlation-request-id',
  'b2008da2-bfdb-4a08-979b-8a0d242aa807',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T092809Z:b2008da2-bfdb-4a08-979b-8a0d242aa807',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 09:28:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx6/mongodbDatabases')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bdefff","92ff0742ea40440c000000"], [
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
  '10397',
  'x-ms-request-id',
  '4bcdd4e9-ff03-48af-8d28-3b0e74f4420a',
  'x-ms-correlation-request-id',
  '4bcdd4e9-ff03-48af-8d28-3b0e74f4420a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T092810Z:4bcdd4e9-ff03-48af-8d28-3b0e74f4420a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 09:28:10 GMT'
]);
