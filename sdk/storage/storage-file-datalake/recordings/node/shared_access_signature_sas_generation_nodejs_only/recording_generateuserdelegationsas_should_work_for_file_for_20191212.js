let nock = require('nock');

module.exports.hash = "0b07d2158d3dc30decd63a5cbc3f0ed9";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160257605523209248","file":"file160257605617405034"},"newDate":{"now":"2020-10-13T08:00:53.503Z","tmr":"2020-10-13T08:00:53.504Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU3NTc1MywibmJmIjoxNjAyNTc1NzUzLCJleHAiOjE2MDI2NjI0NTMsImFpbyI6IkUyUmdZT0Q1dW5PeXdLSlhHK2F0ZlNGZ0V2bkhHQUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJrOUcwSUtBVVQwYW9BVWxzNmZNQ0FBIiwidmVyIjoiMS4wIn0.VwL8TKBCtqGAiYQPCssdTa9eqXPN48WNSGx5APRDOKhm8Ki5beLu1Fff5mpYhnbbLn3Plfn6R9_VqUl2DLzR3aKj7GrcoDcd68VC3NpRn84Rn1wV5_Jb8-FTq-9zVz6YVsu5hCPuZOJEME9iV9ascqWXPYB_BPVbwaF5QRhzS3XorW6pMXg2d8xuclY1F8ZRYGlBpbUXdpMHa1Jih6YiieGFtk3o0L1L0sdDBFWE-83SYsnjJ73-O5p3kf1bbqS7_YRI5LHP0avicmdFeXpGXG-Rtm-cILe1OueOPV-VYddgLUQJk1TM_YCNMSiyJu6IBmkW_dKL1Q2WX67zOYd0wQ"}, [
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
  '20b4d193-14a0-464f-a801-496ce9f30200',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlMaGnkay09Fq59lsu3DNHd00ISJAQAAALVVF9cOAAAA; expires=Thu, 12-Nov-2020 08:00:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 08:00:53 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T07:00:53Z</Start><Expiry>2020-10-18T08:00:53Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-13T07:00:53Z</SignedStart><SignedExpiry>2020-10-18T08:00:53Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>InLBFynMJX84IpyoCRKcHdhVwUCvBEDnoeiSCO0fHtU=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '022f1da8-901e-003b-5936-a10804000000',
  'x-ms-client-request-id',
  '90dd4821-338f-4222-b139-6c6fad073ae7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 08:00:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160257605523209248')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 08:00:55 GMT',
  'ETag',
  '"0x8D86F4E1CE68735"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '022f1db7-901e-003b-6036-a10804000000',
  'x-ms-client-request-id',
  '6540638c-db85-4d6a-918c-16c959d9524f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 08:00:55 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160257605523209248/file160257605617405034')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 08:00:57 GMT',
  'ETag',
  '"0x8D86F4E1DDB5568"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c576e6a-d01f-003a-3b36-a157d8000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8f768392-c627-4ecc-be97-977c1282bfe8',
  'Date',
  'Tue, 13 Oct 2020 08:00:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160257605523209248/file160257605617405034')
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
  'Tue, 13 Oct 2020 08:00:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F4E1DDB5568"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '022f1e0f-901e-003b-1536-a10804000000',
  'x-ms-client-request-id',
  'c4c8beec-43df-4027-83a0-7455f909b015',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 08:00:57 GMT',
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
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Tue, 13 Oct 2020 08:00:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160257605523209248')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '022f1e2a-901e-003b-2736-a10804000000',
  'x-ms-client-request-id',
  '8836b7f6-5788-4c1c-bc0a-0d1580a9a860',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 08:00:57 GMT'
]);
