let nock = require('nock');

module.exports.hash = "e09c00a994502187bf3ef1a6884c2cc3";

module.exports.testInfo = {"uniqueName":{"container":"container159421163876004182","blob":"blob159421163905809385"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421163876004182')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 08 Jul 2020 12:33:58 GMT',
  'ETag',
  '"0x8D8233B2FF833CB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d88265f-c01e-0023-1a24-5538cc000000',
  'x-ms-client-request-id',
  '6c21d1ad-d52e-4cfe-9df7-572359e9bb70',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421163876004182/blob159421163905809385', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 08 Jul 2020 12:33:59 GMT',
  'ETag',
  '"0x8D8233B302691DC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d88276f-c01e-0023-1224-5538cc000000',
  'x-ms-client-request-id',
  '49ccce79-0875-46c1-8b4e-c964ae8881ef',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 08 Jul 2020 12:33:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421163876004182/blob159421163905809385')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882871-c01e-0023-7e24-5538cc000000',
  'x-ms-client-request-id',
  '23ba0da8-3297-43bd-955e-638f2163d5d6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421163876004182/blob159421163905809385')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d8829ac-c01e-0023-2624-5538cc000000',
  'x-ms-client-request-id',
  'a5e4b492-af1c-4958-a658-4e94863c463b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159421163876004182/blob159421163905809385')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 08 Jul 2020 12:33:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8233B302691DC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882a69-c01e-0023-4b24-5538cc000000',
  'x-ms-client-request-id',
  'd3c04016-294d-47ae-a795-92052cb93fd5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 08 Jul 2020 12:33:59 GMT',
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
  'Wed, 08 Jul 2020 12:33:59 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'x-ms-rehydrate-priority',
  'Standard',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,x-ms-archive-status,x-ms-rehydrate-priority,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 08 Jul 2020 12:33:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159421163876004182')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159421163876004182\"><Blobs><Blob><Name>blob159421163905809385</Name><Properties><Creation-Time>Wed, 08 Jul 2020 12:33:59 GMT</Creation-Time><Last-Modified>Wed, 08 Jul 2020 12:33:59 GMT</Last-Modified><Etag>0x8D8233B302691DC</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Archive</AccessTier><ArchiveStatus>rehydrate-pending-to-hot</ArchiveStatus><RehydratePriority>Standard</RehydratePriority><AccessTierChangeTime>Wed, 08 Jul 2020 12:33:59 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882b79-c01e-0023-4124-5538cc000000',
  'x-ms-client-request-id',
  '4d71b41b-e0fa-4e94-8ea4-66a45f4bc88b',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 08 Jul 2020 12:33:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159421163876004182')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159421163876004182\"><Delimiter>/</Delimiter><Blobs><Blob><Name>blob159421163905809385</Name><Properties><Creation-Time>Wed, 08 Jul 2020 12:33:59 GMT</Creation-Time><Last-Modified>Wed, 08 Jul 2020 12:33:59 GMT</Last-Modified><Etag>0x8D8233B302691DC</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Archive</AccessTier><ArchiveStatus>rehydrate-pending-to-hot</ArchiveStatus><RehydratePriority>Standard</RehydratePriority><AccessTierChangeTime>Wed, 08 Jul 2020 12:33:59 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882c63-c01e-0023-1324-5538cc000000',
  'x-ms-client-request-id',
  '39b3e4fb-fa26-4158-ae38-a9755ec6649d',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 08 Jul 2020 12:34:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159421163876004182')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882d52-c01e-0023-6824-5538cc000000',
  'x-ms-client-request-id',
  '626aeb7e-1473-4496-8507-d3b9625b6161',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:34:00 GMT'
]);
