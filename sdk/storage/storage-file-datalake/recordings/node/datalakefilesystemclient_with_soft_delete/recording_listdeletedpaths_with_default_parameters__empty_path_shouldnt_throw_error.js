let nock = require('nock');

module.exports.hash = "00722fce24a677fead3ab1cb706089ef";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154752136704627","file0":"file0169154752150505901","file1":"file1169154752164405806","file2":"file2169154752177509537"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752136704627')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'ETag',
  '"0x8DB987EF2B7494F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26c37-101e-002e-4d67-caab16000000',
  'x-ms-client-request-id',
  '67b71ef2-8c87-4e59-9ba1-72effcedb261',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752136704627/file0169154752150505901')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'ETag',
  '"0x8DB987EF2CDB660"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f93-f01f-0054-2967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b451cf97-9cc7-45de-9b28-577b4edf0e37',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752136704627/file1169154752164405806')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:41 GMT',
  'ETag',
  '"0x8DB987EF2E27981"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f94-f01f-0054-2a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2b87fc8f-ac12-4fae-aa5a-f19972d998eb',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752136704627/file2169154752177509537')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:41 GMT',
  'ETag',
  '"0x8DB987EF2F65519"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f97-f01f-0054-2d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8a8a4283-e559-43c7-b5ca-a7f177e2a70a',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752136704627/file0169154752150505901')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211214002465',
  'x-ms-request-id',
  'f1673f9b-f01f-0054-3167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ec625da9-a058-4f8d-a68e-18282daee9a7',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752136704627/file1169154752164405806')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211215451879',
  'x-ms-request-id',
  'f1673f9e-f01f-0054-3467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '84c832c2-7bfa-4ab1-b180-91c0c60f2919',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752136704627/file2169154752177509537')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211216841876',
  'x-ms-request-id',
  'f1673fa1-f01f-0054-3767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'fd5f5319-b68b-4a3f-ae87-2384668d814d',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752136704627')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752136704627\"><Blobs><Blob><Name>file0169154752150505901</Name><DeletionId>133360211214002465</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:40 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:40 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:41 GMT</Expiry-Time><Etag>0x8DB987EF2CDB660</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:41 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154752164405806</Name><DeletionId>133360211215451879</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:41 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:41 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:41 GMT</Expiry-Time><Etag>0x8DB987EF2E27981</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:41 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2169154752177509537</Name><DeletionId>133360211216841876</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:41 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:41 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:41 GMT</Expiry-Time><Etag>0x8DB987EF2F65519</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:41 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26c70-101e-002e-7767-caab16000000',
  'x-ms-client-request-id',
  'b896ac34-2d4b-45e7-91ae-5f4e9e719a14',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752136704627')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26c86-101e-002e-0967-caab16000000',
  'x-ms-client-request-id',
  '4f9070b1-3bb2-40c2-ac06-acf3cf435b4b',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:41 GMT'
]);
