let nock = require('nock');

module.exports.hash = "c0605a5f5f0bb0b1207b8a70f2f8290e";

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
  '32ea23f5-8af6-4214-946f-0c695ba02000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsIUxp1ilHJHiCLb5bn_ri0; expires=Sun, 23-Jan-2022 02:21:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrejWKQBTOzl3lMxsRuphD90DtVpiBsW6R0Bi0d-I28gZnMcC7AVDPAtQKL3tIQ0ms528eD9SvDSrGUVa9B00YsTclvZ1b5eD9M0SWvDti7bzIMAXTMSTtgBxIpfMrLelpaIlQdnxm3n5IijZyu1uBnN--41Xr6gYAy4GWGooi5kIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:21:03 GMT',
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
  'c7025f87-5230-4b1b-a3d3-5a8ea8ee2600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aodn-d_RUH9DrQZ1xtClZMA; expires=Sun, 23-Jan-2022 02:21:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrTngJyDn_6lWw4pHAKNJQWYnQZ10793_DzLcdwx7mOIdlxmXV4nPMeU9cF5dFdLptcBzp68WsiQURq2mJSBf3kyzWiFG5iM3n5-QBpY3l9RtKIjQsyHekyJ10h2J1KZnPnA2g9d5x8GtJStlaRjp34YAL0j_uiZfoKt_wQepXRj0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:21:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e95a3274-013b-46c8-a8cc-7418740f763d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '65eed48d-5688-4f85-96c3-e740facf1900',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Agic_UBiVBRNpaids5aX5grLj78gAQAAAI8lV9kOAAAA; expires=Sun, 23-Jan-2022 02:21:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:21:04 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'f5136f7b-cdfa-42fa-850a-cdbb277b8b00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14996',
  'x-ms-correlation-request-id',
  'b53489f6-3de7-4665-a844-738f7cf7cd96',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022105Z:b53489f6-3de7-4665-a844-738f7cf7cd96',
  'Date',
  'Fri, 24 Dec 2021 02:21:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '3d3006a1-28ea-4fe3-b533-43cb416a8ece',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11755',
  'x-ms-correlation-request-id',
  'fefd2868-d035-4868-ba83-5b86f6fda636',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022105Z:fefd2868-d035-4868-ba83-5b86f6fda636',
  'Date',
  'Fri, 24 Dec 2021 02:21:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'fddc6449-0654-44ba-ab7b-ada009b081ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10823',
  'x-ms-correlation-request-id',
  '752e92df-8460-45c4-bf83-12ca6a1b0f70',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022634Z:752e92df-8460-45c4-bf83-12ca6a1b0f70',
  'Date',
  'Fri, 24 Dec 2021 02:26:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'fd748c9d-5018-41df-943a-f7c33c679563',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10822',
  'x-ms-correlation-request-id',
  'cc500063-dc36-4b55-b1d6-67fb0d7f4350',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022635Z:cc500063-dc36-4b55-b1d6-67fb0d7f4350',
  'Date',
  'Fri, 24 Dec 2021 02:26:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'cd740034-5dee-4025-8526-c8b717d8c966',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10821',
  'x-ms-correlation-request-id',
  '1965985a-936d-4ebe-8f4c-2b0ef9fa77f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022635Z:1965985a-936d-4ebe-8f4c-2b0ef9fa77f6',
  'Date',
  'Fri, 24 Dec 2021 02:26:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'afd40922-7772-4bec-a4bf-258224330198',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10820',
  'x-ms-correlation-request-id',
  '14c98b91-8962-4b9c-861f-9b3adbfee217',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022635Z:14c98b91-8962-4b9c-861f-9b3adbfee217',
  'Date',
  'Fri, 24 Dec 2021 02:26:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '88e05b5e-ab89-44bb-ada6-a48ba3652b19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10819',
  'x-ms-correlation-request-id',
  '4df1dc77-d120-41e2-a5e6-27135d37edeb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022636Z:4df1dc77-d120-41e2-a5e6-27135d37edeb',
  'Date',
  'Fri, 24 Dec 2021 02:26:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '262fa9c7-61be-4680-b450-6683dc5e480b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10818',
  'x-ms-correlation-request-id',
  '2330309a-1d4a-4430-8814-075a628002d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022636Z:2330309a-1d4a-4430-8814-075a628002d0',
  'Date',
  'Fri, 24 Dec 2021 02:26:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/accountOperationResults/myaccountxxx-f5136f7b-cdfa-42fa-850a-cdbb277b8b00')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  '96c38857-f99c-4301-8cb3-80017ec2bfd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '10817',
  'x-ms-correlation-request-id',
  'a2d7b859-10a5-41a9-95b5-415ad93c6c78',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022636Z:a2d7b859-10a5-41a9-95b5-415ad93c6c78',
  'Date',
  'Fri, 24 Dec 2021 02:26:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/batchAccounts')
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
  '10816',
  'x-ms-request-id',
  '9570a5f6-d4c7-45df-bdaf-9d13f1149708',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '27c85d9e-3802-41f6-bf98-85ecf3b5b28f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022637Z:27c85d9e-3802-41f6-bf98-85ecf3b5b28f',
  'Date',
  'Fri, 24 Dec 2021 02:26:37 GMT'
]);
