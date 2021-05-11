let nock = require('nock');

module.exports.hash = "6ecae5ecede13b98c43cb3f2b4399f74";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071854358604344","file0":"file0162071854389905385","file1":"file1162071854420800484","file2":"file2162071854451208759","file3":"file3162071854481709370"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854358604344')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:43 GMT',
  'ETag',
  '"0x8D9144F62862E2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bd6d-f01e-0012-4138-463670000000',
  'x-ms-client-request-id',
  'c5e3af8c-da45-4c24-8e1e-5c97580d08fc',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854358604344/file0162071854389905385')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:44 GMT',
  'ETag',
  '"0x8D9144F62B86B99"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e4f9-601f-0000-5038-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '5487d1b8-73cd-43fc-9659-a548dbe559ea',
  'Date',
  'Tue, 11 May 2021 07:35:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854358604344/file1162071854420800484')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:44 GMT',
  'ETag',
  '"0x8D9144F62E6FDA2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e50a-601f-0000-5f38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '12249977-2169-4424-8bac-3e5da3893b59',
  'Date',
  'Tue, 11 May 2021 07:35:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854358604344/file2162071854451208759')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:44 GMT',
  'ETag',
  '"0x8D9144F6315A2A7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e561-601f-0000-3638-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e938d747-613a-4d42-836c-60475e8ada16',
  'Date',
  'Tue, 11 May 2021 07:35:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854358604344/file3162071854481709370')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:45 GMT',
  'ETag',
  '"0x8D9144F63442877"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e589-601f-0000-5e38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f3eab061-9df2-4729-bfe9-d8e665924e7a',
  'Date',
  'Tue, 11 May 2021 07:35:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854358604344/file0162071854389905385')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921453074501',
  'x-ms-request-id',
  '1270e5a3-601f-0000-7838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '81a6dcdc-33f7-4cf7-a19a-095f2af103e2',
  'Date',
  'Tue, 11 May 2021 07:35:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854358604344/file1162071854420800484')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921456369633',
  'x-ms-request-id',
  '1270e5bd-601f-0000-1238-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e1106bb4-2a71-4b25-a9f1-7fe044858218',
  'Date',
  'Tue, 11 May 2021 07:35:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854358604344/file2162071854451208759')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921459692321',
  'x-ms-request-id',
  '1270e5d6-601f-0000-2b38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f2352bff-a3e3-407e-97a9-65e45a09c685',
  'Date',
  'Tue, 11 May 2021 07:35:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854358604344/file3162071854481709370')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921463000528',
  'x-ms-request-id',
  '1270e5e3-601f-0000-3738-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '757169a6-5dc1-492b-9241-dde971061bb5',
  'Date',
  'Tue, 11 May 2021 07:35:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071854358604344')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071854358604344\"><Blobs><Blob><Name>file0162071854389905385</Name><DeletionId>132651921453074501</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:44 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:44 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:45 GMT</Expiry-Time><Etag>0x8D9144F62B86B99</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:45 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071854420800484</Name><DeletionId>132651921456369633</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:44 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:44 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:45 GMT</Expiry-Time><Etag>0x8D9144F62E6FDA2</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:45 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162071854451208759</Name><DeletionId>132651921459692321</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:44 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:44 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:45 GMT</Expiry-Time><Etag>0x8D9144F6315A2A7</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:45 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file3162071854481709370</Name><DeletionId>132651921463000528</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:45 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:45 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:46 GMT</Expiry-Time><Etag>0x8D9144F63442877</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:46 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4be47-f01e-0012-6c38-463670000000',
  'x-ms-client-request-id',
  '196aa083-7e0f-4e23-858e-38b26811fdb1',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854358604344')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4be77-f01e-0012-0c38-463670000000',
  'x-ms-client-request-id',
  '286faa27-fc16-4f1a-9c9c-830e981a1989',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:46 GMT'
]);
