let nock = require('nock');

module.exports.hash = "02cc5a9c1e9d1cecd607fe4b07705abc";

module.exports.testInfo = {"uniqueName":{"container":"container164621150447604480","blob":"blob164621150457805243"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164621150447604480')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 02 Mar 2022 08:58:24 GMT',
  'ETag',
  '"0x8D9FC2ACF718F0A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9942e24a-701e-0072-3913-2ee3f6000000',
  'x-ms-client-request-id',
  'cb7629cd-8520-486a-86c7-2d2bcedaa301',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 02 Mar 2022 08:58:24 GMT'
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
  '657b79e3-0ffb-4947-83c6-901869880200',
  'x-ms-ests-server',
  '2.1.12507.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgjxG58TtKBJh4hcMZRLLYM; expires=Fri, 01-Apr-2022 08:58:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrH2mRmshzMrmhxf5KW-_hn1FpX0yOKpykKIqwIx75Os569FvYH0QfkdLOBIY9i8Ef0REM4-JZKKM6cmE9oa2p3FslaZKgfv-D6VTOAKcNo7yCdXnYVisAAtv7pqoiJA2IBDg3hzCFFN0t79PVTV37jdOVeSQUsCU_UWgeRLOU_1EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:23 GMT',
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
  '025da3a1-45ea-4d93-9272-69a5203b0400',
  'x-ms-ests-server',
  '2.1.12507.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AoVbpyjyRzBLkFviMt9rbq8; expires=Fri, 01-Apr-2022 08:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrd-Ar6BVD63oVm1k6jk1fVuVbEaz_RSRQxq4Loedv_ddqsBpWGZBcU3LfI7P-JH2cpCNIQXMA-wlsb39ocJivUPl-E9nK0jiHupAmB-_Ex6b4n5WfMV-9VEjVLaf4hOysswOiqt5htfdaT_yFmgs6ZgF-nvnrD8QZKtvvL7An6a4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fe350ba0-b4e1-4401-bdb9-bea9ea26e4fe&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '0218993d-c001-4a70-b6db-f9a0d41b0200',
  'x-ms-ests-server',
  '2.1.12507.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqPW_hSloDJAn5utZUp50LbVBVaYAQAAALAosdkOAAAA; expires=Fri, 01-Apr-2022 08:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:24 GMT',
  'Content-Length',
  '1325'
]);

nock('https://md-hdd-jxsm54fzq3jc.z8.blob.storage.azure.net:443', {"encodedQueryParams":true})
  .head('/wmkmgnjxxnjt/abcd')
  .query(true)
  .reply(401, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'InvalidAuthenticationInfo',
  'x-ms-request-id',
  'a1d1aca1-501e-008d-1013-2ec1f3000000',
  'x-ms-version',
  '2018-03-28',
  'WWW-Authenticate',
  'Bearer authorization_uri=https://login.microsoftonline.com/aaaaa/oauth2/authorize resource_id=https://disk.compute.azure.com/',
  'Date',
  'Wed, 02 Mar 2022 08:58:25 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0555246a-66cb-4fe5-b363-26fe1271e18e&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '086a45ec-b2d4-4d0a-9aff-7928335c0200',
  'x-ms-ests-server',
  '2.1.12507.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApFz04a4cBVGinh_IFH9nTvTsWZeAQAAALEosdkOAAAA; expires=Fri, 01-Apr-2022 08:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:24 GMT',
  'Content-Length',
  '1326'
]);

nock('https://md-hdd-jxsm54fzq3jc.z8.blob.storage.azure.net:443', {"encodedQueryParams":true})
  .head('/wmkmgnjxxnjt/abcd')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '1073742336',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:49:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBFA1FBB40CA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-creation-time',
  'Thu, 20 Jan 2022 09:49:16 GMT',
  'x-ms-lease-state',
  'available',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-request-id',
  '34c6ad6d-601e-00b9-4713-2ef23b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 02 Mar 2022 08:58:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164621150447604480')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9942e4c4-701e-0072-2913-2ee3f6000000',
  'x-ms-client-request-id',
  'ea3540b7-72ea-4b5f-ab23-7f43f676e638',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 02 Mar 2022 08:58:27 GMT'
]);
