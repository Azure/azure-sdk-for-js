let nock = require('nock');

module.exports.hash = "f48afc31ecf8135871b78c61c64a42ff";

module.exports.testInfo = {"uniqueName":{"container":"container160258360169304951","blob":"blob160258360197803631"},"newDate":{"now":"2020-10-13T10:06:42.548Z","tmr":"2020-10-13T10:06:42.548Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258360169304951')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:41 GMT',
  'ETag',
  '"0x8D86F5FAED13EE5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c68a-601e-002d-3f48-a179c2000000',
  'x-ms-client-request-id',
  '40e3adc4-dbe8-42f1-b799-ad39fdec8a2e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258360169304951/blob160258360197803631', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:42 GMT',
  'ETag',
  '"0x8D86F5FAEFCD5AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c695-601e-002d-4948-a179c2000000',
  'x-ms-client-request-id',
  '0e994334-0cc1-47d6-9a58-69bbaf7b2bfa',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T10:06:42.1306798Z',
  'Date',
  'Tue, 13 Oct 2020 10:06:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258360169304951/blob160258360197803631')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:42 GMT',
  'ETag',
  '"0x8D86F5FAF28334C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c6a0-601e-002d-5248-a179c2000000',
  'x-ms-client-request-id',
  'ea75103d-0e49-4857-8465-212cda76444f',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T10:06:42.4158812Z',
  'Date',
  'Tue, 13 Oct 2020 10:06:41 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzMwMiwibmJmIjoxNjAyNTgzMzAyLCJleHAiOjE2MDI2NzAwMDIsImFpbyI6IkUyUmdZSWh1WEpNWnUzREQ3Yzl2TjY1ditOYXlHZ0E9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJDQkRud19GZWxVYTUyYU90bVFZREFBIiwidmVyIjoiMS4wIn0.LSGiuWgAhDMxI8nH7rkr3lioGX_znbVoirvJhV3bB2LrROfFYcK3Rh4GX9XivmR29DzzNmVEh9E2MDgJekQltC1nl8C2dI9TwytLmQY3QruUmhJDY49Fpk5kLSiyFU8JHwSfafuw0-9yg6lTCtaFijfw8wSw6UmguojE_0dDQpx9rfsevMbfLikjTgngKBlzU-9JrF2ij7BrzsE1CdMqiAvz0wMbeU7wNubhnyFS0ztNeLgIERZ7T90H9UPgg0vnq58413Bx9ScefLMsvc9Yt-jcEacYHJcBfMFMMXC7Ggqbm3Cm0VjxnkjfN5d8dT6K4zzwf_iNFJ-xomrd_ix2Bw"}, [
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
  'c3e71008-5ef1-4695-b9d9-a3ad99060300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ava0SdkBQOVFnbye4SUfmoJ00ISJAQAAADJzF9cOAAAA; expires=Thu, 12-Nov-2020 10:06:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:06:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T10:01:42Z</Start><Expiry>2020-10-14T10:06:42Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T10:01:42Z</SignedStart><SignedExpiry>2020-10-14T10:06:42Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>Bwuwf457ctdtVCO4+PmcHUN1h4CrH6aUv8UrasHcJ0U=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c6bc-601e-002d-6d48-a179c2000000',
  'x-ms-client-request-id',
  '8b45cddb-86cb-4523-b6be-52c08eab6d77',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258360169304951/blob160258360197803631')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c6c0-601e-002d-7148-a179c2000000',
  'x-ms-client-request-id',
  'fcc2e3b0-91fd-42e1-a3ee-7c0f78e14d26',
  'x-ms-version',
  '2020-02-10',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 13 Oct 2020 10:06:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160258360169304951/blob160258360197803631')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c6cc-601e-002d-7c48-a179c2000000',
  'x-ms-client-request-id',
  '05abaa3f-508f-46b0-8912-46f2cc505502',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 10:06:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258360169304951')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c6d3-601e-002d-0148-a179c2000000',
  'x-ms-client-request-id',
  '1f17289d-45d5-4b87-b305-b47417c8c6d0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:43 GMT'
]);
