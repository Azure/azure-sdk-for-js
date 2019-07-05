let nock = require('nock');

module.exports.testInfo = {"blob empty":"blob empty156231868197709795"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156231868169701661/blob%20empty156231868197709795', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:22 GMT',
  'ETag',
  '"0x8D7012A25B0877E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75cebe8f-f01e-007d-7013-33a25e000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash156231868169701661')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash156231868169701661\"><Prefix>blob empty156231868197709795</Prefix><Blobs><Blob><Name>blob empty156231868197709795</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:21:22 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:21:22 GMT</Last-Modified><Etag>0x8D7012A25B0877E</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd469bc4-401e-006f-7e13-339642000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:22 GMT',
  'Connection',
  'close' ]);

