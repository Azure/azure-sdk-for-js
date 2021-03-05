let nock = require('nock');

module.exports.hash = "4453cdbf3eab5fad2fc553aac6916ff0";

module.exports.testInfo = {"uniqueName":{"container":"container160988606117007800","blob":"blob160988606150403541"},"newDate":{"now":"2021-01-05T22:34:19.168Z","tmr":"2021-01-05T22:34:19.169Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwOTg4NTc1OSwibmJmIjoxNjA5ODg1NzU5LCJleHAiOjE2MDk5NzI0NTksImFpbyI6IkUySmdZSmljVlh2a3pzYk1mNStmcVMzUDUzU0xBd0E9IiwiYXBwaWQiOiI2YTY4OTQyYi1iOTdiLTQyMjAtOWRmOC0wMjBhMWEyMjhmZDgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiOWY4MGVjYjAtMjE5Zi00NDgyLThjZGItYjRiYjczNTk5NGVmIiwicmgiOiIwLkFSb0F2NGo1Y3ZHR3IwR1JxeTE4MEJIYlJ5dVVhR3A3dVNCQ25mZ0NDaG9pajlnYUFBQS4iLCJzdWIiOiI5ZjgwZWNiMC0yMTlmLTQ0ODItOGNkYi1iNGJiNzM1OTk0ZWYiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJQV3FjT2hBNU5FNlIwMEJ5TnlIYUFRIiwidmVyIjoiMS4wIn0.mAmbQRZffDtjHDeKLTrv1nPOpdtv6c0LJ18TcDaVNyUQ4tBxZNHks3_PdtfwIavGwknCn0sTeP4Qm_psdZGQq8majunryP_Y3ieEJIrWC-0AvWg4945V7RH3M2_705sOSBzAQ7iEmLLyEX_8SH80BlzTj_LZdfVMSMRZ5-U1lC9vD7P5BXH7eP0ME6ijsL6BIbPlKDtwSoXdesjP3PyDFdJcsRGi1EDTaORIzJ6_HjrtEoUHaO79QzDw1f0_AR6dVMkfKjInIYhf2NiNjiOZdavqkWS_cc8MSbCxrL0ERIR4xRiEzXYj4XEOSz_qPuImHWobiGgykUGrl4M4a6MMGQ"}, [
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
  '3a9c6a3d-3910-4e34-91d3-40723721da01',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApQ8CbmvBgtOvp4IP8AW7a6_X3PmAQAAAGrghtcOAAAA; expires=Thu, 04-Feb-2021 22:34:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 05 Jan 2021 22:34:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-01-05T21:34:19Z</Start><Expiry>2021-01-10T22:34:19Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-01-05T21:34:19Z</SignedStart><SignedExpiry>2021-01-10T22:34:19Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-04-08</SignedVersion><Value>JpJookJqqmIYqb/0JA3xbx7Zgxdlmg6rn/d6D7RQm5k=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d597775-f01e-00ff-7cb2-e34e03000000',
  'x-ms-client-request-id',
  '9148a6b9-cc91-4db9-ad1d-1913263f88b6',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 22:34:19 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988606117007800')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 05 Jan 2021 22:34:21 GMT',
  'ETag',
  '"0x8D8B1CA0BEA77E4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb50025e-501e-003e-52b2-e3c5ba000000',
  'x-ms-client-request-id',
  'd90358c3-b02c-4e76-bb39-522e0babfef3',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 22:34:20 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988606117007800/blob160988606150403541', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Jan 2021 22:34:21 GMT',
  'ETag',
  '"0x8D8B1CA0C1998FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52783cba-c01e-00b3-3cb2-e3891c000000',
  'x-ms-client-request-id',
  '582e8660-c8a0-4a8a-a493-f48c19cd7eab',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Jan 2021 22:34:20 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160988606117007800/blob160988606150403541')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Jan 2021 22:34:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8B1CA0C1998FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dce92635-301e-0108-5ab2-e32ebd000000',
  'x-ms-client-request-id',
  'fe0221d9-6721-4d38-9b62-a600891364aa',
  'x-ms-version',
  '2020-04-08',
  'x-ms-creation-time',
  'Tue, 05 Jan 2021 22:34:21 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 05 Jan 2021 22:34:21 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160988606117007800')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e0a7f2-601e-003d-5db2-e3c6bd000000',
  'x-ms-client-request-id',
  'd5dc32a9-2f43-4720-a66a-64090029888d',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 22:34:22 GMT',
  'Connection',
  'close'
]);
