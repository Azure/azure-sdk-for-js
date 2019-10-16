let nock = require('nock');

module.exports.testInfo = {"container":"container157113293994804485","directory":"directory157113294116000060","directory0":"directory0157113294116106765","directory1":"directory1157113294234004740","directory2":"directory2157113294351907350","directorydest":"directorydest157113294467504547"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293994804485')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:44:06 GMT',
  'ETag',
  '"0x8D7515438822E8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5fba852-901e-00ab-673d-83928c000000',
  'x-ms-client-request-id',
  'a799266a-dd3b-4aba-b48e-1b295ba3b38a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293994804485/directory157113294116000060/directory0157113294116106765')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:07 GMT',
  'ETag',
  '"0x8D751543940CF4C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29986087-101f-0032-753d-831d4e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ec55d23d-1579-46d5-a86e-97063d4aebff',
  'Date',
  'Tue, 15 Oct 2019 09:44:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293994804485/directory157113294116000060/directory1157113294234004740')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:08 GMT',
  'ETag',
  '"0x8D7515439F10385"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cf804c3-401f-006e-5b3d-83ecb7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '14810b4b-5f7a-4d04-a7b5-eb804165fd07',
  'Date',
  'Tue, 15 Oct 2019 09:44:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293994804485/directory157113294116000060/directory2157113294351907350')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:09 GMT',
  'ETag',
  '"0x8D751543AA4E990"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9c9d18be-501f-0071-553d-8337a7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7541f290-89b2-4358-8a11-25e96724d8ae',
  'Date',
  'Tue, 15 Oct 2019 09:44:09 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293994804485/directorydest157113294467504547')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20014f9a-e01f-000e-5e3d-83a995000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c8c5feb3-4880-412e-81e7-81e8650e3fee',
  'Date',
  'Tue, 15 Oct 2019 09:44:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157113293994804485')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container157113293994804485\"><Prefix>directorydest157113294467504547/</Prefix><Blobs><Blob><Name>directorydest157113294467504547/directory0157113294116106765</Name><Properties><Creation-Time>Tue, 15 Oct 2019 09:44:07 GMT</Creation-Time><Last-Modified>Tue, 15 Oct 2019 09:44:07 GMT</Last-Modified><Etag>0x8D751543940CF4C</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest157113294467504547/directory1157113294234004740</Name><Properties><Creation-Time>Tue, 15 Oct 2019 09:44:08 GMT</Creation-Time><Last-Modified>Tue, 15 Oct 2019 09:44:08 GMT</Last-Modified><Etag>0x8D7515439F10385</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest157113294467504547/directory2157113294351907350</Name><Properties><Creation-Time>Tue, 15 Oct 2019 09:44:09 GMT</Creation-Time><Last-Modified>Tue, 15 Oct 2019 09:44:09 GMT</Last-Modified><Etag>0x8D751543AA4E990</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23b99c16-f01e-005e-633d-83b69d000000',
  'x-ms-client-request-id',
  'db730e3b-98ed-43de-9190-fa64117306bb',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 15 Oct 2019 09:44:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113293994804485')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7dfbef97-801e-0037-743d-83e931000000',
  'x-ms-client-request-id',
  '2ce8302c-9dde-41eb-8254-cc48df0a9b75',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:13 GMT',
  'Connection',
  'close' ]);

