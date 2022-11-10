let nock = require('nock');

module.exports.hash = "db277b0b8027b728abca1dced0dfb69d";

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
  'b6e619f2-605c-11ed-a993-0022488d4c2b',
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
  '62805b6e-f450-4bf2-9c6e-10c941f81101',
  'x-ms-ests-server',
  '2.1.14059.12 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Apm8Zl7aS8NAuPTh5Yzy3Zw; expires=Fri, 09-Dec-2022 18:31:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXZHCWZO9dZOt5ZBJWMqLHEQ2sgpGl9DZ4uwq8LGPbB3bHR-5L2iJ5JzDQLdrYVkTx3hWSqRUjgdaCj4sf_kSLyMHhnOP6_hoiH0SqqJ5N_0UiCYW8uvI2bLxwK5fCayeY6EhHTvNt0pb5_TvL3CgkfXxVnitVTSYK-5Sdcax_uITcQ3Sr77gDu2tSnzdyoPNz2FsPZAPv8uQYE9luI2j_1yj1FOqKg1FehJsW2aYVZMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:24 GMT',
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
  'c9c41efe-0a5a-4894-8e1a-bb425cbdc700',
  'x-ms-ests-server',
  '2.1.14059.12 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgekNZTBMeJHkSXLKuI52lc; expires=Fri, 09-Dec-2022 18:31:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEfkxJvwS7TGekVJsOg4wHK2iH08vvXC8Otg4lfIFxmzYBu7F0_Qws1DEgMdA9lOMDKlMdlCAms1zj6INAJFZPxemH2qdVZXB8pmjNebXQ7aJBU7gDMZ1zboclWaaLEgjyty_Oylt_6vWOmGHGrizPWz0wWw7Pq1MJ7_ayV6Leut9du5QZfd-BkxgIvwnXVq0L22bMMh_VsqzFdRCcFC80mFHm7VNM_jP_b-a7b8O7FcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=05eadafa-b21e-445a-8a2a-ffebf7b826f2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f9145f49-4ccf-482f-9288-003ab53b3600',
  'x-ms-ests-server',
  '2.1.14059.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-UBqc6qcn2zGukdE7roK8pg' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoFwm54XviJBs_oPG2aQfrAYD5OPAQAAAPvo_doOAAAA; expires=Fri, 09-Dec-2022 18:31:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 09 Nov 2022 18:31:24 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":null,"startTime":1668018684,"endTime":null,"jobId":"883343f7ac314a6d9be6859f2e83141a","azureStorageBlobContainerUri":null}, [
  'x-content-type-options',
  'nosniff',
  'cache-control',
  'no-cache',
  'server',
  'Kestrel',
  'date',
  'Wed, 09 Nov 2022 18:31:24 GMT',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/backup/883343f7ac314a6d9be6859f2e83141a/pending',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.76.222;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'northus',
  'retry-after',
  '10',
  'x-ms-request-id',
  'b72fced0-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '402',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/883343f7ac314a6d9be6859f2e83141a/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"883343f7ac314a6d9be6859f2e83141a","startTime":1668018684,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:24 GMT',
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
  'b776f936-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '224',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/883343f7ac314a6d9be6859f2e83141a/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"883343f7ac314a6d9be6859f2e83141a","startTime":1668018684,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:25 GMT',
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
  'b7a2d042-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '192',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/883343f7ac314a6d9be6859f2e83141a/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"883343f7ac314a6d9be6859f2e83141a","startTime":1668018684,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:25 GMT',
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
  'b7c9c04e-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '217',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/883343f7ac314a6d9be6859f2e83141a/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":null,"jobId":"883343f7ac314a6d9be6859f2e83141a","startTime":1668018684,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:30 GMT',
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
  'baf053be-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '263',
  'content-length',
  '174',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/883343f7ac314a6d9be6859f2e83141a/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-timovkeyvaulthsm-2022110918312474","endTime":1668018692,"error":null,"jobId":"883343f7ac314a6d9be6859f2e83141a","startTime":1668018684,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20221020-1-945ffe56-develop',
  'date',
  'Wed, 09 Nov 2022 18:31:36 GMT',
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
  'be1d8520-605c-11ed-a993-0022488d4c2b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-server-latency',
  '249',
  'content-length',
  '274',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);
