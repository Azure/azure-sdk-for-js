let nock = require('nock');

module.exports.testInfo = {"container":"container156929860928202510","directory":"directory156929861043905085","directory0":"directory0156929861044007744","directory1":"directory1156929861157103432","directory2":"directory2156929861270009838","directorydest":"directorydest156929861383509464"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860928202510')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:27 GMT',
  'ETag',
  '"0x8D740A5692FFBDD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64660934-e01e-0027-0f8e-72dfd7000000',
  'x-ms-client-request-id',
  'f163ca95-5548-4e52-90f1-28bd339bd0db',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:26 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860928202510/directory156929861043905085/directory0156929861044007744')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:28 GMT',
  'ETag',
  '"0x8D740A569DF6D84"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e91cf5cc-b01f-003f-0e8e-72f242000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2ad6e23a-f43b-4efe-88cb-9a6f07e795dc',
  'Date',
  'Tue, 24 Sep 2019 04:12:28 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860928202510/directory156929861043905085/directory1156929861157103432')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:29 GMT',
  'ETag',
  '"0x8D740A56A8BC270"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3977fc90-701f-0022-378e-722ba8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2562d553-7e7d-4036-8616-4c2e737f9c0b',
  'Date',
  'Tue, 24 Sep 2019 04:12:28 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860928202510/directory156929861043905085/directory2156929861270009838')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:30 GMT',
  'ETag',
  '"0x8D740A56B38CE0D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4135a4f4-401f-0021-668e-7228af000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '53b9bdfc-baf6-461d-8a65-e8a48a36483e',
  'Date',
  'Tue, 24 Sep 2019 04:12:30 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860928202510/directorydest156929861383509464')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4781129-001f-004b-1b8e-727404000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f495198f-cf57-4000-bad5-158c124f5f4a',
  'Date',
  'Tue, 24 Sep 2019 04:12:31 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156929860928202510')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156929860928202510\"><Prefix>directorydest156929861383509464/</Prefix><Blobs><Blob><Name>directorydest156929861383509464/directory0156929861044007744</Name><Properties><Creation-Time>Tue, 24 Sep 2019 04:12:28 GMT</Creation-Time><Last-Modified>Tue, 24 Sep 2019 04:12:28 GMT</Last-Modified><Etag>0x8D740A569DF6D84</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>directorydest156929861383509464/directory1156929861157103432</Name><Properties><Creation-Time>Tue, 24 Sep 2019 04:12:29 GMT</Creation-Time><Last-Modified>Tue, 24 Sep 2019 04:12:29 GMT</Last-Modified><Etag>0x8D740A56A8BC270</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>directorydest156929861383509464/directory2156929861270009838</Name><Properties><Creation-Time>Tue, 24 Sep 2019 04:12:30 GMT</Creation-Time><Last-Modified>Tue, 24 Sep 2019 04:12:30 GMT</Last-Modified><Etag>0x8D740A56B38CE0D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7963494f-601e-003d-358e-72f0b8000000',
  'x-ms-client-request-id',
  '80000c9d-8212-47a8-8838-d074195e995c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:33 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929860928202510')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e65383f-f01e-0055-3d8e-72aee9000000',
  'x-ms-client-request-id',
  '54c44b64-aeeb-4064-8c71-4c29815c77c1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:33 GMT' ]);
