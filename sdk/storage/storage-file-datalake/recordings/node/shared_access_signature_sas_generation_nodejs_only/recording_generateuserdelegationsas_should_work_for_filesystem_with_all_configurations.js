let nock = require('nock');

module.exports.hash = "8b812ae76b74a458d771329ceb818cc8";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258384921803476"},"newDate":{"now":"2020-10-13T10:10:47.252Z","tmr":"2020-10-13T10:10:47.253Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU0NywibmJmIjoxNjAyNTgzNTQ3LCJleHAiOjE2MDI2NzAyNDcsImFpbyI6IkUyUmdZSWliTmF1SGIvYXhuTFVmbENva3VMWDFBUT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiI0M015VjBYY1NFNlNqT2NuOUVBREFBIiwidmVyIjoiMS4wIn0.E8mDC0uQwg5tIwmhvPfQAy0KMyq-PX3CuchNhXau5XIJeFYtXUP16H_ZW39Fy2ZAV_JqS0B7FZtQUPq15M7eqcRMM5BWLvoTd3gRVSeqB9mWRhPENsKe26SShOztGXGDIHgz4e3Yl5h6BHeM2xOIIxCx8QnpaCTIzcGdytXgkrq_E5g2o1AVTOkzEV2VjxCxG5K0OyD9-Y2cvtq3XC_Ldes5o9g8POdrNvHSeGFWD2DBJwfyHzYPakyazZw1BQDB-xj8OND1ngNY4dVclPTx0XK7vPfErzwDropx_I2oNlG3Y05wqiaOLb7me4S7LIkCBR1BWBwzD3NG0UtPyKrIxQ"}, [
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
  '573273e3-dc45-4e48-928c-e727f4400300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AloS1ULb369HklQROf8CklV00ISJAQAAACZ0F9cOAAAA; expires=Thu, 12-Nov-2020 10:10:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:10:47 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:10:47Z</Start><Expiry>2020-10-18T10:10:47Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:10:47Z</SignedStart><SignedExpiry>2020-10-18T10:10:47Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>3ZqJlwNZ8nlx0tPOv+5JON0VR71bzg9WKt+0j1IalWw=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5698fdbe-d01e-0067-4949-a15d5c000000',
  'x-ms-client-request-id',
  'c6bc8786-97f1-4a48-97d4-cf8a294a306e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258384921803476')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:49 GMT',
  'ETag',
  '"0x8D86F60425D852A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5698fe28-d01e-0067-7b49-a15d5c000000',
  'x-ms-client-request-id',
  '2dbbd69d-16db-4210-ba37-78c59d34d0de',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:48 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160258384921803476')
  .query(true)
  .reply(200, {"paths":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d86af96-401f-0017-1649-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '59e60994-727f-464b-8137-5267754830d1',
  'Date',
  'Tue, 13 Oct 2020 10:10:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258384921803476')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5698ff49-d01e-0067-2849-a15d5c000000',
  'x-ms-client-request-id',
  '10e26577-399e-4ac9-9fc9-abf5cf16e170',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:50 GMT'
]);
