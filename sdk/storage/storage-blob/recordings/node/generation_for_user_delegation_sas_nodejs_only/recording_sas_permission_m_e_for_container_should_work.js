let nock = require('nock');

module.exports.hash = "588b83158e8e20b437fbbf8700352a97";

module.exports.testInfo = {"uniqueName":{"container":"container160396130211609362","blob":"blob160396130242003701"},"newDate":{"now":"2020-10-29T08:48:21.340Z","tmr":"2020-10-29T08:48:21.340Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMzk2MTAwMSwibmJmIjoxNjAzOTYxMDAxLCJleHAiOjE2MDQwNDc3MDEsImFpbyI6IkUyUmdZTENMbGtwYXJmcnJ4czJFbjFaNi9pWXlBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJfeFMyNC1OZmYwR1BsZ01UeXdjQ0FBIiwidmVyIjoiMS4wIn0.fPhRCQ0Dnhq4u-E6CCYZPZ22RVBbhShpdq2M05TtmRJJo4dd1JFhVX6AKyl6nWKcJcNuYfo2zAtEWk72DGH1mJ00L63trfL5IW3XUwUS9o1oqScIcLaTwVGGUV-lvNGkxJZQm81N0cwNUNzMsvkRygGBxse9AKROcm0WkvppT15gwIHd9qrkLt0ucUKmdAZjC0hR8L6nJU7oVtbmBYNQ8koHJzNzRRJ-iMBv2KQ9Oct_ejKCTLeK48jQcYMcW9yrQGl__qB6h_sR3QJ_Ank9ijJof_bxbgKhjUcezkhqNvTExhOGmQfG5tND6UOQnWIZatiY491FwOWg9I2DWloNbw"}, [
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
  'e3b614ff-5fe3-417f-8f96-0313cb070200',
  'x-ms-ests-server',
  '2.1.11198.11 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArM7C2PmjwxMtFvPoYHbDdN00ISJAQAAANV4LNcOAAAA; expires=Sat, 28-Nov-2020 08:48:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 29 Oct 2020 08:48:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-29T07:48:21Z</Start><Expiry>2020-11-03T08:48:21Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-29T07:48:21Z</SignedStart><SignedExpiry>2020-11-03T08:48:21Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>tl9C2yhl9QizlT9DzvGVdEmQT1/gSz8S+ATyvRdIXLA=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085616-901e-0043-7dd0-adb3a1000000',
  'x-ms-client-request-id',
  '0abcf6e7-deae-4336-88b4-0593502287c4',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396130211609362')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:22 GMT',
  'ETag',
  '"0x8D87BE7644559FE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085699-901e-0043-73d0-adb3a1000000',
  'x-ms-client-request-id',
  '9700e736-e1ac-4b04-98c4-3194d46274cf',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396130211609362/blob160396130242003701', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:22 GMT',
  'ETag',
  '"0x8D87BE76473FD93"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085707-901e-0043-55d0-adb3a1000000',
  'x-ms-client-request-id',
  'c62b0a09-6162-49b6-bef0-2a211eb2da02',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-29T08:48:22.5910163Z',
  'Date',
  'Thu, 29 Oct 2020 08:48:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160396130211609362')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160396130211609362\"><Blobs><Blob><Name>blob160396130242003701</Name><VersionId>2020-10-29T08:48:22.5910163Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 29 Oct 2020 08:48:22 GMT</Creation-Time><Last-Modified>Thu, 29 Oct 2020 08:48:22 GMT</Last-Modified><Etag>0x8D87BE76473FD93</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085773-901e-0043-35d0-adb3a1000000',
  'x-ms-client-request-id',
  '53342230-9bc0-42a4-805a-438426cd6b0d',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 29 Oct 2020 08:48:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160396130211609362')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a0857e8-901e-0043-1fd0-adb3a1000000',
  'x-ms-client-request-id',
  'b15c1cf1-cd36-4a6e-92bb-cc943cb84046',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:22 GMT'
]);
