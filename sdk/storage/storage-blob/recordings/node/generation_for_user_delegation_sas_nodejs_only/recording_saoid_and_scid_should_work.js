let nock = require('nock');

module.exports.hash = "beafaef77a1cee83313242128eb0ee5e";

module.exports.testInfo = {"uniqueName":{"container":"container160396130417201456","blob":"blob160396130447407892"},"newDate":{"now":"2020-10-29T08:48:23.356Z","tmr":"2020-10-29T08:48:23.356Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMzk2MTAwMywibmJmIjoxNjAzOTYxMDAzLCJleHAiOjE2MDQwNDc3MDMsImFpbyI6IkUyUmdZSENKVk1tWCtldDAwVUY3d2VsZHR2VVRBUT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJBLXZueDdSdE1FQ1RMMi1Wcm13Q0FBIiwidmVyIjoiMS4wIn0.D85nCzA7z0v-J9s3JY-gCLUkHXZGi5A5vE0dMAAB8q4HgG60LU9OwWJrbdW_1qyr1kS4fFXpoTlYksLE8-FsYu_FEqIWdlqY0s7E8PbhCbHKkotIJ3L1pPPRej4RgYP7ShyykhvA8BXTn5H2HK9y-n-rRetAkW7OsBJWuP0ybXSYgGZegHdmdVZYGbBXHOoy1bt7QoGTpRJIpYZNugFme4pOOkgALldwrF_qWiz3iO1pv8_Z8TPz-T_-Rrf5cyUJD_Qk0e8nFdYMaW18s0bv46SCa6kLd6J33xHCiYjq9RcqN19qSWd9eesA_mxp7og2s39ECqXfHgg2s1wGq7AvzA"}, [
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
  'c7e7eb03-6db4-4030-932f-6f95ae6c0200',
  'x-ms-ests-server',
  '2.1.11198.11 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At5T_QWl7eZEt6i0QYLeLn500ISJAQAAANZ4LNcOAAAA; expires=Sat, 28-Nov-2020 08:48:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 29 Oct 2020 08:48:23 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-29T07:48:23Z</Start><Expiry>2020-11-03T08:48:23Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-29T07:48:23Z</SignedStart><SignedExpiry>2020-11-03T08:48:23Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>/Pmt2VFBxyKgbPwZuG93EyRMdSVprpKpcIAUu5r4Ync=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085918-901e-0043-23d0-adb3a1000000',
  'x-ms-client-request-id',
  'c74f35d3-a9a5-46ed-b750-bf73b5dff828',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396130417201456')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:24 GMT',
  'ETag',
  '"0x8D87BE7657ED62F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a0859d1-901e-0043-53d0-adb3a1000000',
  'x-ms-client-request-id',
  'e0dcb216-5d61-4c80-8951-9fa79a255b14',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396130417201456/blob160396130447407892', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:24 GMT',
  'ETag',
  '"0x8D87BE765B0AFAC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085a69-901e-0043-65d0-adb3a1000000',
  'x-ms-client-request-id',
  'd6061157-b00f-4e33-844b-093be75b760d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-29T08:48:24.6665132Z',
  'Date',
  'Thu, 29 Oct 2020 08:48:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160396130417201456/blob160396130447407892')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87BE765B0AFAC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085b38-901e-0043-26d0-adb3a1000000',
  'x-ms-client-request-id',
  'a4e0073f-4527-4a77-a9ec-5124233e41bc',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-29T08:48:24.6665132Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 29 Oct 2020 08:48:24 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 29 Oct 2020 08:48:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160396130417201456')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085bc7-901e-0043-2cd0-adb3a1000000',
  'x-ms-client-request-id',
  '586e5c64-e685-41ec-b931-356235c0e133',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:24 GMT'
]);
