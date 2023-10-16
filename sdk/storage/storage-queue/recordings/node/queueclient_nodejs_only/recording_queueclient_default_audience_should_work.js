let nock = require('nock');

module.exports.hash = "03aaa4db7f94e82aa57412a35b9c9392";

module.exports.testInfo = {"uniqueName":{"queue":"queue169718100661906684"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue169718100661906684')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f24e3d9-8003-0013-3ea4-fdb72d000000',
  'x-ms-client-request-id',
  '9825ec59-74e8-491b-95c9-04b902971820',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 07:10:06 GMT'
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
  '6919e70c-adbf-4d71-be62-de85830c5c00',
  'x-ms-ests-server',
  '2.1.16522.6 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmdkVua8JXFIlIVF6Ukxos8; expires=Sun, 12-Nov-2023 07:10:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPj-nrqKc-EqqNY3WZMxzaJ6-i8fAqKnne5obnTs30FItURGCqe_ltyf6bAOsy4XOK1oQsYbFpYCUnUi_VwsyM9tJiE-MqGizoxH_pWcMxcri970f6bsv9LXrrW0uCtYq7JeMthoTi3NYe2ET1BzvN5yMAQ2kXUaV5SI27OmiMqUYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 07:10:07 GMT',
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
  '59464e40-62af-47f9-87a5-6fa131142200',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-Xa-CkB6-pf1zIz0K0Pi8hQ' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aqdu8zJrpgBKmwDKsnIXOLc; expires=Sun, 12-Nov-2023 07:10:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEP4ATI_HBHnh5PsIzKGJeH2Wf25VxwQ-oHDvxZt3sY-1JhWgx9SWC1ogDwAhGcSx1c4UIObsK7M6YxV5b7lA5xftgc-oiulbdoxcdPn0_E2CUI6gLQq-MBIsHZk2OXPtAL1QcQhCH661Wf4eYAUNvUiaIwsNqwIcizkyTF-2sfrFggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 07:10:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=81321278-973b-49b4-8f8d-6353f8fdad11&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '59464e40-62af-47f9-87a5-6fa139142200',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-5KiLUkHGVu1VkaRhpo17HQ' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjM-mTfUh-dBlppS65SeSwfeeSdeAQAAAE_kutwOAAAA; expires=Sun, 12-Nov-2023 07:10:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Oct 2023 07:10:07 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue169718100661906684')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f24e5e4-8003-0013-3ba4-fdb72d000000',
  'x-ms-client-request-id',
  '6b834dba-bc62-44d3-bcd0-ed74dcc214a2',
  'x-ms-version',
  '2023-11-03',
  'x-ms-approximate-messages-count',
  '0',
  'Date',
  'Fri, 13 Oct 2023 07:10:07 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue169718100661906684')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f24e624-8003-0013-7aa4-fdb72d000000',
  'x-ms-client-request-id',
  'abac89df-3788-4bb6-800c-0d20bc28db82',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Fri, 13 Oct 2023 07:10:07 GMT'
]);
