let nock = require('nock');

module.exports.hash = "f82f54380418b82a6ac81567c6bbbfb8";

module.exports.testInfo = {"uniqueName":{"container":"container164137206786200163","blob":"blob164137206797300544","copiedblob":"copiedblob164137206808009282"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137206786200163')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'ETag',
  '"0x8D9D0271E5402FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34514d9b-e01e-0060-6e0f-029826000000',
  'x-ms-client-request-id',
  '236532e9-6014-4e56-8a54-dd3af52ef470',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Wed, 05 Jan 2022 08:41:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137206786200163/blob164137206797300544', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'ETag',
  '"0x8D9D0271E6484F4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34514dad-e01e-0060-7c0f-029826000000',
  'x-ms-client-request-id',
  '9f980a3d-b0a6-4b6f-aa07-93279430471e',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:41:07 GMT'
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
  'c7025f87-5230-4b1b-a3d3-5a8e09d68800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjcMgE3qV2pLvNbqcHzpJog; expires=Fri, 04-Feb-2022 08:41:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzmcRChYIeOZ-FVM1DK4kQi9i8a_tNLFXX9RLHNhNpbl-3ZKmJ8AOs2fa7_poOzjy5FjBnZ6XwzcijeilVkKqbz_iGdmd3brkzY1_wZHjNmbdTsgzY2ZTDwXLbrv0XxOyfdJFl_cMekmvNHlFMXsORUjIP2EAnh0J2gsimh5ys54gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:41:07 GMT',
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
  '308adc6f-5ac2-4a02-b79a-da3399897c00',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AufCJ5DXm1JAjtCRI-GnmGw; expires=Fri, 04-Feb-2022 08:41:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrR6g0Dyl2u3pDQLefqS8AGf4d1XUppOl3mJCdRE8BLGalZAl6JX-oqf4Wkz_Bgea5l4p4QmhUvholnuz1lxNaJXc3gJy0h2qICzemXIH6QK1snL7uNY4s-4wcMg00S8hmps8dZvb99O0pXXLalf6rCvGWgAVb-XRPlPCWs26SwccgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:41:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=42c90d3b-3373-4370-8f1c-92b6f5ca5d39&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c7025f87-5230-4b1b-a3d3-5a8e0dd68800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiBMziL_V_9MiMoCyQ1qtFY; expires=Fri, 04-Feb-2022 08:41:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:41:07 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137206786200163/copiedblob164137206808009282')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'ETag',
  '"0x8D9D0271EA85821"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34514dee-e01e-0060-330f-029826000000',
  'x-ms-client-request-id',
  '775cafca-723c-4d6f-8bf6-e2fe70e82830',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  '0dc27d2f-ad15-43b5-b331-9d8d1025bcf7',
  'x-ms-copy-status',
  'success',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:41:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164137206786200163/blob164137206797300544')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9D0271E6484F4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34514e2c-e01e-0060-6b0f-029826000000',
  'x-ms-client-request-id',
  '8b2c4e15-231c-4336-b281-4279f176a5ae',
  'x-ms-version',
  '2021-02-12',
  'x-ms-creation-time',
  'Wed, 05 Jan 2022 08:41:08 GMT',
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
  'Date',
  'Wed, 05 Jan 2022 08:41:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164137206786200163/copiedblob164137206808009282')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9D0271EA85821"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34514e4b-e01e-0060-040f-029826000000',
  'x-ms-client-request-id',
  'c3acbabc-7df7-4a0b-8fc1-de9d4e835097',
  'x-ms-version',
  '2021-02-12',
  'x-ms-creation-time',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '0dc27d2f-ad15-43b5-b331-9d8d1025bcf7',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container164137206786200163/blob164137206797300544',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Wed, 05 Jan 2022 08:41:08 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:41:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164137206786200163')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34514e56-e01e-0060-0c0f-029826000000',
  'x-ms-client-request-id',
  'e7d6e1b0-a5df-46c3-b48d-9583679b7249',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Wed, 05 Jan 2022 08:41:08 GMT'
]);
