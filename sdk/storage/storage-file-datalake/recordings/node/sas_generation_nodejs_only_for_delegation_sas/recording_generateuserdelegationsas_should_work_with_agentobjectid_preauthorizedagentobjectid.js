let nock = require('nock');

module.exports.hash = "3f33c5118f10ec7ddcd9bbc8b5a02538";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258386211407154","directory":"directory160258386242003191","file":"file160258386271803326","newFile":"newFile160258386359605359"},"newDate":{"now":"2020-10-13T10:11:01.503Z","tmr":"2020-10-13T10:11:01.503Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU2MSwibmJmIjoxNjAyNTgzNTYxLCJleHAiOjE2MDI2NzAyNjEsImFpbyI6IkUyUmdZUENZL1p6MWZZRDFyQjl2bkVxZXorTTZCUUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJrOUcwSUtBVVQwYW9BVWxzRzR3REFBIiwidmVyIjoiMS4wIn0.RucncTPGzhu4Hk-ifeWWub9Cbbnr4XROFqMHIbRAI2cnQOyC5Hg-mM3-vw--2uPSLefOHWRbawFSVBaPqxQHG0V8Bl6UEPfiSf-HfCkkOaoQYXmmqBmgEz5fWVhpyy9AIFP2XbL2HUnY2l279cuiCD75QydTFkQEsyU_fk9my1FaJ_174zG9ovLc8drxhvGegmcJpUctaK4wHd9TV6vRbbFVWhbvTW-LQ6cj4PjXapDIAJ9wU2TkLimt3DTurUUbLMnJfYG3qrlcI4ytZz6KBkp2oz7Cm2z2nHYr9W3wORbXT4m1SuDAz1pwiC8S-j1MmCBdtY1_kxCTN21gXUZNjA"}, [
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
  '20b4d193-14a0-464f-a801-496c1b8c0300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhxzHDpYxKZEh2iEl_xFSL500ISJAQAAADV0F9cOAAAA; expires=Thu, 12-Nov-2020 10:11:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:11:01 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:11:01Z</Start><Expiry>2020-10-18T10:11:01Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:11:01Z</SignedStart><SignedExpiry>2020-10-18T10:11:01Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>WIJg+ZuuW3afqBgv0ZRnwpw3XO+zGBGDQwa+F55HTAk=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569902d5-d01e-0067-4d49-a15d5c000000',
  'x-ms-client-request-id',
  'f293ad8a-986a-4c5b-8e3d-ac183d20df83',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386211407154')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:02 GMT',
  'ETag',
  '"0x8D86F604A0C19DC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569902f1-d01e-0067-6349-a15d5c000000',
  'x-ms-client-request-id',
  'ff84359c-3463-446d-9e96-342f1e20bae2',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:02 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386211407154/directory160258386242003191')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:02 GMT',
  'ETag',
  '"0x8D86F604A3B15F0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b7a0c3-801f-0018-4e49-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '55a78f13-5b52-4f04-997b-756fd1652d28',
  'Date',
  'Tue, 13 Oct 2020 10:11:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386211407154/directory160258386242003191/file160258386271803326')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:02 GMT',
  'ETag',
  '"0x8D86F604A691632"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b7a0c7-801f-0018-5149-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1e838fcf-bc66-4f5a-8a74-43d8cb01927d',
  'Date',
  'Tue, 13 Oct 2020 10:11:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160258386211407154/%2F')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:02 GMT',
  'ETag',
  '"0x8D86F604A0D8FE2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd3b7a0c9-801f-0018-5349-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'cca22c79-3793-4019-88a3-1f0d56d573ad',
  'Date',
  'Tue, 13 Oct 2020 10:11:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386211407154/newFile160258386359605359')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:04 GMT',
  'ETag',
  '"0x8D86F604B900043"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b7a0ca-801f-0018-5449-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'd6f3a47e-f527-48b6-8704-fde17227c5bd',
  'Date',
  'Tue, 13 Oct 2020 10:11:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386211407154/newFile160258386359605359')
  .query(true)
  .reply(403, {"error":{"code":"AuthorizationPermissionMismatch","message":"This request is not authorized to perform this operation using this permission.\nRequestId:d3b7a0cb-801f-0018-5549-a192c7000000\nTime:2020-10-13T10:11:05.2358363Z"}}, [
  'Content-Length',
  '227',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'x-ms-request-id',
  'd3b7a0cb-801f-0018-5549-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '41e59f0f-74b8-4f1a-9a62-2a6c0eae8ee0',
  'Date',
  'Tue, 13 Oct 2020 10:11:04 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386211407154/newFile160258386359605359')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:d3b7a0cc-801f-0018-5649-a192c7000000\nTime:2020-10-13T10:11:05.5370508Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  'd3b7a0cc-801f-0018-5649-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '86265198-7662-4aab-88f5-3c9203ff8dd8',
  'Date',
  'Tue, 13 Oct 2020 10:11:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258386211407154')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990435-d01e-0067-1c49-a15d5c000000',
  'x-ms-client-request-id',
  'd4a5aebf-0872-4a98-9c08-fa3cb3920dff',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:05 GMT'
]);
