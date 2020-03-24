let nock = require('nock');

module.exports.hash = "982c4e2fe5d1d00d124d98f61bc8882d";

module.exports.testInfo = {"uniqueName":{"container":"container158501909382406507","blob":"blob158501909509404786"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501909382406507')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Mar 2020 03:04:54 GMT',
  'ETag',
  '"0x8D7CFA020E65FD9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab083b9f-e01e-0071-2888-013ce9000000',
  'x-ms-client-request-id',
  '441b4d68-2936-443d-a30b-563fc126e1c0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 24 Mar 2020 03:04:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501909382406507/blob158501909509404786', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Mar 2020 03:04:55 GMT',
  'ETag',
  '"0x8D7CFA0210E2C33"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab083c8d-e01e-0071-7e88-013ce9000000',
  'x-ms-client-request-id',
  '41a25d68-7c85-4e98-adcd-d9e4701fc8dc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-24T03:04:55.2508467Z',
  'Date',
  'Tue, 24 Mar 2020 03:04:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501909382406507/blob158501909509404786')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 24 Mar 2020 03:04:55 GMT',
  'ETag',
  '"0x8D7CFA021362DDF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab083d58-e01e-0071-4288-013ce9000000',
  'x-ms-client-request-id',
  'f1114793-2574-41a1-b572-3d5e55ba5271',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-24T03:04:55.5140335Z',
  'Date',
  'Tue, 24 Mar 2020 03:04:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501909382406507/blob158501909509404786')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Mar 2020 03:04:55 GMT',
  'ETag',
  '"0x8D7CFA021703433"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab083e2d-e01e-0071-0f88-013ce9000000',
  'x-ms-client-request-id',
  'd08164f5-b6ee-4544-822b-4652015cc113',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-24T03:04:55.8963057Z',
  'x-ms-copy-id',
  'f2388049-749b-4c08-b423-1739983768bb',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 24 Mar 2020 03:04:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158501909382406507')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158501909382406507\"><Blobs><Blob><Name>blob158501909509404786</Name><VersionId>2020-03-24T03:04:55.2508467Z</VersionId><Properties><Creation-Time>Tue, 24 Mar 2020 03:04:55 GMT</Creation-Time><Last-Modified>Tue, 24 Mar 2020 03:04:55 GMT</Last-Modified><Etag>0x8D7CFA0210E2C33</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158501909509404786</Name><VersionId>2020-03-24T03:04:55.5140335Z</VersionId><Properties><Creation-Time>Tue, 24 Mar 2020 03:04:55 GMT</Creation-Time><Last-Modified>Tue, 24 Mar 2020 03:04:55 GMT</Last-Modified><Etag>0x8D7CFA021362DDF</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158501909509404786</Name><VersionId>2020-03-24T03:04:55.8963057Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Tue, 24 Mar 2020 03:04:55 GMT</Creation-Time><Last-Modified>Tue, 24 Mar 2020 03:04:55 GMT</Last-Modified><Etag>0x8D7CFA021703433</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab083f7a-e01e-0071-5188-013ce9000000',
  'x-ms-client-request-id',
  'd77fc088-f8bb-4d32-bd16-6d04e2b2206c',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 03:04:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158501909382406507/blob158501909509404786')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Mar 2020 03:04:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CFA021703433"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab08411f-e01e-0071-6788-013ce9000000',
  'x-ms-client-request-id',
  'a405b072-6e56-4b89-8887-80617eef19ae',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-24T03:04:55.8963057Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 24 Mar 2020 03:04:55 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'f2388049-749b-4c08-b423-1739983768bb',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container158501909382406507/blob158501909509404786?versionid=2020-03-24T03:04:55.2508467Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Tue, 24 Mar 2020 03:04:55 GMT',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 03:04:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158501909382406507')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab0841f4-e01e-0071-3188-013ce9000000',
  'x-ms-client-request-id',
  'b0054ba7-6176-4f34-bc92-9d2c6e5d6325',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 24 Mar 2020 03:04:56 GMT'
]);
