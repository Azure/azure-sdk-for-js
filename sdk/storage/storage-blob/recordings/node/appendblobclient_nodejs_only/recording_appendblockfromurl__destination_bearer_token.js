let nock = require('nock');

module.exports.hash = "b8bb89eb634bf9d1baac4c8a8b6b45f0";

module.exports.testInfo = {"uniqueName":{"container":"container164137186922701425","blob":"blob164137186989905397","blockblob":"blockblob164137187001202124"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137186922701425')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:37:49 GMT',
  'ETag',
  '"0x8D9D026A83F74E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ba5dec8-901e-0045-640f-02315a000000',
  'x-ms-client-request-id',
  '07ae771d-930c-42e0-93ac-54e21ee36628',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Wed, 05 Jan 2022 08:37:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137186922701425/blob164137186989905397')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:37:50 GMT',
  'ETag',
  '"0x8D9D026A85519C1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ba5deff-901e-0045-170f-02315a000000',
  'x-ms-client-request-id',
  'fc1a45b4-bff9-472f-a748-adccee618c46',
  'x-ms-version',
  '2021-02-12',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:37:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137186922701425/blockblob164137187001202124', "Hello World!")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:37:50 GMT',
  'ETag',
  '"0x8D9D026A865E035"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ba5df0a-901e-0045-1f0f-02315a000000',
  'x-ms-client-request-id',
  '27c8bf85-3f49-448b-aa84-1af225f29c5c',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 05 Jan 2022 08:37:49 GMT'
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
  'af698745-0a52-46a4-b823-0851e5180500',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApfdFxqsbYZKlYQGS1vD5Ik; expires=Fri, 04-Feb-2022 08:37:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWUSGmSahDbF_cUChgDg7nHFLf7prP1_LNUa3DRDFtXG1TYGeRdiaBFxJd23zvp_kwym_M4Z-47sPpGjbAFeXvbb_Ycu8WgnJ5rsJ3Nvhpk820ZTvQhMizh0XvHABEVt0rFSe7L6EuDmSar-BJAViT1z50A28Xqa6SHRP-FVKpdUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:37:50 GMT',
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
  '96a016c5-541f-49ed-980f-cd1ab0538c00',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApOsbcUZ2CVPnwAlDTQIgJ4; expires=Fri, 04-Feb-2022 08:37:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzUaNm-5qrvQpKNc-ryZ83MDgRRGuK7zY3Q7alnn_esHXmVJGGsG9mY8caQcBFZY2S1X7F86fF2PEZObLBsHvXe6ebnLCG3bst3xoPeN1k9MRDkvNe4jguqLq1iZy4ab2ZPwyOO0p5JTESTiourrGCHIUBKZi6Q95L2qUCLmZEBUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:37:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=faa6d145-436c-42bc-9dbb-5f5e0d35a39a&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'af698745-0a52-46a4-b823-0851e6180500',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlDETyFj4ctJq2YdvUZjYv3eeSdeAQAAAN5PZ9kOAAAA; expires=Fri, 04-Feb-2022 08:37:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 05 Jan 2022 08:37:50 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164137186922701425/blob164137186989905397')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:37:51 GMT',
  'ETag',
  '"0x8D9D026A8EED289"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0ba5df89-901e-0045-040f-02315a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '321e365b-bc82-4779-a4f6-cf0c9adaff9c',
  'Date',
  'Wed, 05 Jan 2022 08:37:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164137186922701425/blob164137186989905397')
  .reply(200, "Hello World!", [
  'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 05 Jan 2022 08:37:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9D026A8EED289"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ba5dfdd-901e-0045-4a0f-02315a000000',
  'x-ms-client-request-id',
  '8b4e6932-72e8-4e71-8ab0-dd5c8bbdbf56',
  'x-ms-version',
  '2021-02-12',
  'x-ms-creation-time',
  'Wed, 05 Jan 2022 08:37:50 GMT',
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
  'Wed, 05 Jan 2022 08:37:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164137186922701425')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ba5dff5-901e-0045-5b0f-02315a000000',
  'x-ms-client-request-id',
  'eb4be549-9ef4-48b9-a0a9-031f91e4b083',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Wed, 05 Jan 2022 08:37:50 GMT'
]);
