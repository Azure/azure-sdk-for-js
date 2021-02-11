let nock = require('nock');

module.exports.hash = "209dd93b01f0a4f09ea58ad8f79a8df9";

module.exports.testInfo = {"uniqueName":{"container":"container160258359458802685"},"newDate":{"now":"2020-10-13T10:06:32.882Z","tmr":"2020-10-13T10:06:32.882Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzI5MywibmJmIjoxNjAyNTgzMjkzLCJleHAiOjE2MDI2Njk5OTMsImFpbyI6IkUyUmdZRkE4V05yT1VMYlEyeUZBcE50OFV2TUdBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiI4OXNsLW9tX2kwaWw5VmJkazJnREFBIiwidmVyIjoiMS4wIn0.TNgnCUmQkGiE6S6ITKavyawjE2qEobLVvVYt0BWClVfN9WfXPkqKw_8ao01vCOklvCX3tgEsKHxnz8diobJXCy5tuUkndv--5YoP_cSJC1t7XkACTS4f5QkT39NGXOzvjYKMUs66bd2w75sRhiDYIZaKVmk2xF2xSa-vy0Zl63hNpir0J-xYkgOv4_OlFkxAdF1uAmu_nDeBoOF-Krunncwp9EPSjhp3Dx_HWveOeqngSq6kqHNNGqqPaTBYWE_yE9FE5-0KSSz3YwIktEegzZ2-_GTmZxzCivbxM6fOnigxGqR7-FRqYPEpb3D_Q-aUq0t5lG2kYxOExjqKkR9YVg"}, [
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
  'fa25dbf3-bf89-488b-a5f5-56dd93680300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhuQkqzdmI1Aj6WUV_WToLh00ISJAQAAAChzF9cOAAAA; expires=Thu, 12-Nov-2020 10:06:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:06:33 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:06:32Z</Start><Expiry>2020-10-14T10:06:32Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:06:32Z</SignedStart><SignedExpiry>2020-10-14T10:06:32Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>FQCuFbOZ/5DtsXgiO6py17X2cMP98cJ8nrJkj1JmZc0=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c570-601e-002d-5b48-a179c2000000',
  'x-ms-client-request-id',
  '5759edcf-476d-4ffd-b140-23738ee28074',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258359458802685')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:34 GMT',
  'ETag',
  '"0x8D86F5FAA95DC8E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c586-601e-002d-6f48-a179c2000000',
  'x-ms-client-request-id',
  '88b8bcf3-78f0-4b2e-9d0c-a5132a0b2443',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160258359458802685')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160258359458802685\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c596-601e-002d-7b48-a179c2000000',
  'x-ms-client-request-id',
  '5e315aa6-f9ef-471b-ac0c-43e9d9429220',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 10:06:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258359458802685')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c5b3-601e-002d-1148-a179c2000000',
  'x-ms-client-request-id',
  '25623e98-2567-4375-aaae-eb228980080f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:35 GMT'
]);
