let nock = require('nock');

module.exports.hash = "a2cec6ad1620c77c50ce31d51972e9c2";

module.exports.testInfo = {"uniqueName":{"container":"container159218742224703366","blob":"blob159218742269309927"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742224703366')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:02 GMT',
  'ETag',
  '"0x8D810D230F36FF2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46ffe3-701e-006e-20bb-42188f000000',
  'x-ms-client-request-id',
  '97584d0a-3369-4912-98ea-e5218ab3cd90',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742224703366/blob159218742269309927', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:02 GMT',
  'ETag',
  '"0x8D810D231386F2D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9945-e01e-0021-76bb-4269db000000',
  'x-ms-client-request-id',
  '9649cc13-6af4-4264-a640-e98bc007be59',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:02.7893828Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742224703366/blob159218742269309927')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:03 GMT',
  'ETag',
  '"0x8D810D231641AF1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4701ca-701e-006e-78bb-42188f000000',
  'x-ms-client-request-id',
  'd825a210-3fca-43da-80d3-5e6f7b8d1db5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:03.0755841Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218742224703366/blob159218742269309927')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D231386F2D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa99e4-e01e-0021-0ebb-4269db000000',
  'x-ms-client-request-id',
  '573cde06-75f6-4d2d-af44-7ca0076af817',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:02.7893828Z',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:17:02 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742224703366/blob159218742269309927')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:03 GMT',
  'ETag',
  '"0x8D810D231BF43D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4702ef-701e-006e-13bb-42188f000000',
  'x-ms-client-request-id',
  '4ae9fa30-8535-415b-8bcf-cafbd8f71c72',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:03.6740094Z',
  'x-ms-copy-id',
  '1c0d99e1-7768-4600-8d26-fb9e8f3704fd',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 15 Jun 2020 02:17:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159218742224703366')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159218742224703366\"><Blobs><Blob><Name>blob159218742269309927</Name><VersionId>2020-06-15T02:17:02.7893828Z</VersionId><Properties><Creation-Time>Mon, 15 Jun 2020 02:17:02 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:17:02 GMT</Last-Modified><Etag>0x8D810D231386F2D</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blob159218742269309927</Name><VersionId>2020-06-15T02:17:03.0755841Z</VersionId><Properties><Creation-Time>Mon, 15 Jun 2020 02:17:03 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:17:03 GMT</Last-Modified><Etag>0x8D810D231641AF1</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blob159218742269309927</Name><VersionId>2020-06-15T02:17:03.6740094Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 15 Jun 2020 02:17:03 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:17:03 GMT</Last-Modified><Etag>0x8D810D231BF43D7</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9ad2-e01e-0021-72bb-4269db000000',
  'x-ms-client-request-id',
  'b388814e-72df-47c5-af41-7034cf66c7e6',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159218742224703366/blob159218742269309927')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D231BF43D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4705a9-701e-006e-3fbb-42188f000000',
  'x-ms-client-request-id',
  '861d762b-babb-456c-85d0-49f3eb64f38f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:03.6740094Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:17:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '1c0d99e1-7768-4600-8d26-fb9e8f3704fd',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159218742224703366/blob159218742269309927?versionid=2020-06-15T02:17:02.7893828Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 15 Jun 2020 02:17:03 GMT',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742224703366')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9bb7-e01e-0021-4dbb-4269db000000',
  'x-ms-client-request-id',
  'a2dda8bd-6e27-47ae-9af7-6a3f8c44a4df',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:04 GMT'
]);
