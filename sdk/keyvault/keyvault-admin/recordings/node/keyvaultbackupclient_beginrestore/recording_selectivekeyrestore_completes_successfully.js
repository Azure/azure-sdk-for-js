let nock = require('nock');

module.exports.hash = "dadd4f138f2ceb9c756ed91d022cd789";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rsa1/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '1a106cae-6061-11ed-abe6-000d3acc6937',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '2a33f2ef-b467-49e3-9284-69be7e48e000',
  'x-ms-ests-server',
  '2.1.14059.12 - WUS2 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-aHHDf3AnoKjNRjcrQgmtAg' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnPzAyZKuppLt3L61BAJmcQ; expires=Fri, 09-Dec-2022 19:02:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFiTXHiN5N9nKHynF_eFh9dPcAeEzKLtZ1aXqqAr0tUQditRcDDtdOmdGC_XJ1o3DESW0im5ZwJvY3wVUuwWcYn9EM_xRoZOCJYE9PnGOxRVO46_c7Pz6C3p0OhOGIQn3GyKzw3jSRsSjQNl0-KzrJ7nCYTe0t8Ts5SPyyySwSg8V_1LU_ShqLqgxRVdHeTrPWU-OR2lpq_IDup5liM6XI4KY50PXJEzkGquJxMCZgcEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 19:02:48 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '3490f044-90b3-4705-aff6-a1335a706100',
  'x-ms-ests-server',
  '2.1.14059.12 - WUS2 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-w4QqFmCkPIlaWZ7tKwlz4g' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ArFZMMluTU1OvUCgR4bDpZ4; expires=Fri, 09-Dec-2022 19:02:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrREvDaRDfUK6UtF6wM94BnqhsRr_cv6QH8GjkYdkVbqF8GvjGwOjhUC5Fq3SRz-KQRdty4U6hWUzIN1D1Z9jPAUrfJDInzKGDJgBf7vBvcyCd4_k-sQUq9XEiVQyYB0nL8Ci4XhPRtumA29Uf5KUfVm8LW8HNXfpuF6RPlYrDxV8D72ig9ee9lnpZ-Ltm6HAT6Zf4GvrNKj6PIfxisEoFv-n_0oG2rqaP6mxEFmQniEUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 19:02:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f9f9a541-47b7-449f-b885-8e91064aaf1a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '3490f044-90b3-4705-aff6-a13360706100',
  'x-ms-ests-server',
  '2.1.14059.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-sjm3hCwrg1vP534b4lfgLw' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvOMkngfERlMntrsff8Z1HuY-eunAQAAAFjw_doOAAAA; expires=Fri, 09-Dec-2022 19:02:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 19:02:48 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rsa1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"attributes":{"created":1668020569,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1668020569},"key":{"e":"AQAB","key_ops":["wrapKey","decrypt","encrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/021959c666ac4cef814ae3547aa8543a","kty":"RSA-HSM","n":"qp7aVnWz3JZFQdjOw1UzSu4btnQnh6SxWprqmOQjEIoLKk6KUpZRGsfAbLKqaSwX8cuKwov7HnrfINLcV1CvM7yCQgM7UPLtQ4NClB2XvEPQ6kv6VNwYCDtkZYpL0LN6AQ728dqgcqBjzQ_toSbItYLovXqtszKiRKF9MuaEnBG6Du8_IAG6Mb2qkrJTvoc47zf6Z2HH2euVmEXFpI5FrVHUMf-OuPMmSv0bG615ilq__EPvXzb93AFJ60e8rBzCLKcwxujAZx332WVMp-bczixM0ANQimDdx0kBA-cClMqBufiyXu_LccjWtP1Ln1ij9YIWnGIQEmgj0oGBz6oRww"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '714',
  'x-ms-request-id',
  '1abc3c96-6061-11ed-abe6-000d3acc6937',
  'x-ms-keyvault-region',
  'australiacentral',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '396',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '1b156000-6061-11ed-abe6-000d3acc6937',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":null,"startTime":1668020571,"endTime":null,"jobId":"ebde1a9eacb74a1298d435fb4946b50d","azureStorageBlobContainerUri":null}, [
  'x-content-type-options',
  'nosniff',
  'cache-control',
  'no-cache',
  'server',
  'Kestrel',
  'date',
  'Wed, 09 Nov 2022 19:02:50 GMT',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/backup/ebde1a9eacb74a1298d435fb4946b50d/pending',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'retry-after',
  '10',
  'x-ms-request-id',
  '1b30af36-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '1447',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/ebde1a9eacb74a1298d435fb4946b50d/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"ebde1a9eacb74a1298d435fb4946b50d","startTime":1668020571,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:02:51 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '1c292904-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '524',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/ebde1a9eacb74a1298d435fb4946b50d/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"ebde1a9eacb74a1298d435fb4946b50d","startTime":1668020571,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:02:57 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '1f8fb284-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '516',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/ebde1a9eacb74a1298d435fb4946b50d/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-timovkeyvault2hsm-2022110919025126","endTime":1668020579,"error":null,"jobId":"ebde1a9eacb74a1298d435fb4946b50d","startTime":1668020571,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:03:03 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '22f508e8-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '503',
  'content-length',
  '276',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/rsa1')
  .query(true)
  .reply(200, {"attributes":{"created":1668020569,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1668020569},"deletedDate":1668020584,"key":{"e":"AQAB","key_ops":["wrapKey","encrypt","decrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/021959c666ac4cef814ae3547aa8543a","kty":"RSA-HSM","n":"qp7aVnWz3JZFQdjOw1UzSu4btnQnh6SxWprqmOQjEIoLKk6KUpZRGsfAbLKqaSwX8cuKwov7HnrfINLcV1CvM7yCQgM7UPLtQ4NClB2XvEPQ6kv6VNwYCDtkZYpL0LN6AQ728dqgcqBjzQ_toSbItYLovXqtszKiRKF9MuaEnBG6Du8_IAG6Mb2qkrJTvoc47zf6Z2HH2euVmEXFpI5FrVHUMf-OuPMmSv0bG615ilq__EPvXzb93AFJ60e8rBzCLKcwxujAZx332WVMp-bczixM0ANQimDdx0kBA-cClMqBufiyXu_LccjWtP1Ln1ij9YIWnGIQEmgj0oGBz6oRww"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/rsa1","scheduledPurgeDate":1668625384}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '850',
  'x-ms-request-id',
  '235cf85e-6061-11ed-abe6-000d3acc6937',
  'x-ms-keyvault-region',
  'australiacentral',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '223',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/rsa1')
  .query(true)
  .reply(200, {"attributes":{"created":1668020569,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1668020569},"deletedDate":1668020584,"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","encrypt","decrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/021959c666ac4cef814ae3547aa8543a","kty":"RSA-HSM","n":"qp7aVnWz3JZFQdjOw1UzSu4btnQnh6SxWprqmOQjEIoLKk6KUpZRGsfAbLKqaSwX8cuKwov7HnrfINLcV1CvM7yCQgM7UPLtQ4NClB2XvEPQ6kv6VNwYCDtkZYpL0LN6AQ728dqgcqBjzQ_toSbItYLovXqtszKiRKF9MuaEnBG6Du8_IAG6Mb2qkrJTvoc47zf6Z2HH2euVmEXFpI5FrVHUMf-OuPMmSv0bG615ilq__EPvXzb93AFJ60e8rBzCLKcwxujAZx332WVMp-bczixM0ANQimDdx0kBA-cClMqBufiyXu_LccjWtP1Ln1ij9YIWnGIQEmgj0oGBz6oRww"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/rsa1","scheduledPurgeDate":1668625384}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '2399e566-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'australiacentral',
  'content-length',
  '850',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '30'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/rsa1')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  '23b966b6-6061-11ed-abe6-000d3acc6937',
  'x-ms-keyvault-region',
  'australiacentral',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '106',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/rsa1/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"},"folder":"mhsm-timovkeyvault2hsm-2022110919025126"})
  .query(true)
  .reply(202, {"endTime":null,"error":null,"jobId":"7fdd87acdbec44fd82fe05fa39e1ecb0","startTime":1668020585,"status":"InProgress","statusDetails":null}, [
  'x-content-type-options',
  'nosniff',
  'cache-control',
  'no-cache',
  'server',
  'Kestrel',
  'date',
  'Wed, 09 Nov 2022 19:03:05 GMT',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/restore/7fdd87acdbec44fd82fe05fa39e1ecb0/pending',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'retry-after',
  '10',
  'x-ms-request-id',
  '23e4eac0-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '902',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/7fdd87acdbec44fd82fe05fa39e1ecb0/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"7fdd87acdbec44fd82fe05fa39e1ecb0","startTime":1668020585,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:03:05 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '2489af6a-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '735',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/7fdd87acdbec44fd82fe05fa39e1ecb0/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"7fdd87acdbec44fd82fe05fa39e1ecb0","startTime":1668020585,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:03:06 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '25151a8c-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '510',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/7fdd87acdbec44fd82fe05fa39e1ecb0/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"7fdd87acdbec44fd82fe05fa39e1ecb0","startTime":1668020585,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:03:07 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '257dfa52-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '489',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/7fdd87acdbec44fd82fe05fa39e1ecb0/pending')
  .query(true)
  .reply(200, {"endTime":1668020591,"error":null,"jobId":"7fdd87acdbec44fd82fe05fa39e1ecb0","startTime":1668020585,"status":"Succeeded","statusDetails":"Number of successful key versions restored: 2, Number of key versions could not overwrite: 0"}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 19:03:13 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'australiacentral',
  'x-ms-request-id',
  '28df3a94-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '502',
  'content-length',
  '233',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/rsa1/')
  .query(true)
  .reply(200, {"attributes":{"created":1668020569,"enabled":true,"exportable":false,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1668020569},"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","decrypt","encrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/021959c666ac4cef814ae3547aa8543a","kty":"RSA-HSM","n":"qp7aVnWz3JZFQdjOw1UzSu4btnQnh6SxWprqmOQjEIoLKk6KUpZRGsfAbLKqaSwX8cuKwov7HnrfINLcV1CvM7yCQgM7UPLtQ4NClB2XvEPQ6kv6VNwYCDtkZYpL0LN6AQ728dqgcqBjzQ_toSbItYLovXqtszKiRKF9MuaEnBG6Du8_IAG6Mb2qkrJTvoc47zf6Z2HH2euVmEXFpI5FrVHUMf-OuPMmSv0bG615ilq__EPvXzb93AFJ60e8rBzCLKcwxujAZx332WVMp-bczixM0ANQimDdx0kBA-cClMqBufiyXu_LccjWtP1Ln1ij9YIWnGIQEmgj0oGBz6oRww"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '2946dfd2-6061-11ed-abe6-000d3acc6937',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'australiacentral',
  'content-length',
  '714',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '16'
]);
