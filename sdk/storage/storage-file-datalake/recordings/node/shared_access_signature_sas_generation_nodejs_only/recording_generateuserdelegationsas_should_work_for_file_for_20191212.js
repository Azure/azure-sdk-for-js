let nock = require('nock');

module.exports.hash = "0b07d2158d3dc30decd63a5cbc3f0ed9";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161964832127203368","file":"file161964832168904243"},"newDate":{"now":"2021-04-28T22:18:39.697Z","tmr":"2021-04-28T22:18:39.697Z"}}

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
  '53339ba8-b2f2-4a51-9c34-b4dce11a5601',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aki55n7gUERFtcZZb6H4Wqq_X3PmAwAAADLWG9gOAAAA; expires=Fri, 28-May-2021 22:18:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrA0lGfk8J5qI5s3DrZJh3baqTeFCHzCvBbff5tO9O7TSgOBn0FJL4UGzK1nFQVFY6CuGa-0PO8BhuqsfkqpkXJzlSy9O8sUbZdn5Q6RC-thDpeYpY4jrbjcY00sgY39ZQXRnbjm_YLezTDs0UHLnjHJrEHm6BxE2DUVvQhVkBcpMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:18:39 GMT',
  'Connection',
  'close'
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
  'a209898b-49cc-496f-8e6d-3c6737736901',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aki55n7gUERFtcZZb6H4Wqq_X3PmAwAAADLWG9gOAAAA; expires=Fri, 28-May-2021 22:18:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfkyT6ChnVy4Pg-PgWvQKTQcbreF0lbMJayUbr9l2yIdkI7WVrF5BCMryqpxOJJpYFpyFP0QadPY623md3NgHrtDDug_s7AtrBr0VrfFjrAw54k7im7h9VD5z9RAFhY0Tnkz9_p86l2SiP9C2jzfQ5Hrs7em8L7C2c2RUMhPyqlcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:18:39 GMT',
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
  '3c4fa9b7-e10e-4f56-8b20-05140b2f5501',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aki55n7gUERFtcZZb6H4Wqq_X3PmBAAAADLWG9gOAAAA; expires=Fri, 28-May-2021 22:18:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:18:40 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-04-28T21:18:39Z</Start><Expiry>2021-05-03T22:18:39Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-04-28T21:18:39Z</SignedStart><SignedExpiry>2021-05-03T22:18:39Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-06-12</SignedVersion><Value>LG+JU7QddAktbbmkPowD+ZLO/QPJEN876LdlJfwAiUI=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f99d647-601e-001b-137c-3c029c000000',
  'x-ms-client-request-id',
  '9d0c3c13-ff79-4c6d-9baf-8f94882140f4',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 22:18:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161964832127203368')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 22:18:41 GMT',
  'ETag',
  '"0x8D90A939468A66F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14366e28-001e-0050-317c-3cfecf000000',
  'x-ms-client-request-id',
  'ef339818-9894-4a80-bfa1-b47df35765a1',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 22:18:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161964832127203368/file161964832168904243')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 22:18:42 GMT',
  'ETag',
  '"0x8D90A9394B1884E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb2b9df5-001f-0022-6a7c-3cf980000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1a4add98-ad6b-4c0d-bea0-57ad0492aba7',
  'Date',
  'Wed, 28 Apr 2021 22:18:41 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem161964832127203368/file161964832168904243')
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
  'Wed, 28 Apr 2021 22:18:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D90A9394B1884E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0466d5b-a01e-0066-717c-3c73bf000000',
  'x-ms-client-request-id',
  '899907c0-4da0-4da7-8578-819467fa80d1',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Wed, 28 Apr 2021 22:18:42 GMT',
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
  'Wed, 28 Apr 2021 22:18:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161964832127203368')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a622a41-801e-0003-5b7c-3cddfb000000',
  'x-ms-client-request-id',
  '9b0646c4-ad06-471f-a918-ad7514b39ebe',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 22:18:42 GMT',
  'Connection',
  'close'
]);
