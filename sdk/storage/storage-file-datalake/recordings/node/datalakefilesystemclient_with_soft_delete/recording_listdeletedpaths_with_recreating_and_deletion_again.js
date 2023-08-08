let nock = require('nock');

module.exports.hash = "c2d92a96861e979abfbc97ee221523e0";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751915200372","file0":"file0169154751928309265","file1":"file1169154751942300278","file2":"file2169154751956208510"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'ETag',
  '"0x8DB987EF1653191"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26ba8-101e-002e-5567-caab16000000',
  'x-ms-client-request-id',
  'c3913f5b-7cdc-4ea5-85f3-503dc2a2ced0',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:37 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372/file0169154751928309265')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'ETag',
  '"0x8DB987EF17AACAA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f44-f01f-0054-5b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1768a145-aa2f-48c4-b138-7f03651beeef',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372/file1169154751942300278')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'ETag',
  '"0x8DB987EF18F886F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f47-f01f-0054-5e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2a6994aa-bbb7-41a0-88f3-da64bc5deacf',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372/file2169154751956208510')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'ETag',
  '"0x8DB987EF1A4D596"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f4c-f01f-0054-6367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b6172b04-a4f8-4644-9f6c-0bf376b1b33d',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372/file0169154751928309265')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211191854139',
  'x-ms-request-id',
  'f1673f5b-f01f-0054-7267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6ecaa245-dbc7-4af5-a352-856e2fad16aa',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372/file0169154751928309265')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'ETag',
  '"0x8DB987EF1D16355"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f6c-f01f-0054-0367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'dd5c170e-c219-4938-83f2-1a6c05f2a06b',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372/file0169154751928309265')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211194668762',
  'x-ms-request-id',
  'f1673f77-f01f-0054-0e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b1e0765f-e5d2-4193-8f7c-fdf61aa27768',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372/file1169154751942300278')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211196182867',
  'x-ms-request-id',
  'f1673f7d-f01f-0054-1467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '66790c3e-eef3-4066-a642-749d6d146269',
  'Date',
  'Wed, 09 Aug 2023 02:18:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372/file1169154751942300278')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'ETag',
  '"0x8DB987EF214CA77"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f7f-f01f-0054-1667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '52ecd64c-31ad-4a7e-b860-067e30138f84',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372/file1169154751942300278')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211199150863',
  'x-ms-request-id',
  'f1673f83-f01f-0054-1a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'f66a231f-9b85-497e-af5d-1f2713d092f8',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372/file2169154751956208510')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211200624509',
  'x-ms-request-id',
  'f1673f88-f01f-0054-1f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '60f195ab-6b54-4d05-8164-bd05facf24fe',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751915200372/file2169154751956208510')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:40 GMT',
  'ETag',
  '"0x8DB987EF255F8CB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673f8a-f01f-0054-2167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0a9537b3-9979-4d9d-96d3-321191be57d3',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372/file2169154751956208510')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211203269424',
  'x-ms-request-id',
  'f1673f8c-f01f-0054-2367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7319aa4c-dacb-4015-a504-db13c85cffef',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751915200372')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154751915200372\"><Blobs><Blob><Name>file0169154751928309265</Name><DeletionId>133360211191854139</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:38 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:38 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:39 GMT</Expiry-Time><Etag>0x8DB987EF17AACAA</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:39 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file0169154751928309265</Name><DeletionId>133360211194668762</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:39 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:39 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:39 GMT</Expiry-Time><Etag>0x8DB987EF1D16355</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:39 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154751942300278</Name><DeletionId>133360211196182867</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:38 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:38 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:39 GMT</Expiry-Time><Etag>0x8DB987EF18F886F</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:39 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154751942300278</Name><DeletionId>133360211199150863</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:39 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:39 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:39 GMT</Expiry-Time><Etag>0x8DB987EF214CA77</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:39 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2169154751956208510</Name><DeletionId>133360211200624509</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:39 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:39 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:40 GMT</Expiry-Time><Etag>0x8DB987EF1A4D596</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:40 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2169154751956208510</Name><DeletionId>133360211203269424</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:40 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:40 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:40 GMT</Expiry-Time><Etag>0x8DB987EF255F8CB</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:40 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26c2b-101e-002e-4267-caab16000000',
  'x-ms-client-request-id',
  '7d960fa2-24f8-4e10-b008-c259466c34d4',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751915200372')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26c2f-101e-002e-4667-caab16000000',
  'x-ms-client-request-id',
  '8244eddf-cb63-4383-8c6d-8b4e8400f6cb',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:39 GMT'
]);
