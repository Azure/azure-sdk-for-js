let nock = require('nock');

module.exports.hash = "cec4a9b9acd128143de094ed8b8efafe";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751588702908","file0":"file0169154751602501316","file1":"file1169154751615209234","file2":"file2169154751626905167"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751588702908')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'ETag',
  '"0x8DB987EEF72F9D5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26a0f-101e-002e-0867-caab16000000',
  'x-ms-client-request-id',
  'e738b0e9-2061-4466-8d64-cff106695249',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751588702908/file0169154751602501316')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'ETag',
  '"0x8DB987EEF89C9AE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f12-f01f-0054-2a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4005cc45-deb1-4d80-b7c5-c4292d738fad',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751588702908/file1169154751615209234')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'ETag',
  '"0x8DB987EEF9C7141"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f15-f01f-0054-2d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '9edebe4a-53ea-4e5b-b398-fb981a89dfce',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751588702908/file2169154751626905167')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'ETag',
  '"0x8DB987EEFAE8678"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f16-f01f-0054-2e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'a58d7eba-0580-45f1-9738-e657a71929cd',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751588702908/file0169154751602501316')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211158729040',
  'x-ms-request-id',
  'f1673f1c-f01f-0054-3467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6e9f1b3b-a451-45bc-a500-994a2f58cc06',
  'Date',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751588702908/file1169154751615209234')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211160105969',
  'x-ms-request-id',
  'f1673f20-f01f-0054-3867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'a4b8c9e9-6607-45a4-bebb-2dffb4c0f23c',
  'Date',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751588702908/file2169154751626905167')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211161531822',
  'x-ms-request-id',
  'f1673f21-f01f-0054-3967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2b4195c7-695d-458b-bcf3-6b94539cb0aa',
  'Date',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751588702908')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154751588702908\"><Blobs><Blob><Name>file0169154751602501316</Name><DeletionId>133360211158729040</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:35 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:35 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:35 GMT</Expiry-Time><Etag>0x8DB987EEF89C9AE</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:35 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154751615209234</Name><DeletionId>133360211160105969</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:35 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:35 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:36 GMT</Expiry-Time><Etag>0x8DB987EEF9C7141</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:36 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2169154751626905167</Name><DeletionId>133360211161531822</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:35 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:35 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:36 GMT</Expiry-Time><Etag>0x8DB987EEFAE8678</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:36 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26a61-101e-002e-4067-caab16000000',
  'x-ms-client-request-id',
  '58b4d6a6-8cfb-467a-8143-8b9c1331d915',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751588702908')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26a9b-101e-002e-6e67-caab16000000',
  'x-ms-client-request-id',
  '9787a94d-7c38-4c0d-84a8-2208faa90760',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:35 GMT'
]);
