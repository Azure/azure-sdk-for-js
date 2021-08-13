let nock = require('nock');

module.exports.hash = "b3758322c506027bf41f6456fcab7b88";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071853362307361","file0":"file0162071853393000326","file1":"file1162071853423808275","file2":"file2162071853454208366"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:33 GMT',
  'ETag',
  '"0x8D9144F5C959390"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4ba19-f01e-0012-2338-463670000000',
  'x-ms-client-request-id',
  '5b014772-2ff0-48ec-ba61-6c60cae82275',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361/file0162071853393000326')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:34 GMT',
  'ETag',
  '"0x8D9144F5CC6772E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e097-601f-0000-7738-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '22b5285d-d9ff-4f95-9585-8fbce2c0f6e7',
  'Date',
  'Tue, 11 May 2021 07:35:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361/file1162071853423808275')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:34 GMT',
  'ETag',
  '"0x8D9144F5CF55251"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e099-601f-0000-7838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '19686752-d4b7-475a-bf9d-75f4d2bdd11d',
  'Date',
  'Tue, 11 May 2021 07:35:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361/file2162071853454208366')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:34 GMT',
  'ETag',
  '"0x8D9144F5D23DC11"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e09a-601f-0000-7938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'ab358b26-6050-4a70-b4b0-79d761e62237',
  'Date',
  'Tue, 11 May 2021 07:35:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853362307361/file0162071853393000326')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921350342193',
  'x-ms-request-id',
  '1270e09c-601f-0000-7a38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '27f6c533-b1c3-420e-833b-33d7bfb63ac3',
  'Date',
  'Tue, 11 May 2021 07:35:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361/file0162071853393000326')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:35 GMT',
  'ETag',
  '"0x8D9144F5D870039"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e09e-601f-0000-7b38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4d21ac13-6845-4f9a-a105-f0ac7c3222be',
  'Date',
  'Tue, 11 May 2021 07:35:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853362307361/file1162071853423808275')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921356725692',
  'x-ms-request-id',
  '1270e0a0-601f-0000-7c38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '2cb76ce1-0fda-4c05-a525-b80309cf0c51',
  'Date',
  'Tue, 11 May 2021 07:35:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361/file1162071853423808275')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:36 GMT',
  'ETag',
  '"0x8D9144F5DE73640"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e0a2-601f-0000-7d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '6d38a810-f483-4561-89b7-519f8e1b11b6',
  'Date',
  'Tue, 11 May 2021 07:35:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853362307361/file2162071853454208366')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921363026926',
  'x-ms-request-id',
  '1270e0a3-601f-0000-7e38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '52b84ac1-f6f0-4b76-a510-3decda6c1dc4',
  'Date',
  'Tue, 11 May 2021 07:35:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071853362307361/file2162071853454208366')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:36 GMT',
  'ETag',
  '"0x8D9144F5E47B8F1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e0a4-601f-0000-7f38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c85b7151-236d-4923-af00-a611c3e46849',
  'Date',
  'Tue, 11 May 2021 07:35:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071853362307361')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071853362307361\"><Blobs><Blob><Name>file0162071853393000326</Name><DeletionId>132651921350342193</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:34 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:34 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:35 GMT</Expiry-Time><Etag>0x8D9144F5CC6772E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:35 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071853423808275</Name><DeletionId>132651921356725692</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:34 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:34 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:35 GMT</Expiry-Time><Etag>0x8D9144F5CF55251</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:35 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162071853454208366</Name><DeletionId>132651921363026926</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:34 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:34 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:36 GMT</Expiry-Time><Etag>0x8D9144F5D23DC11</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:36 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bb24-f01e-0012-7638-463670000000',
  'x-ms-client-request-id',
  '6ded5131-165d-4adc-9527-d3713bdb5ead',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071853362307361')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"132651921353736249","etag":"0x8D9144F5D870039","group":"$superuser","lastModified":"Tue, 11 May 2021 07:35:35 GMT","name":"file0162071853393000326","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"132651921360041536","etag":"0x8D9144F5DE73640","group":"$superuser","lastModified":"Tue, 11 May 2021 07:35:36 GMT","name":"file1162071853423808275","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"132651921366366449","etag":"0x8D9144F5E47B8F1","group":"$superuser","lastModified":"Tue, 11 May 2021 07:35:36 GMT","name":"file2162071853454208366","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1270e0bb-601f-0000-1438-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'da9a660d-10ce-4167-ba06-0f0c0b994ddc',
  'Date',
  'Tue, 11 May 2021 07:35:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071853362307361')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bb62-f01e-0012-2638-463670000000',
  'x-ms-client-request-id',
  '01bc2123-d843-4864-ac4f-167931bc11bf',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:37 GMT'
]);
