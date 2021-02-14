let nock = require('nock');

module.exports.hash = "4a2384afde23232a89eebd18b345e9cc";

module.exports.testInfo = {"uniqueName":{"container":"container159421162520300290","blob":"blob159421163659205267"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421162520300290')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 08 Jul 2020 12:33:46 GMT',
  'ETag',
  '"0x8D8233B28863B24"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d87f9ba-c01e-0023-3c24-5538cc000000',
  'x-ms-client-request-id',
  '465018bf-32d4-4e1b-9cb5-90e0bc7343b6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421162520300290/blob159421163659205267', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 08 Jul 2020 12:33:56 GMT',
  'ETag',
  '"0x8D8233B2EAE565C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d881ebf-c01e-0023-3824-5538cc000000',
  'x-ms-client-request-id',
  '1551110a-0e24-4534-8e0d-32557336313d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 08 Jul 2020 12:33:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421162520300290/blob159421163659205267')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d881f90-c01e-0023-7224-5538cc000000',
  'x-ms-client-request-id',
  'a6303274-95db-4022-b3e6-314b1de8f350',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159421162520300290/blob159421163659205267')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d8820d8-c01e-0023-1524-5538cc000000',
  'x-ms-client-request-id',
  '88f7bb1f-ec64-4b5b-a2bd-9df89d16d23f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159421162520300290/blob159421163659205267')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 08 Jul 2020 12:33:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8233B2EAE565C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d8821da-c01e-0023-0324-5538cc000000',
  'x-ms-client-request-id',
  '50343c8c-4555-436e-97d8-7f460b969a03',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Wed, 08 Jul 2020 12:33:56 GMT',
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
  'Wed, 08 Jul 2020 12:33:57 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'x-ms-rehydrate-priority',
  'High',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,x-ms-archive-status,x-ms-rehydrate-priority,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 08 Jul 2020 12:33:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159421162520300290')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159421162520300290\"><Blobs><Blob><Name>blob159421163659205267</Name><Properties><Creation-Time>Wed, 08 Jul 2020 12:33:56 GMT</Creation-Time><Last-Modified>Wed, 08 Jul 2020 12:33:56 GMT</Last-Modified><Etag>0x8D8233B2EAE565C</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Archive</AccessTier><ArchiveStatus>rehydrate-pending-to-hot</ArchiveStatus><RehydratePriority>High</RehydratePriority><AccessTierChangeTime>Wed, 08 Jul 2020 12:33:57 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d8822f1-c01e-0023-0424-5538cc000000',
  'x-ms-client-request-id',
  'd0ae92e2-91fd-46c4-a0ba-03e5c7ee5555',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 08 Jul 2020 12:33:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159421162520300290')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159421162520300290\"><Delimiter>/</Delimiter><Blobs><Blob><Name>blob159421163659205267</Name><Properties><Creation-Time>Wed, 08 Jul 2020 12:33:56 GMT</Creation-Time><Last-Modified>Wed, 08 Jul 2020 12:33:56 GMT</Last-Modified><Etag>0x8D8233B2EAE565C</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Archive</AccessTier><ArchiveStatus>rehydrate-pending-to-hot</ArchiveStatus><RehydratePriority>High</RehydratePriority><AccessTierChangeTime>Wed, 08 Jul 2020 12:33:57 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882429-c01e-0023-1e24-5538cc000000',
  'x-ms-client-request-id',
  '65da7932-8868-4176-940a-a007df1aed8b',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 08 Jul 2020 12:33:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159421162520300290')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d882558-c01e-0023-2524-5538cc000000',
  'x-ms-client-request-id',
  'ab9e0125-4cea-4f3b-92ad-104f5f3561e8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 12:33:57 GMT'
]);
