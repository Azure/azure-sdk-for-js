let nock = require('nock');

module.exports.hash = "318de628af223ea365a07e3ad594193f";

module.exports.testInfo = {"uniqueName":{"container":"container158459901204501613","blob":"blob158459901228504616"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901204501613')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'ETag',
  '"0x8D7CBCE0C057E0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8833-701e-005c-7ab6-fd8f9a000000',
  'x-ms-client-request-id',
  'fec91be5-af38-46f3-af2f-8c0eaee74b9b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901204501613/blob158459901228504616', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'ETag',
  '"0x8D7CBCE0C2D2841"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4f99-b01e-0088-1cb6-fd3fcb000000',
  'x-ms-client-request-id',
  '2bb400d7-8bf1-4757-abdb-20a06a6b1741',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:32.4202049Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901204501613/blob158459901228504616')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'ETag',
  '"0x8D7CBCE0C521C1E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b88f3-701e-005c-22b6-fd8f9a000000',
  'x-ms-client-request-id',
  'a73acf78-0ce8-4d18-bc4e-169eb7ead072',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:32.6633774Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901204501613/blob158459901228504616')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'ETag',
  '"0x8D7CBCE0C78E510"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5027-b01e-0088-20b6-fd3fcb000000',
  'x-ms-client-request-id',
  '9dce2e27-bce4-4749-b74d-7b3dc9939512',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:32.9185593Z',
  'x-ms-copy-id',
  '97284516-417d-4e6a-b0fe-5bc0437d8040',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 19 Mar 2020 06:23:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158459901204501613')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158459901204501613\"><Blobs><Blob><Name>blob158459901228504616</Name><VersionId>2020-03-19T06:23:32.4202049Z</VersionId><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:32 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:32 GMT</Last-Modified><Etag>0x8D7CBCE0C2D2841</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158459901228504616</Name><VersionId>2020-03-19T06:23:32.6633774Z</VersionId><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:32 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:32 GMT</Last-Modified><Etag>0x8D7CBCE0C521C1E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158459901228504616</Name><VersionId>2020-03-19T06:23:32.9185593Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:32 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:32 GMT</Last-Modified><Etag>0x8D7CBCE0C78E510</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b89bc-701e-005c-55b6-fd8f9a000000',
  'x-ms-client-request-id',
  'a41f74df-3d58-4194-8c7a-a386c49cd8c1',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158459901204501613/blob158459901228504616')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE0C78E510"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5125-b01e-0088-05b6-fd3fcb000000',
  'x-ms-client-request-id',
  'ba1dbb23-fb70-4fa3-844f-499ffdff82d8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:32.9185593Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '97284516-417d-4e6a-b0fe-5bc0437d8040',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container158459901204501613/blob158459901228504616?versionId=2020-03-19T06:23:32.4202049Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Thu, 19 Mar 2020 06:23:32 GMT',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901204501613')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8acb-701e-005c-42b6-fd8f9a000000',
  'x-ms-client-request-id',
  'ef3c8759-2f91-4526-8253-db0095100b06',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:33 GMT'
]);
