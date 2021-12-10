let nock = require('nock');

module.exports.hash = "6613a07d0a1b7824ac441a1504fe16e9";

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
  'b3700a5a-2a8c-4bf0-9312-fdebee0a0c00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At-7uoSTphxIs92_AyNa1lk; expires=Sun, 09-Jan-2022 06:32:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrebHpP6xMFCT6YeR9hFZda4_ctXNnqFzoNO1UiGDj8jNtWwB_x7IAx0o3ABE2y4zhXmEdCqrVTs3zUgnsUF7WvbiUAAFm_1rAamWUxU9lzx7PWQmL_wV5RuWac6mmVkoPRFcoMcM4SQ8P9luHVV-Sp5y3jc07fAkNXx77UATdo3ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 06:32:54 GMT',
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
  '515b7f7a-a6ec-4d9d-a61d-90fdeb600c00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aqo59Xeh0LxBilemm6BsNHU; expires=Sun, 09-Jan-2022 06:32:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxOHEpkUP4Xqa3PDUIDBLCJLz5a5fJNOjJy0qCjEbVcEkyO7amR-_E0BH857mMYWPm5-bCMMpiwO8DuxGrftNM2Yo1-nnFanPs6ETQO1UrRqhGyF3fBAKbXWtoVAk9p76eMN-Su7Ogx_qhalSmKVRpDE-ZVpUq16MVHcEzpdYYgAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 06:32:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9c6790a4-b4f2-4c5d-a485-cbb0e794f6c1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9e4deb1d-59f9-4f91-a0fa-cb1ef2920b00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmegroT4Q0pKp-lPe08957EWPr5BAQAAAJbrRNkOAAAA; expires=Sun, 09-Jan-2022 06:32:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 06:32:54 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cache/redis/myrediscachexxx111')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9388d2da-d74d-45eb-8880-bc748535a34a',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'a2243c26-70c6-4286-8d74-6704ff53281d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063255Z:a2243c26-70c6-4286-8d74-6704ff53281d',
  'Date',
  'Fri, 10 Dec 2021 06:32:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'cfba2048-4bce-46d8-b9d7-684a45192f90',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '0553c680-2ca1-44b0-93f9-0f9880c43ae2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063256Z:0553c680-2ca1-44b0-93f9-0f9880c43ae2',
  'Date',
  'Fri, 10 Dec 2021 06:32:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '6d2c14aa-91f2-461c-a909-5f05ea11f9bf',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  'edca9c54-d4ce-4c05-8ecc-db4d26802441',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063258Z:edca9c54-d4ce-4c05-8ecc-db4d26802441',
  'Date',
  'Fri, 10 Dec 2021 06:32:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'a5b58b4c-f54f-486f-8d6f-9d220feb6d5a',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  'f01b2a73-d38e-42a3-804a-7a9a52829694',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063300Z:f01b2a73-d38e-42a3-804a-7a9a52829694',
  'Date',
  'Fri, 10 Dec 2021 06:33:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '0e50f9b9-4898-43b6-a5c8-b18abcedfbbe',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  'dad72580-2cb4-45ad-9c32-f8f12a46d8d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063303Z:dad72580-2cb4-45ad-9c32-f8f12a46d8d7',
  'Date',
  'Fri, 10 Dec 2021 06:33:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '079189fe-0b57-4298-afc6-3c83b8086817',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  '57d0db8c-226b-40ed-92b3-50c1df8b1ac2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063305Z:57d0db8c-226b-40ed-92b3-50c1df8b1ac2',
  'Date',
  'Fri, 10 Dec 2021 06:33:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'b0a3a15d-8eec-4a63-b194-66a61c41deb2',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-correlation-request-id',
  '89da1d98-c5b2-499e-ba41-467d6968feb4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063307Z:89da1d98-c5b2-499e-ba41-467d6968feb4',
  'Date',
  'Fri, 10 Dec 2021 06:33:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '122565c7-bd11-4888-b18a-095f6f333031',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  '8585d997-05af-4904-9bf7-0b51fd0f7856',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063310Z:8585d997-05af-4904-9bf7-0b51fd0f7856',
  'Date',
  'Fri, 10 Dec 2021 06:33:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '41dac0c5-74cd-4277-8e86-7cabd3a16e14',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  '26c85ad7-7019-4684-93a8-163d79f63aa0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063312Z:26c85ad7-7019-4684-93a8-163d79f63aa0',
  'Date',
  'Fri, 10 Dec 2021 06:33:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '6847aa90-aff1-49e9-bca0-9462e40329bb',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-correlation-request-id',
  '756fb394-de5c-47dd-acfa-a556ca47d168',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063314Z:756fb394-de5c-47dd-acfa-a556ca47d168',
  'Date',
  'Fri, 10 Dec 2021 06:33:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'e4f9d1bd-a39c-4b92-abe3-d086fb1dde9a',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11989',
  'x-ms-correlation-request-id',
  '3ce7b926-dc0a-465f-9b44-396e775f195d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063317Z:3ce7b926-dc0a-465f-9b44-396e775f195d',
  'Date',
  'Fri, 10 Dec 2021 06:33:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '31c46603-89b9-4b67-9bb3-0bb3a5e3d9a5',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11988',
  'x-ms-correlation-request-id',
  'b59e7b54-d852-4303-a983-f60cf175a494',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063319Z:b59e7b54-d852-4303-a983-f60cf175a494',
  'Date',
  'Fri, 10 Dec 2021 06:33:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9368a81c-c20d-44e0-9e1a-7e8975e40058',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11987',
  'x-ms-correlation-request-id',
  'cfac4687-1bf7-4ee5-b1d7-bc13d41ca55a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063321Z:cfac4687-1bf7-4ee5-b1d7-bc13d41ca55a',
  'Date',
  'Fri, 10 Dec 2021 06:33:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c3231fb6-08e0-4687-8cbc-e57701eeb996',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11986',
  'x-ms-correlation-request-id',
  'e954da5e-2143-4be1-8ce4-2398e144ce31',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063323Z:e954da5e-2143-4be1-8ce4-2398e144ce31',
  'Date',
  'Fri, 10 Dec 2021 06:33:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'b992d2d9-266b-47d1-8399-3929e1ca6740',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11985',
  'x-ms-correlation-request-id',
  'b74e2829-c686-42d2-8849-d76cc7e7ece9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063326Z:b74e2829-c686-42d2-8849-d76cc7e7ece9',
  'Date',
  'Fri, 10 Dec 2021 06:33:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '79e3ee36-c73e-47a2-866d-071b7e738769',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-correlation-request-id',
  '21b9d25c-fb2e-4fd0-b971-ef6f7f10b73d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063328Z:21b9d25c-fb2e-4fd0-b971-ef6f7f10b73d',
  'Date',
  'Fri, 10 Dec 2021 06:33:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '4fe61fd5-84b2-4145-b0b4-646fa28ea7e1',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-correlation-request-id',
  '100479a1-adb4-4d59-87ff-12039810cc56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063330Z:100479a1-adb4-4d59-87ff-12039810cc56',
  'Date',
  'Fri, 10 Dec 2021 06:33:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '1b377949-61fb-41ad-bafd-991096bb679e',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11982',
  'x-ms-correlation-request-id',
  '6267b82d-2717-41cb-8e4f-083e691d2787',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063333Z:6267b82d-2717-41cb-8e4f-083e691d2787',
  'Date',
  'Fri, 10 Dec 2021 06:33:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '4eb2f43e-7933-4ec3-8765-0836cdf71b29',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-correlation-request-id',
  '23382234-f1de-4eaa-b3b8-db6eccb70840',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063335Z:23382234-f1de-4eaa-b3b8-db6eccb70840',
  'Date',
  'Fri, 10 Dec 2021 06:33:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'd056cc47-a04e-4cd3-8e3d-4a64921d0a84',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-correlation-request-id',
  '166f509a-0d08-4374-90ae-1273783567f3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063337Z:166f509a-0d08-4374-90ae-1273783567f3',
  'Date',
  'Fri, 10 Dec 2021 06:33:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '3d7df76c-f50b-406e-b611-1464da8f0cd9',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11979',
  'x-ms-correlation-request-id',
  'c58db45e-cd12-4ca3-8953-7e4d3c422442',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063340Z:c58db45e-cd12-4ca3-8953-7e4d3c422442',
  'Date',
  'Fri, 10 Dec 2021 06:33:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2e089821-a799-4e4d-a504-52ad6e11e3ab',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-correlation-request-id',
  'f60e1bae-9342-4d38-b5a2-17042aa39e1e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063342Z:f60e1bae-9342-4d38-b5a2-17042aa39e1e',
  'Date',
  'Fri, 10 Dec 2021 06:33:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'd597aa9c-95a8-4d1d-b22a-5970a3ca39a3',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11977',
  'x-ms-correlation-request-id',
  '219c3d98-d634-48eb-ac2e-596f230d14ed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063344Z:219c3d98-d634-48eb-ac2e-596f230d14ed',
  'Date',
  'Fri, 10 Dec 2021 06:33:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '5c6a1e4a-0bca-4570-9de8-e53261c7f2c3',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11976',
  'x-ms-correlation-request-id',
  '4cb89d39-cd4a-456d-b503-8f8c5c9efd69',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063347Z:4cb89d39-cd4a-456d-b503-8f8c5c9efd69',
  'Date',
  'Fri, 10 Dec 2021 06:33:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '3e3f315a-abf1-44c0-823f-45f14bb872ac',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-correlation-request-id',
  'ef85d8d9-b5d2-437c-bfde-ce4e17134a57',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063349Z:ef85d8d9-b5d2-437c-bfde-ce4e17134a57',
  'Date',
  'Fri, 10 Dec 2021 06:33:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '8f8d4dba-bb52-4cfa-b9e8-3d832deb0242',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11974',
  'x-ms-correlation-request-id',
  '7074fe2b-8b27-4fd9-9e73-50078100e72e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063351Z:7074fe2b-8b27-4fd9-9e73-50078100e72e',
  'Date',
  'Fri, 10 Dec 2021 06:33:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '509fed58-d4e9-4da0-b560-300b23778b41',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  'db47ab85-a01a-4519-9fc8-905cb8b5ae2c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063354Z:db47ab85-a01a-4519-9fc8-905cb8b5ae2c',
  'Date',
  'Fri, 10 Dec 2021 06:33:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '1764918c-6580-4a59-a30c-6d8402852cc1',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  'd760c90d-3901-475c-8dc5-9927558e3ce0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063356Z:d760c90d-3901-475c-8dc5-9927558e3ce0',
  'Date',
  'Fri, 10 Dec 2021 06:33:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '0f0dbabb-c877-4157-b519-fe4d19899a74',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11971',
  'x-ms-correlation-request-id',
  '6b0fb4fe-e741-4bde-b2ee-f9049e817892',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063359Z:6b0fb4fe-e741-4bde-b2ee-f9049e817892',
  'Date',
  'Fri, 10 Dec 2021 06:33:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '408ae747-609b-4f03-acfa-18ad9e68f5ea',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11970',
  'x-ms-correlation-request-id',
  '52059a75-5d7c-48cf-bd0c-2b6b07a9788d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063401Z:52059a75-5d7c-48cf-bd0c-2b6b07a9788d',
  'Date',
  'Fri, 10 Dec 2021 06:34:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'd7ac1425-f253-4590-8154-1a113552fa18',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '3ef77abc-d1d6-4fe6-bdea-6cf370dbdf9f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063403Z:3ef77abc-d1d6-4fe6-bdea-6cf370dbdf9f',
  'Date',
  'Fri, 10 Dec 2021 06:34:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '3fb01067-5dd3-40c7-af4d-fb9506ab7d23',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  '09cf7d33-94cf-46f5-b4c1-d998f89b5cee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063406Z:09cf7d33-94cf-46f5-b4c1-d998f89b5cee',
  'Date',
  'Fri, 10 Dec 2021 06:34:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'bc5ae588-30c3-45d6-8919-a3b7c4ac02b6',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  '7d7418fe-42bf-4844-9da1-0672cce80878',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063408Z:7d7418fe-42bf-4844-9da1-0672cce80878',
  'Date',
  'Fri, 10 Dec 2021 06:34:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '8432a3b2-2002-44f1-9998-64429d251325',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  'cd4c240c-6249-4b2a-9983-1fe3a0d1ca5d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063410Z:cd4c240c-6249-4b2a-9983-1fe3a0d1ca5d',
  'Date',
  'Fri, 10 Dec 2021 06:34:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '90a0e4b3-6ada-48b8-9f48-399a0cd8aed3',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  '6affdb36-bcce-4c0d-af05-6381c8b38aeb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063413Z:6affdb36-bcce-4c0d-af05-6381c8b38aeb',
  'Date',
  'Fri, 10 Dec 2021 06:34:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '79be37b3-7426-4f7c-8911-c3b71467876f',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  'eca4e1ec-fdb8-440b-9f3e-5489184348f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063415Z:eca4e1ec-fdb8-440b-9f3e-5489184348f4',
  'Date',
  'Fri, 10 Dec 2021 06:34:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '68e540d2-3a44-4dad-b462-f7a13fc90571',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  'dddd8b72-620b-4c55-8df4-2ff8181143d5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063417Z:dddd8b72-620b-4c55-8df4-2ff8181143d5',
  'Date',
  'Fri, 10 Dec 2021 06:34:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2053800e-e160-493e-8ba4-7b1f25a28708',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  '9ee8e8f9-4234-41b2-a6ef-c1e559d40500',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063420Z:9ee8e8f9-4234-41b2-a6ef-c1e559d40500',
  'Date',
  'Fri, 10 Dec 2021 06:34:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'f1239eed-a436-465d-bd5d-c9418f726edb',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  'cdca414d-5d6a-41c1-8608-b715be7fe198',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063422Z:cdca414d-5d6a-41c1-8608-b715be7fe198',
  'Date',
  'Fri, 10 Dec 2021 06:34:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '989978f6-8445-4724-abb0-91e45ade4df4',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  'a073b746-73db-45bd-8ce4-daf3bcb81b0a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063424Z:a073b746-73db-45bd-8ce4-daf3bcb81b0a',
  'Date',
  'Fri, 10 Dec 2021 06:34:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'a70b9d51-de2e-47b8-95a4-d5db79d14873',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  '2be5fb2f-3c37-44e0-9008-7d12f35f9ca4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063427Z:2be5fb2f-3c37-44e0-9008-7d12f35f9ca4',
  'Date',
  'Fri, 10 Dec 2021 06:34:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '501153f5-16fe-430e-ad80-97dab2ef33a3',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  'e876944e-42af-4796-9766-c266bab42c7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063429Z:e876944e-42af-4796-9766-c266bab42c7e',
  'Date',
  'Fri, 10 Dec 2021 06:34:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '32cf1dfd-50a2-46e1-b5f1-61476caf2cc3',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  '3a36fff0-6258-48eb-9371-10795c87e65b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063431Z:3a36fff0-6258-48eb-9371-10795c87e65b',
  'Date',
  'Fri, 10 Dec 2021 06:34:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9765bcb4-066f-487b-9e8c-efdfc69ba146',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  'a25b2d07-9958-4183-8679-298938b385d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063434Z:a25b2d07-9958-4183-8679-298938b385d7',
  'Date',
  'Fri, 10 Dec 2021 06:34:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'ef667ab9-87eb-4580-8181-a9b847f9b347',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  'dc88b289-4f25-4a44-b5cf-1c6da9e6c0ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063436Z:dc88b289-4f25-4a44-b5cf-1c6da9e6c0ce',
  'Date',
  'Fri, 10 Dec 2021 06:34:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9d3c3ea8-3ef3-4b4e-b88e-8919d861f7ae',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  'cc8ab9bc-44c1-4234-ac25-f93634f34c2c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063438Z:cc8ab9bc-44c1-4234-ac25-f93634f34c2c',
  'Date',
  'Fri, 10 Dec 2021 06:34:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'da51c179-b2cb-4cc9-841b-e4ee5943e3ca',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  'ba17d54a-8768-4f1f-8543-4e790db08990',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063441Z:ba17d54a-8768-4f1f-8543-4e790db08990',
  'Date',
  'Fri, 10 Dec 2021 06:34:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '60ef5f00-a64a-4fba-ab3a-54187dbcc963',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  'cf8b0501-250f-4721-ba77-5e8813af1253',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063443Z:cf8b0501-250f-4721-ba77-5e8813af1253',
  'Date',
  'Fri, 10 Dec 2021 06:34:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '137b4bce-6bbf-4311-a3b1-ad35455a8bf8',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  '4ec4f259-0d62-4586-87a7-754fb4d00285',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063445Z:4ec4f259-0d62-4586-87a7-754fb4d00285',
  'Date',
  'Fri, 10 Dec 2021 06:34:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'b5490297-5266-4f14-92a3-a28844d7f290',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  '81101737-b247-44a1-8cae-a4297107d574',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063448Z:81101737-b247-44a1-8cae-a4297107d574',
  'Date',
  'Fri, 10 Dec 2021 06:34:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '42f81704-58f1-4278-9f8f-0d815775f850',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  '3179f45f-5923-4336-9085-37c8b4d8c088',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063450Z:3179f45f-5923-4336-9085-37c8b4d8c088',
  'Date',
  'Fri, 10 Dec 2021 06:34:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'e21d37f9-41d5-431f-9a3a-0b48a5e474a3',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  'bd78a748-23a6-425f-bcb7-497047c329e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063452Z:bd78a748-23a6-425f-bcb7-497047c329e3',
  'Date',
  'Fri, 10 Dec 2021 06:34:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '28cdda89-b037-4766-aefb-febfdb31e0d7',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  'd99f7ce0-520d-4768-9b2c-3bc8da118a8e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063454Z:d99f7ce0-520d-4768-9b2c-3bc8da118a8e',
  'Date',
  'Fri, 10 Dec 2021 06:34:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'a232c362-3071-4df1-b328-baf076f993cc',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  'f98639a2-cabc-4d71-8e3d-6de0c5be365b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063457Z:f98639a2-cabc-4d71-8e3d-6de0c5be365b',
  'Date',
  'Fri, 10 Dec 2021 06:34:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9b6d5779-342e-43f0-9894-5ac4dc66661b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  'eab1f8c5-fbc5-4ffb-b69d-86ab30f874b9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063459Z:eab1f8c5-fbc5-4ffb-b69d-86ab30f874b9',
  'Date',
  'Fri, 10 Dec 2021 06:34:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '048773fe-0449-473e-b5dc-9bbd71bf9041',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  '6c8628c8-2e50-4e7f-835d-2f2fb440ea66',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063501Z:6c8628c8-2e50-4e7f-835d-2f2fb440ea66',
  'Date',
  'Fri, 10 Dec 2021 06:35:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '0cb47908-7795-4ed6-9438-53da79f2a343',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  'faed2349-c948-4d2a-9a4f-e9b2d31a16c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063504Z:faed2349-c948-4d2a-9a4f-e9b2d31a16c0',
  'Date',
  'Fri, 10 Dec 2021 06:35:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '74f9f50e-fc0d-484e-94ba-3dafaa3f6cd7',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  '9a03003b-0864-4189-8112-db0f23bf09f0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063506Z:9a03003b-0864-4189-8112-db0f23bf09f0',
  'Date',
  'Fri, 10 Dec 2021 06:35:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '406715c3-35aa-43dd-bb4b-8205cf186dba',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  '2617f8ac-2118-41c2-b15d-6ba7c4e106bd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063508Z:2617f8ac-2118-41c2-b15d-6ba7c4e106bd',
  'Date',
  'Fri, 10 Dec 2021 06:35:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c86a07a8-5a2b-41c4-b99c-6569c7a80ddc',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  '6bb3bfd2-71ad-41b0-89c3-b1f818dd6218',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063511Z:6bb3bfd2-71ad-41b0-89c3-b1f818dd6218',
  'Date',
  'Fri, 10 Dec 2021 06:35:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c0172d32-ed70-45fa-b2cc-53740fddbf98',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  'e8351299-7b49-4f12-973b-9d2a8d5b8b5f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063513Z:e8351299-7b49-4f12-973b-9d2a8d5b8b5f',
  'Date',
  'Fri, 10 Dec 2021 06:35:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '8aa01098-fae8-4644-9265-cb04de0d2719',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  '5d77a3d8-a7e2-4e43-9ca3-f6a1c77e21b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063515Z:5d77a3d8-a7e2-4e43-9ca3-f6a1c77e21b2',
  'Date',
  'Fri, 10 Dec 2021 06:35:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '377d8c73-421a-4773-90b0-d8bcf2f1bd1b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  '403ea81e-b621-4980-a295-6a70c3ae5238',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063518Z:403ea81e-b621-4980-a295-6a70c3ae5238',
  'Date',
  'Fri, 10 Dec 2021 06:35:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '428d96b2-74e0-4ddc-a862-2b01e8f95808',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  'ba55572e-1893-4d91-a5dd-5bac5608641d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063520Z:ba55572e-1893-4d91-a5dd-5bac5608641d',
  'Date',
  'Fri, 10 Dec 2021 06:35:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '7e2a72d4-00c5-4dfb-b635-d747c8cfc661',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  '129c301e-281e-4dfa-9618-7d48cad158be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063522Z:129c301e-281e-4dfa-9618-7d48cad158be',
  'Date',
  'Fri, 10 Dec 2021 06:35:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '312e87f7-3b3a-46e0-b5b6-5f258b1c1827',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  '08c711c0-7887-4560-a06a-b3cfa192fbe0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063525Z:08c711c0-7887-4560-a06a-b3cfa192fbe0',
  'Date',
  'Fri, 10 Dec 2021 06:35:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'bdeb81d6-0ffc-4a4a-8707-aff03feaed26',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  '66323a6f-267b-48df-8708-57f6b0e8fa5a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063527Z:66323a6f-267b-48df-8708-57f6b0e8fa5a',
  'Date',
  'Fri, 10 Dec 2021 06:35:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '86a65d50-8616-404d-9b67-52cbb1d44ab5',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  'e91a2998-2e95-4d6b-a39e-83b9807392a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063529Z:e91a2998-2e95-4d6b-a39e-83b9807392a6',
  'Date',
  'Fri, 10 Dec 2021 06:35:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'f014974d-c562-4584-9fba-fc699c129f3b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  '09258cb6-1d63-4261-8cd7-f52c3ec102f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063532Z:09258cb6-1d63-4261-8cd7-f52c3ec102f6',
  'Date',
  'Fri, 10 Dec 2021 06:35:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '3f966401-9a80-488e-8c78-7b07360c208c',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  'b041b249-8495-4354-8288-ffe9df24cefb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063534Z:b041b249-8495-4354-8288-ffe9df24cefb',
  'Date',
  'Fri, 10 Dec 2021 06:35:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2ad370c3-35ef-4cc1-9cc6-4150549d432e',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  'acb4446f-0a22-47dd-ac42-8b9bf68bf44f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063536Z:acb4446f-0a22-47dd-ac42-8b9bf68bf44f',
  'Date',
  'Fri, 10 Dec 2021 06:35:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'da7ded8f-7f62-4e13-a152-9e0453e7a272',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  '9f008935-f0ea-4196-9bcf-cf5709907bde',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063539Z:9f008935-f0ea-4196-9bcf-cf5709907bde',
  'Date',
  'Fri, 10 Dec 2021 06:35:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'd96dd328-51b4-4518-9a13-fbdbb8754312',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  'f523dfd8-484b-459c-8f41-180070aafff4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063541Z:f523dfd8-484b-459c-8f41-180070aafff4',
  'Date',
  'Fri, 10 Dec 2021 06:35:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'a6fe5332-5986-4e95-a4cb-22129f26b486',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  '425a7933-9bb2-4e24-8c8a-28cb858e9cca',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063543Z:425a7933-9bb2-4e24-8c8a-28cb858e9cca',
  'Date',
  'Fri, 10 Dec 2021 06:35:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '73970cec-2f30-4647-aa64-2b8089a67358',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  '9d0214fc-f332-4693-80be-bb564d37cf21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063546Z:9d0214fc-f332-4693-80be-bb564d37cf21',
  'Date',
  'Fri, 10 Dec 2021 06:35:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '80d9b700-8546-459e-8453-fa4640ebc09b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  '9ec3be8c-1e77-4f59-a156-f58d3e418467',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063548Z:9ec3be8c-1e77-4f59-a156-f58d3e418467',
  'Date',
  'Fri, 10 Dec 2021 06:35:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '63fdd2de-70db-42f6-b2d2-132494f2152b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-correlation-request-id',
  '79bb6482-6b58-49f2-9971-eb0eea539051',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063550Z:79bb6482-6b58-49f2-9971-eb0eea539051',
  'Date',
  'Fri, 10 Dec 2021 06:35:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2124c653-4a12-4f14-8043-90ee2e76e6b2',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  'cdbef28f-7cf3-4b4b-a052-a1d61511a4f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063553Z:cdbef28f-7cf3-4b4b-a052-a1d61511a4f4',
  'Date',
  'Fri, 10 Dec 2021 06:35:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2224b600-26f3-49a1-ac20-74272f53bbb7',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  '3c112ffc-0310-4041-9531-778939172fb5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063555Z:3c112ffc-0310-4041-9531-778939172fb5',
  'Date',
  'Fri, 10 Dec 2021 06:35:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '4583b9c1-db39-46af-8589-30f4ed7e8cbe',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  '922970c6-52e2-445b-a7f6-a0638cad5986',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063557Z:922970c6-52e2-445b-a7f6-a0638cad5986',
  'Date',
  'Fri, 10 Dec 2021 06:35:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '0a0b0ac2-ed59-42e7-9a63-2a2bad183766',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  '93c5de44-82d1-4928-87aa-8c418b7cbc3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063600Z:93c5de44-82d1-4928-87aa-8c418b7cbc3a',
  'Date',
  'Fri, 10 Dec 2021 06:35:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '32908982-7b22-4156-b99e-644488f807a6',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  '5ca6b7fc-4eba-4ea9-851f-7a89769c5c1e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063602Z:5ca6b7fc-4eba-4ea9-851f-7a89769c5c1e',
  'Date',
  'Fri, 10 Dec 2021 06:36:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'f56b69ca-0828-4aa4-95bd-60c160becaa8',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  'beac265a-cceb-4a8f-bb8b-bd070680c95c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063604Z:beac265a-cceb-4a8f-bb8b-bd070680c95c',
  'Date',
  'Fri, 10 Dec 2021 06:36:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '5c3c274d-834e-46cd-b892-2fb340d0afe2',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  'cdd5fb82-7595-49ed-bec7-a655d23a2b06',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063607Z:cdd5fb82-7595-49ed-bec7-a655d23a2b06',
  'Date',
  'Fri, 10 Dec 2021 06:36:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '41413d77-8d93-4426-970d-f97f047c06e9',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  'b0f5d47a-7f9d-4a8c-9add-2ad66f3ede74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063609Z:b0f5d47a-7f9d-4a8c-9add-2ad66f3ede74',
  'Date',
  'Fri, 10 Dec 2021 06:36:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'e51922e7-a98f-4cd8-82a0-d6d615ebe888',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  '592e9c3d-6e94-4e11-9ea4-9680e99f84c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063611Z:592e9c3d-6e94-4e11-9ea4-9680e99f84c4',
  'Date',
  'Fri, 10 Dec 2021 06:36:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '6602a52c-51f4-403b-b8b3-ef0c1eab454b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  'ea96a45b-d16b-4058-a0a0-4bb95d12d66e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063614Z:ea96a45b-d16b-4058-a0a0-4bb95d12d66e',
  'Date',
  'Fri, 10 Dec 2021 06:36:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2893a76a-64fd-4282-9dee-f5ac5ace9b20',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  'a032ef67-c363-4397-8151-e3d532358b56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063616Z:a032ef67-c363-4397-8151-e3d532358b56',
  'Date',
  'Fri, 10 Dec 2021 06:36:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '881177a4-1ea5-4ae9-a2a3-41a4e15fd1de',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  '1f01f017-d725-4147-9adf-0b3ac3682b82',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063618Z:1f01f017-d725-4147-9adf-0b3ac3682b82',
  'Date',
  'Fri, 10 Dec 2021 06:36:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c0769e7a-7311-4dcb-90c4-5ea463969f79',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  'abc481f0-c62a-4580-8dd9-419e7c23b304',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063620Z:abc481f0-c62a-4580-8dd9-419e7c23b304',
  'Date',
  'Fri, 10 Dec 2021 06:36:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c87bb54b-7bb3-4b87-8387-835f8809411e',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  '141626af-054f-4b0b-898b-c5d56f58073c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063623Z:141626af-054f-4b0b-898b-c5d56f58073c',
  'Date',
  'Fri, 10 Dec 2021 06:36:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'f9814612-3bd0-4b15-95c6-7bf1d9a1f43c',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '91de88a0-ff68-4983-a549-669be59bf75f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063625Z:91de88a0-ff68-4983-a549-669be59bf75f',
  'Date',
  'Fri, 10 Dec 2021 06:36:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '16b435cd-5906-4b89-abb2-4c54075d0a39',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '154be10b-d2af-4925-9c70-3ca7a7d1dd17',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063627Z:154be10b-d2af-4925-9c70-3ca7a7d1dd17',
  'Date',
  'Fri, 10 Dec 2021 06:36:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'f8537ef1-18cf-4481-8960-6b0c6736ce53',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  '29b868d2-bec0-4fee-9cd9-e00588695719',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063630Z:29b868d2-bec0-4fee-9cd9-e00588695719',
  'Date',
  'Fri, 10 Dec 2021 06:36:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'b36e5ec6-4d34-4036-9b05-bb8d4e7e70fa',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  'b5bc28ad-b037-4df8-b21c-61e2b4eeb58f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063632Z:b5bc28ad-b037-4df8-b21c-61e2b4eeb58f',
  'Date',
  'Fri, 10 Dec 2021 06:36:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'b7aefc7c-969d-40b8-923e-24b3b3fa928b',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  '7732bd0d-3e84-4924-831a-1240e6f19f10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063634Z:7732bd0d-3e84-4924-831a-1240e6f19f10',
  'Date',
  'Fri, 10 Dec 2021 06:36:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '3c9d8cce-cfd0-419d-8924-2e1ed47d0fb8',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  'fc0c7f91-0893-424a-a72b-ff873f40c51c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063637Z:fc0c7f91-0893-424a-a72b-ff873f40c51c',
  'Date',
  'Fri, 10 Dec 2021 06:36:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'd24e904a-bb9d-48a0-b156-5ea965c34bfb',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  'dbc86f63-5574-4ca1-b8ac-0846c63d898a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063639Z:dbc86f63-5574-4ca1-b8ac-0846c63d898a',
  'Date',
  'Fri, 10 Dec 2021 06:36:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2381fadf-9d22-4547-aaf8-a9f70adfa7a6',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  'd0a43450-0028-472d-83f8-8d9896c6c38a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063641Z:d0a43450-0028-472d-83f8-8d9896c6c38a',
  'Date',
  'Fri, 10 Dec 2021 06:36:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '31d757c9-bb2c-4467-9b93-d9d6cb3fdf5a',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  '7a1221d1-171d-42c3-b0ee-a93efcea53af',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063644Z:7a1221d1-171d-42c3-b0ee-a93efcea53af',
  'Date',
  'Fri, 10 Dec 2021 06:36:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '95a92bb0-7e52-4b59-805b-b4e582270e58',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  'e0531561-c725-49ba-8e1c-9ac5ae3123e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063646Z:e0531561-c725-49ba-8e1c-9ac5ae3123e1',
  'Date',
  'Fri, 10 Dec 2021 06:36:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '7a405254-8691-492a-a7d7-7ba62f2274ab',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '04a31192-49c3-46d6-92ac-53a82b99f590',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063648Z:04a31192-49c3-46d6-92ac-53a82b99f590',
  'Date',
  'Fri, 10 Dec 2021 06:36:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c8083af6-f8d2-431d-9ead-e56cb1e86f41',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11897',
  'x-ms-correlation-request-id',
  'de1d4554-abf6-4dba-9dd4-5e39cb832ffa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063651Z:de1d4554-abf6-4dba-9dd4-5e39cb832ffa',
  'Date',
  'Fri, 10 Dec 2021 06:36:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '4e9959b0-5853-4bb1-b546-3a577b83ba84',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  'd213ae99-3baa-4170-8198-f0c0c71cf3b3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063653Z:d213ae99-3baa-4170-8198-f0c0c71cf3b3',
  'Date',
  'Fri, 10 Dec 2021 06:36:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '70285054-9b3e-4d5b-9a11-ce8e71aeb508',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  '000761c3-8ad5-4e52-bd15-601521ddd474',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063655Z:000761c3-8ad5-4e52-bd15-601521ddd474',
  'Date',
  'Fri, 10 Dec 2021 06:36:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'bcebda0f-c58d-46f6-8d50-96183eadb6e0',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  '1728fcac-138e-4e4c-8d7f-a9d7f584942d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063658Z:1728fcac-138e-4e4c-8d7f-a9d7f584942d',
  'Date',
  'Fri, 10 Dec 2021 06:36:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '410f9982-2961-44a4-b480-8dbf90f3e985',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11893',
  'x-ms-correlation-request-id',
  '86437337-2a9d-43d7-95d3-4a2c882192f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063700Z:86437337-2a9d-43d7-95d3-4a2c882192f6',
  'Date',
  'Fri, 10 Dec 2021 06:36:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '1d827388-d478-4d40-bb31-b31ceb1161fd',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11892',
  'x-ms-correlation-request-id',
  '4c1bb8b2-06ea-4609-9402-ab977d8b1eb7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063702Z:4c1bb8b2-06ea-4609-9402-ab977d8b1eb7',
  'Date',
  'Fri, 10 Dec 2021 06:37:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'c40ce8ad-1bf7-48ad-87c3-2e93323910db',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11891',
  'x-ms-correlation-request-id',
  '34480db2-2604-471c-abce-d795094b27e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063705Z:34480db2-2604-471c-abce-d795094b27e0',
  'Date',
  'Fri, 10 Dec 2021 06:37:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  'a7c18158-83cd-4831-a054-5d10ed38ca9f',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11890',
  'x-ms-correlation-request-id',
  '023582be-260e-4a4e-a6d7-fb0616f831c8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063707Z:023582be-260e-4a4e-a6d7-fb0616f831c8',
  'Date',
  'Fri, 10 Dec 2021 06:37:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '96b45903-396c-42f3-b194-dd683316749a',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11889',
  'x-ms-correlation-request-id',
  'fada7095-5ea1-4438-acf8-7d6ef1049505',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063709Z:fada7095-5ea1-4438-acf8-7d6ef1049505',
  'Date',
  'Fri, 10 Dec 2021 06:37:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9f79b6ea-7ccf-435e-b7c6-6a5d42fceeef',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11888',
  'x-ms-correlation-request-id',
  '0fe428b4-be81-4b8d-b7fe-d02ed2100e84',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063712Z:0fe428b4-be81-4b8d-b7fe-d02ed2100e84',
  'Date',
  'Fri, 10 Dec 2021 06:37:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '4c1d578b-5681-4e75-b90d-eea17724eddc',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11887',
  'x-ms-correlation-request-id',
  '0b937828-cc86-452e-97eb-f672785e25c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063714Z:0b937828-cc86-452e-97eb-f672785e25c3',
  'Date',
  'Fri, 10 Dec 2021 06:37:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '9b704d65-cd40-46e5-b39b-a81b3cf3a393',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11886',
  'x-ms-correlation-request-id',
  '10260b69-0863-4895-b256-98c6378669fa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063716Z:10260b69-0863-4895-b256-98c6378669fa',
  'Date',
  'Fri, 10 Dec 2021 06:37:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '37d063d2-7e8c-441d-821a-3c2dbd88df8c',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11885',
  'x-ms-correlation-request-id',
  'a51ff957-107c-45c1-b10e-3af02630756d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063719Z:a51ff957-107c-45c1-b10e-3af02630756d',
  'Date',
  'Fri, 10 Dec 2021 06:37:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '97bf8fac-b5b2-43de-8fd6-005641137224',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11884',
  'x-ms-correlation-request-id',
  '33206b4b-fc4f-40bf-aee7-b8a2c3d38c2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063721Z:33206b4b-fc4f-40bf-aee7-b8a2c3d38c2f',
  'Date',
  'Fri, 10 Dec 2021 06:37:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '73b00e4c-4633-4484-9d2e-9a6b5df38566',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11883',
  'x-ms-correlation-request-id',
  '67c2ba23-43c9-4682-b3c3-2906d4f25028',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063723Z:67c2ba23-43c9-4682-b3c3-2906d4f25028',
  'Date',
  'Fri, 10 Dec 2021 06:37:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '0c4af4e2-102e-43dc-9b9b-6b384749693f',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11882',
  'x-ms-correlation-request-id',
  'bda63d4e-5772-4d04-a793-1669c081d136',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063725Z:bda63d4e-5772-4d04-a793-1669c081d136',
  'Date',
  'Fri, 10 Dec 2021 06:37:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '68380af0-2b6b-4349-b9d6-aa88f515f19c',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11881',
  'x-ms-correlation-request-id',
  '70873f0c-cc32-48ad-b239-f84085802708',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063728Z:70873f0c-cc32-48ad-b239-f84085802708',
  'Date',
  'Fri, 10 Dec 2021 06:37:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '92c97c40-f727-4668-802f-7ab5697072dd',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11880',
  'x-ms-correlation-request-id',
  '3486634b-ae1b-47d9-8344-d705d004f093',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063730Z:3486634b-ae1b-47d9-8344-d705d004f093',
  'Date',
  'Fri, 10 Dec 2021 06:37:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a?api-version=2020-12-01',
  'x-ms-request-id',
  '2c2c51e0-fb41-4bc5-9edc-cf1fa1d0c386',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11879',
  'x-ms-correlation-request-id',
  '0ca1198d-cf1c-48d9-bd80-ce63aec74ebe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063732Z:0ca1198d-cf1c-48d9-bd80-ce63aec74ebe',
  'Date',
  'Fri, 10 Dec 2021 06:37:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/9388d2da-d74d-45eb-8880-bc748535a34a')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  '65e9db80-3034-4fac-927c-449bed991ee2',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11878',
  'x-ms-correlation-request-id',
  '445d169d-69a2-46c3-bfbb-630c1fc43622',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063735Z:445d169d-69a2-46c3-bfbb-630c1fc43622',
  'Date',
  'Fri, 10 Dec 2021 06:37:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cache/redis')
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
  'x-ms-request-id',
  '87d65fc8-05fb-4307-9901-a0ef1f792a20',
  'x-rp-server-mvid',
  'fb971f96-3ecd-4b9f-a956-95033cc50857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11877',
  'x-ms-correlation-request-id',
  '2cf3c026-e566-42a5-8e95-c8b8bda9ea7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T063736Z:2cf3c026-e566-42a5-8e95-c8b8bda9ea7a',
  'Date',
  'Fri, 10 Dec 2021 06:37:36 GMT'
]);
