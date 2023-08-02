let nock = require('nock');

module.exports.hash = "278846bf61b08c31ab34dbd30d032513";

module.exports.testInfo = {"uniqueName":{"container":"container169147020047407914","blob":"blob169147020118305143"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169147020047407914')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Aug 2023 04:50:02 GMT',
  'ETag',
  '"0x8DB97CAED1C77F6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a76a-401e-0023-2eb3-c963c2000000',
  'x-ms-client-request-id',
  'f3f0bb5a-245e-491e-9bd3-3aac20f94a0a',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169147020047407914/blob169147020118305143', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Aug 2023 04:50:02 GMT',
  'ETag',
  '"0x8DB97CAED372446"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a781-401e-0023-42b3-c963c2000000',
  'x-ms-client-request-id',
  'c95da0e1-98ce-47cf-9059-54d85a8bba65',
  'x-ms-version',
  '2023-01-03',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169147020047407914/blob169147020118305143')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a799-401e-0023-57b3-c963c2000000',
  'x-ms-client-request-id',
  '12a79ed0-031d-4f54-9b38-e6ef5859b087',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container169147020047407914/blob169147020118305143')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Aug 2023 04:50:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB97CAED372446"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a7b6-401e-0023-70b3-c963c2000000',
  'x-ms-client-request-id',
  '8c1ac0a5-d1ff-489b-a7a8-7756fd204fdb',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Aug 2023 04:50:02 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Tue, 08 Aug 2023 04:50:02 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169147020047407914/blob169147020118305143')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a7ca-401e-0023-04b3-c963c2000000',
  'x-ms-client-request-id',
  '27e96240-7a09-49e4-a0b1-c51785e4175f',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container169147020047407914')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container169147020047407914\"><Blobs><Blob><Name>blob169147020118305143</Name><Properties><Creation-Time>Tue, 08 Aug 2023 04:50:02 GMT</Creation-Time><Last-Modified>Tue, 08 Aug 2023 04:50:02 GMT</Last-Modified><Etag>0x8DB97CAED372446</Etag><ResourceType>file</ResourceType><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Archive</AccessTier><ArchiveStatus>rehydrate-pending-to-cold</ArchiveStatus><RehydratePriority>Standard</RehydratePriority><AccessTierChangeTime>Tue, 08 Aug 2023 04:50:02 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a7de-401e-0023-17b3-c963c2000000',
  'x-ms-client-request-id',
  '0a5d4ac6-3e8f-480e-9614-0e93936fb679',
  'x-ms-version',
  '2023-01-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container169147020047407914')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0f7a802-401e-0023-39b3-c963c2000000',
  'x-ms-client-request-id',
  '8e0221c2-f974-43d2-9a08-5deffdeae3d9',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Tue, 08 Aug 2023 04:50:01 GMT'
]);
