let nock = require('nock');

module.exports.hash = "1bd7023ed28777a4b59713a57fa85e6d";

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
  '43ff8381-060c-4414-987d-8825d2f71400',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuieFOozh7hKihQXeaQqUCc; expires=Sat, 11-Dec-2021 05:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrURH2sE-imWEueuTra9uHeMiWHvtlgLlYox4H-yw0bo3XJdAt6AU2fZd-_j7y4NkSAg6AmM9xS-rc0gBaTr02YCirR7-DLDyH5-prfRpxEXVQXY8tVYAympHWk8IPI4qlIKg8zKkOVq-aG3nXQAUPfblxPhcZ00uK0rLuckvj-ZkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 05:40:27 GMT',
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
  'd03127da-446a-4706-9c1f-ece812b41300',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AotdJ4qt5OJEkLpSJXJwJwc; expires=Sat, 11-Dec-2021 05:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYBjjQQ_2zyIzUmRsgJzoiIVUpcnf8b6NC52Z0tuR1HqhNoje8H5uMls-Relp9q7m8EoNFRI5EdfPzPvuBgIw5_cfpTYNpmnExUXRKawozl52tg3M5z7ymoYx80xVbwaxWnh7N7QYBdjVlavVmdzbCpYuG5TIhcdKJKAXQehbgD0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 05:40:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=774e74bd-bf69-4a42-92d5-97a24f4bc1f1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '5555d975-dc1a-4491-bd25-162d23d91700',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuMR0JUs_lJAu0eJhhx31wcWPr5BAQAAAMyjHtkOAAAA; expires=Sat, 11-Dec-2021 05:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 05:40:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cdn/profiles/myprofilexxx', {"tags":{"additional_properties":"Tag1"}})
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/profiles/myprofilexxx","type":"Microsoft.Cdn/profiles","name":"myprofilexxx","location":"EastUs","kind":"cdn","tags":{"additional_properties":"Tag1"},"sku":{"name":"Standard_Verizon"},"properties":{"resourceState":"Active","provisioningState":"Succeeded"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '363',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/693a9993-bbda-435b-9ea7-4ca5372fa930/profileresults/myprofilexxx?api-version=2020-09-01',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fd68613d-cb2a-41aa-9d50-21dd502bb436',
  'x-ms-client-request-id',
  'b092719b-a328-41a1-86f4-0cef85cbeb65',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/693a9993-bbda-435b-9ea7-4ca5372fa930?api-version=2020-09-01',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '23',
  'x-ms-correlation-request-id',
  'b6b40f1a-cb4a-48f7-9b52-3dd34dbfe01a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T054029Z:b6b40f1a-cb4a-48f7-9b52-3dd34dbfe01a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 05:40:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/693a9993-bbda-435b-9ea7-4ca5372fa930')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'd79b848d-eb0f-4add-9112-92db3be3de31',
  'x-ms-client-request-id',
  '35c75d40-99cb-4c3e-8b0a-3e47a775afe0',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  'd5e002ae-687c-478d-9d16-1aa6af073de0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T054029Z:d5e002ae-687c-478d-9d16-1aa6af073de0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 05:40:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/693a9993-bbda-435b-9ea7-4ca5372fa930')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671f8d3ecaebbaaa3f7af48b3f9a56b39cbe7b512d73fa7891374d76411f2cd765f94b","7ec9ff03e35461a53d000000"], [
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
  '6eb8f11d-ab99-43cd-9550-f4f87c66b6d7',
  'x-ms-client-request-id',
  '7adec433-a22f-4ef2-95db-8d9e1734ff1d',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  '238f2d8f-82d0-4e56-bbb3-a31db2eac931',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T054032Z:238f2d8f-82d0-4e56-bbb3-a31db2eac931',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 05:40:31 GMT'
]);
