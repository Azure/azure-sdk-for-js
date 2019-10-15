let nock = require('nock');

module.exports.testInfo = {"container":"container156929861786308687","directory":"directory156929861902602280","directory0":"directory0156929861902809270","directory1":"directory1156929862033007404","directory2":"directory2156929862145308889","directorydest":"directorydest156929862259302475"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929861786308687')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:36 GMT',
  'ETag',
  '"0x8D740A56E4E0123"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91f9956d-301e-006a-308e-721935000000',
  'x-ms-client-request-id',
  'f9888390-0c31-46be-a8fb-d5bc48b55da7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:35 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929861786308687/directory156929861902602280/directory0156929861902809270')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:37 GMT',
  'ETag',
  '"0x8D740A56F180C1D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d6a2236-201f-007e-688e-72da51000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4fdf9072-1b35-4cc0-8499-ec15404563f7',
  'Date',
  'Tue, 24 Sep 2019 04:12:36 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929861786308687/directory156929861902602280/directory1156929862033007404')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:38 GMT',
  'ETag',
  '"0x8D740A56FC34E6A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06d97771-301f-002e-158e-72c559000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7c4f5fa7-128a-4380-bb9c-50a5424345a7',
  'Date',
  'Tue, 24 Sep 2019 04:12:38 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929861786308687/directory156929861902602280/directory2156929862145308889')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:39 GMT',
  'ETag',
  '"0x8D740A57071253D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c99ff2d-d01f-0049-388e-7276fe000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '92e36b22-7fae-4af5-a28d-7c69be8993a8',
  'Date',
  'Tue, 24 Sep 2019 04:12:38 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929861786308687/directorydest156929862259302475')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a9e5122-d01f-0085-598e-72124b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '96a0849f-a311-48df-8cc9-e9350759f244',
  'Date',
  'Tue, 24 Sep 2019 04:12:40 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156929861786308687')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156929861786308687\"><Prefix>directorydest156929862259302475/</Prefix><Blobs><Blob><Name>directorydest156929862259302475/directory0156929861902809270</Name><Properties><Creation-Time>Tue, 24 Sep 2019 04:12:37 GMT</Creation-Time><Last-Modified>Tue, 24 Sep 2019 04:12:37 GMT</Last-Modified><Etag>0x8D740A56F180C1D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>directorydest156929862259302475/directory1156929862033007404</Name><Properties><Creation-Time>Tue, 24 Sep 2019 04:12:38 GMT</Creation-Time><Last-Modified>Tue, 24 Sep 2019 04:12:38 GMT</Last-Modified><Etag>0x8D740A56FC34E6A</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>directorydest156929862259302475/directory2156929862145308889</Name><Properties><Creation-Time>Tue, 24 Sep 2019 04:12:39 GMT</Creation-Time><Last-Modified>Tue, 24 Sep 2019 04:12:39 GMT</Last-Modified><Etag>0x8D740A57071253D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f91e26f4-401e-00a2-278e-728802000000',
  'x-ms-client-request-id',
  '972e1110-b99c-4038-902e-93a404a6b5f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:41 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929861786308687')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aaacde71-201e-007e-668e-72da51000000',
  'x-ms-client-request-id',
  '9588bbf5-5486-435f-bab4-eb6cdac39b6a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:43 GMT' ]);
