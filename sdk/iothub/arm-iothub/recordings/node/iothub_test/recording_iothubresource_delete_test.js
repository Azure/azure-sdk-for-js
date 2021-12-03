let nock = require('nock');

module.exports.hash = "d67edb5c49e1b89a9794527c1a3680b1";

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
  'ecd311d4-8e69-40e0-8cc8-6290febe0100',
  'x-ms-ests-server',
  '2.1.12249.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aq4SjbasTDNEkde514Ipa94; expires=Sun, 02-Jan-2022 03:27:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQRpUZ3Cdqf2m-GnEvN0aiLKI1bXRA1w8yKNDTyhSgT4wGdcyzOfI9uaD2FKI2mOhMRtHBcV-qE0J3qIZV7az_vSftIV5K7hmsGWi6uW22RGQqYeuEkHRd-X5n0UXpytaETtEn__MRMfOElzwKfPypjTgXBJd2_FwnECA8Gs46OcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:49 GMT',
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
  '286f026a-4e77-4472-873b-fa6ef18b0000',
  'x-ms-ests-server',
  '2.1.12249.16 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Arc-FzMipNRKmYrl2w3dQ_o; expires=Sun, 02-Jan-2022 03:27:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrh0x567KVgS5LeDCfKjeJxqpRpIKYPIydz2OIdKJoyoPNpHzwVnDF98_LO3_gt6GUTn6X10aMNV7E37Pob3GLQeQnCyDpNG5kusgzp6UVAVVJeA8vZkGjdagDwVS9UFtZbQ8sFM_44u25S0hRm8Lx0S_oIy0nEmn1dJRcu-o8MHggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:49 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=013005fc-e6c7-454f-b05d-432fca4f50d0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '286f026a-4e77-4472-873b-fa6ef28b0000',
  'x-ms-ests-server',
  '2.1.12249.16 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AombnzE4IsRHmUqrqAvYBmoWPr5BAQAAALWFO9kOAAAA; expires=Sun, 02-Jan-2022 03:27:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:49 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr')
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
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=?api-version=2021-07-01-preview&operationSource=other',
  'Retry-After',
  '15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=?api-version=2021-07-01-preview&operationSource=other&asyncinfo',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-request-id',
  '2d9381a1-fec7-41b3-99fe-302cd40b961b',
  'x-ms-correlation-request-id',
  '2d9381a1-fec7-41b3-99fe-302cd40b961b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032750Z:2d9381a1-fec7-41b3-99fe-302cd40b961b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5a2f97c5f2e2a3","5ff2ff0089ccbd4914000000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-request-id',
  '886b6eca-4b57-4f4e-92ab-f72ceb373574',
  'x-ms-correlation-request-id',
  '886b6eca-4b57-4f4e-92ab-f72ceb373574',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032751Z:886b6eca-4b57-4f4e-92ab-f72ceb373574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5a2f97c5f2e2a3","5ff2ff0089ccbd4914000000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-request-id',
  '362ccb47-aa5e-4bfb-af19-3e1650bd97ad',
  'x-ms-correlation-request-id',
  '362ccb47-aa5e-4bfb-af19-3e1650bd97ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032753Z:362ccb47-aa5e-4bfb-af19-3e1650bd97ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5a2f97c5f2e2a3","5ff2ff0089ccbd4914000000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-request-id',
  'e68096f7-e880-4f2f-b2a2-01a0219139a1',
  'x-ms-correlation-request-id',
  'e68096f7-e880-4f2f-b2a2-01a0219139a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032755Z:e68096f7-e880-4f2f-b2a2-01a0219139a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5a2f97c5f2e2a3","5ff2ff0089ccbd4914000000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-request-id',
  'e7325058-2265-44ca-b00f-8b657bd0c105',
  'x-ms-correlation-request-id',
  'e7325058-2265-44ca-b00f-8b657bd0c105',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032757Z:e7325058-2265-44ca-b00f-8b657bd0c105',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Devices/locations/eastus/operationResults/aWQ9b3NfaWhfMjRlOTMwOGYtYWEzOC00M2JkLWIyZDgtNjRmNWE4YTljNWZjO3JlZ2lvbj1lYXN0dXM=')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671ffd","92ff0720887be416000000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-request-id',
  '7913f1d3-b229-4c54-abcd-c12738a441cf',
  'x-ms-correlation-request-id',
  '7913f1d3-b229-4c54-abcd-c12738a441cf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032800Z:7913f1d3-b229-4c54-abcd-c12738a441cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs')
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-request-id',
  '5e5cc79e-ff5b-49fc-96f1-ee575176df58',
  'x-ms-correlation-request-id',
  '5e5cc79e-ff5b-49fc-96f1-ee575176df58',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032800Z:5e5cc79e-ff5b-49fc-96f1-ee575176df58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:28:00 GMT'
]);
