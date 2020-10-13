let nock = require('nock');

module.exports.hash = "3b306e0dbe654c15df49dd0c3ca1d177";

module.exports.testInfo = {"uniqueName":{"container":"container160258096538602735","blob":"blob160258096567207340"},"newDate":{"now":"2020-10-13T09:22:44.789Z","tmr":"2020-10-13T09:22:44.789Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MDY2NSwibmJmIjoxNjAyNTgwNjY1LCJleHAiOjE2MDI2NjczNjUsImFpbyI6IkUyUmdZSEN3a2Z3ZFlmTENPVE9seDZkbGF0dGFBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJhZ2Z4NU1wOU8wZWl4am54VkRFREFBIiwidmVyIjoiMS4wIn0.xN_hxW6hUDlpcpGCZH0s6iJmGIKAfIYvhQ2yKCd62_ZPKKkcv0GAz0Vg_fMcdqe5aKbqIyYHZ6r8PASP-PV1XdbZSIonV504bNW3nYz5z7mBcievGeLkOMuzx_rJ0-R0Ys-DXilokOYFArFnqkOtT9XoE6UJzDB0mvGt7Yug1VTQyM0BTk9ubv-2oXxRsqq7-wo7fhP2cs73AmRxqna7BUohA1lH1TCfEQ3awHTfjY4uq317cDKMuARlcL4XWcC2xe1GfsuolI3n8k-Pd_iz04wZQyr-HdO9vi6axCxCVnfOlizQKUbrkVkFdpfUy7bUeMQDz8Xxk9Vpv2NNgByUuA"}, [
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
  'e4f1076a-7dca-473b-a2c6-39f154310300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AppIYLZIgyZCo3-gyOuY0sd00ISJAQAAAORoF9cOAAAA; expires=Thu, 12-Nov-2020 09:22:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 09:22:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T08:22:44Z</Start><Expiry>2020-10-14T09:22:44Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-13T08:22:44Z</SignedStart><SignedExpiry>2020-10-14T09:22:44Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>RNPvKdOrVVXF4gIY6I8NomMmNQF3fozpPNv8lOex+vo=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b31-401e-0058-5542-a112ee000000',
  'x-ms-client-request-id',
  'af3500a3-92c5-47df-8997-b40aaf939c83',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096538602735')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:45 GMT',
  'ETag',
  '"0x8D86F598B75049C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b33-401e-0058-5742-a112ee000000',
  'x-ms-client-request-id',
  '2aacca8c-b871-4e21-ade1-21747120a00c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096538602735/blob160258096567207340')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:45 GMT',
  'ETag',
  '"0x8D86F598BA0CBA2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b38-401e-0058-5942-a112ee000000',
  'x-ms-client-request-id',
  '58b260ca-ff77-44c0-b45d-ae006c4c5d4e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T09:22:45.8268578Z',
  'Date',
  'Tue, 13 Oct 2020 09:22:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096538602735/blob160258096567207340')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:45 GMT',
  'ETag',
  '"0x8D86F598BA0CBA2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b3c-401e-0058-5c42-a112ee000000',
  'x-ms-client-request-id',
  '3ff6fcd4-9f49-4e5e-9bf0-1d92c7050a54',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-13T09:22:46.1350775Z',
  'x-ms-snapshot',
  '2020-10-13T09:22:46.1340775Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 13 Oct 2020 09:22:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160258096538602735/blob160258096567207340')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F598BA0CBA2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b46-401e-0058-6542-a112ee000000',
  'x-ms-client-request-id',
  '31b51a41-fc30-4ac2-9b48-3964c10ab0e7',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 09:22:45 GMT',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 09:22:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258096538602735')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b49-401e-0058-6742-a112ee000000',
  'x-ms-client-request-id',
  'b74d26e8-2e35-407b-868c-d4cd04cda51e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:46 GMT'
]);
