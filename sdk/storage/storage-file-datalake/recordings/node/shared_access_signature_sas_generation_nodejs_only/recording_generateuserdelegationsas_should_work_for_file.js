let nock = require('nock');

module.exports.hash = "687c424a81d7038365e254ba266ae4d2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161964831813601853","file":"file161964831851006219"},"newDate":{"now":"2021-04-28T22:18:36.558Z","tmr":"2021-04-28T22:18:36.558Z"}}

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
  '08339e12-94be-46e9-98f6-dd00d3508a01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aki55n7gUERFtcZZb6H4Wqq_X3PmAgAAADLWG9gOAAAA; expires=Fri, 28-May-2021 22:18:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrz2gbk4Ci_EmC2Ok4y3G7tSHn2XMO6SzS2FELPmIwisi1QMqupotLBCL4AmTy5IVt-9xaZ46-FNgRmQjq89htnTVeevnWOGIUPIcgIwgHlDdcTjfDmJEKra5W4jPd3v1Zs7lPypAkEKBHywilDCjJnWXzhPHi-A1OlvQqpA6k8q0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:18:35 GMT',
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
  'e109dde3-b008-4052-b217-5ee8ea124a01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aki55n7gUERFtcZZb6H4Wqq_X3PmAgAAADLWG9gOAAAA; expires=Fri, 28-May-2021 22:18:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9JV_KOC5hx-zjo4zNQul948ujei45CuQKHWBQ0ZuhS7_wvxH5Eo6h4uC9G68wU2maBhuGbM56eXI1hFY-NRNybKJVv4gpy3AFFY7WoW6E2dR05Q054ZnOlNerMb8qKTzunhxONssN448_yRcXs97UWR3iiJMvUfVIjKcjashtrggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:18:36 GMT',
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
  'b73b4e45-8910-456c-bd3a-330dc19b3001',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aki55n7gUERFtcZZb6H4Wqq_X3PmAwAAADLWG9gOAAAA; expires=Fri, 28-May-2021 22:18:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:18:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-04-28T21:18:36Z</Start><Expiry>2021-05-03T22:18:36Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-04-28T21:18:36Z</SignedStart><SignedExpiry>2021-05-03T22:18:36Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-06-12</SignedVersion><Value>ZkZA7n6Q00rETZgrO251i6Wzh6uFAZmiEvlVvRs/2tM=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3fdf8a3a-101e-0001-177c-3c6343000000',
  'x-ms-client-request-id',
  '4668474d-e1bb-4aef-ae22-9dd14f2d14ed',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 22:18:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161964831813601853')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'ETag',
  '"0x8D90A9392846302"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '497933f7-b01e-00a1-107c-3ce7e2000000',
  'x-ms-client-request-id',
  '6bee2cae-3929-456c-8ff3-c516d730a182',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 22:18:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161964831813601853/file161964831851006219')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'ETag',
  '"0x8D90A9392BE078F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75ec06d1-d01f-000e-457c-3c152f000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9961794c-61d6-4c78-a0c6-cc4a228b5745',
  'Date',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem161964831813601853/file161964831851006219')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '0',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D90A9392BE078F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '707ab5e7-c01e-0060-507c-3c4000000000',
  'x-ms-client-request-id',
  '715ea514-ee92-4697-88ff-cd51fed33880',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Date',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161964831813601853')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbbe3cce-601e-000b-417c-3cc7f4000000',
  'x-ms-client-request-id',
  '337def02-f401-4025-be8b-8be9b543dc58',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 22:18:38 GMT',
  'Connection',
  'close'
]);
