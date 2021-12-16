let nock = require('nock');

module.exports.hash = "4195050580ae5446c247f2f52b7c0452";

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
  '9b6453e2-2646-4a34-ae4f-538306bb1f00',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Atx8BinT9IxItLfi9hTkk24; expires=Thu, 02-Dec-2021 06:36:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFrnbhyCyYCeLWrBma2c7xJowbVlCyt9D0MdN7mc6HIv46GX9Toa8UeXHju1rwJUopD8z8HXeyik9bNVyI66neX2Z5qT0Q2tCKwPoqCmbFmasxkaXPn9RaFe9PjHqzAGIKehdso0w3gPzInYHwjWUoKQzL2Q5aGhjSAsb0uLbCRIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Nov 2021 06:36:02 GMT',
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
  '7c341d3b-9675-4cf7-a730-8bf2486a0100',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvcRhTgr8-hMsuYdhlCs4WY; expires=Thu, 02-Dec-2021 06:36:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruVDc7QNEozhyFhEGpI49OypSFYG4pdybqi-gjj75zDXr7L7a0R82iRswmG-O7Fi5P6PxHvbK3rTVB9Z5mrZXvfWwKDyd_rdJ6mZEvediLAlkQhFw161ZH-egwDlxGDAC7a5C3vRnn60RVHhCr7M4ZPA7obR54YGLO3mtINs5sLogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Nov 2021 06:36:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8ca944b3-c292-4f28-ab54-1e237c20237c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'e1d52355-3b41-4b32-9463-4c3f5c451e00',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Agmrhljq4RdJkRqlOPzxrqoWPr5BAQAAAFLTEtkOAAAA; expires=Thu, 02-Dec-2021 06:36:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Nov 2021 06:36:03 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Network/virtualNetworks/virtualnetworkzzz/subnets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a365b6c0e71f35ebc9326f7ff0831f7c34b2df15337c7397be6aa675b16a8b6ad9dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9bbb8fee9a6cd9bf6eeaaae2e8b595e3777bf28a675d554e7edf845de5e55f5dbbb9745ddaeb352ff6cccdf8415fe26ccee1222f457a33fe9130fd7bccd2e80ed77effebe1f3d98cc1ee4b3f3ddedd9a793f3edfd839d7bdbd9c37cba7d6f676f3acdf7f67677ce777edf8fbc9709ad555eb745de10084b1bf9e2b26868dcc5f2e2759bb54caad76b8292cff29983404db3d98c46ddbcacf3f3e21d9aedee8cf9bfbb7bfb41c3595ee6171913939a7deffbfe77abbab8a45e4e97b355552c5ba5c5cbaa2ca682dc47a7cb6c5276bad6b79e17cbb7aff3fab298e61b5e34effd120be1a3f67ac503bb794e84f28d02f925f8f1fddf38f925","ff0f704086e964020000"], [
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
  'x-ms-request-id',
  '1e493aa1-e07f-4976-8839-daf7d7f9dcba',
  'x-ms-correlation-request-id',
  'ad278eff-dfb0-4f1d-a2fe-fc048511f9c5',
  'x-ms-arm-service-request-id',
  'f980a0d8-22aa-4f36-9073-4b85da6ba619',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211102T063603Z:ad278eff-dfb0-4f1d-a2fe-fc048511f9c5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Nov 2021 06:36:03 GMT'
]);
