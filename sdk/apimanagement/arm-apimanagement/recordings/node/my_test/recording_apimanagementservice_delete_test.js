let nock = require('nock');

module.exports.hash = "5e273aeefbcfa844fa6b15f713fed18c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dd41662d-fafd-481a-918d-44d22cd48c9b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  '9bf55710-1a6e-4602-a8e6-698340ac08ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085956Z:9bf55710-1a6e-4602-a8e6-698340ac08ad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '959f3a1f-50a2-4919-ada4-7b896d220900',
  'x-ms-ests-server',
  '2.1.12071.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Al3DVgp8lQtJhGqV0eO-76I; expires=Mon, 18-Oct-2021 08:59:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrn9no3csgrmh-PneIaRCe7cFPe0MJtYwArHFZvUh_QNRaa4vcxlnM0Aot5qg7gR26RWpqpoIelglxYm1RH6__Et1EIidVV8cs8NWHgmgtR8IBSu6giy-f_VhoKdDb6OqDFIoebEDfsDFK67cdb1SKnvHAa2TFzd07GnZDNIAA4kEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:56 GMT'
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
  'bd6d4fc9-5424-427e-9341-fbf0b4130a00',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApuarzmArNBLuJmIj4zQvsE; expires=Mon, 18-Oct-2021 08:59:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjSJcZZkT4Hc9KOzA4yzNvXX9KT9Y6wp83KJ8KtJjnjVN8_UJYHcAiX2LrVM7wVAPzo_ulUuWICAGzYP_F6pK5L0xoTMBjsqj5yOFXASPU3dB9gwCK3MyZxu3y5-hiVtaxXUdcpz0v0UpFNBMmCFk_5wd1owxswsMpMiOWxre4H8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c233cbc2-a12e-42ab-a5ba-6e99233fa738',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8979',
  'x-ms-correlation-request-id',
  '2106d387-5529-4a6b-b886-d970c0edf1ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085956Z:2106d387-5529-4a6b-b886-d970c0edf1ea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f55375cd-b5b0-4fc5-8733-e5e5dbf1661c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '587d074c-37ef-403a-8050-f03d85790800',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlK_OQ79xz5JlvPMPv71yQIWPr5BAQAAAIuh19gOAAAA; expires=Mon, 18-Oct-2021 08:59:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:56 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '521a406c-e8db-4e15-b49a-33602de6dbcb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8978',
  'x-ms-correlation-request-id',
  '902baddf-abb1-4cbd-8110-af56a2567d23',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085956Z:902baddf-abb1-4cbd-8110-af56a2567d23',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5453bb43-f89e-40cb-8c50-727bce9f96f3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8977',
  'x-ms-correlation-request-id',
  '0099638a-1f9d-4f98-9bee-c2b2c133d9b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085957Z:0099638a-1f9d-4f98-9bee-c2b2c133d9b6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3e1f4074-cdc3-4f9e-90d4-5d023c6ff2a9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8976',
  'x-ms-correlation-request-id',
  '10382a82-3a9e-4bfe-825e-e49f43114e98',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085957Z:10382a82-3a9e-4bfe-825e-e49f43114e98',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '88c2aa87-d192-4dde-9b2d-199e7c3396af',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8975',
  'x-ms-correlation-request-id',
  'ff0c3af3-9a2a-4aa4-8289-001bd17fa547',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085958Z:ff0c3af3-9a2a-4aa4-8289-001bd17fa547',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7e4079e0-0a3a-4969-ab90-2744c45fb87d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8974',
  'x-ms-correlation-request-id',
  '174a8b66-879a-4904-ac07-8b9d08bf7041',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085958Z:174a8b66-879a-4904-ac07-8b9d08bf7041',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ae1c4680-d162-4d16-92d3-96a3bc67792a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8973',
  'x-ms-correlation-request-id',
  'f4927a7c-392c-498c-9b8f-f2a35b9afeb0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085958Z:f4927a7c-392c-498c-9b8f-f2a35b9afeb0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '083867fa-89f2-41b5-87db-3eba1ccbd6b4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8972',
  'x-ms-correlation-request-id',
  '20cdc5e0-41fe-4213-b8e2-a026cd9537a2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085959Z:20cdc5e0-41fe-4213-b8e2-a026cd9537a2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7af9db49-41ad-4ca2-9882-de3abba31fcd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8971',
  'x-ms-correlation-request-id',
  '596f596d-0fe4-4d07-88eb-9568547c0f81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085959Z:596f596d-0fe4-4d07-88eb-9568547c0f81',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1')
  .query(true)
  .reply(409, {"error":{"code":"ServiceLocked","message":"The API Service myservicexxx1 is transitioning at this time. Please try the request again later.","details":null,"innerError":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-request-id',
  'dcb1af81-4476-47f8-86cb-5efef144e0d5',
  'x-ms-correlation-request-id',
  'dcb1af81-4476-47f8-86cb-5efef144e0d5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085959Z:dcb1af81-4476-47f8-86cb-5efef144e0d5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:58 GMT'
]);
