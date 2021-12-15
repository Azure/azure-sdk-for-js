let nock = require('nock');

module.exports.hash = "821698cbbb790215d0aeedd506bf7f83";

module.exports.testInfo = {"uniqueName":{"container":"container163244943458701918","blob":"blob163244943489108567"},"newDate":{"now":"2021-09-24T02:10:30.326Z","tmr":"2021-09-24T02:10:31.397Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/aaaaa/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  'fa7c6a37-cd96-4a17-a41d-3a39d5200600',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjKfU4ElKm5CmKa3tKXwyws; expires=Sun, 24-Oct-2021 02:10:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr86qbCiY4MJg3w-GLp96mg5b01skbL6K97jNPBPsKyX9iIlkxXaoMHZKa1vutXOzio-3PhI3Q-2q_gKh8coU1rHz-n0D1YIZp67WZ-biJAT_-JagXRSgC5_tk3yTRL_UcIel-yM2JjOYBoAjHA4jmaigpbr2xIqIvjgR_zQDvpzEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 02:10:32 GMT'
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
  '287c3834-52aa-4874-b1fb-2865671f0600',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Agm_HUrNahJFlpTv-iYjDrs; expires=Sun, 24-Oct-2021 02:10:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0UDFCAEaTjgSK3m4bVeSJhffnDtNTMqhf9CpUNPcACyYz6qUHyUrTiu6gpKhBi_MkyRPhymfyMEjZbWSfvdwkFSuQxHVrfJtZFT0LBbn87NPPS0B-Md3wCEW4NMkWnGJ59JQ820_cGF8lCHzCHbQKXUvCxybtzoNg-PxWiuVVnYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 02:10:32 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0fe5ee39-1225-45d8-b2e1-a816ab2de654&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '072f33aa-b079-4e80-b445-c5dc002c0600',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak5T7z9d_LFJg0ifV1RuS7zeSEc1AQAAAJcq39gOAAAA; expires=Sun, 24-Oct-2021 02:10:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 02:10:32 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-09-24T01:10:30Z</Start><Expiry>2021-09-25T02:10:31Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>c4f48289-bb84-4086-b250-6f94a8f64cee</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-09-24T01:10:30Z</SignedStart><SignedExpiry>2021-09-25T02:10:31Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-12-06</SignedVersion><Value>lCJu4tNsTmTob1J1cTyWQtB4Gn+utHYCvLYzLAXPpyU=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd07a638-c01e-0059-70e9-b05d41000000',
  'x-ms-client-request-id',
  '466b3160-9d09-4b0d-b1bc-1288f49e95b7',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 02:10:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163244943458701918')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 02:10:34 GMT',
  'ETag',
  '"0x8D97F007E925A53"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd07a7d8-c01e-0059-49e9-b05d41000000',
  'x-ms-client-request-id',
  '18c9d219-3011-428c-88ca-11c3495c4913',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 02:10:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163244943458701918/blob163244943489108567')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 02:10:35 GMT',
  'ETag',
  '"0x8D97F007EBD0023"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd07a86f-c01e-0059-49e9-b05d41000000',
  'x-ms-client-request-id',
  'c2985def-187a-4949-ac53-7783442df7f9',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-24T02:10:35.2688942Z',
  'Date',
  'Fri, 24 Sep 2021 02:10:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163244943458701918/blob163244943489108567')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd07ae99-c01e-0059-64e9-b05d41000000',
  'x-ms-client-request-id',
  '73ee8fad-265c-445e-bf2b-6fd9905959f3',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 Sep 2021 02:10:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163244943458701918')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd07b082-c01e-0059-33e9-b05d41000000',
  'x-ms-client-request-id',
  '30f5a777-d4ba-471e-98d3-31ab4e27de62',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 02:10:38 GMT'
]);
