let nock = require('nock');

module.exports.testInfo = {"container":"container156776201077805988","blockblob/0":"blockblob/0156776201117603305","blockblob/1":"blockblob/1156776201157209653","blockblob/2":"blockblob/2156776201196806295"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776201077805988')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:51 GMT',
  'ETag',
  '"0x8D732AC595497C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f97760c0-401e-010b-3795-64f2e5000000',
  'x-ms-client-request-id',
  '1acebe62-c9f3-4abe-b5c2-64d32d819ff0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776201077805988/blockblob%2F0156776201117603305')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:51 GMT',
  'ETag',
  '"0x8D732AC599101C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eebf5b8-a01e-0051-5e95-646a0f000000',
  'x-ms-client-request-id',
  'b4bb0301-8557-4047-854f-8202fb891162',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:26:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776201077805988/blockblob%2F1156776201157209653')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:51 GMT',
  'ETag',
  '"0x8D732AC59CD5624"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31892faa-101e-006b-2995-647077000000',
  'x-ms-client-request-id',
  'bb7a5184-deeb-4c98-96ea-924387eaebfd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:26:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776201077805988/blockblob%2F2156776201196806295')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:52 GMT',
  'ETag',
  '"0x8D732AC5A0A1FE1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b4bc8ec-101e-00d2-7a95-64746d000000',
  'x-ms-client-request-id',
  '5d07cdc9-c967-4a95-b40f-17ebef6b6704',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:26:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776201077805988')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156776201077805988\"><Blobs><Blob><Name>blockblob/0156776201117603305</Name><Properties><Creation-Time>Fri, 06 Sep 2019 09:26:51 GMT</Creation-Time><Last-Modified>Fri, 06 Sep 2019 09:26:51 GMT</Last-Modified><Etag>0x8D732AC599101C7</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blockblob/1156776201157209653</Name><Properties><Creation-Time>Fri, 06 Sep 2019 09:26:51 GMT</Creation-Time><Last-Modified>Fri, 06 Sep 2019 09:26:51 GMT</Last-Modified><Etag>0x8D732AC59CD5624</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blockblob/2156776201196806295</Name><Properties><Creation-Time>Fri, 06 Sep 2019 09:26:52 GMT</Creation-Time><Last-Modified>Fri, 06 Sep 2019 09:26:52 GMT</Last-Modified><Etag>0x8D732AC5A0A1FE1</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '879a199b-d01e-005b-6095-64ceb8000000',
  'x-ms-client-request-id',
  'd91f1be0-7fa1-4d64-b635-6cd8a183e0c1',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:26:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776201077805988/blockblob%2F0156776201117603305')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81dba01b-201e-0094-4095-6440ea000000',
  'x-ms-client-request-id',
  '464063b4-3d2b-4954-97a2-ac6f8e12ff57',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:26:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776201077805988/blockblob%2F1156776201157209653')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '92f25fc9-e01e-00c6-2e95-643c02000000',
  'x-ms-client-request-id',
  '7fc78202-add4-4be6-ab48-fefb224ee2ea',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:26:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776201077805988/blockblob%2F2156776201196806295')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0abd197f-b01e-002f-1295-64fa48000000',
  'x-ms-client-request-id',
  'e95da194-f116-4cad-ae5b-0b81bf5aed36',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:26:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776201077805988')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb65d9fc-a01e-014e-4d95-642706000000',
  'x-ms-client-request-id',
  '2c57674a-2e90-4756-b2d1-ba821616d680',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:54 GMT',
  'Connection',
  'close' ]);

