let nock = require('nock');

module.exports.hash = "4dd736c0146c2e8d3e14ef02e0b8fe19";

module.exports.testInfo = {"uniqueName":{"container":"container161963845452201911","blob":"blob161963845479005970"},"newDate":{"now":"2021-04-28T19:34:13.772Z","tmr":"2021-04-28T19:34:13.772Z"}}

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
  '7b0a47cc-4ecf-400b-8879-ac854c315100',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhfLrKtvT3hBlsUQMXlIVtK_X3PmAgAAALCvG9gOAAAA; expires=Fri, 28-May-2021 19:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO_eQHiHjGI94uucmsld1BK-EhrksGaXs70ZQkL1lozuSCr_44SxedmyYVhGpgBs2jz69DzDnDiawiVKrkppfoa9og5HXOdG-z19v7wwCDwGt99R46IrEKADOm1U7GelDt6ccMZs2x3trTD7FHNxImWd5f-aO16cYEzEQSMGQv6wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:34:13 GMT',
  'Connection',
  'close'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/aaaaa/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/aaaaa/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/aaaaa/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '693f0aeb-741a-4722-bbad-8f52519c9b00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhfLrKtvT3hBlsUQMXlIVtK_X3PmAgAAALCvG9gOAAAA; expires=Fri, 28-May-2021 19:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrV7WTIT2gOSaxhRdA_WDEnnH7yrS-9Tj_Njpb_Bkb4xHcHiTwjVspQpurVQX3-AvbeZrkPmwwu6swd6K7rFnLGrCjs2v1pHRBYWDDjL5j1jnNevb0VW7ZG2Wyz5XJXRN6Q27u8AlLQtRhKGrdd35bt1iM1Lv-oStVzH_NScfmwYcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:34:13 GMT',
  'Connection',
  'close'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=aaaaa")
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
  '8f122b91-ccf2-4335-b474-e1fed5d8f600',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhfLrKtvT3hBlsUQMXlIVtK_X3PmAgAAALCvG9gOAAAA; expires=Fri, 28-May-2021 19:34:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:34:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-04-28T18:34:13Z</Start><Expiry>2021-04-29T19:34:13Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-04-28T18:34:13Z</SignedStart><SignedExpiry>2021-04-29T19:34:13Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-06-12</SignedVersion><Value>EHdKPs9twB3Vzh4FR4PE5dPuHnfF0A7rRsWHIgO2G+Y=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9252ecd-601e-0072-3f65-3c02a5000000',
  'x-ms-client-request-id',
  'd4144dca-fb06-474d-98ef-376201a1f97d',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 19:34:13 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container161963845452201911')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'ETag',
  '"0x8D90A7C9B4E6BFE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e21039a4-f01e-00d6-2265-3c3841000000',
  'x-ms-client-request-id',
  '2fb631cc-c21b-4438-bde2-09c067fa4358',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 19:34:13 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container161963845452201911/blob161963845479005970')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'ETag',
  '"0x8D90A7C9B750C94"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93c69cdd-f01e-005e-3665-3c8098000000',
  'x-ms-client-request-id',
  '07a81887-fb02-4a04-9784-5447e5d69a8f',
  'x-ms-version',
  '2020-06-12',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container161963845452201911/blob161963845479005970')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D90A7C9B750C94"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '965d7908-e01e-004a-5e65-3c43fc000000',
  'x-ms-client-request-id',
  '5d1110f7-fc7e-4356-a02c-70a5b54dffec',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container161963845452201911')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b47b88a0-e01e-000e-1765-3c9f90000000',
  'x-ms-client-request-id',
  'f0166ba4-a2c8-46f0-80b6-712829c0ebf8',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 19:34:14 GMT',
  'Connection',
  'close'
]);
