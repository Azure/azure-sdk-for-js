let nock = require('nock');

module.exports.hash = "3989fdb0b96130e65077bdaf1ec162cc";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160247303001502074","directory":"directory160247303043007345","file":"file160247303076405522","newFile":"newFile160247303151006565"},"newDate":{"now":"2020-10-12T03:23:49.289Z","tmr":"2020-10-12T03:23:49.289Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjQ3MjcyOSwibmJmIjoxNjAyNDcyNzI5LCJleHAiOjE2MDI1NTk0MjksImFpbyI6IkUyUmdZT2g0N1Zla092MTQ5OFYwNTR3ZERQN0xBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJScEZ4TFFzVklFT2I5UlVKRjVNSkFBIiwidmVyIjoiMS4wIn0.iGGmmP4BEY46WU4wXESjen5Fv_ijUmK8Nvl9P4PttAMxY0GED1jDA2cNJ45KnV6e40WESXFqnD2_NMThVdImXb-vHtf4LLZ6zMoZImDv_F01_TOULdMbq2peLhEe6K70hoE07yNRvtoA95WJQkJF8bRrOwXs3RE9zOohnyibYgRUbAInE6WS3Vd6VWgbp1R2NI7b1esI2d4O-2fO2Kz5EU0vPoFeUBvaNBV4awopk_pfcfBFxwXVt1uQzf2TB4Upfc9rcjh0ZynvzdNjittWP07p_TrlNjh3hp6R5XvFgMceJkctzU9vYJDYxK2iNEnZIZbuGYS5fiSCYJUjO3dSZw"}, [
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
  '2d719146-150b-4320-9bf5-150917930900',
  'x-ms-ests-server',
  '2.1.11140.10 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ahku0QBBxxRIrvi1T6t9G3d00ISJAQAAAEXDFdcOAAAA; expires=Wed, 11-Nov-2020 03:23:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 12 Oct 2020 03:23:49 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-12T02:23:49Z</Start><Expiry>2020-10-17T03:23:49Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-12T02:23:49Z</SignedStart><SignedExpiry>2020-10-17T03:23:49Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>z/C7TXpdA1dXU73klqDHeVE0aJGzoZQhDWQy+/qNLr4=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bd64-401e-0038-4e47-a0e960000000',
  'x-ms-client-request-id',
  'd18c32a7-2b06-4267-bd88-dcb6e5779154',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303001502074')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'ETag',
  '"0x8D86E5E3CFBF3C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bdb3-401e-0038-1147-a0e960000000',
  'x-ms-client-request-id',
  '886086ee-2394-4981-8d5a-311d0b26b6d3',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:49 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303001502074/directory160247303043007345')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'ETag',
  '"0x8D86E5E3D3B924E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73e65aef-e01f-0021-1f47-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'db117da3-5c32-4851-968f-79130e95ac58',
  'Date',
  'Mon, 12 Oct 2020 03:23:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303001502074/directory160247303043007345/file160247303076405522')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'ETag',
  '"0x8D86E5E3D7032AC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73e65af0-e01f-0021-2047-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1515006c-b261-490f-82ac-c73631af5940',
  'Date',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160247303001502074/%2F')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'ETag',
  '"0x8D86E5E3CFD6BE8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '73e65af2-e01f-0021-2147-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '506acb84-2c9d-4dc2-ab05-cb1f3dc93de9',
  'Date',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303001502074/newFile160247303151006565')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:51 GMT',
  'ETag',
  '"0x8D86E5E3DEAFD9D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73e65af3-e01f-0021-2247-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '389f1b65-e657-445f-bb95-1e7afec6e5c8',
  'Date',
  'Mon, 12 Oct 2020 03:23:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303001502074/newFile160247303151006565')
  .query(true)
  .reply(403, {"error":{"code":"AuthorizationPermissionMismatch","message":"This request is not authorized to perform this operation using this permission.\nRequestId:73e65af4-e01f-0021-2347-a069db000000\nTime:2020-10-12T03:23:52.1671055Z"}}, [
  'Content-Length',
  '227',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'x-ms-request-id',
  '73e65af4-e01f-0021-2347-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '51402467-f5f5-4a15-b80f-f185e8725d70',
  'Date',
  'Mon, 12 Oct 2020 03:23:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303001502074/newFile160247303151006565')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:73e65af5-e01f-0021-2447-a069db000000\nTime:2020-10-12T03:23:52.5373681Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '73e65af5-e01f-0021-2447-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'a0861359-0b59-494b-9edb-82234f029d74',
  'Date',
  'Mon, 12 Oct 2020 03:23:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160247303001502074')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bf2b-401e-0038-5547-a0e960000000',
  'x-ms-client-request-id',
  'fbcc3c71-547a-4a3f-b1e8-b5e3708268c1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:52 GMT'
]);
