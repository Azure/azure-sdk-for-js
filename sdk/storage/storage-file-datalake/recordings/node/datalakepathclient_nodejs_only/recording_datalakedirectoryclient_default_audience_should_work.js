let nock = require('nock');

module.exports.hash = "6890d0d44d37f3f904b3feb60a7c360a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169709395791407708","file":"file169709395803101245","directory":"directory169709395837803018"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169709395791407708')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'ETag',
  '"0x8DBCAF0C16C6598"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43f02ee3-301e-004d-23d9-fc2817000000',
  'x-ms-client-request-id',
  'ad076b68-a71a-4f4e-8065-77e7b5a93034',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169709395791407708/file169709395803101245')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Thu, 12 Oct 2023 06:59:19 GMT',
  'ETag',
  '"0x8DBCAF0C17F75DF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'aa5c2035-001f-0046-6bd9-fcd37c000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'fb41f116-22b0-4e4a-9b33-39f34a0e366e',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169709395791407708/file169709395803101245', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'aa5c2037-001f-0046-6dd9-fcd37c000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '025f4315-18b7-4d58-a7a4-fcb4a0004e9e',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169709395791407708/file169709395803101245')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Thu, 12 Oct 2023 06:59:19 GMT',
  'ETag',
  '"0x8DBCAF0C1A2A542"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'aa5c203a-001f-0046-70d9-fcd37c000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c0aefdda-c724-4354-998f-092cd6f0ef06',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169709395791407708/directory169709395837803018')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Thu, 12 Oct 2023 06:59:19 GMT',
  'ETag',
  '"0x8DBCAF0C1B38FE6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'aa5c203b-001f-0046-71d9-fcd37c000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '928f9003-a98d-4e82-ab45-f9145fc2d249',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'Content-Length',
  '0'
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
  '35b18625-83f1-430d-9b82-aabb82d01c00',
  'x-ms-ests-server',
  '2.1.16522.6 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlfhRDyPnnBKjnKdTZeG5Ds; expires=Sat, 11-Nov-2023 06:59:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEP8lbVHxt7eFq45zv95-oeGem00vNgjV0zxkZktjru6C3vCeumyDySYMcEQ5CCfPFs8J6oF87ekfnRQOMrICXRXrzMh44ndOkLn645-d3lX5v7JNjhpVMOdsJdT98f9g3bQVCeYkQtyWercEkutrdAS15924QClO2hu_5zzx89oSogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
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
  '6718ab0f-fe99-408d-b5a0-9d8113ca1300',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-6lmRL4-5Ho2o500VlZg2jQ' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjX3t9lM3FVKtEMQ6UNirjU; expires=Sat, 11-Nov-2023 06:59:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPgTrOu61IKbAlf-hApeVuUaOkUf5Mvt2X7MnqwnqHtsinVd3LTaRG-vk0usINZXlFLWzKXnOIUw0RvIQTbcwIodiqylbSOFM8RCxO65QOVyKeHOt1yY6set2U8-9hVmkSZXguVpdDDKWDBw2iltiK_mW-w-0LsnGBDj4gtLl_lhYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1acf8f60-6254-4946-a279-22bb87692a7b&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'fb5a9bd3-750d-4e22-8224-1086b1222300',
  'x-ms-ests-server',
  '2.1.16522.6 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-iFon4sS-Vcc_tLHcDy0gtw' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aju-EIOGcjBEoq73iOmwo9o; expires=Sat, 11-Nov-2023 06:59:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 06:59:18 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169709395791407708/directory169709395837803018')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Oct 2023 06:59:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DBCAF0C1B38FE6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43f03003-301e-004d-31d9-fc2817000000',
  'x-ms-client-request-id',
  '057830ff-9e6d-42ce-8acf-6333f60b0973',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Thu, 12 Oct 2023 06:59:19 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 12 Oct 2023 06:59:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169709395791407708')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43f0303d-301e-004d-67d9-fc2817000000',
  'x-ms-client-request-id',
  '5c474972-ce7d-4791-8c0f-37353b2aff4d',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 06:59:19 GMT'
]);
