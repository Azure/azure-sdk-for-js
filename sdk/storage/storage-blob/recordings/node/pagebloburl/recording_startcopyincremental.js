let nock = require('nock');

module.exports.testInfo = {"container":"container156585823870505266","blob":"blob156585823897002316","page":"page156585823978806147"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:20 GMT',
  'ETag',
  '"0x8D7215B3AAD9D8A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '845aa676-401e-00ce-7244-5358d9000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:33:19 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/blob156585823897002316')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:20 GMT',
  'ETag',
  '"0x8D7215B3AD707D6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9809185-201e-00f7-1c44-53187d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 15 Aug 2019 08:33:20 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/blob156585823897002316', "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'u+ZALNybfiA2/JfpqRcmzQ==',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:21 GMT',
  'ETag',
  '"0x8D7215B3B006953"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '999c955f-a01e-0107-6544-538e46000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 15 Aug 2019 08:33:20 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/blob156585823897002316')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:21 GMT',
  'ETag',
  '"0x8D7215B3B006953"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cb892a7-a01e-0003-4444-533d91000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-08-15T08:33:21.4569721Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 15 Aug 2019 08:33:21 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:21 GMT',
  'ETag',
  '"0x8D7215B3B54000F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a1741cc-f01e-001b-3b44-531004000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:33:21 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/page156585823978806147')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:27 GMT',
  'ETag',
  '"0x8D7215B3E7F367C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5418658-001e-00c9-3444-53ae5c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '15c0e3ec-b3ea-44f0-92fe-8eaf3d2165b7',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Thu, 15 Aug 2019 08:33:26 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156585823870505266/page156585823978806147')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7215B3E872729"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37b331cb-201e-009a-1244-53b253000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-sourcemeta',
  'val',
  'x-ms-creation-time',
  'Thu, 15 Aug 2019 08:33:27 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-copy-id',
  '15c0e3ec-b3ea-44f0-92fe-8eaf3d2165b7',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:21.4569721Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Thu, 15 Aug 2019 08:33:27 GMT',
  'x-ms-incremental-copy',
  'true',
  'x-ms-copy-destination-snapshot',
  '2019-08-15T08:33:27.1290056Z',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-sourcemeta,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-incremental-copy,x-ms-copy-destination-snapshot,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:33:29 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156585823870505266')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156585823870505266\"><Blobs><Blob><Name>blob156585823897002316</Name><Snapshot>2019-08-15T08:33:21.4569721Z</Snapshot><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:20 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:21 GMT</Last-Modified><Etag>0x8D7215B3B006953</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blob156585823897002316</Name><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:20 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:21 GMT</Last-Modified><Etag>0x8D7215B3B006953</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>page156585823978806147</Name><Snapshot>2019-08-15T08:33:27.1290056Z</Snapshot><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:27 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:27 GMT</Last-Modified><Etag>0x8D7215B3E8B94C8</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><CopyId>15c0e3ec-b3ea-44f0-92fe-8eaf3d2165b7</CopyId><CopySource>https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:21.4569721Z</CopySource><CopyStatus>success</CopyStatus><CopyProgress>1024/1024</CopyProgress><CopyCompletionTime>Thu, 15 Aug 2019 08:33:27 GMT</CopyCompletionTime><IncrementalCopy>true</IncrementalCopy><CopyDestinationSnapshot>2019-08-15T08:33:27.1290056Z</CopyDestinationSnapshot><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>page156585823978806147</Name><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:27 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:27 GMT</Last-Modified><Etag>0x8D7215B3E872729</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><CopyId>15c0e3ec-b3ea-44f0-92fe-8eaf3d2165b7</CopyId><CopySource>https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:21.4569721Z</CopySource><CopyStatus>success</CopyStatus><CopyProgress>1024/1024</CopyProgress><CopyCompletionTime>Thu, 15 Aug 2019 08:33:27 GMT</CopyCompletionTime><IncrementalCopy>true</IncrementalCopy><CopyDestinationSnapshot>2019-08-15T08:33:27.1290056Z</CopyDestinationSnapshot><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '44b4e385-001e-008d-3244-537230000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:33:30 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/blob156585823897002316', "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'I2Pl5jQ6Lyr9HgxzPysQ9A==',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:30 GMT',
  'ETag',
  '"0x8D7215B40D0BE74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16218345-c01e-0090-0e44-53abda000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 15 Aug 2019 08:33:30 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/blob156585823897002316')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:30 GMT',
  'ETag',
  '"0x8D7215B40D0BE74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49ea57d7-a01e-00ed-0144-533712000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-08-15T08:33:31.2079061Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 15 Aug 2019 08:33:30 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585823870505266/page156585823978806147')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:31 GMT',
  'ETag',
  '"0x8D7215B412AAEA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3331109c-b01e-00db-5544-539a40000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '5066a23b-0c03-4b8a-8332-185077527141',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Thu, 15 Aug 2019 08:33:31 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156585823870505266/page156585823978806147')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7215B412D2015"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acb3c0b5-901e-00aa-6844-53e879000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-sourcemeta',
  'val',
  'x-ms-creation-time',
  'Thu, 15 Aug 2019 08:33:27 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-copy-id',
  '5066a23b-0c03-4b8a-8332-185077527141',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:31.2079061Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Thu, 15 Aug 2019 08:33:31 GMT',
  'x-ms-incremental-copy',
  'true',
  'x-ms-copy-destination-snapshot',
  '2019-08-15T08:33:31.5511502Z',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-sourcemeta,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-incremental-copy,x-ms-copy-destination-snapshot,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:33:34 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156585823870505266')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156585823870505266\"><Blobs><Blob><Name>blob156585823897002316</Name><Snapshot>2019-08-15T08:33:21.4569721Z</Snapshot><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:20 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:21 GMT</Last-Modified><Etag>0x8D7215B3B006953</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blob156585823897002316</Name><Snapshot>2019-08-15T08:33:31.2079061Z</Snapshot><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:20 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:30 GMT</Last-Modified><Etag>0x8D7215B40D0BE74</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blob156585823897002316</Name><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:20 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:30 GMT</Last-Modified><Etag>0x8D7215B40D0BE74</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>page156585823978806147</Name><Snapshot>2019-08-15T08:33:27.1290056Z</Snapshot><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:27 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:27 GMT</Last-Modified><Etag>0x8D7215B3E8B94C8</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><CopyId>15c0e3ec-b3ea-44f0-92fe-8eaf3d2165b7</CopyId><CopySource>https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:21.4569721Z</CopySource><CopyStatus>success</CopyStatus><CopyProgress>1024/1024</CopyProgress><CopyCompletionTime>Thu, 15 Aug 2019 08:33:27 GMT</CopyCompletionTime><IncrementalCopy>true</IncrementalCopy><CopyDestinationSnapshot>2019-08-15T08:33:27.1290056Z</CopyDestinationSnapshot><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>page156585823978806147</Name><Snapshot>2019-08-15T08:33:31.5511502Z</Snapshot><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:27 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:31 GMT</Last-Modified><Etag>0x8D7215B412E58CE</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><CopyId>5066a23b-0c03-4b8a-8332-185077527141</CopyId><CopySource>https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:31.2079061Z</CopySource><CopyStatus>success</CopyStatus><CopyProgress>1024/1024</CopyProgress><CopyCompletionTime>Thu, 15 Aug 2019 08:33:31 GMT</CopyCompletionTime><IncrementalCopy>true</IncrementalCopy><CopyDestinationSnapshot>2019-08-15T08:33:31.5511502Z</CopyDestinationSnapshot><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>page156585823978806147</Name><Properties><Creation-Time>Thu, 15 Aug 2019 08:33:27 GMT</Creation-Time><Last-Modified>Thu, 15 Aug 2019 08:33:31 GMT</Last-Modified><Etag>0x8D7215B412D2015</Etag><Content-Length>1024</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><CopyId>5066a23b-0c03-4b8a-8332-185077527141</CopyId><CopySource>https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:31.2079061Z</CopySource><CopyStatus>success</CopyStatus><CopyProgress>1024/1024</CopyProgress><CopyCompletionTime>Thu, 15 Aug 2019 08:33:31 GMT</CopyCompletionTime><IncrementalCopy>true</IncrementalCopy><CopyDestinationSnapshot>2019-08-15T08:33:31.5511502Z</CopyDestinationSnapshot><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd24648a1-501e-00f3-5544-53edff000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:33:34 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156585823870505266/page156585823978806147')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:33:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7215B412D2015"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29f95f0-201e-0091-5a44-53aa27000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-sourcemeta',
  'val',
  'x-ms-creation-time',
  'Thu, 15 Aug 2019 08:33:27 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-copy-id',
  '5066a23b-0c03-4b8a-8332-185077527141',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container156585823870505266/blob156585823897002316?snapshot=2019-08-15T08:33:31.2079061Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Thu, 15 Aug 2019 08:33:31 GMT',
  'x-ms-incremental-copy',
  'true',
  'x-ms-copy-destination-snapshot',
  '2019-08-15T08:33:31.5511502Z',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-sourcemeta,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-incremental-copy,x-ms-copy-destination-snapshot,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:33:35 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585823870505266')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33311e66-b01e-00db-2c44-539a40000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:33:35 GMT',
  'Connection',
  'close'
]);

