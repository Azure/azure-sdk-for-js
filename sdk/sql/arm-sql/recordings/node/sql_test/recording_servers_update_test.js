let nock = require('nock');

module.exports.hash = "c50be1943c054735a3d93e469afdfd64";

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
  '93ef7e08-1935-4d62-bd81-4c49d9834100',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvakhazWDphIufJJPpl3cOY; expires=Thu, 30-Dec-2021 08:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlPlBmq_PELA-QZv03jldSWu8YY8cPu2plrQZ5B1JjA-rNdhTf9IB0MkYd5Ap-E57ZTl98O9wE-24Dr6nAYas6IUauRUokC_tWBInOBWTzSKfc7PpteZp1YVDXfa8Vp0YxIve8qONE0ew6dTZK6QRMsF7q0MLHUu7KCivNl2kEPIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:23 GMT',
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
  '23a0a219-e578-46a1-bb8e-ccef32634300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArbKJX4K1-BGjWurGgRT9-Y; expires=Thu, 30-Dec-2021 08:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2jW3y3QitcEogiXTR4wBleErUZ-QUvJYav2htKXvQtLVsG8juqQQ6iRG9hy-pzL9EafJvce95vojGyJM2fcZS7Crl2kOXRzJdkoGZLlzrez-kkSXixrNwqb3hvd3pOGVhCxyuF60hIpVxDPJ5Uv930vaXR4r-L8nSrSU78D5vuQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fbafe96a-519a-4b63-a070-90fb734e711a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '4db399e4-6594-4f67-8a89-15a74c0a4700',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AppMAbOSgb9Ph2ZJxM1FRowWPr5BAQAAAADaN9kOAAAA; expires=Thu, 30-Dec-2021 08:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:24 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/servers/myserverppp', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(202, {"operation":"UpsertLogicalServer","startTime":"2021-11-30T08:38:25.413Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '74',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/serverOperationResults/eb7e907a-17ea-496c-bbd4-3460db8799fb?api-version=2021-02-01-preview',
  'Retry-After',
  '0',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/serverAzureAsyncOperation/eb7e907a-17ea-496c-bbd4-3460db8799fb?api-version=2021-02-01-preview',
  'x-ms-request-id',
  'eb7e907a-17ea-496c-bbd4-3460db8799fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1193',
  'x-ms-correlation-request-id',
  '22c681c0-c542-446a-a84a-4589e2af9a67',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083825Z:22c681c0-c542-446a-a84a-4589e2af9a67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/serverAzureAsyncOperation/eb7e907a-17ea-496c-bbd4-3460db8799fb')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a37cf2207fb8f320dbde7d9067dbfb0f3f9d6e4f26b3fded7bfb9feecc26070f1e3e3c9f7c34faa869b376dd50fbb3e5cbbabaa8f3a6914febf64dc180f676f676b77777b7efedbcd9397874efe0d1defdf1feeebd9ffae8","97fc3f7c3aac866c000000"], [
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
  'Retry-After',
  '0',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'f5fca58e-07cf-412c-a3c8-07e946ea6a67',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11194',
  'x-ms-correlation-request-id',
  '67ceaf14-dea4-453b-a03c-db76188800d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083825Z:67ceaf14-dea4-453b-a03c-db76188800d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/serverAzureAsyncOperation/eb7e907a-17ea-496c-bbd4-3460db8799fb')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a37cf2207fb8f320dbde7d9067dbfb0f3f9d6e4f26b3fded7bfb9feecc26070f1e3e3c9f7c34faa869b376dd50fbb3e5cbbabaa8f3a6914febf64dc180f676f676b77777b7efedbcd9397874efe0d1defdf1feeebd9ffae8","97fc3f7c3aac866c000000"], [
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
  'Retry-After',
  '0',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'adf45087-bcd3-44c8-b884-62889486b00f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11193',
  'x-ms-correlation-request-id',
  'c0017102-c68f-4ab2-b50e-40976509b5e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083826Z:c0017102-c68f-4ab2-b50e-40976509b5e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/serverAzureAsyncOperation/eb7e907a-17ea-496c-bbd4-3460db8799fb')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a37cf2207fb8f320dbde7d9067dbfb0f3f9d6e4f26b3fded7bfb9feecc26070f1e3e3c9f7c34faa869b376dd50fbd7ebe934cf67f94c3eacdb3705c3d9dbd9dbdddeddddbeb7f366e7e0d1bd83477bf7c7fbbbf77eeaa35f","f2ff0059b8905a6b000000"], [
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
  'Retry-After',
  '0',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '268da8f3-be84-4635-bb81-69cafc5e7cd7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11192',
  'x-ms-correlation-request-id',
  'a024d350-81de-4367-a7d9-eda1d427fce9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083826Z:a024d350-81de-4367-a7d9-eda1d427fce9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/locations/eastus/serverOperationResults/eb7e907a-17ea-496c-bbd4-3460db8799fb')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1476f8be5eca3471f5deeee8d773e1a7db4aaab555eb745de7cf4e8177f94cd16c5b268da3a6babfa7975512ca9e96cbd585c97fcc7e8a3cbbc6e8a0a1f2b80a6cdda9cfe7c9567b36bfafb7c5d96d73fb1cecae2bcc8674fab45562c5f640b34595c37794d0056abd57896b5d9246bf2f115e1535d35e365ded2dbabbab82478a7cbd9aa2a96ed49b55ce6d3963a24f4bef7fd5f32faa8cd2ee8d75f8c9fbb04f2322bd7f9ee47f4458151dd6dd693665a172b7ee5eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb477893297c58c867bf78b625a574d75de8e5fffa2f2ae8c010de5371a0d21beccba43a40fdbeb153e8cbeffd1","2ff97f00f8f154c98c010000"], [
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
  '9d919ffb-f777-4f1c-884a-1fc3dac63a26',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11191',
  'x-ms-correlation-request-id',
  'f9e096b6-7912-4876-8b3d-fdae0a355d3c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083826Z:f9e096b6-7912-4876-8b3d-fdae0a355d3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:26 GMT'
]);
