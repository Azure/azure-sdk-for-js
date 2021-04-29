let nock = require('nock');

module.exports.hash = "ec7250376254b30662e6700356e3a84f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  '7ae68d36-a868-11eb-bf44-000d3a230d40',
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
  '0e704a0f-6151-42ae-8b87-d402fd133202',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6Uw4AAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:27:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsMBUUNRFjk2jhRWyPZe6NkiUgTDniudxkgB5uYHLibWoD9DsmxHz_OiHSJpxyYW6HFPi-90wNFM2O05oMcIz3J0B04sC9u0cw7iadh3G3XQ5TuYhjrc9EtqJ719Pl3hQrqMhZqTfKQRbo5hC2n02-b1JZYFKKlRaK4-LXrpegFggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:27:05 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  'd398971b-bb3f-48fb-a127-957b7f2c4101',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6Uw4AAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:27:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr38Fk-RFiVh4oOXw46U9jyoR7pPJqhGtt4w7Z_r-W38F_qlQQEUrRNPnVdGYfjOogXduVwyvQ_c2ATOXPX_qbssHS7a4A-gFmllxMbhcrVGwHfn415qULv_KCp7vl_WPv-2Z2UXrqAuNrYQKro7x0WKnsdVl9eONy--G5vx-Jz9EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:27:05 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '90904e39-7df4-4f2e-ae2b-9e7117b86501',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAgAAABvKG9gOAAAA4BL6Uw4AAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:27:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:27:05 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"AES","key_size":256,"attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1619645226,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619645226},"key":{"key_ops":["wrapKey","unwrapKey","decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '361',
  'x-ms-request-id',
  '7b1ce6ec-a868-11eb-bf44-000d3a230d40',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '183',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a')
  .query(true)
  .reply(401, "OK", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '2',
  'x-ms-request-id',
  '7b46e1d6-a868-11eb-bf44-000d3a230d40',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '0'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a')
  .query(true)
  .reply(200, {"attributes":{"created":1619645226,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619645226},"key":{"key_ops":["wrapKey","unwrapKey","encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a","kty":"oct-HSM"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '7b54ccec-a868-11eb-bf44-000d3a230d40',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '361',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '57'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a/encrypt', {"alg":"A256GCM","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1HQ00"})
  .query(true)
  .reply(200, {"alg":"A256GCM","iv":"JBps4gx-Uniz-1xx","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a","tag":"hacQmm-u4D1uD0Tsx9N45Q","value":"JyKGVMHUMuJeGeiuMYI7AVqgpxA0kwyn80FjH8kpoQ4X62U"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '260',
  'x-ms-request-id',
  '7b6c85d0-a868-11eb-bf44-000d3a230d40',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a/decrypt', {"alg":"A256GCM","value":"JyKGVMHUMuJeGeiuMYI7AVqgpxA0kwyn80FjH8kpoQ4X62U","iv":"JBps4gx-Uniz-1xx","tag":"hacQmm-u4D1uD0Tsx9N45Q"})
  .query(true)
  .reply(200, {"alg":"A256GCM","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1HQ00"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '205',
  'x-ms-request-id',
  '7b7c1e32-a868-11eb-bf44-000d3a230d40',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"attributes":{"created":1619645226,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619645226},"deletedDate":1619645226,"key":{"key_ops":["unwrapKey","wrapKey","decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test","scheduledPurgeDate":1627421226}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '529',
  'x-ms-request-id',
  '7b8a9d04-a868-11eb-bf44-000d3a230d40',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '84',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"attributes":{"created":1619645226,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619645226},"deletedDate":1619645226,"key":{"key_ops":["encrypt","decrypt","unwrapKey","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/74a30a1dd5304d3e1303f218a87a8c6a","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test","scheduledPurgeDate":1627421226}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '7ba548f2-a868-11eb-bf44-000d3a230d40',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '529',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '30'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  '7bb8f08c-a868-11eb-bf44-000d3a230d40',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '118',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
