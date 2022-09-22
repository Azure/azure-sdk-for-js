let nock = require('nock');

module.exports.hash = "23a3372f1e71dcc72662733cb48a952a";

module.exports.testInfo = {"uniqueName":{"container":"container165899711555806885","blockblob":"blockblob165899711566107289","srcblob/%2+%2F":"srcblob/%2+%2F165899711566100957","newblockblob":"newblockblob165899711618409852"},"newDate":{"expiry":"2022-07-28T08:31:55.763Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711555806885')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:55 GMT',
  'ETag',
  '"0x8DA7073A16EDECC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56906b1d-201e-0032-775c-a2e4ce000000',
  'x-ms-client-request-id',
  'f9e6ce2a-2800-4c7e-8ef0-3b2959f4b89e',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:31:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711555806885/srcblob/%252%2B%252F165899711566100957', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:55 GMT',
  'ETag',
  '"0x8DA7073A1805095"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56906b31-201e-0032-065c-a2e4ce000000',
  'x-ms-client-request-id',
  'e78ba7b8-7b89-4afb-be90-dde33e455a71',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711555806885/blockblob165899711566107289', "HelloWorld")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:56 GMT',
  'ETag',
  '"0x8DA7073A18FDE96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56906b5b-201e-0032-1c5c-a2e4ce000000',
  'x-ms-client-request-id',
  '79611b56-d90c-43c3-8b35-8de76675fec5',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:55 GMT'
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
  'ac53e1e0-c44c-46f7-8bc1-1a5babae0400',
  'x-ms-ests-server',
  '2.1.13355.6 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoKsdJKgUKhHvgJsT__MzHU; expires=Sat, 27-Aug-2022 08:31:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3s-pZL8Rd63cthM47KXVXURfV4BsWj6_zC_Eywzv6ewbVpsC0g6W9IsqXSeaYz1rBIv1U0HXQOCHc_xdZzLNOklXtWcXRB2ZivZyI0LtUSpPMhElZmN2x0RgEGRmo1AHKf9SxUiLxlJqy0J-mCKWwb7OrPQ_E2om9LT3l4iyYwQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Jul 2022 08:31:56 GMT',
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
  'a940112a-8d69-4ff8-b453-b1b894913900',
  'x-ms-ests-server',
  '2.1.13355.6 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkZZ7chof9VOqHjB3C9r6xE; expires=Sat, 27-Aug-2022 08:31:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2etx5F-fU_70dJs5ewLo1cAtEBA3x53cY83JRBgMfnXATQ4DZV5WjLrWPsbzy-XpzQhQEK6TSprzF8yqR-Vi_nzbOY-kGkn0KkSOA5jKWIXSC6sj7__CBZCMC7sScLPI2rhs_dOo9FVp-0RuGDP5reEpcR2StEiJK4eGZbpogbggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Jul 2022 08:31:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.11.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6dca15f6-b884-440d-afe3-f2aff65910fc&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f36bfaba-1513-4030-bfff-39d2d7c03500',
  'x-ms-ests-server',
  '2.1.13355.6 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqNefW8GbE1BnQoK5xSBvrzeeSdeAQAAAHxAdNoOAAAA; expires=Sat, 27-Aug-2022 08:31:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Jul 2022 08:31:56 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711555806885/newblockblob165899711618409852')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:56 GMT',
  'ETag',
  '"0x8DA7073A1D25BA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56906bcd-201e-0032-045c-a2e4ce000000',
  'x-ms-client-request-id',
  '4153fe87-50c3-4f8c-b32a-4143c1075515',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899711555806885/newblockblob165899711618409852')
  .reply(200, "HelloWorld", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A1D25BA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56906bf4-201e-0032-245c-a2e4ce000000',
  'x-ms-client-request-id',
  'bed9d2ef-245e-4297-bcdb-5ee064e647b4',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:31:56 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:31:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899711555806885')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56906c1d-201e-0032-435c-a2e4ce000000',
  'x-ms-client-request-id',
  '613b7cd3-15e2-42b2-a9bb-4e493c615cc6',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:31:56 GMT'
]);
