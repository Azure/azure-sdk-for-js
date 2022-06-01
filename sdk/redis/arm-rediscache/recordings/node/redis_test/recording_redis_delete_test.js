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
  '1914eedb-32d7-4b22-b858-58907ad40400',
  'x-ms-ests-server',
  '2.1.12821.7 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnVdHTDo0vxPo0FHURTkudI; expires=Fri, 24-Jun-2022 05:30:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnOu0zE8fUQgRnZioIBkPQl4aCnyuL4jhdSRFRdLXim6lxCarhxNusuL3BpC7gKSqepVpOcBAtwHrdGeevkTA6lSABEDV71mRVauf2dxsEvQyW0yajpVvvFCGbAmtaVq-3FXPZ8o9PiVZdyPiaAqFacV8pCNxodDQ9CpApFIfqQIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:21 GMT',
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
  '36c65479-e93a-402d-bd39-0cfb397c0300',
  'x-ms-ests-server',
  '2.1.12821.7 - KRSLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiRmP7QVU0VDppVpU-zjujw; expires=Fri, 24-Jun-2022 05:30:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHsLiqKC-5gtFvUxLKQDbe3f_pMTI1qehYb9HcdZ4Fz0wBYHK7mxee2EL0Wcpr38GPUsxl21HyysLMiP74_Vsg6A6SnmKBUy6jai3YNwTReazyMmuigsTawjId_v3l6v4tPzHOUdlYJw0cxGf9ItyLcMEYPSW6GMQmWMGpCTxa9UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.8.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3c96daee-26aa-405e-a4f4-39bfbd481ca6&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1914eedb-32d7-4b22-b858-589088d40400',
  'x-ms-ests-server',
  '2.1.12821.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Alt4jqpxl1hNsibblO54V6LLj78gAQAAAO21H9oOAAAA; expires=Fri, 24-Jun-2022 05:30:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:21 GMT',
  'Content-Length',
  '1393'
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
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '50c443f1-a31a-4a91-bd02-34ba41b82426',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  '383e2618-199a-4db7-8c7f-f7a4799ba6ee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053024Z:383e2618-199a-4db7-8c7f-f7a4799ba6ee',
  'Date',
  'Wed, 25 May 2022 05:30:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '94d47fe2-e713-4d7f-9dad-a76cd80dd6c5',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11648',
  'x-ms-correlation-request-id',
  'c72d08d0-fc54-4e23-9158-cf0edbdf9e47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053025Z:c72d08d0-fc54-4e23-9158-cf0edbdf9e47',
  'Date',
  'Wed, 25 May 2022 05:30:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'f660311b-2c6d-4cfa-a55f-30bb824f666e',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11647',
  'x-ms-correlation-request-id',
  'a7b9d05a-5c4a-4a5d-b04e-0a990bec2eef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053027Z:a7b9d05a-5c4a-4a5d-b04e-0a990bec2eef',
  'Date',
  'Wed, 25 May 2022 05:30:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '297f1e73-e38f-4496-a530-6a2d798147ac',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11646',
  'x-ms-correlation-request-id',
  'b9da585e-696a-4e58-9674-8d5a7b8349ae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053030Z:b9da585e-696a-4e58-9674-8d5a7b8349ae',
  'Date',
  'Wed, 25 May 2022 05:30:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'd8957953-3b96-4a78-8002-1eac94588add',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11645',
  'x-ms-correlation-request-id',
  '0e873055-c2cc-4f2e-8b2d-74ab27083633',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053033Z:0e873055-c2cc-4f2e-8b2d-74ab27083633',
  'Date',
  'Wed, 25 May 2022 05:30:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'bdef6086-0945-411e-9282-b4bf08b68d98',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11644',
  'x-ms-correlation-request-id',
  'a3e85fb6-b2ab-4b32-b0c8-f6874874d560',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053035Z:a3e85fb6-b2ab-4b32-b0c8-f6874874d560',
  'Date',
  'Wed, 25 May 2022 05:30:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '4d2e257f-99b0-4cfe-80da-2df2c9505d03',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11643',
  'x-ms-correlation-request-id',
  '4c77a440-f620-478b-b5aa-7f41d7e1a415',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053037Z:4c77a440-f620-478b-b5aa-7f41d7e1a415',
  'Date',
  'Wed, 25 May 2022 05:30:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'fdda1d18-d434-458b-ae87-24d7cdee45ec',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11642',
  'x-ms-correlation-request-id',
  '5993b872-49ae-4fd2-abb8-a4eca4d42e9b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053040Z:5993b872-49ae-4fd2-abb8-a4eca4d42e9b',
  'Date',
  'Wed, 25 May 2022 05:30:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'c8d755aa-7052-4ea9-b69a-51095af17891',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11641',
  'x-ms-correlation-request-id',
  'a9c4d191-009c-4c12-a8d7-0d3c2ee55279',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053042Z:a9c4d191-009c-4c12-a8d7-0d3c2ee55279',
  'Date',
  'Wed, 25 May 2022 05:30:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '0e1d0c49-7640-4841-8465-2a331db24024',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11640',
  'x-ms-correlation-request-id',
  'a8fd9eab-d78a-411f-aa4a-d0b5b46a06ca',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053045Z:a8fd9eab-d78a-411f-aa4a-d0b5b46a06ca',
  'Date',
  'Wed, 25 May 2022 05:30:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '794282aa-a66f-4d0c-86a9-2ec1843a1529',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11639',
  'x-ms-correlation-request-id',
  'cd3444fe-4f37-4fe4-bce0-b69fd6230dbe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053047Z:cd3444fe-4f37-4fe4-bce0-b69fd6230dbe',
  'Date',
  'Wed, 25 May 2022 05:30:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '59989329-efc3-4ebf-942d-0c0e556364ab',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11638',
  'x-ms-correlation-request-id',
  '659b7e06-c2bd-41ed-8b86-7c743eb54e95',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053049Z:659b7e06-c2bd-41ed-8b86-7c743eb54e95',
  'Date',
  'Wed, 25 May 2022 05:30:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5a6190ab-63b8-4475-883f-4b6e95f22703',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11637',
  'x-ms-correlation-request-id',
  'e2821822-43f5-4447-8b48-c70891a1d461',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053052Z:e2821822-43f5-4447-8b48-c70891a1d461',
  'Date',
  'Wed, 25 May 2022 05:30:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '91267ce2-697b-4212-afc9-9f7fabc74862',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11636',
  'x-ms-correlation-request-id',
  '8833e57a-f351-4b56-b054-d19b9cc15968',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053055Z:8833e57a-f351-4b56-b054-d19b9cc15968',
  'Date',
  'Wed, 25 May 2022 05:30:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '723b076e-1f2f-4108-a947-092bfa280f32',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11635',
  'x-ms-correlation-request-id',
  'f49ca74c-d436-4dc9-8dcc-a3a20767a672',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053057Z:f49ca74c-d436-4dc9-8dcc-a3a20767a672',
  'Date',
  'Wed, 25 May 2022 05:30:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '8d3681b1-6fb3-4065-b005-68637853baaf',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11634',
  'x-ms-correlation-request-id',
  '48cbba1f-3077-4c67-a3c1-c6a089bfd81c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053100Z:48cbba1f-3077-4c67-a3c1-c6a089bfd81c',
  'Date',
  'Wed, 25 May 2022 05:30:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '96d70d63-d476-467d-afa8-7c010f10dd46',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11633',
  'x-ms-correlation-request-id',
  '5990adfc-848d-4b21-b243-c4b70aeede0a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053102Z:5990adfc-848d-4b21-b243-c4b70aeede0a',
  'Date',
  'Wed, 25 May 2022 05:31:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '0ec1fed2-fd1b-4d20-acc3-c6409592ecbc',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11632',
  'x-ms-correlation-request-id',
  'fab68568-9f72-4bd8-8a83-223a428c1846',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053105Z:fab68568-9f72-4bd8-8a83-223a428c1846',
  'Date',
  'Wed, 25 May 2022 05:31:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '4d6280f3-7221-43e5-85a7-dcea7d84f565',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11631',
  'x-ms-correlation-request-id',
  '0a22dbca-a877-475b-9e6d-6183c824df2c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053107Z:0a22dbca-a877-475b-9e6d-6183c824df2c',
  'Date',
  'Wed, 25 May 2022 05:31:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '8d328376-dde0-4afe-89ba-ca5e837577d7',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11630',
  'x-ms-correlation-request-id',
  '22f2a749-ce85-4b9d-af0d-3d827dbc6fd3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053109Z:22f2a749-ce85-4b9d-af0d-3d827dbc6fd3',
  'Date',
  'Wed, 25 May 2022 05:31:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5d4c1932-3a99-4425-b6fe-4d4f94c616d8',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11629',
  'x-ms-correlation-request-id',
  '6a22b2d1-e0b2-431b-b112-caa154ac2f93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053112Z:6a22b2d1-e0b2-431b-b112-caa154ac2f93',
  'Date',
  'Wed, 25 May 2022 05:31:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '7ef3297c-8f30-4028-995d-68ef3a96468f',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11628',
  'x-ms-correlation-request-id',
  '93f2f26f-0afe-4d77-8d36-a16d27f00858',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053114Z:93f2f26f-0afe-4d77-8d36-a16d27f00858',
  'Date',
  'Wed, 25 May 2022 05:31:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'b283776a-6192-4a7d-a8f7-61e09ee0ed07',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11627',
  'x-ms-correlation-request-id',
  '83f9ae85-57c7-4a0b-924c-7f6ef6d215d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053116Z:83f9ae85-57c7-4a0b-924c-7f6ef6d215d0',
  'Date',
  'Wed, 25 May 2022 05:31:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '6ff91715-6400-4b0c-ac7a-bf251a09a406',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11626',
  'x-ms-correlation-request-id',
  '19b9ea05-686c-498d-bfb9-5163d9a8d439',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053119Z:19b9ea05-686c-498d-bfb9-5163d9a8d439',
  'Date',
  'Wed, 25 May 2022 05:31:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '81533bb1-b5ad-489a-a5c4-f0a2e57ad397',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11625',
  'x-ms-correlation-request-id',
  'dc7d2749-3586-4cb1-9263-bf250614f182',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053121Z:dc7d2749-3586-4cb1-9263-bf250614f182',
  'Date',
  'Wed, 25 May 2022 05:31:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'd297bc06-7f46-47a5-9cfd-450149a34c87',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11624',
  'x-ms-correlation-request-id',
  '43231024-1e97-46a5-a726-d5cd18b1a08d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053124Z:43231024-1e97-46a5-a726-d5cd18b1a08d',
  'Date',
  'Wed, 25 May 2022 05:31:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'bb020a2b-d755-41f5-9f7a-f0520afdd511',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11623',
  'x-ms-correlation-request-id',
  '1c0c1255-7691-46b0-8235-e8340cfed435',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053126Z:1c0c1255-7691-46b0-8235-e8340cfed435',
  'Date',
  'Wed, 25 May 2022 05:31:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '1ab9a438-356e-4dcd-9fc0-2eefea3b1f80',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11622',
  'x-ms-correlation-request-id',
  '653d090c-f5b9-40c8-b830-f2f3b978c4e5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053129Z:653d090c-f5b9-40c8-b830-f2f3b978c4e5',
  'Date',
  'Wed, 25 May 2022 05:31:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '573cbf1a-1d97-496b-bf77-78ac4f3aff4d',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11621',
  'x-ms-correlation-request-id',
  '01402a92-190f-407d-843a-8a6b9621526c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053131Z:01402a92-190f-407d-843a-8a6b9621526c',
  'Date',
  'Wed, 25 May 2022 05:31:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '129c47bf-abf7-44eb-9834-a5d8f9c11efe',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11620',
  'x-ms-correlation-request-id',
  'bf046d3e-52c1-4194-859b-9470496ad01f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053134Z:bf046d3e-52c1-4194-859b-9470496ad01f',
  'Date',
  'Wed, 25 May 2022 05:31:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'd3086b2b-df11-47ab-b149-4667cf963106',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11619',
  'x-ms-correlation-request-id',
  '1fa954aa-fc9f-44f3-94cb-b7df67b47e07',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053136Z:1fa954aa-fc9f-44f3-94cb-b7df67b47e07',
  'Date',
  'Wed, 25 May 2022 05:31:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'ad22e52d-b558-4b17-b86b-c747600e861b',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11618',
  'x-ms-correlation-request-id',
  '2a2e73d7-e5c1-4d02-81d3-917909b5f4b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053138Z:2a2e73d7-e5c1-4d02-81d3-917909b5f4b5',
  'Date',
  'Wed, 25 May 2022 05:31:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'aeee2b2c-f8a6-49c3-b962-baede3e46862',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11617',
  'x-ms-correlation-request-id',
  'ca2c006c-09da-4c19-8fcd-b6984e300295',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053141Z:ca2c006c-09da-4c19-8fcd-b6984e300295',
  'Date',
  'Wed, 25 May 2022 05:31:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '0d8b3757-192c-4c39-96c9-b4e78aa36778',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11616',
  'x-ms-correlation-request-id',
  '396f2709-67a1-466e-b1f0-eef85296830b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053143Z:396f2709-67a1-466e-b1f0-eef85296830b',
  'Date',
  'Wed, 25 May 2022 05:31:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '428560b9-418b-4100-a8a3-147381774f68',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11615',
  'x-ms-correlation-request-id',
  '47d7d8a0-0a84-4560-858d-c35894dd2c5c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053146Z:47d7d8a0-0a84-4560-858d-c35894dd2c5c',
  'Date',
  'Wed, 25 May 2022 05:31:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '53fba2a3-1cd0-4027-992c-ce6a95d12086',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11614',
  'x-ms-correlation-request-id',
  '23bc1a16-4e32-4f7d-afe0-97e8592a9a5b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053149Z:23bc1a16-4e32-4f7d-afe0-97e8592a9a5b',
  'Date',
  'Wed, 25 May 2022 05:31:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '4392a396-ac30-4510-9bad-832e2a58d23c',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11613',
  'x-ms-correlation-request-id',
  '2a8adb01-e883-4b01-92d4-b444df7b618e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053153Z:2a8adb01-e883-4b01-92d4-b444df7b618e',
  'Date',
  'Wed, 25 May 2022 05:31:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'eba76304-6584-4322-9fab-645be8fe02a6',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11612',
  'x-ms-correlation-request-id',
  'ca931dfd-9466-4601-9a2f-746be9c28c81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053157Z:ca931dfd-9466-4601-9a2f-746be9c28c81',
  'Date',
  'Wed, 25 May 2022 05:31:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5c12001b-a367-4b7f-965e-ae2b4fcde8b8',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11611',
  'x-ms-correlation-request-id',
  '71d1b2d1-801c-4892-802f-5005ca20c749',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053200Z:71d1b2d1-801c-4892-802f-5005ca20c749',
  'Date',
  'Wed, 25 May 2022 05:32:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '3781cf66-a469-411a-a934-62d75a59b9f7',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11610',
  'x-ms-correlation-request-id',
  '05deaba0-28ca-4e52-9ea4-0168e282a0f0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053204Z:05deaba0-28ca-4e52-9ea4-0168e282a0f0',
  'Date',
  'Wed, 25 May 2022 05:32:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '1f1bc2a4-22e0-4872-b405-d8b52ee13395',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11609',
  'x-ms-correlation-request-id',
  'a5fe718a-c0eb-4d33-9c38-39fc9b047bd8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053210Z:a5fe718a-c0eb-4d33-9c38-39fc9b047bd8',
  'Date',
  'Wed, 25 May 2022 05:32:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '69476e20-40b4-46ff-8581-3ad76cb34477',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11608',
  'x-ms-correlation-request-id',
  'e6bda290-d11a-491f-99a4-471d8ad21168',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053214Z:e6bda290-d11a-491f-99a4-471d8ad21168',
  'Date',
  'Wed, 25 May 2022 05:32:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '2bd2c393-3e56-4165-89b1-b5ce2dec4050',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11607',
  'x-ms-correlation-request-id',
  'beb054d5-ba97-45c8-b9cf-f0f091c7d3d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053219Z:beb054d5-ba97-45c8-b9cf-f0f091c7d3d8',
  'Date',
  'Wed, 25 May 2022 05:32:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'f5d7f360-a31e-4fdd-80a5-650de6ab7202',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11606',
  'x-ms-correlation-request-id',
  'dcd449c3-b92b-46df-ac08-26d109f2775f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053225Z:dcd449c3-b92b-46df-ac08-26d109f2775f',
  'Date',
  'Wed, 25 May 2022 05:32:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '0dc3d4cc-8b0f-4f36-88a3-d739e1a3f41c',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11605',
  'x-ms-correlation-request-id',
  'a7e91cf8-1ac9-459d-8778-c29e26b1a667',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053230Z:a7e91cf8-1ac9-459d-8778-c29e26b1a667',
  'Date',
  'Wed, 25 May 2022 05:32:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '9b179b71-5805-42ca-8333-717e9ffc4cc0',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11604',
  'x-ms-correlation-request-id',
  '13eaafae-09a8-4abf-a970-7282bec5bf96',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053234Z:13eaafae-09a8-4abf-a970-7282bec5bf96',
  'Date',
  'Wed, 25 May 2022 05:32:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5ef21929-1bd1-4063-adfa-1cc21421f4d7',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11603',
  'x-ms-correlation-request-id',
  '27dabb32-c0ec-481f-99e9-5b8b662e93ed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053237Z:27dabb32-c0ec-481f-99e9-5b8b662e93ed',
  'Date',
  'Wed, 25 May 2022 05:32:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '93c4a88c-33d8-4089-9add-3deda5316baa',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11602',
  'x-ms-correlation-request-id',
  '8d53e732-c0e4-4ddd-9601-0592a7067ae9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053241Z:8d53e732-c0e4-4ddd-9601-0592a7067ae9',
  'Date',
  'Wed, 25 May 2022 05:32:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '232b4677-8bbb-4813-ba80-f7738a8b1a39',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11601',
  'x-ms-correlation-request-id',
  '0c98aaa4-9732-4477-965f-19d4a0d4e54f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053245Z:0c98aaa4-9732-4477-965f-19d4a0d4e54f',
  'Date',
  'Wed, 25 May 2022 05:32:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'c919fa82-87d9-42ae-82a6-7c287d256b16',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11600',
  'x-ms-correlation-request-id',
  'a020016b-03ba-42ae-95b5-af3e4dd142e7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053248Z:a020016b-03ba-42ae-95b5-af3e4dd142e7',
  'Date',
  'Wed, 25 May 2022 05:32:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '080b4435-61ef-4715-982d-2f65d18771f5',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11599',
  'x-ms-correlation-request-id',
  '28ebc6ca-e07f-431b-839d-6093f7121342',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053252Z:28ebc6ca-e07f-431b-839d-6093f7121342',
  'Date',
  'Wed, 25 May 2022 05:32:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'a53822b0-12c7-43e6-b6be-f82a524931e6',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11598',
  'x-ms-correlation-request-id',
  '7c3827ae-f5b8-4909-91e9-f9d8d58f1cd8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053255Z:7c3827ae-f5b8-4909-91e9-f9d8d58f1cd8',
  'Date',
  'Wed, 25 May 2022 05:32:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5206fedb-8ef4-49c1-9b10-38dda9b64ae5',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11597',
  'x-ms-correlation-request-id',
  '50c1f048-2fc5-4904-add6-a1381d8818bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053258Z:50c1f048-2fc5-4904-add6-a1381d8818bf',
  'Date',
  'Wed, 25 May 2022 05:32:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '1d5fb1a1-d3d2-438c-8cf7-0474f920110a',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11596',
  'x-ms-correlation-request-id',
  'ba55ba68-daa7-4bbb-9fb8-d4dbc40c9bc4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053302Z:ba55ba68-daa7-4bbb-9fb8-d4dbc40c9bc4',
  'Date',
  'Wed, 25 May 2022 05:33:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '4548b7c6-fc34-4503-837d-901ca4bcb7be',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11595',
  'x-ms-correlation-request-id',
  'b8a6e9d3-db85-42cb-a552-9a14dbf0281d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053305Z:b8a6e9d3-db85-42cb-a552-9a14dbf0281d',
  'Date',
  'Wed, 25 May 2022 05:33:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'cdc76375-ce16-426d-8da9-f26774ccd5d0',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11594',
  'x-ms-correlation-request-id',
  '031aa5a9-8992-40b9-8f76-b1409a9334ab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053309Z:031aa5a9-8992-40b9-8f76-b1409a9334ab',
  'Date',
  'Wed, 25 May 2022 05:33:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5ed3493c-76dc-40db-9858-781286f81cef',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11593',
  'x-ms-correlation-request-id',
  'fd9fc0c1-6003-4b44-810a-6e6771514a61',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053312Z:fd9fc0c1-6003-4b44-810a-6e6771514a61',
  'Date',
  'Wed, 25 May 2022 05:33:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '8f3d2ba1-c90b-4068-b240-5014c1e009b8',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11592',
  'x-ms-correlation-request-id',
  '640c208c-faa8-4d08-b93d-88a2b0d7971a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053316Z:640c208c-faa8-4d08-b93d-88a2b0d7971a',
  'Date',
  'Wed, 25 May 2022 05:33:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '49b85318-4f17-4573-8724-3a4b3c7ac714',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11591',
  'x-ms-correlation-request-id',
  '79740d19-6fad-436f-af34-fea184df28e5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053320Z:79740d19-6fad-436f-af34-fea184df28e5',
  'Date',
  'Wed, 25 May 2022 05:33:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '06a0e7cc-23a8-4583-b862-65b58a2cca54',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11590',
  'x-ms-correlation-request-id',
  '9c750186-8d50-4c22-bf98-6de8711076b4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053324Z:9c750186-8d50-4c22-bf98-6de8711076b4',
  'Date',
  'Wed, 25 May 2022 05:33:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'c740fead-ebc3-4f98-a267-464c403faa84',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11589',
  'x-ms-correlation-request-id',
  'a0adfb83-ba23-456e-9bf4-de8104dd73c1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053326Z:a0adfb83-ba23-456e-9bf4-de8104dd73c1',
  'Date',
  'Wed, 25 May 2022 05:33:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'f2c5a8d8-c887-4286-a281-d5348700cf0a',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11588',
  'x-ms-correlation-request-id',
  '73b19385-4674-4cdd-bfa8-4ed2e5afd7a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053330Z:73b19385-4674-4cdd-bfa8-4ed2e5afd7a6',
  'Date',
  'Wed, 25 May 2022 05:33:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '3880a0f1-6159-4ec3-ba87-1d5b0ce80d33',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11587',
  'x-ms-correlation-request-id',
  'a1f3cb50-95ad-4ce6-a55f-36782e051a1c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053335Z:a1f3cb50-95ad-4ce6-a55f-36782e051a1c',
  'Date',
  'Wed, 25 May 2022 05:33:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'ef949b0a-4aba-4cf3-8c91-283d4dca8fe1',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11586',
  'x-ms-correlation-request-id',
  'd11ded59-9a3c-4080-929c-a928473b561c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053340Z:d11ded59-9a3c-4080-929c-a928473b561c',
  'Date',
  'Wed, 25 May 2022 05:33:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'c86245b9-1f3f-4695-a21a-03f3957e3cec',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11585',
  'x-ms-correlation-request-id',
  '34b86eb9-95ce-4d54-a5e2-9b4b01236b12',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053343Z:34b86eb9-95ce-4d54-a5e2-9b4b01236b12',
  'Date',
  'Wed, 25 May 2022 05:33:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'a00fb55c-84c5-4282-994b-4ff0ea0c0a72',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11584',
  'x-ms-correlation-request-id',
  '1ca52e51-3ca5-420a-bcf1-63974c2d2905',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053347Z:1ca52e51-3ca5-420a-bcf1-63974c2d2905',
  'Date',
  'Wed, 25 May 2022 05:33:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'bd4a256c-5ce9-48d7-9b27-07259ca953e2',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11583',
  'x-ms-correlation-request-id',
  '14a0e7ab-1ff7-494c-be04-f13eb59dbc7f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053353Z:14a0e7ab-1ff7-494c-be04-f13eb59dbc7f',
  'Date',
  'Wed, 25 May 2022 05:33:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '08a2f3d3-87da-4cc4-a5c1-2712b235d6dd',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11582',
  'x-ms-correlation-request-id',
  '3f862547-2a4a-4469-a03c-2d68615aa788',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053355Z:3f862547-2a4a-4469-a03c-2d68615aa788',
  'Date',
  'Wed, 25 May 2022 05:33:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '6c4a86c5-eb37-4a50-880d-baa48fbeced7',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11581',
  'x-ms-correlation-request-id',
  '41ca42b6-51cc-4aba-aaee-4ab9e631beb3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053400Z:41ca42b6-51cc-4aba-aaee-4ab9e631beb3',
  'Date',
  'Wed, 25 May 2022 05:33:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '291a268d-c916-4e54-9dbc-5a193e469738',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11580',
  'x-ms-correlation-request-id',
  '672ddfc3-cc74-4f19-94be-27fcdb0f8308',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053403Z:672ddfc3-cc74-4f19-94be-27fcdb0f8308',
  'Date',
  'Wed, 25 May 2022 05:34:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'e69d0ad5-1a7d-48cb-99b1-4cc9f48632b9',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11579',
  'x-ms-correlation-request-id',
  '65ef1aab-ba3b-46e4-8abf-d9c71ba364f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053406Z:65ef1aab-ba3b-46e4-8abf-d9c71ba364f5',
  'Date',
  'Wed, 25 May 2022 05:34:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'e429771e-7be5-455d-8c6e-b80f17cccc24',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11578',
  'x-ms-correlation-request-id',
  'b2b4cee0-8e67-4490-aa7c-e792626168be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053410Z:b2b4cee0-8e67-4490-aa7c-e792626168be',
  'Date',
  'Wed, 25 May 2022 05:34:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'f601f306-b6a9-4bf9-b5ae-09ac4c4ce9da',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11577',
  'x-ms-correlation-request-id',
  'bd036ac7-0c00-420c-a230-50022ea0f687',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053414Z:bd036ac7-0c00-420c-a230-50022ea0f687',
  'Date',
  'Wed, 25 May 2022 05:34:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  'a661188b-f14c-4473-8d28-13e593bc58dd',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11576',
  'x-ms-correlation-request-id',
  '3bc217e3-c57c-452a-8cb9-743143c4041b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053417Z:3bc217e3-c57c-452a-8cb9-743143c4041b',
  'Date',
  'Wed, 25 May 2022 05:34:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '048513a4-a6dd-467a-aabe-b89c5311121e',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11575',
  'x-ms-correlation-request-id',
  '487c67b9-c3a8-4d1b-a4d5-4c5f1e1dbd06',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053421Z:487c67b9-c3a8-4d1b-a4d5-4c5f1e1dbd06',
  'Date',
  'Wed, 25 May 2022 05:34:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426?api-version=2021-06-01',
  'x-ms-request-id',
  '5f368b48-8da8-43a5-9eec-71daa342b949',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11574',
  'x-ms-correlation-request-id',
  '72c2ae99-2536-43cc-9720-96bf40c37bc3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053424Z:72c2ae99-2536-43cc-9720-96bf40c37bc3',
  'Date',
  'Wed, 25 May 2022 05:34:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/50c443f1-a31a-4a91-bd02-34ba41b82426')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  'af9ee3df-4dbd-4f7e-9121-3b0632a28989',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11573',
  'x-ms-correlation-request-id',
  '6342f1c8-12e9-4cab-87c2-cfa32f48d472',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053428Z:6342f1c8-12e9-4cab-87c2-cfa32f48d472',
  'Date',
  'Wed, 25 May 2022 05:34:28 GMT',
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
  '262ded7a-4417-4815-9caa-13f82d036713',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11572',
  'x-ms-correlation-request-id',
  '6169889b-808a-4b71-a106-b9846554c692',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053430Z:6169889b-808a-4b71-a106-b9846554c692',
  'Date',
  'Wed, 25 May 2022 05:34:29 GMT'
]);
