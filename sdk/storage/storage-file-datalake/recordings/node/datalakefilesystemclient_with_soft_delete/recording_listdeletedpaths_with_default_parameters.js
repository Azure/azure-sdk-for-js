let nock = require('nock');

module.exports.hash = "78e1b0f24d8db86103f4ba9a3832e34a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071852821405277","file0":"file0162071852972209879","file1":"file1162071853106002323","file2":"file2162071853136707481"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071852821405277')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:29 GMT',
  'ETag',
  '"0x8D9144F5A029CC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4b8b5-f01e-0012-2538-463670000000',
  'x-ms-client-request-id',
  'ab6efc68-6ad0-46f4-a906-9f85b62840e7',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:28 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071852821405277/file0162071852972209879')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:30 GMT',
  'ETag',
  '"0x8D9144F5AE1C91B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270dfae-601f-0000-1338-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'afef3030-146a-4547-aba2-237929d40db7',
  'Date',
  'Tue, 11 May 2021 07:35:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071852821405277/file1162071853106002323')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:31 GMT',
  'ETag',
  '"0x8D9144F5B10A530"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270dfc5-601f-0000-2a38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '070ff002-a833-42aa-85e6-e6b4194f43de',
  'Date',
  'Tue, 11 May 2021 07:35:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071852821405277/file2162071853136707481')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:31 GMT',
  'ETag',
  '"0x8D9144F5B3F7C7F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270dfff-601f-0000-6338-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '32e939e4-89ac-4ad7-84fc-bf7b16f04000',
  'Date',
  'Tue, 11 May 2021 07:35:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071852821405277/file0162071852972209879')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921318626418',
  'x-ms-request-id',
  '1270e032-601f-0000-1638-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '80baba2d-bf14-40d6-bc5e-792a1f993db5',
  'Date',
  'Tue, 11 May 2021 07:35:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071852821405277/file1162071853106002323')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921321982615',
  'x-ms-request-id',
  '1270e049-601f-0000-2d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9d6d9f26-c2d8-4d3c-88f7-6e4424fb475e',
  'Date',
  'Tue, 11 May 2021 07:35:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071852821405277/file2162071853136707481')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921325321283',
  'x-ms-request-id',
  '1270e05c-601f-0000-4038-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'b1e31402-4735-4904-af23-d44b90fab9fe',
  'Date',
  'Tue, 11 May 2021 07:35:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071852821405277')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071852821405277\"><Blobs><Blob><Name>file0162071852972209879</Name><DeletionId>132651921318626418</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:30 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:30 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:31 GMT</Expiry-Time><Etag>0x8D9144F5AE1C91B</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:31 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071853106002323</Name><DeletionId>132651921321982615</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:31 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:31 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:32 GMT</Expiry-Time><Etag>0x8D9144F5B10A530</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:32 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162071853136707481</Name><DeletionId>132651921325321283</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:31 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:31 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:32 GMT</Expiry-Time><Etag>0x8D9144F5B3F7C7F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:32 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4b9c5-f01e-0012-6438-463670000000',
  'x-ms-client-request-id',
  'bfd663f0-84f3-4378-b01a-32d3456d464f',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071852821405277')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4ba05-f01e-0012-1638-463670000000',
  'x-ms-client-request-id',
  '370c851e-4e07-4dda-8dc3-87a62729007c',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:32 GMT'
]);
