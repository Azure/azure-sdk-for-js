let nock = require('nock');

module.exports.testInfo = {"ру́сский язы́к":"ру́сский язы́к156231869133906005"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156231868169701661/%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA156231869133906005', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:32 GMT',
  'ETag',
  '"0x8D7012A2B43CC8A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ad6d4e7-301e-0109-4413-33624d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash156231868169701661/%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA156231869133906005')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:32 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A2B43CC8A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66746e47-b01e-013a-0513-333b60000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:21:32 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash156231868169701661')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash156231868169701661\"><Prefix>ру́сский язы́к156231869133906005</Prefix><Blobs><Blob><Name>ру́сский язы́к156231869133906005</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:21:32 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:21:32 GMT</Last-Modified><Etag>0x8D7012A2B43CC8A</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '821f0938-701e-010e-5e13-3394c8000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:32 GMT',
  'Connection',
  'close' ]);

