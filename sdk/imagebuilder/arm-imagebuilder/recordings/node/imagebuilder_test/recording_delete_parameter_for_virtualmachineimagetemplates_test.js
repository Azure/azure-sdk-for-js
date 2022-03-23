let nock = require('nock');

module.exports.hash = "55b5a3cf987798d93e3f5fcd5d1dadc3";

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
  'bd7cce1a-504f-4080-b015-662ec5310800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjYcG5AP6Z5Ig9PUThAYd14; expires=Sat, 05-Feb-2022 03:14:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJ0-uXxrwJlnJ8aA_xqW3gfQ-8yrKYfV7tsOlZegSyvkvdN7rEjECBG0FpJPRXcRNTZd-NkdS8gaRHWHIFhijA-HronJBeNyxeq0A8bgUHxOqnz0lcVkuMU300rIS66ZQGI_atgq20icTas1128XH8fhvnIbXWSsKJo7RMrPloS8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:14:29 GMT',
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
  'bd7cce1a-504f-4080-b015-662ec8310800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArInSGlKmCdJlQHrrBoC2pw; expires=Sat, 05-Feb-2022 03:14:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUlb0Bx7MSgpQhnV-FChLkzkSzv8VNPqb0euXXL4AFyitSWs8OdVZDsi4V3YofnGf4yxvTWW65NyPKdzdQl0XJqxyzzGla5wOR3VL1b5fTcN7F49lu6JUslMLhTfXUqqE_PdO8FVwVUYwPn8l-LtwCRYADYhe_9KBLgC2uWFfl2ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:14:29 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9281122d-42fc-445d-a2da-5fe512f27c8f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '4a229268-50b8-4df0-8d9c-388eab3b6c00',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Apn15HcetTpCsKALtA_c_pXLj78gAQAAAJVVaNkOAAAA; expires=Sat, 05-Feb-2022 03:14:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:14:29 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/images/myimagesaaa')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-request-id',
  'bbc6320d-4a96-488c-8215-ef4af122d6e2',
  'x-ms-correlation-request-id',
  'bbc6320d-4a96-488c-8215-ef4af122d6e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031431Z:bbc6320d-4a96-488c-8215-ef4af122d6e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:14:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/snapshots/mysnapshotaaa')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Compute/locations/eastus/DiskOperations/f644f03e-747a-4f8d-bb43-c11077ff5864?p=46f2ba6c-4ad8-4d14-a912-d9914b2fcabd&monitor=true&api-version=2021-04-01',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Compute/locations/eastus/DiskOperations/f644f03e-747a-4f8d-bb43-c11077ff5864?p=46f2ba6c-4ad8-4d14-a912-d9914b2fcabd&api-version=2021-04-01',
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/DeleteDisks3Min;999,Microsoft.Compute/DeleteDisks30Min;7997',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-served-by',
  '46f2ba6c-4ad8-4d14-a912-d9914b2fcabd_132720953397422156',
  'x-ms-request-id',
  'f644f03e-747a-4f8d-bb43-c11077ff5864',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  '5177044c-64ed-4497-a67d-f7d23446309c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031433Z:5177044c-64ed-4497-a67d-f7d23446309c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:14:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Compute/locations/eastus/DiskOperations/f644f03e-747a-4f8d-bb43-c11077ff5864')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9474d9bd5ed9b62917ff428fd686f676f6f7b67777be7d3373bf71eedee3fbab7377eb8b7776fe7e1bd4f76761eedec7c34e297f2e56cf8957be39d0707f73fbdb71fbc42fdb4eb066fbc5e4fa7793ecb67facd321348e79feeef9fefdccbb71fec3fc8b6f7cf0f66db93c9febdede9eeeece8307e7e7f70f3eddffe8374e7e","c9ff0369f0ba74b8000000"], [
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
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/GetOperation3Min;49999,Microsoft.Compute/GetOperation30Min;399976',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-served-by',
  '46f2ba6c-4ad8-4d14-a912-d9914b2fcabd_132720953397422156',
  'x-ms-request-id',
  '9a1208a7-6c44-4e8e-970a-1ee4c0775a91',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  'eaf21854-f7a0-41a0-bdbd-5535fe584798',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031433Z:eaf21854-f7a0-41a0-bdbd-5535fe584798',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:14:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/disks/mydiskaaa')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Compute/locations/eastus/DiskOperations/b730958d-35bb-41d3-99a1-e18462368493?p=46f2ba6c-4ad8-4d14-a912-d9914b2fcabd&monitor=true&api-version=2021-04-01',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Compute/locations/eastus/DiskOperations/b730958d-35bb-41d3-99a1-e18462368493?p=46f2ba6c-4ad8-4d14-a912-d9914b2fcabd&api-version=2021-04-01',
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/DeleteDisks3Min;998,Microsoft.Compute/DeleteDisks30Min;7996',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-served-by',
  '46f2ba6c-4ad8-4d14-a912-d9914b2fcabd_132720953397422156',
  'x-ms-request-id',
  'b730958d-35bb-41d3-99a1-e18462368493',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14997',
  'x-ms-correlation-request-id',
  '7b87db1a-3b36-4174-a47e-41d41eab0f08',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031434Z:7b87db1a-3b36-4174-a47e-41d41eab0f08',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:14:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Compute/locations/eastus/DiskOperations/b730958d-35bb-41d3-99a1-e18462368493')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9474d9bd5ed9b62917ff428fd686f676f6f7b67777be7d3373bf71eedee3fbab73fde7db0776f6fefe1273b3b8f76763e1af14bf972b6e9957bf71f3e78b81fbc41ddb4eb062fbc5e4fa7793ecb67facd3213409307f7761ede3f986ddfbb3f996cefefceee6d3f7c98ed6ee7bb07fb9feeddfbf460ffe1bd8f7ee3e497","fc3f3bdd0dc4b7000000"], [
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
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/GetOperation3Min;49998,Microsoft.Compute/GetOperation30Min;399975',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-served-by',
  '46f2ba6c-4ad8-4d14-a912-d9914b2fcabd_132720953397422156',
  'x-ms-request-id',
  'c172c4c3-57ba-4749-8154-26f770042571',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  'aceab760-144e-4a4f-84eb-b2380ad60f4c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031434Z:aceab760-144e-4a4f-84eb-b2380ad60f4c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:14:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mymsiaaa')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14996',
  'x-ms-request-id',
  '658574b4-4f20-4fb5-a818-869586f782a1',
  'x-ms-correlation-request-id',
  '658574b4-4f20-4fb5-a818-869586f782a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031442Z:658574b4-4f20-4fb5-a818-869586f782a1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:14:41 GMT',
  'Content-Length',
  '0'
]);
