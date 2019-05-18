let nock = require('nock');

module.exports.testInfo = {"container":"container155665987735503894","blob":"blob155665987774603776"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665987735503894')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:17 GMT',
  'ETag',
  '"0x8D6CDB32E2E9C74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b65cdff0-501e-0004-679c-ff68da000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 21:31:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665987735503894/blob155665987774603776', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'ETag',
  '"0x8D6CDB32E6C9B43"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51086628-401e-001b-759c-ffb3ca000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 30 Apr 2019 21:31:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665987735503894/blob155665987774603776')
  .query({"comp":"snapshot"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'ETag',
  '"0x8D6CDB32E6C9B43"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3f8b5c9-c01e-0082-709c-ff3c08000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-snapshot',
  '2019-04-30T21:31:18.5156312Z',
  'Date',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155665987735503894/blob155665987774603776')
  .query({"snapshot":"2019-04-30T21%3A31%3A18.5156312Z"})
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6CDB32E6C9B43"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bc4aa63-b01e-0005-3f9c-ff6927000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155665987735503894')
  .query({"include":"snapshots","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155665987735503894\"><Blobs><Blob><Name>blob155665987774603776</Name><Snapshot>2019-04-30T21:31:18.5156312Z</Snapshot><Properties><Creation-Time>Tue, 30 Apr 2019 21:31:18 GMT</Creation-Time><Last-Modified>Tue, 30 Apr 2019 21:31:18 GMT</Last-Modified><Etag>0x8D6CDB32E6C9B43</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob155665987774603776</Name><Properties><Creation-Time>Tue, 30 Apr 2019 21:31:18 GMT</Creation-Time><Last-Modified>Tue, 30 Apr 2019 21:31:18 GMT</Last-Modified><Etag>0x8D6CDB32E6C9B43</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2a3cba1-201e-0000-119c-ff9d58000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 21:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155665987735503894')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b8a8985-901e-0091-3d9c-ff09e9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 21:31:19 GMT',
  'Connection',
  'close' ]);

