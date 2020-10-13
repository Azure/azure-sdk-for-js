let nock = require('nock');

module.exports.hash = "f48afc31ecf8135871b78c61c64a42ff";

module.exports.testInfo = {"uniqueName":{"container":"container160258096686306838","blob":"blob160258096714904896"},"newDate":{"now":"2020-10-13T09:22:47.718Z","tmr":"2020-10-13T09:22:47.718Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096686306838')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:47 GMT',
  'ETag',
  '"0x8D86F598C56663B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b4b-401e-0058-6942-a112ee000000',
  'x-ms-client-request-id',
  '0a8863a6-927e-49a3-bd92-063a34e913de',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096686306838/blob160258096714904896', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:47 GMT',
  'ETag',
  '"0x8D86F598C81DED1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b5b-401e-0058-7142-a112ee000000',
  'x-ms-client-request-id',
  '06917da7-a735-4abd-b31d-181f96740bde',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T09:22:47.3019089Z',
  'Date',
  'Tue, 13 Oct 2020 09:22:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096686306838/blob160258096714904896')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:47 GMT',
  'ETag',
  '"0x8D86F598CAD155E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b60-401e-0058-7542-a112ee000000',
  'x-ms-client-request-id',
  'd3baeeb9-0b50-4844-9142-7dd2e14950d3',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T09:22:47.5861102Z',
  'Date',
  'Tue, 13 Oct 2020 09:22:47 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MDY2NywibmJmIjoxNjAyNTgwNjY3LCJleHAiOjE2MDI2NjczNjcsImFpbyI6IkUyUmdZR2lYbXJCbHpaS0R6eGVZUDZ0MEQ1NjdFQUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJ6bnlfN1B1ekMwMm81OUJ3R19zQ0FBIiwidmVyIjoiMS4wIn0.OW0u6ZZRFlo3cJh8X84ZoT-kg-mYEqVRwswvuNI3izJM4LCn4ymnc77_4j503H_Y5vq9Ye1sLvX_K3cQ0oH1YOGYXfYrZjzSak_ImQGcdKnjFCWm5HfxN-jUqLUfm0bF1sOWfESOpJjFcPzi9R3JJXCmBZyYNMlqlnD85Oy64ER_gaxz4uwSOFeZf9tTPDdwbC6jOTuBv89x2Q-qFnexR30MuMxx2L2mgy0uygVWXvG0a3MdkbRqq1M1A6E_P9bXksHV1VDjYrnEoQbX2aiJD5l-tkkwanxLM4eX7m_ExRTHcHZohM4jgLfqQH5leuyC9JwqiXRBefm3jEIrwVVkXA"}, [
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
  'ecbf7cce-b3fb-4d0b-a8e7-d0701bfb0200',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqCsQyUHceNHnnCnRualdx100ISJAQAAAOdoF9cOAAAA; expires=Thu, 12-Nov-2020 09:22:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 09:22:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:17:47Z</Start><Expiry>2020-10-14T09:22:47Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-13T09:17:47Z</SignedStart><SignedExpiry>2020-10-14T09:22:47Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>MrIKsh4yhmIWWTbkavHjmJfh7bQ99W+W11MBkFHVIuI=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b6b-401e-0058-7742-a112ee000000',
  'x-ms-client-request-id',
  '5d5a7b48-00d6-4ecc-8320-ca98b0edc3ea',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258096686306838/blob160258096714904896')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b6e-401e-0058-7a42-a112ee000000',
  'x-ms-client-request-id',
  'ddaef1ca-71c6-486e-8c3d-8cc42b6e2dee',
  'x-ms-version',
  '2020-02-10',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 13 Oct 2020 09:22:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160258096686306838/blob160258096714904896')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b72-401e-0058-7c42-a112ee000000',
  'x-ms-client-request-id',
  'd54fc66c-f22a-4e89-bc0a-d3063796d1c1',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 09:22:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258096686306838')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b76-401e-0058-8042-a112ee000000',
  'x-ms-client-request-id',
  '6ce67b09-9e47-4b82-a8c7-627ecd21ca5d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:48 GMT'
]);
