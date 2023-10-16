let nock = require('nock');

module.exports.hash = "d09c14572973f21f4f7cd0ba08b20089";

module.exports.testInfo = {"uniqueName":{"share":"share169717965622407664","dir":"dir169717965633504456","file":"file169717965644404863"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965622407664')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:36 GMT',
  'ETag',
  '"0x8DBCBB849139F24"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc8270d-a01a-003b-5aa1-fdd685000000',
  'x-ms-client-request-id',
  '7411f4d7-d624-4696-a302-b3fef4d2cb2c',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965622407664/dir169717965633504456')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:36 GMT',
  'ETag',
  '"0x8DBCBB849253C1B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc8270f-a01a-003b-5ba1-fdd685000000',
  'x-ms-client-request-id',
  '68f095dd-6401-4d94-9b85-4ca01667a212',
  'x-ms-version',
  '2023-11-03',
  'x-ms-file-change-time',
  '2023-10-13T06:47:36.4655131Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:36.4655131Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:36.4655131Z',
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
  'Fri, 13 Oct 2023 06:47:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965622407664/dir169717965633504456/file169717965644404863')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:36 GMT',
  'ETag',
  '"0x8DBCBB84935DB67"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82710-a01a-003b-5ca1-fdd685000000',
  'x-ms-client-request-id',
  '75a4defb-69ea-46ec-8131-83888af699ae',
  'x-ms-version',
  '2023-11-03',
  'x-ms-file-change-time',
  '2023-10-13T06:47:36.5744487Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:36.5744487Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:36.5744487Z',
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
  'Fri, 13 Oct 2023 06:47:36 GMT'
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
  '4441e1ad-16ea-43e6-9046-4d5d641d1500',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-smlmUvo0USMOLn2j8VP7DA' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ag0pNepzHI5HlEsc6IILv34; expires=Sun, 12-Nov-2023 06:47:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPEVRz_3tLBVH91aMrCbLs6JZ6EU-hrbOvUwoGsFGbHMCqiAhPzL5CbIvU0G9PdlfWKnvvVythLxjoKpXgFLzkCN74FRezeEAyEknVGMMfxHZI_3xle4cv78_1S_HjuKq75-nRZ2Kc8hBMoiJaKr_Ckfih3RC44ZWyfXUaYG7P5TkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:36 GMT',
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
  'fccd021d-0da7-428b-9d3a-2064e7112100',
  'x-ms-ests-server',
  '2.1.16522.6 - KRSLR1 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-r40EbYQ8MqQp8sP3_orQcg' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ai2vdYv93KZOo0FcLBAgNJU; expires=Sun, 12-Nov-2023 06:47:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPbPoQzWuVLVAF1gbDAZTR8zjO6UwZOqIGmrauTeRwg6QJjFntcTg4L-vAkvGeZ7BOM6i3N5N_xoKou39mgsybGjnFMpuACJD6IRiN6gWWbtzptQgmCIzlxjQcBXvusw19CJ21Qnu_VdaLQXvLbIxPtihEDB7hs5Dl9dsXJa-ZhYIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e2ef56fd-e19a-4e55-881b-36c3aadaeda3&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '3d94bd1f-86cc-4fb8-bbc6-c3cc18de2d00',
  'x-ms-ests-server',
  '2.1.16522.6 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlMz6Vvi0RtCqPmw_l-hk6CZhkDTAQAAAAjfutwOAAAA; expires=Sun, 12-Nov-2023 06:47:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:37 GMT',
  'Content-Length',
  '1337'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share169717965622407664/dir169717965633504456/file169717965644404863')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:36 GMT',
  'ETag',
  '"0x8DBCBB84935DB67"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82711-a01a-003b-5da1-fdd685000000',
  'x-ms-client-request-id',
  '6b80e635-9c76-48d6-9c81-2125b87a245a',
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
  '2023-10-13T06:47:36.5744487Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:36.5744487Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:36.5744487Z',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Fri, 13 Oct 2023 06:47:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share169717965622407664')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82712-a01a-003b-5ea1-fdd685000000',
  'x-ms-client-request-id',
  '8b8bbd74-c525-4664-ac70-b8c44961f9c2',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:37 GMT'
]);
