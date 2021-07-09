let nock = require('nock');

module.exports.hash = "9bcada1e1c90bd5e6d1bdb8e5fa637b4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161965113979506299","directory":"directory161965114021304942","file":"file161965114061909255"},"newDate":{"now":"2021-04-28T23:05:38.224Z","tmr":"2021-04-28T23:05:38.224Z"}}

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
  'f44f53de-7243-435f-9f26-632d7b65c601',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAgAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7SX9Yw1QLjszurj5vfKUgoVG_vQcyptbGSBacRlicNVwnRVtnE6ugUdsPUaAmAsjuDrgy1A3zP73qMG9lOtnCDFIh6lmBGQJ-J60w9N_gazPO2kKpDL0SoVYT_iaAl4PLuEWLFOR1wYu8xyrSoIVW6tKO6nUaZ7vJNlC_SyAV-MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/aaaaa/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/aaaaa/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/aaaaa/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '9f7cb147-7ef3-4623-bc36-20bff4300000',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAgAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre7uhQCI0jrCTHMr9hpA4vYnrKvUgETaxeROrkAHMwMtBM_Dz99Ge53DOuGh8fXVS8VXulp6KIRUpAWtlL88p-HjSG7hBxnEmK478n6X_ZgUHfrI4DD5AW2_QXxCgOZiD4mZnGTEvGLHtJONT0Q0GMIm0LbWsq_51pS20aG2sR6AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
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
  'Content-Length',
  '1318',
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
  '994a4f53-34f0-4bb8-bdfa-bd511b522e00',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAwAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:38 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-04-28T22:05:38Z</Start><Expiry>2021-05-03T23:05:38Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-04-28T22:05:38Z</SignedStart><SignedExpiry>2021-05-03T23:05:38Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-06-12</SignedVersion><Value>vJeavCQFdaHTyHscnOtGw18u3ov4cazKnsFHFF/noyw=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '553aa842-201e-0057-5c83-3c92ac000000',
  'x-ms-client-request-id',
  'e1e19d29-fc5a-4356-8d44-db6b354ae0fb',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:38 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113979506299')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:40 GMT',
  'ETag',
  '"0x8D90A9A246307AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cfa677f3-301e-0064-3f83-3ccd07000000',
  'x-ms-client-request-id',
  '1f852cf0-36b7-4c20-ba18-cb14e4a563ac',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113979506299/directory161965114021304942')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:40 GMT',
  'ETag',
  '"0x8D90A9A24A31493"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb2d54eb-001f-0022-6983-3cf980000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'd822a4b3-a1c6-4d34-9197-56ee9076bfba',
  'Date',
  'Wed, 28 Apr 2021 23:05:40 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113979506299/directory161965114021304942/file161965114061909255')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:40 GMT',
  'ETag',
  '"0x8D90A9A24E01A4E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c396016f-101f-0087-1483-3caffa000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '3c7ec327-b8c3-411f-89d9-e4ad4b97b767',
  'Date',
  'Wed, 28 Apr 2021 23:05:40 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem161965113979506299')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"132641247405544595","etag":"0x8D90A9A24A31493","group":"9f80ecb0-219f-4482-8cdb-b4bb735994ef","isDirectory":"true","lastModified":"Wed, 28 Apr 2021 23:05:40 GMT","name":"directory161965114021304942","owner":"9f80ecb0-219f-4482-8cdb-b4bb735994ef","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b50c434-901f-000f-0883-3c4af3000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '3ef46933-c59f-4bda-a186-58e3d1e62770',
  'Date',
  'Wed, 28 Apr 2021 23:05:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161965113979506299')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76a39277-d01e-0088-7a83-3cd996000000',
  'x-ms-client-request-id',
  '6b6b0734-4430-4ce5-81fa-92fedcf5e414',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:41 GMT',
  'Connection',
  'close'
]);
