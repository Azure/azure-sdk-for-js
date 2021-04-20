let nock = require('nock');

module.exports.hash = "42c4d5d9cfb903212bf2cbb150a1910c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061902239107530","file0":"file0162061902391607219","file1":"file1162061902530301950","file2":"file2162061902561804415"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902239107530')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:03 GMT',
  'ETag',
  '"0x8D91367AC19F53C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8ccae-801e-0045-7550-459843000000',
  'x-ms-client-request-id',
  '966f6a41-16c8-418b-adba-df26c5d3cb2e',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902239107530/file0162061902391607219')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:05 GMT',
  'ETag',
  '"0x8D91367ACFD25CF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93ae-201f-0073-5550-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '167bbd0f-f3b3-4ec4-95aa-b3d41e1fd131',
  'Date',
  'Mon, 10 May 2021 03:57:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902239107530/file1162061902530301950')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:05 GMT',
  'ETag',
  '"0x8D91367AD2D880E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93af-201f-0073-5650-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4f9c0f9f-04d3-4dc3-8b9f-b09221532298',
  'Date',
  'Mon, 10 May 2021 03:57:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902239107530/file2162061902561804415')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:06 GMT',
  'ETag',
  '"0x8D91367AD5D0CF4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93b0-201f-0073-5750-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4c29aa23-dad8-4296-853c-c0f419e89d63',
  'Date',
  'Mon, 10 May 2021 03:57:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902239107530/file0162061902391607219')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926263899808',
  'x-ms-request-id',
  '6d9f93b1-201f-0073-5850-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f3c352d7-3964-4f39-9ad4-a20f5df11c25',
  'Date',
  'Mon, 10 May 2021 03:57:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902239107530/file1162061902530301950')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926267272750',
  'x-ms-request-id',
  '6d9f93b2-201f-0073-5950-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1e1b9400-88e6-4ee5-9822-a0ab554fcf4c',
  'Date',
  'Mon, 10 May 2021 03:57:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902239107530/file2162061902561804415')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926270709313',
  'x-ms-request-id',
  '6d9f93b3-201f-0073-5a50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '79b77369-55ad-493a-998a-6d18bfc3a3a0',
  'Date',
  'Mon, 10 May 2021 03:57:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061902239107530')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061902239107530\"><Blobs><Blob><Name>file0162061902391607219</Name><DeletionId>132650926263899808</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:05 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:05 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:06 GMT</Expiry-Time><Etag>0x8D91367ACFD25CF</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:06 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061902530301950</Name><DeletionId>132650926267272750</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:05 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:05 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:06 GMT</Expiry-Time><Etag>0x8D91367AD2D880E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:06 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162061902561804415</Name><DeletionId>132650926270709313</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:06 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:06 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:07 GMT</Expiry-Time><Etag>0x8D91367AD5D0CF4</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:07 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cda8-801e-0045-3350-459843000000',
  'x-ms-client-request-id',
  '5ca0c471-78d5-4f4a-b0a0-ac54518d48db',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902239107530')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cdc4-801e-0045-4550-459843000000',
  'x-ms-client-request-id',
  '32365a76-3444-4a62-be86-6a6760177dc4',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:07 GMT'
]);
