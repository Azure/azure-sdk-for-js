let nock = require('nock');

module.exports.hash = "f1636280634906eb58f36f2b1cd8c3a7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061904461308001","file0":"file0162061904492201378","file1":"file1162061904523306349","file2":"file2162061904553906317","file3":"file3162061904584106363"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904461308001')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:25 GMT',
  'ETag',
  '"0x8D91367B8AD1A56"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d1f0-801e-0045-4e50-459843000000',
  'x-ms-client-request-id',
  'cbf32144-3959-41f1-804f-53f397e7836e',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904461308001/file0162061904492201378')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:25 GMT',
  'ETag',
  '"0x8D91367B8DEB362"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93f1-201f-0073-8050-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '79e1172d-d405-4fd2-aa0b-32d90a40ae13',
  'Date',
  'Mon, 10 May 2021 03:57:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904461308001/file1162061904523306349')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:25 GMT',
  'ETag',
  '"0x8D91367B90D8AC4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93f2-201f-0073-0150-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '083db409-0610-4915-93f7-65e6dff4f1b5',
  'Date',
  'Mon, 10 May 2021 03:57:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904461308001/file2162061904553906317')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:25 GMT',
  'ETag',
  '"0x8D91367B93B93A3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93f3-201f-0073-0250-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f09dc029-0a09-4434-84c0-7e32c5a8c5eb',
  'Date',
  'Mon, 10 May 2021 03:57:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904461308001/file3162061904584106363')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:26 GMT',
  'ETag',
  '"0x8D91367B96A09B3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93f4-201f-0073-0350-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '2af385de-a1ff-47f4-89f5-a96c65fb21a6',
  'Date',
  'Mon, 10 May 2021 03:57:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904461308001/file0162061904492201378')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926466939831',
  'x-ms-request-id',
  '6d9f93f5-201f-0073-0450-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9a241a06-6d0b-4de0-b366-f708a1acac12',
  'Date',
  'Mon, 10 May 2021 03:57:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904461308001/file1162061904523306349')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926470300840',
  'x-ms-request-id',
  '6d9f93f6-201f-0073-0550-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4cf87c6b-622f-4575-80ee-b87302c6582c',
  'Date',
  'Mon, 10 May 2021 03:57:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904461308001/file2162061904553906317')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926473973921',
  'x-ms-request-id',
  '6d9f93f8-201f-0073-0650-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'd0ac7962-c69d-4ebf-80c0-164d61629958',
  'Date',
  'Mon, 10 May 2021 03:57:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904461308001/file3162061904584106363')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926478051552',
  'x-ms-request-id',
  '6d9f93f9-201f-0073-0750-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '7d4f6a53-e4cf-4e25-95fc-ce151d537f49',
  'Date',
  'Mon, 10 May 2021 03:57:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061904461308001')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061904461308001\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0162061904492201378</Name><DeletionId>132650926466939831</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:25 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:25 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:26 GMT</Expiry-Time><Etag>0x8D91367B8DEB362</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:26 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061904523306349</Name><DeletionId>132650926470300840</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:25 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:25 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:27 GMT</Expiry-Time><Etag>0x8D91367B90D8AC4</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:27 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU1UUXlNVEkxTkRneU1UVTRORGc1TkRnMk5UVWdNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRFl4T1RBME5EWXhNekE0TURBeEFUQXhSRGMwTlRVd09UWXpOamt3UlVZQ0wyWnBiR1V5TVRZeU1EWXhPVEEwTlRVek9UQTJNekUzQVRJd01qRXRNRFV0TVRCVU1ETTZOVGM2TWpjdU16azNNemt5TVZvPSEwMDAwMjghMjAyMS0wNS0xMFQwMzo1NzoyOC4xNDI5NzAwWiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d2ae-801e-0045-5350-459843000000',
  'x-ms-client-request-id',
  '08b6f384-f1a4-4f73-96ef-b90af911d3b6',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061904461308001')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061904461308001\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0162061904492201378</Name><DeletionId>132650926466939831</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:25 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:25 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:26 GMT</Expiry-Time><Etag>0x8D91367B8DEB362</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:26 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061904523306349</Name><DeletionId>132650926470300840</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:25 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:25 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:27 GMT</Expiry-Time><Etag>0x8D91367B90D8AC4</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:27 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU1UUXlNVEkxTkRneU1UVTRORGc1TkRnMk5UVWdNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRFl4T1RBME5EWXhNekE0TURBeEFUQXhSRGMwTlRVd09UWXpOamt3UlVZQ0wyWnBiR1V5TVRZeU1EWXhPVEEwTlRVek9UQTJNekUzQVRJd01qRXRNRFV0TVRCVU1ETTZOVGM2TWpjdU16azNNemt5TVZvPSEwMDAwMjghMjAyMS0wNS0xMFQwMzo1NzoyOC43MjA2NDA3WiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d2c6-801e-0045-6650-459843000000',
  'x-ms-client-request-id',
  '730a4aea-3b63-4bd5-a913-c2263d94ab13',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904461308001')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d2e6-801e-0045-7e50-459843000000',
  'x-ms-client-request-id',
  '673ff644-85c1-4ad4-b1e3-ed43b6c3a41c',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:28 GMT'
]);
