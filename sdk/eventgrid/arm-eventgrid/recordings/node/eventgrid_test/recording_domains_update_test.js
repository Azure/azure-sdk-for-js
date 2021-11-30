let nock = require('nock');

module.exports.hash = "0355e0761144ef4ee0d2fb3da24f08c8";

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
  '5bbba508-99e8-4683-b2bf-ca9c5c860300',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AgzHNNBJR8BNn6oVt0Cy5fc; expires=Thu, 16-Dec-2021 08:40:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBjLOGj7JIBClKE4OOD4PrFy46KifaQeUQcApMvWESGyOZgtGspuajDId5LamX7AzZ3V_xEZWpibEL_dtPCddLYJ38w4zvNvrqPsrJ2QMTTS_LVuqFKF2amRnU-U07U7Ko4Qrve04gRRfgKGu52gpsHPueOOzUZmY7dZS3ljay_sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:40:08 GMT',
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
  'f96763da-090c-48e0-95c9-d9c9c7c70300',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmOs9y3RrC5JjgCJbSm-xcU; expires=Thu, 16-Dec-2021 08:40:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvRW-_48_MtJtpacZRAhMyFUWEJf2AB_2uP5RrfTsIRrdz0mus0RFStgpVss2I4vOH8FjT9nFV99bbJqRPZJVGt_r5n0kfPpbqj7Ca5Rh37pj2eufmzgpQo6clY1qiWJ4dVYXhJ_4mrc0noRg1dxRcy-n5lnW69ja7HCTvhp8LnggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:40:08 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=45d6845f-408b-4e69-897d-b8f2b5e5e08b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2328ec7a-c17a-4e5d-a6ca-b98bb86a0300',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArnnSOAikM5JqHzRMpsfV5kWPr5BAQAAAGhlJdkOAAAA; expires=Thu, 16-Dec-2021 08:40:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:40:08 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains/mydomainxxx', {"tags":{"tag1":"value1","tag2":"value2"}})
  .query(true)
  .reply(201, {"properties":{"provisioningState":"Updating","endpoint":"https://mydomainxxx.eastus-1.eventgrid.azure.net/api/events","inputSchema":"EventGridSchema","metricResourceId":"f7989d29-7d25-4e59-8654-73f3883c7147","publicNetworkAccess":"Enabled"},"location":"eastus","tags":{"tag1":"value1","tag2":"value2"},"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains/mydomainxxx","name":"mydomainxxx","type":"Microsoft.EventGrid/domains"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '494',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Azure-AsyncOperation',
  'https://management.azure.com:443/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/FD0D1907-194A-4EAC-881C-AEEA6B6C58D8?api-version=2021-12-01',
  'x-ms-request-id',
  '9bd57676-5670-4961-8d38-97f43fbfb601',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  '2967d484-c636-4fae-9188-729554ba6897',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T084012Z:2967d484-c636-4fae-9188-729554ba6897',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:40:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/FD0D1907-194A-4EAC-881C-AEEA6B6C58D8')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04589e35edbab95badf25a3e79dd66f8e0d9d39da7bb0f771e6cef3edc3fdede3f3d3ed93e38d83dd93e3e3d3dfef4c9a727f70f9e1efc1ed9aad8bea43ee8bdcff676f676b777f7b677763f1a7db4cc16390dea7cb6333340b2edfd3c9b02c8743bcbf3ecd3c9a7d3fb07b3036add7097d4fef57a3acdf3593efbe8","97fc3f830ca72017010000"], [
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
  'c37ad8ca-80b1-445f-99b4-d5e3555d1e74',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-correlation-request-id',
  '0361a42d-7e14-4ae8-9da9-90a72269c15d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T084012Z:0361a42d-7e14-4ae8-9da9-90a72269c15d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:40:11 GMT'
]);
