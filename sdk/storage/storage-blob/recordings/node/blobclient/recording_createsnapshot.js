let nock = require('nock');

module.exports.testInfo = {"container":"container156816831034005941","blob":"blob156816831076402702"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831034005941')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:30 GMT',
  'ETag',
  '"0x8D7365E56C72903"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1835edaf-b01e-004d-3047-68a01e000000',
  'x-ms-client-request-id',
  '793c4302-d2f3-4210-a5c8-4463dddd5501',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831034005941/blob156816831076402702', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:31 GMT',
  'ETag',
  '"0x8D7365E5706DFE3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab889c69-c01e-0060-0747-6823de000000',
  'x-ms-client-request-id',
  '3294543a-38bb-495e-b650-848061f442ff',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831034005941/blob156816831076402702')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:31 GMT',
  'ETag',
  '"0x8D7365E5706DFE3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b36baa95-801e-0023-6147-680937000000',
  'x-ms-client-request-id',
  'f23c7523-5bcb-4974-aa45-3e443f244510',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-11T02:18:31.5341566Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:18:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156816831034005941/blob156816831076402702')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E5706DFE3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b7b49b6b-901e-005a-1f47-68607d000000',
  'x-ms-client-request-id',
  '094f6cb3-2ccd-45ca-ba4a-6b3a203f4d8b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-11T02:18:31.5341566Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:18:31 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:31 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816831034005941')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156816831034005941\"><Blobs><Blob><Name>blob156816831076402702</Name><Snapshot>2019-09-11T02:18:31.5341566Z</Snapshot><Properties><Creation-Time>Wed, 11 Sep 2019 02:18:31 GMT</Creation-Time><Last-Modified>Wed, 11 Sep 2019 02:18:31 GMT</Last-Modified><Etag>0x8D7365E5706DFE3</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>YeJLfssylmU=</Content-CRC64><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blob156816831076402702</Name><Properties><Creation-Time>Wed, 11 Sep 2019 02:18:31 GMT</Creation-Time><Last-Modified>Wed, 11 Sep 2019 02:18:31 GMT</Last-Modified><Etag>0x8D7365E5706DFE3</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>YeJLfssylmU=</Content-CRC64><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '816ccc8d-c01e-006b-5d47-683baa000000',
  'x-ms-client-request-id',
  'bebac739-b237-4395-aebf-2f87d1413cad',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:31 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816831034005941')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b7b49c8d-901e-005a-2147-68607d000000',
  'x-ms-client-request-id',
  '8d474a03-3e88-4fda-92ac-12620bedb0f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:32 GMT' ]);

