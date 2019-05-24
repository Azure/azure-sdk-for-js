let nock = require('nock');

module.exports.testInfo = {"container":"container155873880977207155","blob":"blob155873881007806889"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873880977207155')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:09 GMT',
  'ETag',
  '"0x8D6E09B92378A91"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c752e76c-901e-0091-6784-1209e9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873880977207155/blob155873881007806889', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:10 GMT',
  'ETag',
  '"0x8D6E09B9266EFE3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43508552-e01e-007b-0e84-12f6e8000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:00:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873880977207155/blob155873881007806889')
  .query({"comp":"snapshot"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:10 GMT',
  'ETag',
  '"0x8D6E09B9266EFE3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48a2dd36-201e-0066-5984-122f02000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-snapshot',
  '2019-05-24T23:00:10.4349065Z',
  'Date',
  'Fri, 24 May 2019 23:00:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container155873880977207155/blob155873881007806889')
  .query({"snapshot":"2019-05-24T23%3A00%3A10.4349065Z"})
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B9266EFE3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2cc3b5bc-201e-0029-6f84-12eb1a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:00:10 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:00:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873880977207155')
  .query({"include":"snapshots","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873880977207155\"><Blobs><Blob><Name>blob155873881007806889</Name><Snapshot>2019-05-24T23:00:10.4349065Z</Snapshot><Properties><Creation-Time>Fri, 24 May 2019 23:00:10 GMT</Creation-Time><Last-Modified>Fri, 24 May 2019 23:00:10 GMT</Last-Modified><Etag>0x8D6E09B9266EFE3</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob155873881007806889</Name><Properties><Creation-Time>Fri, 24 May 2019 23:00:10 GMT</Creation-Time><Last-Modified>Fri, 24 May 2019 23:00:10 GMT</Last-Modified><Etag>0x8D6E09B9266EFE3</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '787fb91c-901e-003b-6384-12df06000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:00:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873880977207155')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f26197b-401e-0076-1684-1219e4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:10 GMT',
  'Connection',
  'close' ]);

