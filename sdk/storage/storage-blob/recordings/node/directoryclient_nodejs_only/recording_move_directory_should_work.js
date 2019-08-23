let nock = require('nock');

module.exports.testInfo = {"container":"container156654459099802297","directory":"directory156654459215905463","directory0":"directory0156654459216109906","directory1":"directory1156654459331805663","directory2":"directory2156654459445707369","directorydest":"directorydest156654459559700164"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459099802297')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:12:33 GMT',
  'ETag',
  '"0x8D72799450E6CEE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7df0c8e-901e-0004-0a82-591f3c000000',
  'x-ms-client-request-id',
  '90e7cd37-71a6-452c-8b57-a9532080d1bc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459099802297/directory156654459215905463/directory0156654459216109906')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:35 GMT',
  'ETag',
  '"0x8D7279945C47215"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c864ce0-701f-0033-2182-59cd90000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c2feaf5d-2866-4404-8c97-bb32176b4c2b',
  'Date',
  'Fri, 23 Aug 2019 07:12:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459099802297/directory156654459215905463/directory1156654459331805663')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:36 GMT',
  'ETag',
  '"0x8D72799467187A0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cecf154-901f-0004-4882-591f3c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '40397821-e80b-4209-a5c9-b59c7a31650b',
  'Date',
  'Fri, 23 Aug 2019 07:12:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459099802297/directory156654459215905463/directory2156654459445707369')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:37 GMT',
  'ETag',
  '"0x8D72799471F4469"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '77709a3c-e01f-001e-6d82-597ee3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b40a9751-5d45-43f3-a189-c923bf2d6cd7',
  'Date',
  'Fri, 23 Aug 2019 07:12:36 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459099802297/directorydest156654459559700164')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d97fed1-701f-000c-4682-590533000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ee1f8904-989f-4d73-b559-74c419932d7e',
  'Date',
  'Fri, 23 Aug 2019 07:12:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156654459099802297')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156654459099802297\"><Prefix>directorydest156654459559700164/</Prefix><Blobs><Blob><Name>directorydest156654459559700164/directory0156654459216109906</Name><Properties><Creation-Time>Fri, 23 Aug 2019 07:12:35 GMT</Creation-Time><Last-Modified>Fri, 23 Aug 2019 07:12:35 GMT</Last-Modified><Etag>0x8D7279945C47215</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest156654459559700164/directory1156654459331805663</Name><Properties><Creation-Time>Fri, 23 Aug 2019 07:12:36 GMT</Creation-Time><Last-Modified>Fri, 23 Aug 2019 07:12:36 GMT</Last-Modified><Etag>0x8D72799467187A0</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest156654459559700164/directory2156654459445707369</Name><Properties><Creation-Time>Fri, 23 Aug 2019 07:12:37 GMT</Creation-Time><Last-Modified>Fri, 23 Aug 2019 07:12:37 GMT</Last-Modified><Etag>0x8D72799471F4469</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26653105-201e-003e-6482-590544000000',
  'x-ms-client-request-id',
  '7499971a-f99f-4fb5-81a0-19d1d0d17d6f',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 23 Aug 2019 07:12:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654459099802297')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d5571b3-301e-0032-1282-59924c000000',
  'x-ms-client-request-id',
  'c79b49fe-8a85-45f6-8a88-0182d1e5c008',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:40 GMT',
  'Connection',
  'close' ]);

