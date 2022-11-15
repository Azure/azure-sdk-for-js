let nock = require('nock');

module.exports.hash = "4053a1b3dcc7bfcc29f4ceb6e7c94e7c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'be94ed9a-605c-11ed-a993-0022488d4c2b',
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
  '63317f2a-985d-434b-a193-2d574fd6c600',
  'x-ms-ests-server',
  '2.1.14059.12 - WUS2 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-vehquMMhEXQp-8OQ5q9hAw' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ar7OEZh5_hNPuxeSauxji_U; expires=Fri, 09-Dec-2022 18:31:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBloR9ueHwnFQ9Eo21amhBNGwyT4dl1D_wGNnI8mpPPe0qmuo9bFNrIQJg671rollkvwi3EnZ0WYgEIyvprze1JtfTbdvfsp3PnS66hcZR9DWbho-D8_9vSUH6lZAz-iyDS2W_5HMGXSkoFBq2NEP1E14oBi3A3F51RolfZXYu0MrQtQ0dzDV0evXunA2lsCIAfrg2MLUJY7IK0xp3XcYRzLqLFvdyDxMuYV2D8q07XYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:37 GMT',
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
  'a9e5d4d2-8636-401b-9183-e24bb780e900',
  'x-ms-ests-server',
  '2.1.14059.12 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avnaq4cBbJ1OkapZ7m6Lqis; expires=Fri, 09-Dec-2022 18:31:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNjxNDIdZHGBsDZiEPglDeBFoqKxYvtX6np-Aks71hsCOJd3wiX_ESe3sipudqyOZvGYbxzK3U5qmACFi5d9j7mvj_XHdCzenaulnN9LmSi2K7QT4s5fUj641XIJpAiqK5_-JNPAu0mE1o_E0BoIjv8r2uOcKn5khP0gemRseh29Jo4tgqSe_0TioCle7hVnHOJkKYajSTubMZHvJriGBUplhOiFnsskRL4B2SLgXR5ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d3ed40ec-9d0e-468a-972b-42eff3b4eb8d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'bfcec97e-f8c8-4585-a4fd-ffba16ab4c00',
  'x-ms-ests-server',
  '2.1.14059.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Apn49WKhyRVOqWJhxkuPtJs; expires=Fri, 09-Dec-2022 18:31:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:37 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":null,"startTime":1668018697,"endTime":null,"jobId":"ea8fe7ac2b9244f3bc33b6edebb617c6","azureStorageBlobContainerUri":null}, [
  'x-content-type-options',
  'nosniff',
  'cache-control',
  'no-cache',
  'server',
  'Kestrel',
  'date',
  'Wed, 09 Nov 2022 18:31:37 GMT',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/backup/ea8fe7ac2b9244f3bc33b6edebb617c6/pending',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'retry-after',
  '10',
  'x-ms-request-id',
  'beee786a-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '418',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/ea8fe7ac2b9244f3bc33b6edebb617c6/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"ea8fe7ac2b9244f3bc33b6edebb617c6","startTime":1668018697,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:37 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'bf37d456-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '185',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/ea8fe7ac2b9244f3bc33b6edebb617c6/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"ea8fe7ac2b9244f3bc33b6edebb617c6","startTime":1668018697,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:43 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'c258cb4a-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '321',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/ea8fe7ac2b9244f3bc33b6edebb617c6/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-timovkeyvaulthsm-2022110918313775","endTime":1668018705,"error":null,"jobId":"ea8fe7ac2b9244f3bc33b6edebb617c6","startTime":1668018697,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:48 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'c58f2de0-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '216',
  'content-length',
  '274',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"},"folderToRestore":"mhsm-timovkeyvaulthsm-2022110918313775"})
  .query(true)
  .reply(202, {"endTime":null,"error":null,"jobId":"473e0ae999ef405d9c947e90aa1cd7cf","startTime":1668018709,"status":"InProgress","statusDetails":null}, [
  'x-content-type-options',
  'nosniff',
  'cache-control',
  'no-cache',
  'server',
  'Kestrel',
  'date',
  'Wed, 09 Nov 2022 18:31:49 GMT',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/restore/473e0ae999ef405d9c947e90aa1cd7cf/pending',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'retry-after',
  '10',
  'x-ms-request-id',
  'c5b9bbaa-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '562',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/473e0ae999ef405d9c947e90aa1cd7cf/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"473e0ae999ef405d9c947e90aa1cd7cf","startTime":1668018709,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:48 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'c618fcb4-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '225',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/473e0ae999ef405d9c947e90aa1cd7cf/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"473e0ae999ef405d9c947e90aa1cd7cf","startTime":1668018709,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:49 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'c644c20e-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '229',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/473e0ae999ef405d9c947e90aa1cd7cf/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"473e0ae999ef405d9c947e90aa1cd7cf","startTime":1668018709,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:50 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'c6711480-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '270',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/473e0ae999ef405d9c947e90aa1cd7cf/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":null,"jobId":"473e0ae999ef405d9c947e90aa1cd7cf","startTime":1668018709,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:54 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'c99f25ac-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '261',
  'content-length',
  '138',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/473e0ae999ef405d9c947e90aa1cd7cf/pending')
  .query(true)
  .reply(200, {"endTime":1668018720,"error":null,"jobId":"473e0ae999ef405d9c947e90aa1cd7cf","startTime":1668018709,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:32:01 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'x-ms-request-id',
  'cccc6672-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '498',
  'content-length',
  '143',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);
