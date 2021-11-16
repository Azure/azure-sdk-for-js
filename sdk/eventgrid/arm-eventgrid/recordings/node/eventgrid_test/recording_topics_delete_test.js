let nock = require('nock');

module.exports.hash = "98527b900fdfd74d5ab9f81293de65c8";

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
  'f96763da-090c-48e0-95c9-d9c94ec70300',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlFhOydyfYJPvuuIx_4Ni68; expires=Thu, 16-Dec-2021 08:39:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrND_ZDUygNmJ3868DzYqCVAosxqNG9FJfNaqzfnU89QoY1K6HsNs5vWFqMSf9cgsLSV3IYpLc7ndFDJTeDAFU2AjHoHoXglqdWb8IYGFy4vu-9P9pcM0qPCRtbE9Yv-p7aCoKz4ewXIQtXFymFEypCQKD6IqOWlN9pVtUsoykThcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:39:53 GMT',
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
  '2328ec7a-c17a-4e5d-a6ca-b98b516a0300',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ai4wGPNNHUlLpCAOWJ3kkCY; expires=Thu, 16-Dec-2021 08:39:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkZP5mT1DnKd2kZOTuxhCrH0D--Xcoj7xz9c7kmzcuHZWgYD0h6bUXSvhducNPNRQKoa-CG55KsXEaJVGUsswWzqovcLZttBU60qAQiHLUgElyQ7BGzHlq0JClUFmZGhbsCvogRjUymovhINKWUStjf_HvGhzXLge5hPbnUVgtfIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:39:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4bab5bd1-1ec5-411c-81fe-3c0c5f946649&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2328ec7a-c17a-4e5d-a6ca-b98b536a0300',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Avn5s4GsKrBCvtGjYeShUnYWPr5BAQAAAFllJdkOAAAA; expires=Thu, 16-Dec-2021 08:39:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:39:53 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/topics/mytopicxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/westcentralus/operationResults/8FCF8ED3-6FDD-4602-9732-57D3C6820428?api-version=2021-12-01',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Azure-AsyncOperation',
  'https://management.azure.com:443/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/westcentralus/operationsStatus/8FCF8ED3-6FDD-4602-9732-57D3C6820428?api-version=2021-12-01',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-request-id',
  'a17fb9da-9170-453f-ae2f-b4f065192688',
  'x-ms-correlation-request-id',
  'a17fb9da-9170-453f-ae2f-b4f065192688',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T083955Z:a17fb9da-9170-453f-ae2f-b4f065192688',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:39:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/westcentralus/operationsStatus/8FCF8ED3-6FDD-4602-9732-57D3C6820428')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04d855deb453fab8ceca7573b75ae5b57cf1bacd5afae0e0d9c9b383d3a7f7b63f7df6f4e9f6fea73b7bdb0f1fdcdbdbbeffe0e9bd934f0ff676f6f70e7e8f6c556c5f5257f4de677b3b7bbbdbbb7bdb3bbb1f8d3e5a668b9cc676703e3d3fc86704e47c360b80cc680802845a37dc25b53f9eb6c565fed1","2ff97f0047ec58b71b010000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8161ab03-70d0-448c-a0fa-1d843ae92a91',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  'f6209286-b730-46b3-a37e-6e237fb89342',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T083956Z:f6209286-b730-46b3-a37e-6e237fb89342',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:39:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/westcentralus/operationsStatus/8FCF8ED3-6FDD-4602-9732-57D3C6820428')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04d855deb453fab8ceca7573b75ae5b57cf1bacd5afae0e0d9c9b383d3a7f7b63f7df6f4e9f6fea73b7bdb0f1fdcdbdbbeffe0e9bd934f0ff676f6f70e7e8f6c556c5f5257f4de677b3b7bbbdbbb7bdb3bbb1f8d3e5a668b9cc676703e3d3fc86704e47c360b80cc680802845a37dc25b57fbd9e4ef37c96cf3efa25","ff0f84e4544a1e010000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3780eeb2-27cf-434e-9378-95415b17d38c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  '40a974a5-423d-484a-8550-5ed582c5ca4b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T083958Z:40a974a5-423d-484a-8550-5ed582c5ca4b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:39:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/topics')
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0f9176c2-350a-4993-93e6-2bf1853b344c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  '1decc07d-1efd-48ea-9f4a-e60a99dc63a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T083958Z:1decc07d-1efd-48ea-9f4a-e60a99dc63a6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:39:58 GMT'
]);
