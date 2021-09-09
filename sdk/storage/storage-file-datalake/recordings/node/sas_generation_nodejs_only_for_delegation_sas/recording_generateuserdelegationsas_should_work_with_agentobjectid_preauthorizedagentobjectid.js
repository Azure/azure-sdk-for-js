let nock = require('nock');

module.exports.hash = "b9db129eb67da2809746d436948dbe4c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161965113340603395","directory":"directory161965113382809232","file":"file161965113422206756","newFile":"newFile161965113502500354"},"newDate":{"now":"2021-04-28T23:05:31.784Z","tmr":"2021-04-28T23:05:31.784Z"}}

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
  '981c6f97-768a-481a-afde-2a8231240000',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAQAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWMiEU2S5BmJbv43dZnkmv9bQ46bzDJ4GdZHNJndWT7uXWsQaYD7o5fr1st_OBPmwTDM6eTQ8YUIj5jwdw3ZZ3-soGhVMeTKSEQtsEaHiqRX9pUtDcpoUbQB6mdEkExhKpe5poWEdVBbgnBroQVm9qdfrh6nvDurMwpwdheVQLGAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:31 GMT',
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
  '9f88fbef-77fa-43fb-850a-91001f583101',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAQAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBy_fsNqbhc4WE51PBVJxdCfLXXISOneQ2tfYurtSFNJD79AqCAXw7q8_FZrhctTcAdBuhxRCa7aBF0KmJAhKA7qwGN8o9GuqZ4IEkC-1TL7yXIcR38ZMMyU2ZacXUnSxqN5NS02Tib92tv5lgbHKSm5IvGeoeiLcbQvSszTd_XEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:32 GMT',
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
  '5d1e99e7-32d5-4488-ae97-325085320000',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Agsjy6NQg4BOg7zO0_ffM0S_X3PmAgAAADfhG9gOAAAA; expires=Fri, 28-May-2021 23:05:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 23:05:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-04-28T22:05:31Z</Start><Expiry>2021-05-03T23:05:31Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-04-28T22:05:31Z</SignedStart><SignedExpiry>2021-05-03T23:05:31Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-06-12</SignedVersion><Value>yMPq1Gp0jWKCIk+46el1ppqnaZn7Gt79tiar+WMsf5E=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9fae3-501e-0062-2a82-3cfeb8000000',
  'x-ms-client-request-id',
  '6cb8130a-3d1e-4e19-b1ea-1fde53b9b568',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113340603395')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:33 GMT',
  'ETag',
  '"0x8D90A9A20928971"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e4093db-b01e-009e-4082-3c2f41000000',
  'x-ms-client-request-id',
  '9257c8f3-75b8-46b6-9300-7f4509ca1523',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113340603395/directory161965113382809232')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:34 GMT',
  'ETag',
  '"0x8D90A9A20D30C6E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48258e35-301f-005b-4c82-3c05a4000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '8faa99bf-c5fc-4538-beb1-d41b1686bed4',
  'Date',
  'Wed, 28 Apr 2021 23:05:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113340603395/directory161965113382809232/file161965113422206756')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:34 GMT',
  'ETag',
  '"0x8D90A9A210F7391"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8078124c-201f-0047-2f82-3c57c4000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f56da2c3-3921-4e1e-90fd-bcf9aaf40093',
  'Date',
  'Wed, 28 Apr 2021 23:05:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem161965113340603395/%2F')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:33 GMT',
  'ETag',
  '"0x8D90A9A20962478"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '90bcc88d-d01f-0098-7f82-3c1cfe000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1eb7fb99-776d-494d-ad60-3363e9e49aca',
  'Date',
  'Wed, 28 Apr 2021 23:05:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113340603395/newFile161965113502500354')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Apr 2021 23:05:35 GMT',
  'ETag',
  '"0x8D90A9A21B940BA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1decdf97-101f-005c-2a82-3c69c7000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '7fd9d9b1-8bcb-4c7b-930e-9c93da0f91c4',
  'Date',
  'Wed, 28 Apr 2021 23:05:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113340603395/newFile161965113502500354')
  .query(true)
  .reply(403, {"error":{"code":"AuthorizationPermissionMismatch","message":"This request is not authorized to perform this operation using this permission.\nRequestId:41923fd8-401f-000c-2182-3cab97000000\nTime:2021-04-28T23:05:36.1802600Z"}}, [
  'Content-Length',
  '227',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'x-ms-request-id',
  '41923fd8-401f-000c-2182-3cab97000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'd672e828-ade9-42a2-93f7-f62152ac12fc',
  'Date',
  'Wed, 28 Apr 2021 23:05:35 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161965113340603395/newFile161965113502500354')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:26cdf142-d01f-0021-0f82-3c18e4000000\nTime:2021-04-28T23:05:36.5943134Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '26cdf142-d01f-0021-0f82-3c18e4000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '65184748-3079-4307-9527-4fb711c764fc',
  'Date',
  'Wed, 28 Apr 2021 23:05:35 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161965113340603395')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d9e1d77-401e-0033-3383-3c6334000000',
  'x-ms-client-request-id',
  '2e28f7cb-eecb-43d6-b51c-a8f317c733b9',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Wed, 28 Apr 2021 23:05:37 GMT',
  'Connection',
  'close'
]);
