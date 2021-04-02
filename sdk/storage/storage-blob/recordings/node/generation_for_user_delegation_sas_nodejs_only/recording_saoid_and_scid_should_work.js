let nock = require('nock');

module.exports.hash = "beafaef77a1cee83313242128eb0ee5e";

module.exports.testInfo = {"uniqueName":{"container":"container160988771423006448","blob":"blob160988771454902425"},"newDate":{"now":"2021-01-05T23:01:53.694Z","tmr":"2021-01-05T23:01:53.694Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwOTg4NzQxMywibmJmIjoxNjA5ODg3NDEzLCJleHAiOjE2MDk5NzQxMTMsImFpbyI6IkUySmdZT2liTjdsbE52LzlxL2I2dFE5aUkremtBUT09IiwiYXBwaWQiOiI2YTY4OTQyYi1iOTdiLTQyMjAtOWRmOC0wMjBhMWEyMjhmZDgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiOWY4MGVjYjAtMjE5Zi00NDgyLThjZGItYjRiYjczNTk5NGVmIiwicmgiOiIwLkFSb0F2NGo1Y3ZHR3IwR1JxeTE4MEJIYlJ5dVVhR3A3dVNCQ25mZ0NDaG9pajlnYUFBQS4iLCJzdWIiOiI5ZjgwZWNiMC0yMTlmLTQ0ODItOGNkYi1iNGJiNzM1OTk0ZWYiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJQV3FjT2hBNU5FNlIwMEJ5SUdiYkFRIiwidmVyIjoiMS4wIn0.RyFXTmViRrQLYqvYQrIwGMEydKgHprWtzh6EV6G3fVyh6KmXd3iNFq575KPdmgRm2GPiloKg-FUZipl2gmhZjZc0cRiRqZmVvARZ5xljnAHcL8lTYkAWSKm2VibJ0g8HgBpa-e0YYH1K7Hn2QXj-LIj_FWPmryDQ3sEh-KlVsFTmdRCtGC6I4gBL-ixVWAs2VwCsrlNYULH0Uz3Zz_aNcCw65H7P5Ens-AHeM_pU6yQZo2xIVhd18Vwl_sXPBLx5W-lzuwAS3zvYvWw1xDp7QOhuESohUxPRHkl18iMt9CXWJ6j48ZsuHuqCoC7h1vRzFJ8doksmvbcnnrPhmdkfZQ"}, [
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
  '3a9c6a3d-3910-4e34-91d3-40722066db01',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjSEoJJ5gTZIrDPnOgnDDwW_X3PmAgAAAN_mhtcOAAAA; expires=Thu, 04-Feb-2021 23:01:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 05 Jan 2021 23:01:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-01-05T22:01:53Z</Start><Expiry>2021-01-10T23:01:53Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-01-05T22:01:53Z</SignedStart><SignedExpiry>2021-01-10T23:01:53Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-04-08</SignedVersion><Value>8AoT1CyMjy4Iou/Ep6a7owqLKyudJJXxNYx9mEDxdug=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d3abc0a-301e-006a-40b6-e32f30000000',
  'x-ms-client-request-id',
  '4b3e3bed-fe0d-41ce-a0ba-513f937b0fae',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 23:01:53 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988771423006448')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 05 Jan 2021 23:01:54 GMT',
  'ETag',
  '"0x8D8B1CDE53653E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '448f0c9f-c01e-00d5-17b6-e33b46000000',
  'x-ms-client-request-id',
  '8c0356e3-4155-4544-966d-6ab987e69cd9',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 23:01:53 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988771423006448/blob160988771454902425', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Jan 2021 23:01:54 GMT',
  'ETag',
  '"0x8D8B1CDE56C0F74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be44b2a9-001e-00e1-7db6-e394ee000000',
  'x-ms-client-request-id',
  '59bd2118-50a6-4daa-ab4f-74c8c1d2448c',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Jan 2021 23:01:54 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160988771423006448/blob160988771454902425')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Jan 2021 23:01:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8B1CDE56C0F74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75a79ebd-601e-005b-29b6-e374e7000000',
  'x-ms-client-request-id',
  'e19d1cce-7ae0-4aa3-bef5-c3e779f619b2',
  'x-ms-version',
  '2020-04-08',
  'x-ms-creation-time',
  'Tue, 05 Jan 2021 23:01:54 GMT',
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
  'Tue, 05 Jan 2021 23:01:54 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160988771423006448')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03fbeca1-b01e-0070-79b6-e3005f000000',
  'x-ms-client-request-id',
  '50dd9c5b-00da-439b-8690-bfa6db858e6c',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 23:01:55 GMT',
  'Connection',
  'close'
]);
