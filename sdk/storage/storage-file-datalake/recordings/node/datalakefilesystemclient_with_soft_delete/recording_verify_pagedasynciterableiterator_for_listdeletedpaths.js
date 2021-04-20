let nock = require('nock');

module.exports.hash = "e10d02ed9a484f6aacd656fe2cbdba60";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061903392008730","file0":"file0162061903422903301","file1":"file1162061903455306640","file2":"file2162061903485700894","file3":"file3162061903516606006"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903392008730')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:14 GMT',
  'ETag',
  '"0x8D91367B24DA589"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cf66-801e-0045-7150-459843000000',
  'x-ms-client-request-id',
  'de7a4977-08b1-45ed-b194-4587bcc4c4ea',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:13 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903392008730/file0162061903422903301')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:14 GMT',
  'ETag',
  '"0x8D91367B280E44F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93d1-201f-0073-6850-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '5e5a582e-f39e-4dc1-baad-4e1e11e0b570',
  'Date',
  'Mon, 10 May 2021 03:57:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903392008730/file1162061903455306640')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:15 GMT',
  'ETag',
  '"0x8D91367B2AF7FF9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93d2-201f-0073-6950-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'b29656ea-50cb-459c-9d88-b34a5480bc27',
  'Date',
  'Mon, 10 May 2021 03:57:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903392008730/file2162061903485700894')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:15 GMT',
  'ETag',
  '"0x8D91367B2DE307E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93d3-201f-0073-6a50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '12b29b31-4283-48a0-a9e9-d4e6c1d112ab',
  'Date',
  'Mon, 10 May 2021 03:57:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903392008730/file3162061903516606006')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:15 GMT',
  'ETag',
  '"0x8D91367B30D490D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93d4-201f-0073-6b50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '8bd8ee83-a855-4231-8cb9-50a63dd82d6f',
  'Date',
  'Mon, 10 May 2021 03:57:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903392008730/file0162061903422903301')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926360030953',
  'x-ms-request-id',
  '6d9f93d5-201f-0073-6c50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1f61ae27-a2db-41b4-85e0-e90170be412e',
  'Date',
  'Mon, 10 May 2021 03:57:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903392008730/file1162061903455306640')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926363276276',
  'x-ms-request-id',
  '6d9f93d6-201f-0073-6d50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'fc1b0e42-1be2-4511-a758-2cae040404cb',
  'Date',
  'Mon, 10 May 2021 03:57:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903392008730/file2162061903485700894')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926366391666',
  'x-ms-request-id',
  '6d9f93d7-201f-0073-6e50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '0ae9b82c-18db-4efa-a018-90910182df9d',
  'Date',
  'Mon, 10 May 2021 03:57:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903392008730/file3162061903516606006')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926369983590',
  'x-ms-request-id',
  '6d9f93d8-201f-0073-6f50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '05c369e4-258f-406e-8b20-7fe384563534',
  'Date',
  'Mon, 10 May 2021 03:57:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061903392008730')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061903392008730\"><Blobs><Blob><Name>file0162061903422903301</Name><DeletionId>132650926360030953</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:14 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:14 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:15 GMT</Expiry-Time><Etag>0x8D91367B280E44F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:16 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061903455306640</Name><DeletionId>132650926363276276</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:15 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:15 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:16 GMT</Expiry-Time><Etag>0x8D91367B2AF7FF9</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:16 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162061903485700894</Name><DeletionId>132650926366391666</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:15 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:15 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:16 GMT</Expiry-Time><Etag>0x8D91367B2DE307E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:16 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file3162061903516606006</Name><DeletionId>132650926369983590</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:15 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:15 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:16 GMT</Expiry-Time><Etag>0x8D91367B30D490D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:16 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d020-801e-0045-7550-459843000000',
  'x-ms-client-request-id',
  'c56b66f8-b970-45d0-8a15-772e8eb77919',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903392008730')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d048-801e-0045-0d50-459843000000',
  'x-ms-client-request-id',
  '9383613d-ea1b-413b-8f70-bbc22f03d723',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:17 GMT'
]);
