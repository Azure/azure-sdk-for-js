let nock = require('nock');

module.exports.hash = "588b83158e8e20b437fbbf8700352a97";

module.exports.testInfo = {"uniqueName":{"container":"container160988771226706216","blob":"blob160988771257809387"},"newDate":{"now":"2021-01-05T23:01:51.545Z","tmr":"2021-01-05T23:01:51.545Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwOTg4NzQxMSwibmJmIjoxNjA5ODg3NDExLCJleHAiOjE2MDk5NzQxMTEsImFpbyI6IkUySmdZRmhwekhEcTNKTHZvbjEyd2h3L0ZSMTJBQUE9IiwiYXBwaWQiOiI2YTY4OTQyYi1iOTdiLTQyMjAtOWRmOC0wMjBhMWEyMjhmZDgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiOWY4MGVjYjAtMjE5Zi00NDgyLThjZGItYjRiYjczNTk5NGVmIiwicmgiOiIwLkFSb0F2NGo1Y3ZHR3IwR1JxeTE4MEJIYlJ5dVVhR3A3dVNCQ25mZ0NDaG9pajlnYUFBQS4iLCJzdWIiOiI5ZjgwZWNiMC0yMTlmLTQ0ODItOGNkYi1iNGJiNzM1OTk0ZWYiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJoblVQU1VFV3dFcURmRVQ5bi1RTkFBIiwidmVyIjoiMS4wIn0.buL6kbDKIn9STv-9SJeyQ3TduHKQrbMrZlDnfltdvGT7nyzKgf-6F4A2eszEghR59v0QiNH9BC-7SddEqWpX-nuU4xeaDhG8TqiLs4MShWZAYwK5fyAUyGt18iSwyPXcM0Z07hDSzrz727ZYAwDS09hSRJJdDMIHB4eJuOMFTqxMxVUyOl3GhQhY2DxJz18PD5xg2IgmIPWByRrsznf1nYmzY4yrp80eRe8vqS0Ojp8-NXy79Vnj5PxmTpIHW2iV1uQMy-9QJrpyX2QQJ-WJkidO34ks2IRw1KTSnXZuRaPplJ6_vkI7RpRwWhpFv2Ap3pZNRF3vwMi-plXocMyUfQ"}, [
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
  '490f7586-1641-4ac0-837c-44fd9fe40d00',
  'x-ms-ests-server',
  '2.1.11384.3 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjSEoJJ5gTZIrDPnOgnDDwW_X3PmAQAAAN_mhtcOAAAA; expires=Thu, 04-Feb-2021 23:01:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 05 Jan 2021 23:01:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-01-05T22:01:51Z</Start><Expiry>2021-01-10T23:01:51Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>9f80ecb0-219f-4482-8cdb-b4bb735994ef</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-01-05T22:01:51Z</SignedStart><SignedExpiry>2021-01-10T23:01:51Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-04-08</SignedVersion><Value>b2onX8xacOPY71RlFPs5p7Zd3bfTs51M9qmM41oatqo=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bbe0168-001e-0062-64b6-e33443000000',
  'x-ms-client-request-id',
  '1b299724-5b0e-4c64-86e8-d431debf0455',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 23:01:51 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988771226706216')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 05 Jan 2021 23:01:52 GMT',
  'ETag',
  '"0x8D8B1CDE409955C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '92400adc-901e-006c-21b6-e3d848000000',
  'x-ms-client-request-id',
  'ed82f4f2-aa6f-4807-8d92-8a26333dc46c',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 23:01:51 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160988771226706216/blob160988771257809387', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Jan 2021 23:01:52 GMT',
  'ETag',
  '"0x8D8B1CDE437FF72"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0472baad-401e-0065-4fb6-e3c2c6000000',
  'x-ms-client-request-id',
  'dcabca60-690c-4bb1-927f-687f2b932be0',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Jan 2021 23:01:52 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160988771226706216')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160988771226706216\"><Blobs><Blob><Name>blob160988771257809387</Name><Properties><Creation-Time>Tue, 05 Jan 2021 23:01:52 GMT</Creation-Time><Last-Modified>Tue, 05 Jan 2021 23:01:52 GMT</Last-Modified><Etag>0x8D8B1CDE437FF72</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a9c980f-801e-00d2-28b6-e3cdc3000000',
  'x-ms-client-request-id',
  'a6121bd3-937e-4949-b3b9-cfbcb27a14ee',
  'x-ms-version',
  '2020-04-08',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 05 Jan 2021 23:01:52 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160988771226706216')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ac19acc4-501e-00f2-4bb6-e3a10f000000',
  'x-ms-client-request-id',
  '97ea6ad6-72da-4178-a1c1-40c770c1d4db',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 05 Jan 2021 23:01:53 GMT',
  'Connection',
  'close'
]);
