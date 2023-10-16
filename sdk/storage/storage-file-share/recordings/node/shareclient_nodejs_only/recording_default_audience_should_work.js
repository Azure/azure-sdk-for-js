let nock = require('nock');

module.exports.hash = "77cd6051642b84b6573ef87191601828";

module.exports.testInfo = {"uniqueName":{"share":"share169717965873903881","dir":"dir169717965884602455"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965873903881')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:38 GMT',
  'ETag',
  '"0x8DBCBB84A93503B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc8271d-a01a-003b-67a1-fdd685000000',
  'x-ms-client-request-id',
  'facad95c-fdf5-44c6-80dc-b42a20177d87',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share169717965873903881/dir169717965884602455')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 13 Oct 2023 06:47:38 GMT',
  'ETag',
  '"0x8DBCBB84AA4759E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc8271f-a01a-003b-68a1-fdd685000000',
  'x-ms-client-request-id',
  '5ae00bf9-ec82-42b7-b58c-8d20d95851ad',
  'x-ms-version',
  '2023-11-03',
  'x-ms-file-change-time',
  '2023-10-13T06:47:38.9770142Z',
  'x-ms-file-last-write-time',
  '2023-10-13T06:47:38.9770142Z',
  'x-ms-file-creation-time',
  '2023-10-13T06:47:38.9770142Z',
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
  'Fri, 13 Oct 2023 06:47:38 GMT'
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
  'e41ea307-61f5-46f8-b5e4-3f3bda480700',
  'x-ms-ests-server',
  '2.1.16522.6 - KRSLR1 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-lUo9LoU_Cpo-YihUPULYBw' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgN4AATkRllChe5XJTIgtA0; expires=Sun, 12-Nov-2023 06:47:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPuWqKGHgyEFc2kFZ-dzIkkwQdRTHliSddPqRt4E6KyzTMNmfdcptTIT1_fahKCSLz-9Inasvmc7DnGUBhvece8s7LM6Mb5iIjCImrvA3ORFn7Apj7H5_-ez2y4Dmh-KNdcWxNguc8ryKJPZj20heolfaB_C6L1kvjGsz-QBATplQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:38 GMT',
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
  '593924ce-c021-4ad7-9112-05c1068c2800',
  'x-ms-ests-server',
  '2.1.16522.6 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aid0__UUpnpMpzJqSYg_uiY; expires=Sun, 12-Nov-2023 06:47:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPAQ4jSvR_vVDfnMZzahA0b037cpjruupF3MesgGt_zliQHnwKNKkI9wFe7VBrXKd_erx12DS_iK4eNYPl9hi6E0WIvsjc_odQS_qJBlnh6pp_6V8KZ2mXk9zfX3pSZm8YSf9hjSDG1B1y531zbOYeND9gBlZSOlj2m_1Mq6BDMTcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ad3da3c8-cb51-428b-8504-cdc90f759522&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '35b18625-83f1-430d-9b82-aabb8dd82a00',
  'x-ms-ests-server',
  '2.1.16522.6 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvavRGGssNZDmk8bgj_YNzLeeSdeAQAAAArfutwOAAAA; expires=Sun, 12-Nov-2023 06:47:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 06:47:39 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share169717965873903881')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [
  'Content-Length',
  '149',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82722-a01a-003b-6ba1-fdd685000000',
  'x-ms-client-request-id',
  '707ca345-3d3b-443b-b11e-9cc3c5ee3375',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share169717965873903881')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc82723-a01a-003b-6ca1-fdd685000000',
  'x-ms-client-request-id',
  'd28dab18-b0fa-4402-9db1-c451e7915dfe',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 06:47:39 GMT'
]);
