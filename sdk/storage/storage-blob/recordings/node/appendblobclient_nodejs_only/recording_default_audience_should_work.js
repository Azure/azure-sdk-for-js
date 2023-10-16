let nock = require('nock');

module.exports.hash = "9dbfdeaebb563bef6b12e1a7201b3644";

module.exports.testInfo = {"uniqueName":{"container":"container169708257775407657","blob":"blob169708257843106749"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169708257775407657')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:39 GMT',
  'ETag',
  '"0x8DBCAD6429A4DA7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a26de1-f01e-0036-25bf-fc1e51000000',
  'x-ms-client-request-id',
  '00f0925c-6c39-49b6-becf-c34a4cfcd11a',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 03:49:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169708257775407657/blob169708257843106749')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:39 GMT',
  'ETag',
  '"0x8DBCAD642AFA2FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a26e4d-f01e-0036-0cbf-fc1e51000000',
  'x-ms-client-request-id',
  '730ad1e1-346f-420a-9713-d52a943c5b34',
  'x-ms-version',
  '2023-08-03',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2023-10-12T03:49:39.3686015Z',
  'Date',
  'Thu, 12 Oct 2023 03:49:38 GMT'
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
  'fa698571-3a4d-43ac-8b45-cc95bb617700',
  'x-ms-ests-server',
  '2.1.16522.6 - KRSLR1 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-S8XeSzTO-zPd8f-RT9bk4g' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvsyPIR0ZCJMuLqbw5tmxt0; expires=Sat, 11-Nov-2023 03:49:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPG1t6QhXwxw67oLVzrWFOvbm-ouxmWz-1qrfogaNjurlaB-DZYGsrYjYYo3bpH-8VS9g_TD9Ifk3yghcExnJ-O5VvAWs4mjDHyNyT0JvpZyhp_106PBiaE6asgbu_hIgRBZNIyhlP9HnyKLmhp6Fj-HLAbUnOY49C8qaiBOfJZTcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:39 GMT',
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
  '49e7c5ab-9f74-4bfa-b280-f346ea330e00',
  'x-ms-ests-server',
  '2.1.16522.6 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgJMxZjS6BxHg39NGnlV2SQ; expires=Sat, 11-Nov-2023 03:49:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPRSs5fAq4jFZpjK6mG7TlpTwysjs6Tst7O58dURzeXKKMH6Uo-6Ye_o3AnkeRcCcYAq_RtovJ3VQLcIuoWBPYCt_3OVjDwoKE0YQLej37ljW84ACxUJPeeMGaxjMZ2vdww4TLWSem5bKkGwKf6MFvrESRHv_h9HxqVNltemBfoAUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f8a14b58-e9df-45fc-8cd7-7b5166f79ba1&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'ff6bc074-d15d-45fb-8470-4a951beb1d00',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-B0GAmdF4_NjREB78eHMTJg' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkqQu507akxBi0WveNyJiW_eeSdeAQAAANNjudwOAAAA; expires=Sat, 11-Nov-2023 03:49:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:39 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container169708257775407657/blob169708257843106749')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:39 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DBCAD642AFA2FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a270ca-f01e-0036-75bf-fc1e51000000',
  'x-ms-client-request-id',
  '09541ab8-3062-4b25-b42a-cf2573218290',
  'x-ms-version',
  '2023-08-03',
  'x-ms-version-id',
  '2023-10-12T03:49:39.3686015Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 12 Oct 2023 03:49:39 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 12 Oct 2023 03:49:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container169708257775407657')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a27143-f01e-0036-6cbf-fc1e51000000',
  'x-ms-client-request-id',
  'ca3f10b6-56af-4108-a82b-47992f0232f3',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 03:49:39 GMT'
]);
