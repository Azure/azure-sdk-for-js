let nock = require('nock');

module.exports.hash = "c2afa9019f39a2afbbe91cf81402a53a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154752829802843","file0":"file0169154752844302571","file1":"file1169154752857200683","file2":"file2169154752868501277","file3":"file3169154752880501884"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752829802843')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'ETag',
  '"0x8DB987EF6D8DFE6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27075-101e-002e-7467-caab16000000',
  'x-ms-client-request-id',
  '2bee4096-c523-40ba-9275-b489f15f06e2',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:46 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752829802843/file0169154752844302571')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'ETag',
  '"0x8DB987EF6F0840E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674346-f01f-0054-5467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0a85f8d6-82a1-4103-86b7-de8517032411',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752829802843/file1169154752857200683')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:48 GMT',
  'ETag',
  '"0x8DB987EF703A333"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674358-f01f-0054-6667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7972fcff-9a0e-4d7e-8554-fd5bcfe9ed1b',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752829802843/file2169154752868501277')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:48 GMT',
  'ETag',
  '"0x8DB987EF714AAE3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674369-f01f-0054-7767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2de95504-3618-4d0f-93a9-ea32a1d4c15d',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752829802843/file3169154752880501884')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:48 GMT',
  'ETag',
  '"0x8DB987EF727B654"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674382-f01f-0054-1067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '71372a79-2633-4d31-a829-f5a257532bab',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752829802843/file0169154752844302571')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211284227043',
  'x-ms-request-id',
  'f1674392-f01f-0054-2067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7fbc0dd6-fd70-4255-96f7-cbbc645aafcb',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752829802843/file1169154752857200683')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211285660629',
  'x-ms-request-id',
  'f16743b3-f01f-0054-4167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c85693f7-7877-4677-81bf-e3a97cf5cd8b',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752829802843/file2169154752868501277')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211287041677',
  'x-ms-request-id',
  'f16743cc-f01f-0054-5967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e4f3b3b7-fb52-406e-9fec-f7ff08f13d1f',
  'Date',
  'Wed, 09 Aug 2023 02:18:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752829802843/file3169154752880501884')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211288461301',
  'x-ms-request-id',
  'f16743dc-f01f-0054-6967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '14800b5a-902d-4d59-957e-0e2ddb4365b3',
  'Date',
  'Wed, 09 Aug 2023 02:18:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752829802843')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752829802843\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0169154752844302571</Name><DeletionId>133360211284227043</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:47 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:47 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:48 GMT</Expiry-Time><Etag>0x8DB987EF6F0840E</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:48 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154752857200683</Name><DeletionId>133360211285660629</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:48 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:48 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:48 GMT</Expiry-Time><Etag>0x8DB987EF703A333</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:48 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!344!MDAwMjEyIVZCYU92NHlZaHN2Ymxnb1lqd0VZaVFFdlpXMXRZV1JoZEdGc1lXdGxBVEF4UkRaR1FUQXdNREU1TVRZMU16Y3ZKSFJ5WVhOb0wyWnBiR1Z6ZVhOMFpXMHhOamt4TlRRM05USTRNams0TURJNE5ETUJNREZFT1VOQk5qZEVORFl5TXpBeE53SXZabWxzWlRJeE5qa3hOVFEzTlRJNE5qZzFNREV5TnpjQk1qQXlNeTB3T0Mwd09WUXdNam94T0RvME9DNDNNRFF4TmpjM1doWUFBQUE9ITAwMDAyOCEyMDIzLTA4LTA5VDAyOjE4OjQ5LjAwMDk1OTFaIQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c270bc-101e-002e-2f67-caab16000000',
  'x-ms-client-request-id',
  'affc7483-f5c9-42b7-9c64-f6031fc26a82',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752829802843')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752829802843\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0169154752844302571</Name><DeletionId>133360211284227043</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:47 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:47 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:48 GMT</Expiry-Time><Etag>0x8DB987EF6F0840E</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:48 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154752857200683</Name><DeletionId>133360211285660629</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:48 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:48 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:48 GMT</Expiry-Time><Etag>0x8DB987EF703A333</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:48 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!344!MDAwMjEyIVZCYU92NHlZaHN2Ymxnb1lqd0VZaVFFdlpXMXRZV1JoZEdGc1lXdGxBVEF4UkRaR1FUQXdNREU1TVRZMU16Y3ZKSFJ5WVhOb0wyWnBiR1Z6ZVhOMFpXMHhOamt4TlRRM05USTRNams0TURJNE5ETUJNREZFT1VOQk5qZEVORFl5TXpBeE53SXZabWxzWlRJeE5qa3hOVFEzTlRJNE5qZzFNREV5TnpjQk1qQXlNeTB3T0Mwd09WUXdNam94T0RvME9DNDNNRFF4TmpjM1doWUFBQUE9ITAwMDAyOCEyMDIzLTA4LTA5VDAyOjE4OjQ5LjI1NzgxMDBaIQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c270d9-101e-002e-4467-caab16000000',
  'x-ms-client-request-id',
  '4173483d-a105-48bc-9b11-db89c76d93c7',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752829802843')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c270e7-101e-002e-4f67-caab16000000',
  'x-ms-client-request-id',
  '01e8d515-aa57-4f9e-ac97-9f6166e70ac6',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:48 GMT'
]);
