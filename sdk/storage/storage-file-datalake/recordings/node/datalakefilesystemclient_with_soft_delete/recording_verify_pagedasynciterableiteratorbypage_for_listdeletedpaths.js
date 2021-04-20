let nock = require('nock');

module.exports.hash = "d85aa993f429cb86d16acc34e2eb4f0c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061904014207791","file0":"file0162061904044904065","file1":"file1162061904075308612","file2":"file2162061904105503083","file3":"file3162061904135905618"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904014207791')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:20 GMT',
  'ETag',
  '"0x8D91367B602D02B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d0d9-801e-0045-7950-459843000000',
  'x-ms-client-request-id',
  '1af4a358-6bca-4238-b757-7df119604d5b',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904014207791/file0162061904044904065')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:20 GMT',
  'ETag',
  '"0x8D91367B6339A24"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93e2-201f-0073-7750-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'ec617d6e-8db1-4295-902a-f9eff8e03cf2',
  'Date',
  'Mon, 10 May 2021 03:57:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904014207791/file1162061904075308612')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:21 GMT',
  'ETag',
  '"0x8D91367B6619360"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93e3-201f-0073-7850-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '686e41f6-a791-4448-9ca5-7d1459235f49',
  'Date',
  'Mon, 10 May 2021 03:57:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904014207791/file2162061904105503083')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:21 GMT',
  'ETag',
  '"0x8D91367B68FCE68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93e4-201f-0073-7950-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '40d299ad-5ed7-4235-8b7c-77a74baea8ac',
  'Date',
  'Mon, 10 May 2021 03:57:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904014207791/file3162061904135905618')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:21 GMT',
  'ETag',
  '"0x8D91367B6BE7ABE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93e5-201f-0073-7a50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a7d00874-baf2-40b2-a47e-a93e07b42126',
  'Date',
  'Mon, 10 May 2021 03:57:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904014207791/file0162061904044904065')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926421598148',
  'x-ms-request-id',
  '6d9f93e6-201f-0073-7b50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9aa2a783-6bdf-422f-93e0-1d7e0b7c176c',
  'Date',
  'Mon, 10 May 2021 03:57:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904014207791/file1162061904075308612')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926424904489',
  'x-ms-request-id',
  '6d9f93e8-201f-0073-7c50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '94d73ecb-87ad-45c7-9f6b-ff1b04e42bb2',
  'Date',
  'Mon, 10 May 2021 03:57:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904014207791/file2162061904105503083')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926428177911',
  'x-ms-request-id',
  '6d9f93ea-201f-0073-7d50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a4a06e37-be15-4678-8e74-bda87fedd9a9',
  'Date',
  'Mon, 10 May 2021 03:57:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904014207791/file3162061904135905618')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926432107675',
  'x-ms-request-id',
  '6d9f93ee-201f-0073-7f50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a8a40381-ce87-48e1-aa2e-a152d5b6da34',
  'Date',
  'Mon, 10 May 2021 03:57:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061904014207791')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061904014207791\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0162061904044904065</Name><DeletionId>132650926421598148</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:20 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:20 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:22 GMT</Expiry-Time><Etag>0x8D91367B6339A24</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:22 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061904075308612</Name><DeletionId>132650926424904489</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:21 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:21 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:22 GMT</Expiry-Time><Etag>0x8D91367B6619360</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:22 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU1UTTRPVEl3TkRjek9UazBPVE0zTVRNNE5UTWdNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRFl4T1RBME1ERTBNakEzTnpreEFUQXhSRGMwTlRVd09UTTRRelEzUlRFQ0wyWnBiR1V5TVRZeU1EWXhPVEEwTVRBMU5UQXpNRGd6QVRJd01qRXRNRFV0TVRCVU1ETTZOVGM2TWpJdU9ERTNOemt4TVZvPSEwMDAwMjghMjAyMS0wNS0xMFQwMzo1NzoyMy41NjM1NzgwWiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d171-801e-0045-6950-459843000000',
  'x-ms-client-request-id',
  '1148e722-1330-4824-b01a-fbf3c7e070b0',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061904014207791')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061904014207791\"><Marker>2!348!MDAwMjE2IU1UTTRPVEl3TkRjek9UazBPVE0zTVRNNE5UTWdNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRFl4T1RBME1ERTBNakEzTnpreEFUQXhSRGMwTlRVd09UTTRRelEzUlRFQ0wyWnBiR1V5TVRZeU1EWXhPVEEwTVRBMU5UQXpNRGd6QVRJd01qRXRNRFV0TVRCVU1ETTZOVGM2TWpJdU9ERTNOemt4TVZvPSEwMDAwMjghMjAyMS0wNS0xMFQwMzo1NzoyMy41NjM1NzgwWiE-</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>file2162061904105503083</Name><DeletionId>132650926428177911</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:21 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:21 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:22 GMT</Expiry-Time><Etag>0x8D91367B68FCE68</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:22 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file3162061904135905618</Name><DeletionId>132650926432107675</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:21 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:21 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:23 GMT</Expiry-Time><Etag>0x8D91367B6BE7ABE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:23 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d190-801e-0045-7f50-459843000000',
  'x-ms-client-request-id',
  '2548aeeb-535a-4a1c-9876-46c9404552bf',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904014207791')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d1c2-801e-0045-2950-459843000000',
  'x-ms-client-request-id',
  '1df3563e-7cbe-40f0-bcab-d32e4b8c98dd',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:24 GMT'
]);
