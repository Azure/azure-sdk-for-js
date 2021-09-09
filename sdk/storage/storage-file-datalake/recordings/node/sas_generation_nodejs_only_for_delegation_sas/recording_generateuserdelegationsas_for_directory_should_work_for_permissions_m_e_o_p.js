let nock = require('nock');

module.exports.hash = "eed9fe71278951b4c6b8383c48d8a938";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161965112886606425","directory":"directory161965112932508907","file":"file161965112986606725"},"newDate":{"now":"2021-04-28T23:05:26.584Z","tmr":"2021-04-28T23:05:26.585Z"}}

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
  '31846cdc-2f72-43cf-b8e3-a64690390000',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0Q; expires=Fri, 28-May-2021 23:05:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2I9vepkm0hRIb0TotvqIDa0YitypA-EBSVynOrqwbqJ6dZHRVJ-z89fu3G1_BHpT4VyJcjRAS5uKieO9n7-yUlV8MtGhgmGFBHh436BucFYaxHbPAK9HiQOAgYvC8BD51YGP9WohJui5c44I5RgKGJ2LP_S7Oar1wY8BQhAK7KcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:26 GMT',
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
  'ac02763c-09d9-45af-8ea3-b197912f0000',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0Q; expires=Fri, 28-May-2021 23:05:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLT7jnlKc17cWbSQansNf5QnkcaW64PITIk4HlY-wKvfyTYFAoLA6GYy8RguXVsFadNqKPCx1__oUFFnrL_s_z11T62pHnOg-GVIgX-3gH_q_DIxrP_o0hgTCfydNbkXyJDVeRpk8_HTFG4whP3hOjNpYzWIJTWSmdRnmz6-J9AMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:26 GMT',
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
  '5a3de89d-ddb5-4bb3-a417-1cae742c0000',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAQAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-04-28T22:05:26Z</Start><Expiry>2021-05-03T23:05:26Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-04-28T22:05:26Z</SignedStart><SignedExpiry>2021-05-03T23:05:26Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-06-12</SignedVersion><Value>BOzwc+hHXM8el5R0npatD9mFh7WrGEaAF/ToHIb2kCs=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e53864d7-e01e-0077-5282-3ce90b000000',
  'x-ms-client-request-id',
  '30572560-94a6-4d32-af8a-bd53a33f12db',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:28 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965112886606425')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:29 GMT',
  'ETag',
  '"0x8D90A9A1DE4AC2A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06c35367-801e-0071-1c82-3cdab4000000',
  'x-ms-client-request-id',
  '47835a74-776a-4267-87c9-c1d9fc4fe9d6',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:28 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965112886606425/directory161965112932508907')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:29 GMT',
  'ETag',
  '"0x8D90A9A1E39D5E6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3dec61c7-301f-0080-5382-3cc399000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'd86d52e9-b44b-4ecf-9579-82b2cf812d9f',
  'Date',
  'Wed, 28 Apr 2021 23:05:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965112886606425/directory161965112932508907/file161965112986606725')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:30 GMT',
  'ETag',
  '"0x8D90A9A1E7D269B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b1b78ad-401f-001c-6682-3c6eff000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '79de5688-db38-4f70-8144-293b52a573a6',
  'Date',
  'Wed, 28 Apr 2021 23:05:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem161965112886606425/directory161965112932508907')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:29 GMT',
  'ETag',
  '"0x8D90A9A1E39D5E6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '9f80ecb0-219f-4482-8cdb-b4bb735994ef',
  'x-ms-group',
  '9f80ecb0-219f-4482-8cdb-b4bb735994ef',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '22cd6f30-b01f-0008-5882-3c2690000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '34fc4056-c23c-481b-a7d3-84c27af49a92',
  'Date',
  'Wed, 28 Apr 2021 23:05:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem161965112886606425/directory161965112932508907')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:29 GMT',
  'ETag',
  '"0x8D90A9A1E39D5E6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'af196960-801f-0095-5e82-3cd42a000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '16833d87-7945-4718-8c39-af026f6c974f',
  'Date',
  'Wed, 28 Apr 2021 23:05:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161965112886606425')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2af8a83-301e-0016-5f82-3cca48000000',
  'x-ms-client-request-id',
  'e613a1ed-b78a-4119-8ee0-c438117e1a11',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:31 GMT',
  'Connection',
  'close'
]);
