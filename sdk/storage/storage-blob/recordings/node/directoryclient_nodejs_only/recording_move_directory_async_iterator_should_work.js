let nock = require('nock');

module.exports.testInfo = {"container":"container156654459963402069","directory":"directory156654460080403825","directory0":"directory0156654460080500563","directory1":"directory1156654460197005999","directory2":"directory2156654460319806894","directorydest":"directorydest156654460433303985"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459963402069')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:12:42 GMT',
  'ETag',
  '"0x8D727994A34966F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4822d0bd-e01e-0021-1282-59b640000000',
  'x-ms-client-request-id',
  '470922b7-3ff8-4e7f-b974-cd4aa74e99ed',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459963402069/directory156654460080403825/directory0156654460080500563')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:43 GMT',
  'ETag',
  '"0x8D727994AEB9090"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29c1655-b01f-003c-3282-59bbfc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8aa7f468-cbff-483c-a6b0-153a1f3692b2',
  'Date',
  'Fri, 23 Aug 2019 07:12:43 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459963402069/directory156654460080403825/directory1156654460197005999')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:44 GMT',
  'ETag',
  '"0x8D727994B9ADCB7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc9a4a3-b01f-002c-4682-597e94000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'be2ffbef-28f8-47aa-95b1-3d6316d1eb8a',
  'Date',
  'Fri, 23 Aug 2019 07:12:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459963402069/directory156654460080403825/directory2156654460319806894')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:46 GMT',
  'ETag',
  '"0x8D727994C550A9F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b880766f-101f-0035-5682-59fe2f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e1e501c1-5773-4c02-a35b-7cdd7eba256b',
  'Date',
  'Fri, 23 Aug 2019 07:12:45 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654459963402069/directorydest156654460433303985')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5bb8ff04-101f-001a-6182-59f3e4000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ef577734-6ded-4be7-ad9c-bf7b6315d1cf',
  'Date',
  'Fri, 23 Aug 2019 07:12:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156654459963402069')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156654459963402069\"><Prefix>directorydest156654460433303985/</Prefix><Blobs><Blob><Name>directorydest156654460433303985/directory0156654460080500563</Name><Properties><Creation-Time>Fri, 23 Aug 2019 07:12:43 GMT</Creation-Time><Last-Modified>Fri, 23 Aug 2019 07:12:43 GMT</Last-Modified><Etag>0x8D727994AEB9090</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest156654460433303985/directory1156654460197005999</Name><Properties><Creation-Time>Fri, 23 Aug 2019 07:12:44 GMT</Creation-Time><Last-Modified>Fri, 23 Aug 2019 07:12:44 GMT</Last-Modified><Etag>0x8D727994B9ADCB7</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest156654460433303985/directory2156654460319806894</Name><Properties><Creation-Time>Fri, 23 Aug 2019 07:12:46 GMT</Creation-Time><Last-Modified>Fri, 23 Aug 2019 07:12:46 GMT</Last-Modified><Etag>0x8D727994C550A9F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da38ed45-401e-0038-5582-5936fb000000',
  'x-ms-client-request-id',
  '53c76480-9746-4ca0-87ca-94d07dfd7d62',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 23 Aug 2019 07:12:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654459963402069')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55155ea3-c01e-0019-0a82-591280000000',
  'x-ms-client-request-id',
  'e5d44289-42e8-4c20-a29e-7cd860e84e36',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:49 GMT',
  'Connection',
  'close' ]);

