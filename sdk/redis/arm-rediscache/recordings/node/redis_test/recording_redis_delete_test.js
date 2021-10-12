let nock = require('nock');

module.exports.hash = "8c2682d7281f12e52dc19ecd4daa097d";

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
  '84581fe2-705a-448a-97d0-56f4d28b1200',
  'x-ms-ests-server',
  '2.1.12071.16 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmeXlfhSQTtCtHzXkGEgEDU; expires=Thu, 28-Oct-2021 03:04:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLZgVRBPcv1bUoJYFDFqcBrbniBRwgXiSvJvGkndNlBqHlUXeLhmu0hnP2yEoAQHBUhpcuOqI4inyXqTPtmlgSmJQ6eIQ1tt2CKQOD4JudCnaBQPsmf2W5Rp2DNW79bi41AfKQ9jw5hr8uxaSAAddIWMTBI1NHcTd5fuDPbDNMkYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 03:04:45 GMT',
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
  'c41e99e2-d088-4724-9f13-5c79eb6a1200',
  'x-ms-ests-server',
  '2.1.12071.16 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvZJBJ3Rua5CmGTc5BECI68; expires=Thu, 28-Oct-2021 03:04:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqivJB98zAMrJjHeDqKQYp_HW6SZxv0QYz5dpALcehK_3o13IkSMt96fsykpL-ZQUFZ1t1ftrCqNexyCDoUhSk2y2D9lAIkCsflFb0CCA72FixJpLPMLyJkuEOBuSi9M_iTa1A7MiZE89XJR5hCQ7ZOgQEKBK2cXvBnQN70hH38wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 03:04:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f3e4c1e5-c3ed-42a8-bf29-713ab7ce75fa&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'c41e99e2-d088-4724-9f13-5c79f26a1200',
  'x-ms-ests-server',
  '2.1.12071.16 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiMlY1O1doxPolaZrpwGbDgWPr5BAQAAAE195NgOAAAA; expires=Thu, 28-Oct-2021 03:04:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 03:04:45 GMT',
  'Content-Length',
  '1351'
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
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c9624211-42da-4ffc-8329-7fc9c894426b',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  '3a9162e5-3c32-4546-952f-7c58951704fa',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030446Z:3a9162e5-3c32-4546-952f-7c58951704fa',
  'Date',
  'Tue, 28 Sep 2021 03:04:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '853c7978-10f6-4f63-b59c-1444a4058008',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11986',
  'x-ms-correlation-request-id',
  '382987f0-9a50-4fec-a4d5-1051915dafd4',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030447Z:382987f0-9a50-4fec-a4d5-1051915dafd4',
  'Date',
  'Tue, 28 Sep 2021 03:04:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '2152d98f-a7fa-4c3a-8051-6efad05caf94',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11985',
  'x-ms-correlation-request-id',
  '34b4f9e5-221a-464b-a6fa-7ca71bf54508',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030449Z:34b4f9e5-221a-464b-a6fa-7ca71bf54508',
  'Date',
  'Tue, 28 Sep 2021 03:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'aa5cdf05-0f5a-4288-847e-7fdaa7a5d2cb',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-correlation-request-id',
  '743fd220-7275-429b-ab14-42923b7e2a13',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030451Z:743fd220-7275-429b-ab14-42923b7e2a13',
  'Date',
  'Tue, 28 Sep 2021 03:04:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '7930373c-6c68-4985-a663-c9c65f0d1c32',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-correlation-request-id',
  '82e8bc2c-db8a-4168-8e6a-f8f28f1ab125',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030453Z:82e8bc2c-db8a-4168-8e6a-f8f28f1ab125',
  'Date',
  'Tue, 28 Sep 2021 03:04:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '75fb8899-7ae1-48e5-9abf-0986e461d541',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11982',
  'x-ms-correlation-request-id',
  'a1c5701c-079b-4acd-b185-3ce82a58a2b3',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030456Z:a1c5701c-079b-4acd-b185-3ce82a58a2b3',
  'Date',
  'Tue, 28 Sep 2021 03:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '8a6ec990-2d31-4502-914c-b43e2e9397af',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-correlation-request-id',
  '91bb6650-ebf0-429d-bb86-02cbef1dc357',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030458Z:91bb6650-ebf0-429d-bb86-02cbef1dc357',
  'Date',
  'Tue, 28 Sep 2021 03:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'f0db7b46-c8ab-4ec4-9114-7a683fecda40',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-correlation-request-id',
  '1feb5461-7a9f-4dc6-8b02-cf024dbbda3f',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030500Z:1feb5461-7a9f-4dc6-8b02-cf024dbbda3f',
  'Date',
  'Tue, 28 Sep 2021 03:05:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '810c8839-d854-4376-98e4-3bf42120241e',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11979',
  'x-ms-correlation-request-id',
  '741d9b08-a713-4478-8a75-48f065b060d4',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030503Z:741d9b08-a713-4478-8a75-48f065b060d4',
  'Date',
  'Tue, 28 Sep 2021 03:05:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c7895d69-077d-4e39-8091-e3ca006546c7',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-correlation-request-id',
  '7c389fab-0006-42bd-8912-c29d68bed182',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030505Z:7c389fab-0006-42bd-8912-c29d68bed182',
  'Date',
  'Tue, 28 Sep 2021 03:05:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '15869aca-5c75-4c10-b019-3a0fd520f591',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11977',
  'x-ms-correlation-request-id',
  'f2ed2b36-318d-4511-bac0-8c8f759b6775',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030507Z:f2ed2b36-318d-4511-bac0-8c8f759b6775',
  'Date',
  'Tue, 28 Sep 2021 03:05:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '103876e1-b477-448b-9d9a-d275be093869',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11976',
  'x-ms-correlation-request-id',
  'fd07c20c-e68a-41c4-9a77-a94889afd8e6',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030510Z:fd07c20c-e68a-41c4-9a77-a94889afd8e6',
  'Date',
  'Tue, 28 Sep 2021 03:05:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '248c12da-a8a8-41a9-b427-d3d79496a760',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-correlation-request-id',
  'b9d1e18e-5c7f-4318-a5c8-62f8917656d1',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030512Z:b9d1e18e-5c7f-4318-a5c8-62f8917656d1',
  'Date',
  'Tue, 28 Sep 2021 03:05:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '095d6f81-f44b-4078-8d1b-f8440d3eb4c1',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11974',
  'x-ms-correlation-request-id',
  '3a31ad60-951c-43b6-b06f-39a590540a33',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030515Z:3a31ad60-951c-43b6-b06f-39a590540a33',
  'Date',
  'Tue, 28 Sep 2021 03:05:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'adce0dc3-5eb2-4b80-851d-c8dc5c83fb2a',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  '37d36dad-1cf4-4cb8-b067-5dd0fbc3e941',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030517Z:37d36dad-1cf4-4cb8-b067-5dd0fbc3e941',
  'Date',
  'Tue, 28 Sep 2021 03:05:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c94a1d83-b7ab-42e3-aaf3-2d032c161c1e',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  '6261193b-0fb9-43f4-b1cb-e0e2ddcd4474',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030519Z:6261193b-0fb9-43f4-b1cb-e0e2ddcd4474',
  'Date',
  'Tue, 28 Sep 2021 03:05:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'ee709435-1b01-4ba7-a42f-4149675f7b03',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11971',
  'x-ms-correlation-request-id',
  '6adce475-0eb4-411d-bb45-20ffdb6cd91d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030522Z:6adce475-0eb4-411d-bb45-20ffdb6cd91d',
  'Date',
  'Tue, 28 Sep 2021 03:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '6b027f23-be88-422d-a63d-be5830eb064b',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11970',
  'x-ms-correlation-request-id',
  'db84d2ec-b45d-4534-99eb-8989621336c6',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030524Z:db84d2ec-b45d-4534-99eb-8989621336c6',
  'Date',
  'Tue, 28 Sep 2021 03:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'b1174c0a-9bad-4c79-bca4-a8bbb40827ca',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '4d8803ea-3fc7-43dd-bb48-81b84753b9fd',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030526Z:4d8803ea-3fc7-43dd-bb48-81b84753b9fd',
  'Date',
  'Tue, 28 Sep 2021 03:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '468583d5-97f0-4d6f-9238-6085a660ab75',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  'c8e60875-dd0e-4124-a403-1cbba903e266',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030529Z:c8e60875-dd0e-4124-a403-1cbba903e266',
  'Date',
  'Tue, 28 Sep 2021 03:05:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'f23f9ee5-596f-4547-9329-eb1fde1c03a8',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  '46e9502b-f2df-40b2-910b-2d58c1b1389a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030531Z:46e9502b-f2df-40b2-910b-2d58c1b1389a',
  'Date',
  'Tue, 28 Sep 2021 03:05:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '959ed0d9-71ee-47aa-8228-87602b63a703',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  '99b4773b-c9de-4400-a98b-da9c69dcbd72',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030537Z:99b4773b-c9de-4400-a98b-da9c69dcbd72',
  'Date',
  'Tue, 28 Sep 2021 03:05:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '72bc3b72-f5e3-4e20-b039-683640a7437e',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  'bb082141-f369-4d2c-831b-07b56f87b52b',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030540Z:bb082141-f369-4d2c-831b-07b56f87b52b',
  'Date',
  'Tue, 28 Sep 2021 03:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '33258056-05bc-4cd6-8667-1843e93eacc0',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  '43452bdc-7cc7-4f9c-ae69-343cdb32d9e4',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030542Z:43452bdc-7cc7-4f9c-ae69-343cdb32d9e4',
  'Date',
  'Tue, 28 Sep 2021 03:05:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'aa9274aa-f12d-438b-9c68-07f58e0353d6',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  '2fee2aa9-3f41-421e-b909-6538944d743a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030544Z:2fee2aa9-3f41-421e-b909-6538944d743a',
  'Date',
  'Tue, 28 Sep 2021 03:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '2c507064-c4ed-4cb7-a3e3-65a4dbd0710c',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  '3a4c09a3-230f-472e-af49-303e26dea456',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030547Z:3a4c09a3-230f-472e-af49-303e26dea456',
  'Date',
  'Tue, 28 Sep 2021 03:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '9eac85e9-c5a5-4897-aa92-8956f20b007d',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  'e66583c5-0775-4b6a-bda5-98ba0fddca02',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030549Z:e66583c5-0775-4b6a-bda5-98ba0fddca02',
  'Date',
  'Tue, 28 Sep 2021 03:05:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '67887d98-7b94-4502-a978-3caa3fb057ab',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  '2e951876-40f9-4dd1-b00d-5e6fb897623b',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030551Z:2e951876-40f9-4dd1-b00d-5e6fb897623b',
  'Date',
  'Tue, 28 Sep 2021 03:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '98f40e10-adf4-4e78-a9a9-40f3912fee17',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  'ec704677-05a9-47f1-b49c-10b6df75300d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030554Z:ec704677-05a9-47f1-b49c-10b6df75300d',
  'Date',
  'Tue, 28 Sep 2021 03:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'f6b530ff-963b-43fc-bbb5-0df05053cfe7',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  'dc4d4c81-c5a7-4cd6-9b56-8e48b87d6c91',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030556Z:dc4d4c81-c5a7-4cd6-9b56-8e48b87d6c91',
  'Date',
  'Tue, 28 Sep 2021 03:05:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '7a609f67-698e-4a6b-b24c-b8f23610d36a',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  '4d40b222-418c-49c7-aeb4-37d3c7e0ad1d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030558Z:4d40b222-418c-49c7-aeb4-37d3c7e0ad1d',
  'Date',
  'Tue, 28 Sep 2021 03:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'e5f1740a-72b2-494d-bfa1-2b9dea6e9810',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  '1524d87d-87c6-42d5-96a1-3ccec71f3d6a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030601Z:1524d87d-87c6-42d5-96a1-3ccec71f3d6a',
  'Date',
  'Tue, 28 Sep 2021 03:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'a174fabf-9c6d-4fbb-a53f-6e0fe58e9f3a',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  'dde3f8ad-7340-49fb-81cb-a5e716f87755',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030603Z:dde3f8ad-7340-49fb-81cb-a5e716f87755',
  'Date',
  'Tue, 28 Sep 2021 03:06:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'a88e7b5a-a4ec-46ac-85fd-8190403369b7',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  'f07fd107-14cb-4f6e-8ce8-53c9ca48912e',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030605Z:f07fd107-14cb-4f6e-8ce8-53c9ca48912e',
  'Date',
  'Tue, 28 Sep 2021 03:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '804512b3-6158-4f84-afee-970c9d3a745a',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  'c362e354-f553-4d0c-8312-a4640f2cba6d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030608Z:c362e354-f553-4d0c-8312-a4640f2cba6d',
  'Date',
  'Tue, 28 Sep 2021 03:06:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'bc5049aa-f492-44fc-8630-4a26c63b6845',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  '9ca3e78a-32bb-4eb1-83ca-39e93a60f7bf',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030610Z:9ca3e78a-32bb-4eb1-83ca-39e93a60f7bf',
  'Date',
  'Tue, 28 Sep 2021 03:06:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '5e9e78f0-d867-4f4a-a5f5-1fec04ddcb3f',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  '17548f22-c071-4488-96f7-46b85984dcc7',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030612Z:17548f22-c071-4488-96f7-46b85984dcc7',
  'Date',
  'Tue, 28 Sep 2021 03:06:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '2514ce50-da99-4a62-aeea-240dd9f04101',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  '3c120e13-2d47-4f97-bc52-d4e86d8ba688',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030615Z:3c120e13-2d47-4f97-bc52-d4e86d8ba688',
  'Date',
  'Tue, 28 Sep 2021 03:06:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c6a031c5-a54a-43b7-8c3e-e7884f32c7ed',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  '0c46c6c5-d52a-451b-9788-9a4910f2ad6a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030617Z:0c46c6c5-d52a-451b-9788-9a4910f2ad6a',
  'Date',
  'Tue, 28 Sep 2021 03:06:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '021b6407-6ccf-4a7f-b858-1c8ad639a599',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  '4b791663-43e9-47e4-ad8c-5d17b8fef48d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030619Z:4b791663-43e9-47e4-ad8c-5d17b8fef48d',
  'Date',
  'Tue, 28 Sep 2021 03:06:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '2e9ae193-aa23-4e99-9aeb-d55b8d8d4923',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  '7c2691bb-0182-4291-b099-1cc1e05cba9e',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030622Z:7c2691bb-0182-4291-b099-1cc1e05cba9e',
  'Date',
  'Tue, 28 Sep 2021 03:06:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '7c689d59-a83e-413e-8a2a-7d7d5915caf8',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  'c9fb2c4b-27e9-4988-865d-46cd907e4ea6',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030625Z:c9fb2c4b-27e9-4988-865d-46cd907e4ea6',
  'Date',
  'Tue, 28 Sep 2021 03:06:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'cc1b8b09-3523-44a7-9744-bbe0856bad9f',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  'd674bf36-57ae-4f15-9275-06de2ffe847e',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030628Z:d674bf36-57ae-4f15-9275-06de2ffe847e',
  'Date',
  'Tue, 28 Sep 2021 03:06:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'dd5e4f2a-70af-425e-9e1b-8ac202937dce',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  'fe3df451-31ee-4701-92ae-a638bba51590',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030631Z:fe3df451-31ee-4701-92ae-a638bba51590',
  'Date',
  'Tue, 28 Sep 2021 03:06:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'd9164a7b-57b6-4703-aac2-33e707cf1262',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  '508c78e1-406e-40c5-9e5c-df9982051db9',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030634Z:508c78e1-406e-40c5-9e5c-df9982051db9',
  'Date',
  'Tue, 28 Sep 2021 03:06:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '3f2f6352-6a0a-4d85-a490-d17e381ee0f2',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  '7965e496-b44e-4ebe-8fa6-ea6c2efc026a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030637Z:7965e496-b44e-4ebe-8fa6-ea6c2efc026a',
  'Date',
  'Tue, 28 Sep 2021 03:06:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '5946ec4b-d395-4c47-9587-73f26db71ae3',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  '1f446997-c49c-4259-8a0e-854539ae6f1d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030641Z:1f446997-c49c-4259-8a0e-854539ae6f1d',
  'Date',
  'Tue, 28 Sep 2021 03:06:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'a9c64006-37f1-4757-b98c-6e4878491338',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  '0b0272df-32a3-4e60-8bef-23ba1755d8bd',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030643Z:0b0272df-32a3-4e60-8bef-23ba1755d8bd',
  'Date',
  'Tue, 28 Sep 2021 03:06:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '381528a2-f610-4271-b15f-413c549074df',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  '535ddc70-26c6-46e1-94e8-acf1798b1229',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030646Z:535ddc70-26c6-46e1-94e8-acf1798b1229',
  'Date',
  'Tue, 28 Sep 2021 03:06:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'ebf1f33f-ab3f-4d1c-82dc-481567058412',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  'c1717076-0fcc-45d6-9b28-146826247f48',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030648Z:c1717076-0fcc-45d6-9b28-146826247f48',
  'Date',
  'Tue, 28 Sep 2021 03:06:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'eaeda977-9c19-44bf-a08f-f69787bdff29',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  'c6af2134-01f9-403d-9b60-55c8c7d5f119',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030650Z:c6af2134-01f9-403d-9b60-55c8c7d5f119',
  'Date',
  'Tue, 28 Sep 2021 03:06:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '2c170c54-150a-4080-86dd-fb85c0524647',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  '68bee8e1-2007-4baa-aa97-00c6ec46736f',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030653Z:68bee8e1-2007-4baa-aa97-00c6ec46736f',
  'Date',
  'Tue, 28 Sep 2021 03:06:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '994b3265-cab2-4885-8851-36f2005dacbb',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  'f4dac703-2201-4af8-8c5b-af604cc92abc',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030655Z:f4dac703-2201-4af8-8c5b-af604cc92abc',
  'Date',
  'Tue, 28 Sep 2021 03:06:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'b7f8c235-cadc-42fa-8972-042334324b43',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  '7610d097-e1c4-45cd-9fd1-e2ef6fa59cd8',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030657Z:7610d097-e1c4-45cd-9fd1-e2ef6fa59cd8',
  'Date',
  'Tue, 28 Sep 2021 03:06:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '631cfc54-01f9-4d15-8d7a-d6652e136f71',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  '5e2219c4-f9b6-4bbb-96c4-3d4877282159',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030700Z:5e2219c4-f9b6-4bbb-96c4-3d4877282159',
  'Date',
  'Tue, 28 Sep 2021 03:06:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '1db4f5b1-0d92-449f-8f93-9611892a9bdf',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  '56598813-7cd1-47d6-9930-60f400d7980a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030702Z:56598813-7cd1-47d6-9930-60f400d7980a',
  'Date',
  'Tue, 28 Sep 2021 03:07:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c950a47c-8da4-4104-9488-3d552ec533b9',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  '66316aa8-e958-4ac6-acbd-8581e9080c40',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030704Z:66316aa8-e958-4ac6-acbd-8581e9080c40',
  'Date',
  'Tue, 28 Sep 2021 03:07:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '9da5ff62-a905-404c-92bf-6205d7cafc2d',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  'd49e2416-e9ac-4aff-8fbd-0a6524a6d8e9',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030707Z:d49e2416-e9ac-4aff-8fbd-0a6524a6d8e9',
  'Date',
  'Tue, 28 Sep 2021 03:07:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c2e3fb47-467d-4858-953b-cc4a3ef81f54',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  'a1d0b062-4a3b-4fd3-baad-5b8b71f9c31a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030709Z:a1d0b062-4a3b-4fd3-baad-5b8b71f9c31a',
  'Date',
  'Tue, 28 Sep 2021 03:07:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '1260b0c6-1beb-4196-8275-e1198917d4ad',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  '89cf1cc1-60c2-4222-bc19-22aba69d73a4',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030711Z:89cf1cc1-60c2-4222-bc19-22aba69d73a4',
  'Date',
  'Tue, 28 Sep 2021 03:07:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '21d8ec5c-15f7-40c4-9f94-7b077d13c6e4',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  'fefaf885-b357-4eea-990c-80a179d06a4f',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030714Z:fefaf885-b357-4eea-990c-80a179d06a4f',
  'Date',
  'Tue, 28 Sep 2021 03:07:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'f12ddb16-02ad-409b-96c7-87ccdd2b3c46',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  '038e4d74-bd65-4ebf-9005-b12a06a0b25f',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030716Z:038e4d74-bd65-4ebf-9005-b12a06a0b25f',
  'Date',
  'Tue, 28 Sep 2021 03:07:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '41322feb-6cad-407a-8fbf-ba5420f64cdb',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  '2cf6dd73-8154-4935-adb0-08c28df0fe29',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030718Z:2cf6dd73-8154-4935-adb0-08c28df0fe29',
  'Date',
  'Tue, 28 Sep 2021 03:07:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'e73d4bfa-e8ed-4a12-ba29-243cc6b1def8',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  '5452a778-5264-4223-b565-195a3423a4b8',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030721Z:5452a778-5264-4223-b565-195a3423a4b8',
  'Date',
  'Tue, 28 Sep 2021 03:07:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '92646756-6dd6-4813-b970-1eec6fd0fcb4',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-correlation-request-id',
  '24805fa7-d9cc-4825-ac88-60129a55509f',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030723Z:24805fa7-d9cc-4825-ac88-60129a55509f',
  'Date',
  'Tue, 28 Sep 2021 03:07:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'e364916e-9236-4fdb-a116-5e54c7ef32f6',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  'dd8172f0-b032-4d9d-80f1-d6623bc9fd3d',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030725Z:dd8172f0-b032-4d9d-80f1-d6623bc9fd3d',
  'Date',
  'Tue, 28 Sep 2021 03:07:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '9a44a96a-fed6-4be5-b54f-86f192c6ab82',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  '42467b08-7eed-41b6-834f-a88d52f16005',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030728Z:42467b08-7eed-41b6-834f-a88d52f16005',
  'Date',
  'Tue, 28 Sep 2021 03:07:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '77569352-afe8-483b-adff-f34d9fa642f7',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  '74ebdad5-2840-4a65-bee8-2c34d6ae340a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030730Z:74ebdad5-2840-4a65-bee8-2c34d6ae340a',
  'Date',
  'Tue, 28 Sep 2021 03:07:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '9d303276-1832-4406-8e17-2f60668ce50e',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  'd6dfa82d-1534-48d5-bfac-c0335126a656',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030732Z:d6dfa82d-1534-48d5-bfac-c0335126a656',
  'Date',
  'Tue, 28 Sep 2021 03:07:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '17c1f8d2-7cc7-4617-94e3-2d5985ead8c2',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  '5b7f509d-4e17-4a81-983c-a324e05101ee',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030735Z:5b7f509d-4e17-4a81-983c-a324e05101ee',
  'Date',
  'Tue, 28 Sep 2021 03:07:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'e77f3721-8a25-45a1-be82-31a69580566c',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  '3e6d3b7b-fde7-4020-9b46-8c09c649d3cc',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030737Z:3e6d3b7b-fde7-4020-9b46-8c09c649d3cc',
  'Date',
  'Tue, 28 Sep 2021 03:07:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'ba1bd907-d81c-4a8b-a731-ccf80ed2705f',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  '33c05447-ac3f-44ee-b3bc-735c04870c82',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030739Z:33c05447-ac3f-44ee-b3bc-735c04870c82',
  'Date',
  'Tue, 28 Sep 2021 03:07:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'd690a9f8-a1a4-4325-9cbd-cd887001360a',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  '58e467df-6154-4f43-a885-2478b5ab85eb',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030742Z:58e467df-6154-4f43-a885-2478b5ab85eb',
  'Date',
  'Tue, 28 Sep 2021 03:07:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '96930182-6e7e-498f-b5ff-4cb7a18cf144',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  'aa7776ad-3234-4334-8190-7d3f6122dcce',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030744Z:aa7776ad-3234-4334-8190-7d3f6122dcce',
  'Date',
  'Tue, 28 Sep 2021 03:07:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c727a21b-0111-449f-80ba-b51f0f07a8cb',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  'f42dfb9f-7ed3-4b70-a3d7-ca9a848d96ca',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030747Z:f42dfb9f-7ed3-4b70-a3d7-ca9a848d96ca',
  'Date',
  'Tue, 28 Sep 2021 03:07:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c77e9f54-2247-4da5-9adb-810311a5a16f',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  '58a85ab6-12bf-45e5-afba-e8d04eec76e3',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030749Z:58a85ab6-12bf-45e5-afba-e8d04eec76e3',
  'Date',
  'Tue, 28 Sep 2021 03:07:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '6b206ff6-7fc5-4cbd-a0e5-70400d6aa1fa',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  'f6c0b154-5ee1-4fe4-b153-56a0e10f3b4e',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030751Z:f6c0b154-5ee1-4fe4-b153-56a0e10f3b4e',
  'Date',
  'Tue, 28 Sep 2021 03:07:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '760d3c51-4d6d-4e82-b506-3a81c330d4f5',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  'd5bfe7c6-7b10-4c6a-925c-dddcab612247',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030754Z:d5bfe7c6-7b10-4c6a-925c-dddcab612247',
  'Date',
  'Tue, 28 Sep 2021 03:07:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'c8f3c9e8-cfb4-4bfa-af44-b0dc17341147',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  'bf1b0582-da89-42b4-a184-ff6b8536ffc5',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030756Z:bf1b0582-da89-42b4-a184-ff6b8536ffc5',
  'Date',
  'Tue, 28 Sep 2021 03:07:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '84a83a7b-aa28-41eb-885c-594763811b4d',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '3a751bf0-bbd5-44da-b2d3-0a006b5a8416',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030758Z:3a751bf0-bbd5-44da-b2d3-0a006b5a8416',
  'Date',
  'Tue, 28 Sep 2021 03:07:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '485348f1-a8b5-4ca8-92dd-e98d6df4d759',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '66844100-eacb-4d9b-b14d-1d393c89e636',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030801Z:66844100-eacb-4d9b-b14d-1d393c89e636',
  'Date',
  'Tue, 28 Sep 2021 03:08:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '4a37ab9a-bf4b-459b-9f8b-4981b34393e4',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  '6850140e-1f2b-428a-af87-c5261361ae29',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030803Z:6850140e-1f2b-428a-af87-c5261361ae29',
  'Date',
  'Tue, 28 Sep 2021 03:08:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '7a70e76a-bea6-45ea-8501-a2d4ad6798b8',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  '7a179a2f-be79-463e-b7c1-fced9323dff0',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030805Z:7a179a2f-be79-463e-b7c1-fced9323dff0',
  'Date',
  'Tue, 28 Sep 2021 03:08:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '885e4d98-24b0-45be-94e9-a7d008cc46c4',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  '9222d6e6-1151-47a8-a36c-ada92e862123',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030808Z:9222d6e6-1151-47a8-a36c-ada92e862123',
  'Date',
  'Tue, 28 Sep 2021 03:08:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '26be9aed-e7f9-4bcc-9e39-cbbad14bbc53',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  'a27d521e-eaa3-4c3c-baa9-e3b0a1e46a9a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030810Z:a27d521e-eaa3-4c3c-baa9-e3b0a1e46a9a',
  'Date',
  'Tue, 28 Sep 2021 03:08:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '5026958e-e13c-43c9-b596-c74ddf644df5',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  'f482f361-fd28-4f62-939b-b87df6bdadb8',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030813Z:f482f361-fd28-4f62-939b-b87df6bdadb8',
  'Date',
  'Tue, 28 Sep 2021 03:08:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'ba66a456-8172-4e9a-a4ec-0b8de0749d90',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  '84ed1d48-070c-4a74-a3b1-944fc676dcb9',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030815Z:84ed1d48-070c-4a74-a3b1-944fc676dcb9',
  'Date',
  'Tue, 28 Sep 2021 03:08:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'bdcac188-0ce5-4bfb-b6ee-9af8c31681fa',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  'ea45e675-7a8f-43fd-8c98-54d2da9ddea4',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030818Z:ea45e675-7a8f-43fd-8c98-54d2da9ddea4',
  'Date',
  'Tue, 28 Sep 2021 03:08:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'b91a65b8-5223-4faa-974e-b866b926c201',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  '431e2648-d2f3-43b7-9f6d-280a1aadf58a',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030820Z:431e2648-d2f3-43b7-9f6d-280a1aadf58a',
  'Date',
  'Tue, 28 Sep 2021 03:08:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  '7fb2fa93-d6d6-4820-b935-df2deaaf5ad8',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '16c28bd1-ddb8-4085-8107-8d2c1d7f69ff',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030826Z:16c28bd1-ddb8-4085-8107-8d2c1d7f69ff',
  'Date',
  'Tue, 28 Sep 2021 03:08:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(504, {"error":{"code":"GatewayTimeout","message":"The gateway did not receive a response from 'Microsoft.Cache' within the specified time period."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-failure-cause',
  'service',
  'x-ms-request-id',
  'f32869dd-a926-45a0-9e82-60797261b329',
  'x-ms-correlation-request-id',
  'f32869dd-a926-45a0-9e82-60797261b329',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030928Z:f32869dd-a926-45a0-9e82-60797261b329',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Sep 2021 03:09:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '143'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b?api-version=2020-12-01',
  'x-ms-request-id',
  'b41ee15b-7c7b-4586-9d32-1af4cbbf2282',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  '007269e8-ec34-43a8-a80b-bdcda145e92b',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030941Z:007269e8-ec34-43a8-a80b-bdcda145e92b',
  'Date',
  'Tue, 28 Sep 2021 03:09:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Cache/locations/East%20US/operationresults/c9624211-42da-4ffc-8329-7fc9c894426b')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  '71bd099e-581a-48f0-9d10-5dbf1f7bfb72',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  '1c519040-93c7-4c8d-87d0-f5a5f881bb3b',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030947Z:1c519040-93c7-4c8d-87d0-f5a5f881bb3b',
  'Date',
  'Tue, 28 Sep 2021 03:09:47 GMT',
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
  '4dfad72b-a011-4b2d-8978-8175c8376556',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  'f219b3aa-9068-47e4-a0ba-339c01f40b9c',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T030949Z:f219b3aa-9068-47e4-a0ba-339c01f40b9c',
  'Date',
  'Tue, 28 Sep 2021 03:09:49 GMT'
]);
