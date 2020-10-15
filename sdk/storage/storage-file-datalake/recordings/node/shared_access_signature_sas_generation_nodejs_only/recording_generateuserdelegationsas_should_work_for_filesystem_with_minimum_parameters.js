let nock = require('nock');

module.exports.hash = "484966e77cfa510699584bf7d95ab9eb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258385238007990"},"newDate":{"now":"2020-10-13T10:10:51.780Z","tmr":"2020-10-13T10:10:51.780Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU1MiwibmJmIjoxNjAyNTgzNTUyLCJleHAiOjE2MDI2NzAyNTIsImFpbyI6IkUyUmdZSkNOT25NbDU4R2pyaGJPWEozSEc4ejNBQUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJoMHA2dW8tXzRVeVVZOWlHZFdjREFBIiwidmVyIjoiMS4wIn0.UUV-NNJZTCXnRDczn-AcmZqhNENROmS92NlJi81BlxXaEQl3WDMsJU_jhWeaDV9praZFZx5AonxXWNZqY3DUutLTwy8EOGFl9hMs746z2oMnSWCzDEJaK7gj6tJXSlZjBPK_eI-P1MVSRQvatDFbJC4CahrtqswEricWsYRBPSvBTBVPKgYTvd0-ZN9Oqoraax5IJbJuOVfstOn4mFJVnREzzWDxEMc3mktoFpHMNGbLyFc_7cQ_NsdxRNRBVMH2NZOuRaq70v0qhcXqJIYZ5F5_OGA9qeX8NXAEsZ-r4mYGa17gkI76VjH5E8iTBloHJwx-of78glKuLhuqlEYNCQ"}, [
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
  'ba7a4a87-bf8f-4ce1-9463-d88675670300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkFYw8aKig1Nh5f9DOGfXPJ00ISJAQAAACt0F9cOAAAA; expires=Thu, 12-Nov-2020 10:10:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:10:51 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:10:51Z</Start><Expiry>2020-10-18T10:10:51Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:10:51Z</SignedStart><SignedExpiry>2020-10-18T10:10:51Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>TJAIhY20szrJTtqh3MOKn/5DdU/cszW/qhpe9LOda5k=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5698ff91-d01e-0067-5d49-a15d5c000000',
  'x-ms-client-request-id',
  'b59033a0-84ed-4286-b645-0d5464c646c0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385238007990')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:52 GMT',
  'ETag',
  '"0x8D86F60443E35AC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5698ffab-d01e-0067-7049-a15d5c000000',
  'x-ms-client-request-id',
  '45a32676-8111-41ea-b52d-69dc8ca43a52',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160258385238007990')
  .query(true)
  .reply(200, {"paths":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d86af9a-401f-0017-1749-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '2ba1c216-c172-4d74-91c9-bd2c32108e6f',
  'Date',
  'Tue, 13 Oct 2020 10:10:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258385238007990')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5698ffdc-d01e-0067-1049-a15d5c000000',
  'x-ms-client-request-id',
  '79e9fc83-a478-4a18-a5ef-ada99367c5b5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:52 GMT'
]);
