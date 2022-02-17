let nock = require('nock');

module.exports.hash = "5ef399ad1ff2a0a6fdb3cd058192f947";

module.exports.testInfo = {"uniqueName":{"container":"container164137102585209610","blob":"blob164137102662605404","blockblob":"blockblob164137102704907571"},"newDate":{"expiry":"2022-01-05T08:23:47.474Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137102585209610')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:23:46 GMT',
  'ETag',
  '"0x8D9D024B19DD11B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f740cb26-301e-0011-780d-027e0d000000',
  'x-ms-client-request-id',
  'e9123201-5101-4679-828d-0f71131575a5',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Wed, 05 Jan 2022 08:23:46 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137102585209610/blob164137102662605404')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:23:47 GMT',
  'ETag',
  '"0x8D9D024B1E2AA63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc4dde4b-001e-0057-230d-024a8a000000',
  'x-ms-client-request-id',
  '23eb907b-13ae-4194-b55e-a2cca5472526',
  'x-ms-version',
  '2021-02-12',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:23:46 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137102585209610/blockblob164137102704907571', "Hello World!")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:23:47 GMT',
  'ETag',
  '"0x8D9D024B2237A95"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cd3391-201e-0022-6d0d-0221a6000000',
  'x-ms-client-request-id',
  'a3e47448-0ab2-47e3-ab0e-ee66c9c6a1bb',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:23:47 GMT',
  'Connection',
  'close'
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
  '7777f699-653d-4eb0-b230-12e52b6a7b00',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiWt2YkXaqRCmDL2elVM7II; expires=Fri, 04-Feb-2022 08:23:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrat52nXxpE-Y8FWQfKPZ2TOaHBSytmKP5_oaeTXstev2PyLA4PtkutxSTYDbB0q8s6AaGK5PRBf_eJqn1txt_NIeLgy8Yj1meKfnGcPFKyYbk7wqqpsfKI_SRcV3qPLo4SdxY-ueNMABX8oHaaJ5ZyCJJ55UEvI3gSffzTMW1oMwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:23:47 GMT',
  'Connection',
  'close',
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
  'f9d8b77c-5495-4058-a16d-afddda3e8200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhvBSITgekBFgyR9b7kZORI; expires=Fri, 04-Feb-2022 08:23:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreQ-F9c64Kefc_LxkSJxa7StIWOw7m7MFUzRliJkhS1yLkyqYAxnI_LAFK-68ClQ55Oaa-bHT_8OEC7sZiIIj4Fbq573_U4XtBLeO2EXgmOdAUOKfx1sq500fJ1Jl-J4O_3HtoSk6bnJex5CrIZeNA8qb2uG-fJ4HHJabg-8rxRogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:23:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=aa183a45-2751-4071-b156-7d352edf81bf&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'eecc4b7d-edeb-42ed-9476-13653f577500',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=An8Y_MeLQX5MszevKvwDT1PeeSdeAQAAAJZMZ9kOAAAA; expires=Fri, 04-Feb-2022 08:23:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:23:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137102585209610/blob164137102662605404')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:23:50 GMT',
  'ETag',
  '"0x8D9D024B4240995"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c192e9aa-801e-0049-280d-02a652000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'cda97c44-6491-4031-9511-597121b5c75c',
  'Date',
  'Wed, 05 Jan 2022 08:23:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164137102585209610/blob164137102662605404')
  .reply(200, "Hello World!", [
  'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:23:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9D024B4240995"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9c6b15c2-101e-004b-0c0d-0218ea000000',
  'x-ms-client-request-id',
  '5d0b4802-9334-40a8-a8f5-caa462f1d1b8',
  'x-ms-version',
  '2021-02-12',
  'x-ms-creation-time',
  'Wed, 05 Jan 2022 08:23:47 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:23:50 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164137102585209610')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43a30130-d01e-0054-5c0d-02abee000000',
  'x-ms-client-request-id',
  'a0b6338c-5c22-4251-a13a-135e3aab58f9',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Wed, 05 Jan 2022 08:23:50 GMT',
  'Connection',
  'close'
]);
