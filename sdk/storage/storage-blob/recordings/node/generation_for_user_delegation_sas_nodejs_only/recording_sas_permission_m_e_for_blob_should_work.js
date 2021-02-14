let nock = require('nock');

module.exports.hash = "4453cdbf3eab5fad2fc553aac6916ff0";

module.exports.testInfo = {"uniqueName":{"container":"container160396130008009243","blob":"blob160396130038607462"},"newDate":{"now":"2020-10-29T08:48:19.263Z","tmr":"2020-10-29T08:48:19.263Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMzk2MDk5OSwibmJmIjoxNjAzOTYwOTk5LCJleHAiOjE2MDQwNDc2OTksImFpbyI6IkUyUmdZSWliTmF1SGIvYXhuTFVmbENva3VMWDFBUT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJYRm9rcFhLUlNVNi10N09VT1FJQ0FBIiwidmVyIjoiMS4wIn0.vDdTcox5d18zZKinJIleWLanQ7cIlwxtCMVzSpWkikHfdxiJyZMkg3NQpGFZwmuHi8Hez9sOsFdtkhR1bL_Ak0ixADPAcnt6xbpwv8-g9O30rsChePkNPrgigl96ap5783MJfFXLT0Bsq8FxaE9nmudv5pjjsyJYIESFBs7JsWqz6uchnLrO_gf8I_KhMet6YfCtNPO64srLYkzRy0cyyzjHhj4eBfDZ2P7d52P21d7MOMuVL7cd8uTOcKAX5HX3JtV1KNExX1uwnVfSEYMKGYyfKfTXzGHztQP0LLgtRn6Pb-EVZqaHpoicJ5oeUcsxfHDsN8L4gvLywkVPgc6z9g"}, [
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
  'a5245a5c-9172-4e49-beb7-b39439020200',
  'x-ms-ests-server',
  '2.1.11198.11 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AttXp76Al4JCkVVyVWbN0qZ00ISJAQAAANN4LNcOAAAA; expires=Sat, 28-Nov-2020 08:48:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 29 Oct 2020 08:48:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-29T07:48:19Z</Start><Expiry>2020-11-03T08:48:19Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-29T07:48:19Z</SignedStart><SignedExpiry>2020-11-03T08:48:19Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>t88xQDwRIGSAaSYDG2gN3cRnVPOBNXq/9d0iCoGsAys=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a0852ab-901e-0043-4cd0-adb3a1000000',
  'x-ms-client-request-id',
  'f5bf81f3-9fd3-4611-aa7b-895a65ea7c02',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396130008009243')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:20 GMT',
  'ETag',
  '"0x8D87BE7630EEB66"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085345-901e-0043-55d0-adb3a1000000',
  'x-ms-client-request-id',
  '87c9989b-281a-45ad-bc5b-d001e8d5a057',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396130008009243/blob160396130038607462', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:20 GMT',
  'ETag',
  '"0x8D87BE7633EEE03"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a0853c5-901e-0043-4ed0-adb3a1000000',
  'x-ms-client-request-id',
  'e86236eb-794f-4ce1-84f6-420150707b0f',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-29T08:48:20.5655555Z',
  'Date',
  'Thu, 29 Oct 2020 08:48:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160396130008009243/blob160396130038607462')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87BE7633EEE03"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085440-901e-0043-3fd0-adb3a1000000',
  'x-ms-client-request-id',
  '85aa5ce0-64f9-4831-bd7f-41e37e0d6584',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-29T08:48:20.5655555Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 29 Oct 2020 08:48:20 GMT',
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
  'Thu, 29 Oct 2020 08:48:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160396130008009243')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a0854a6-901e-0043-1bd0-adb3a1000000',
  'x-ms-client-request-id',
  '425ed450-96ad-4102-8297-156728841223',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:20 GMT'
]);
