let nock = require('nock');

module.exports.hash = "ed864910be4f76a5d2ce8cb513e59521";

module.exports.testInfo = {"uniqueName":{"share":"share169717965509709543","dir":"dir169717965520801859","file":"file169717965531706926"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965509709543')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'ETag',
  '"0x8DBCBB84867C0D0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82705-a01a-003b-55a1-fdd685000000',
  'x-ms-client-request-id',
  '7d6314af-fae0-4d72-85e1-f67f9d88e35a',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965509709543/dir169717965520801859')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'ETag',
  '"0x8DBCBB848795EF0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82707-a01a-003b-56a1-fdd685000000',
  'x-ms-client-request-id',
  '81979fdb-f935-449c-bffa-63e4f0e7404f',
  'x-ms-version',
  '2023-11-03',
  'x-ms-file-change-time',
  '2023-10-13T06:47:35.3391856Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:35.3391856Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:35.3391856Z',
  'x-ms-file-permission-key',
  '9255856626508002348*16764736045797335973',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965509709543/dir169717965520801859/file169717965531706926')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'ETag',
  '"0x8DBCBB84889FE39"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82708-a01a-003b-57a1-fdd685000000',
  'x-ms-client-request-id',
  '24f8d9b4-1a7a-4372-ad64-29b4d01bdcdd',
  'x-ms-version',
  '2023-11-03',
  'x-ms-file-change-time',
  '2023-10-13T06:47:35.4481209Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:35.4481209Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:35.4481209Z',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/aaaaa/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '52078f1a-9f5b-4a6e-bf4b-7f9adb9d3000',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-EvD0OFf3nN-57stNcMe8Nw' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjtPrnb5igFDu4XIsELAwL0; expires=Sun, 12-Nov-2023 06:47:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPu1akgJMbvUtmXJCa18kf49DywbqqPCgOgbqrihqOrbzwgv4Fgftid1NGcS04IhvsE-4KD6pePcB-w4WzYeYRdq6GJolDO5aQQv1RKY0M3kGT_jdCvM4o91TFqwYnuzAksh_E5fIuNjyC0DuPNiYNA_hdZRino_ICJ0TA44IjeP4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/aaaaa/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/aaaaa/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/aaaaa/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/aaaaa/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '8507ac40-ed5a-4f82-b2f0-3001c9040b00',
  'x-ms-ests-server',
  '2.1.16522.6 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqCPuiE1VBZPq3oMi3SwwhI; expires=Sun, 12-Nov-2023 06:47:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPAdwHcVTmDzFCxDIWmzhrCO4JusOSV3I9i9Qil3RMBxPUoWJ3S18dzO0kuKpQv2522-UHM-W1adB4V7PiAlZpC3R7DgnTyF415q_0Sp7lSgn_HiVN0FnWqjODRp7b6C3ByGTn6GBFmwNoA_UxtfG2Trwxp09tLuiU2Zwd7qSzL50gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2b7f7d03-4314-414b-9d99-f653d5ab9171&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '52078f1a-9f5b-4a6e-bf4b-7f9ae19d3000',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-h1Aegn3tQk95xzIyqHDdjQ' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoEhJ_De63pMuKatSH28a8beeSdeAQAAAAffutwOAAAA; expires=Sun, 12-Nov-2023 06:47:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share169717965509709543/dir169717965520801859/file169717965531706926')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:35 GMT',
  'ETag',
  '"0x8DBCBB84889FE39"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc8270b-a01a-003b-58a1-fdd685000000',
  'x-ms-client-request-id',
  '78dc4932-8a1a-448a-bfda-f32d05590c26',
  'x-ms-version',
  '2023-11-03',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-10-13T06:47:35.4481209Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:35.4481209Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:35.4481209Z',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share169717965509709543')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc8270c-a01a-003b-59a1-fdd685000000',
  'x-ms-client-request-id',
  'a521a2f7-e778-4d8f-a3ff-230965ab49b8',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:35 GMT'
]);
