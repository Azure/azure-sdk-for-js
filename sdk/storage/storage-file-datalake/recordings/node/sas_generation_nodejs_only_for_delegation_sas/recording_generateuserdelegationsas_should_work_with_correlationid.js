let nock = require('nock');

module.exports.hash = "9bcada1e1c90bd5e6d1bdb8e5fa637b4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258386657207977","directory":"directory160258386687502922","file":"file160258386717400152"},"newDate":{"now":"2020-10-13T10:11:05.970Z","tmr":"2020-10-13T10:11:05.970Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU2NiwibmJmIjoxNjAyNTgzNTY2LCJleHAiOjE2MDI2NzAyNjYsImFpbyI6IkUyUmdZSGcvS1dqeC96alB5WnNQYUF0MXZMUldBQUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJ5eVNsLXhpZVowbVRBNUo0M1hRREFBIiwidmVyIjoiMS4wIn0.RP3HtU1YeUYRN_-6RtQ-4GNWU5Dw1BKf7HWFw88D9ZkGgZkXNxLzya7S0ATPw16Zc6kXFCDykV4mjYu4oZUI8MoPMNL8csqNYFIOBCdmirjk4USkyS1VY8laqtQIjy4x4Fj8QdGlMYM-fdDhDFxMIu8WZF2Nrm5D-QTAntNTllIFGuNQaZ3vNVl9IhsOnUlB2OT3CGlfvQVNJ6DQcU51QWzoZGbMvo1cxLhyMDbN21wk9BQ5g0armWSQVl2p6H7jFJjtbVKtZjjRAh11lQTdC6sbpEawMHQ_wLwKG48GcGVOjGV9PRjAGpcV82J7mI6jnInNA-2Yz-DnKJz_wUxFLQ"}, [
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
  'fba524cb-9e18-4967-9303-9278dd740300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvFh3UfIIBxHpbEbNnglEPp00ISJAQAAADp0F9cOAAAA; expires=Thu, 12-Nov-2020 10:11:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:11:05 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:11:05Z</Start><Expiry>2020-10-18T10:11:05Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:11:05Z</SignedStart><SignedExpiry>2020-10-18T10:11:05Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>jBiwC+AII61ekzCkRzJ7ISWQrb2ks+vT8phJgKl3O9U=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990465-d01e-0067-3b49-a15d5c000000',
  'x-ms-client-request-id',
  '530c62e6-286a-49ea-84eb-552c792bd478',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386657207977')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:06 GMT',
  'ETag',
  '"0x8D86F604CB3E81D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990490-d01e-0067-5e49-a15d5c000000',
  'x-ms-client-request-id',
  'd94e31f5-4a95-4828-9ec5-73e417f870e7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386657207977/directory160258386687502922')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:07 GMT',
  'ETag',
  '"0x8D86F604CE2F15A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b7a0cd-801f-0018-5749-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'abc9f2aa-8266-45dc-90ae-79aefcbc4dda',
  'Date',
  'Tue, 13 Oct 2020 10:11:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258386657207977/directory160258386687502922/file160258386717400152')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:11:07 GMT',
  'ETag',
  '"0x8D86F604D102540"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b7a0ce-801f-0018-5849-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '2aaa4f5a-018a-4e36-8e7e-fd531de9ecf8',
  'Date',
  'Tue, 13 Oct 2020 10:11:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160258386657207977')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"Tue, 13 Oct 2020 10:11:07 GMT","etag":"0x8D86F604CE2F15A","group":"1ce13278-a083-4d15-8796-de39717793e1","isDirectory":"true","lastModified":"Tue, 13 Oct 2020 10:11:07 GMT","name":"directory160258386687502922","owner":"1ce13278-a083-4d15-8796-de39717793e1","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b7a0cf-801f-0018-5949-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'a6f8e8ab-83ba-4ab3-bc10-3f47ea604eb5',
  'Date',
  'Tue, 13 Oct 2020 10:11:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258386657207977')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5699050d-d01e-0067-3549-a15d5c000000',
  'x-ms-client-request-id',
  'b782029d-1317-45fd-9b74-07a88e6c9543',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:07 GMT'
]);
