let nock = require('nock');

module.exports.testInfo = {"container":"container156231863930301498","blockblob/0":"blockblob/0156231863957307049","blockblob/1":"blockblob/1156231863984605828","blockblob/2":"blockblob/2156231864012408805"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863930301498')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:40 GMT',
  'ETag',
  '"0x8D7012A0C3EA9C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5de9ef26-001e-0086-6d12-336a44000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863930301498/blockblob%2F0156231863957307049')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:40 GMT',
  'ETag',
  '"0x8D7012A0C68B8A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51346230-901e-000b-7e12-3326e2000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863930301498/blockblob%2F1156231863984605828')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:40 GMT',
  'ETag',
  '"0x8D7012A0C9304C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5268535d-501e-00da-0312-339bbd000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863930301498/blockblob%2F2156231864012408805')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:41 GMT',
  'ETag',
  '"0x8D7012A0CBCDBAD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07303a52-c01e-00b2-7f12-33c5ec000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231863930301498')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231863930301498\"><Blobs><Blob><Name>blockblob/0156231863957307049</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:20:40 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:20:40 GMT</Last-Modified><Etag>0x8D7012A0C68B8A6</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blockblob/1156231863984605828</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:20:40 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:20:40 GMT</Last-Modified><Etag>0x8D7012A0C9304C8</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob><Blob><Name>blockblob/2156231864012408805</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:20:41 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:20:41 GMT</Last-Modified><Etag>0x8D7012A0CBCDBAD</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e695a9bb-101e-0055-0312-33d5e1000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231863930301498/blockblob%2F0156231863957307049')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34740c7a-901e-00aa-2a12-33e879000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231863930301498/blockblob%2F1156231863984605828')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af81fd2-401e-00ce-1312-3358d9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231863930301498/blockblob%2F2156231864012408805')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34f06ecb-201e-00d5-2f12-33764b000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231863930301498')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f93716b-901e-004f-4a12-33fa8e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:42 GMT',
  'Connection',
  'close' ]);

