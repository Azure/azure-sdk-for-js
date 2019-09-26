let nock = require('nock');

module.exports.testInfo = {"container":"container156776192288003757","blob":"blob156776192327409388"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776192288003757')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'ETag',
  '"0x8D732AC24EFB187"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb0a99d-c01e-00ee-7a95-645daa000000',
  'x-ms-client-request-id',
  '92f5ec0a-631a-466a-869a-5cb88ea03ca6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776192288003757/blob156776192327409388', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'ETag',
  '"0x8D732AC252C4257"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e2e1acd-901e-0038-7495-645343000000',
  'x-ms-client-request-id',
  'f88416e4-a236-4ae6-8320-04ff8c6cf24b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776192288003757/blob156776192327409388')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'ETag',
  '"0x8D732AC252C4257"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '552e98db-201e-00bb-6595-644d21000000',
  'x-ms-client-request-id',
  'f47d9d59-8440-4127-b6b6-fe9197e24987',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:25:23.9669628Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776192288003757/blob156776192327409388')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC252C4257"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c80252-401e-00e0-4695-64741a000000',
  'x-ms-client-request-id',
  'a1b01544-74bc-4dc5-a7db-c69da042c30f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:25:23.9669628Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776192288003757')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156776192288003757\"><Blobs><Blob><Name>blob156776192327409388</Name><Snapshot>2019-09-06T09:25:23.9669628Z</Snapshot><Properties><Creation-Time>Fri, 06 Sep 2019 09:25:23 GMT</Creation-Time><Last-Modified>Fri, 06 Sep 2019 09:25:23 GMT</Last-Modified><Etag>0x8D732AC252C4257</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>YeJLfssylmU=</Content-CRC64><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blob156776192327409388</Name><Properties><Creation-Time>Fri, 06 Sep 2019 09:25:23 GMT</Creation-Time><Last-Modified>Fri, 06 Sep 2019 09:25:23 GMT</Last-Modified><Etag>0x8D732AC252C4257</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>YeJLfssylmU=</Content-CRC64><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22abafae-d01e-0080-6795-640885000000',
  'x-ms-client-request-id',
  '0bf68f7a-9553-42d9-8ba9-3811ab8affe7',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776192288003757')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2527a96e-101e-008f-2095-647ee9000000',
  'x-ms-client-request-id',
  'bd6412e4-0921-440a-8d29-77a972dd861e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:24 GMT',
  'Connection',
  'close' ]);

