let nock = require('nock');

module.exports.hash = "4e8bab2970aa00c6a78d62b0ecbc3c40";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071854956902712","file0":"file0162071854988809967","file1":"file1162071855020104587","file2":"file2162071855050709803","file3":"file3162071855081104382"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854956902712')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:49 GMT',
  'ETag',
  '"0x8D9144F661784B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bf2a-f01e-0012-2038-463670000000',
  'x-ms-client-request-id',
  '2154ce14-6362-47db-8673-788a0e3799c2',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:48 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854956902712/file0162071854988809967')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:50 GMT',
  'ETag',
  '"0x8D9144F6649CCCD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e634-601f-0000-0438-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a3cfea4a-cc5b-4580-905c-466adf2a614a',
  'Date',
  'Tue, 11 May 2021 07:35:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854956902712/file1162071855020104587')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:50 GMT',
  'ETag',
  '"0x8D9144F66796223"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e636-601f-0000-0638-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '04b7139d-926d-4ce4-baf3-b5c25928853f',
  'Date',
  'Tue, 11 May 2021 07:35:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854956902712/file2162071855050709803')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:50 GMT',
  'ETag',
  '"0x8D9144F66A7CA94"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e638-601f-0000-0838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9a5a063a-bc12-40bd-982c-a7c29e07791a',
  'Date',
  'Tue, 11 May 2021 07:35:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854956902712/file3162071855081104382')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:50 GMT',
  'ETag',
  '"0x8D9144F66D61548"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e64e-601f-0000-1e38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '438b50b8-bf63-42c4-aa90-15ed061b36df',
  'Date',
  'Tue, 11 May 2021 07:35:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854956902712/file0162071854988809967')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921513032981',
  'x-ms-request-id',
  '1270e689-601f-0000-5938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4d9af61d-7d16-4f45-9f7b-ec9a8554102f',
  'Date',
  'Tue, 11 May 2021 07:35:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854956902712/file1162071855020104587')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921516318165',
  'x-ms-request-id',
  '1270e6a8-601f-0000-7838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '2838be57-8fa4-46c8-9e44-762c1d14b6c7',
  'Date',
  'Tue, 11 May 2021 07:35:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854956902712/file2162071855050709803')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921519562846',
  'x-ms-request-id',
  '1270e6bd-601f-0000-0d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '039900cf-2354-4869-afe0-cdfd74439a58',
  'Date',
  'Tue, 11 May 2021 07:35:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854956902712/file3162071855081104382')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921522824418',
  'x-ms-request-id',
  '1270e6c9-601f-0000-1938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '715662f6-41d8-48aa-b6f3-40a02f8a396c',
  'Date',
  'Tue, 11 May 2021 07:35:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071854956902712')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071854956902712\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0162071854988809967</Name><DeletionId>132651921513032981</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:50 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:50 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:51 GMT</Expiry-Time><Etag>0x8D9144F6649CCCD</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:51 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071855020104587</Name><DeletionId>132651921516318165</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:50 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:50 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:51 GMT</Expiry-Time><Etag>0x8D9144F66796223</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:51 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU1URTFNamd4TXpFNE1qSTFNelV4TnpZeE56UWdNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRGN4T0RVME9UVTJPVEF5TnpFeUFUQXhSRGMwTmpNNE5ETkJNRU5HUlRNQ0wyWnBiR1V5TVRZeU1EY3hPRFUxTURVd056QTVPREF6QVRJd01qRXRNRFV0TVRGVU1EYzZNelU2TlRFdU9UVTJNamcwTmxvPSEwMDAwMjghMjAyMS0wNS0xMVQwNzozNTo1Mi42MDE5MDc2WiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c038-f01e-0012-0238-463670000000',
  'x-ms-client-request-id',
  '099038bf-2f0e-4d07-ae27-9b84bbd767a9',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071854956902712')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071854956902712\"><Marker>2!348!MDAwMjE2IU1URTFNamd4TXpFNE1qSTFNelV4TnpZeE56UWdNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRGN4T0RVME9UVTJPVEF5TnpFeUFUQXhSRGMwTmpNNE5ETkJNRU5HUlRNQ0wyWnBiR1V5TVRZeU1EY3hPRFUxTURVd056QTVPREF6QVRJd01qRXRNRFV0TVRGVU1EYzZNelU2TlRFdU9UVTJNamcwTmxvPSEwMDAwMjghMjAyMS0wNS0xMVQwNzozNTo1Mi42MDE5MDc2WiE-</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>file2162071855050709803</Name><DeletionId>132651921519562846</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:50 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:50 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:51 GMT</Expiry-Time><Etag>0x8D9144F66A7CA94</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:51 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file3162071855081104382</Name><DeletionId>132651921522824418</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:50 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:50 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:52 GMT</Expiry-Time><Etag>0x8D9144F66D61548</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:52 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c070-f01e-0012-3338-463670000000',
  'x-ms-client-request-id',
  '6a7d0849-f1bc-4800-a367-c4ed949cc918',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854956902712')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c0c9-f01e-0012-7e38-463670000000',
  'x-ms-client-request-id',
  '86a826da-e979-42ea-bfde-ae7868bbcadb',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:52 GMT'
]);
