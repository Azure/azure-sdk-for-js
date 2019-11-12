let nock = require('nock');

module.exports.testInfo = {"container":"container156816841337309636","blockblob/0":"blockblob/0156816841378203245","blockblob/1":"blockblob/1156816841418501759"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816841337309636')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:13 GMT',
  'ETag',
  '"0x8D7365E942E6C28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed16f1b4-f01e-0005-3d47-689283000000',
  'x-ms-client-request-id',
  '9e3a1856-46bd-443b-8ea6-7f422d4b79e8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:13 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816841337309636/blockblob%2F0156816841378203245')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:14 GMT',
  'ETag',
  '"0x8D7365E946C21A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87aedcb7-201e-006a-1847-683a57000000',
  'x-ms-client-request-id',
  '2e215dd6-6b85-43d6-9c86-93a8cf884179',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:13 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816841337309636/blockblob%2F1156816841418501759')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:14 GMT',
  'ETag',
  '"0x8D7365E94A9F921"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb602abf-401e-001c-0847-68beeb000000',
  'x-ms-client-request-id',
  '5802f198-d615-4c4f-aa40-2dfeab7bc822',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:14 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816841337309636')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156816841337309636\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Blobs><Blob><Name>blockblob/0156816841378203245</Name><Properties><Creation-Time>Wed, 11 Sep 2019 02:20:14 GMT</Creation-Time><Last-Modified>Wed, 11 Sep 2019 02:20:14 GMT</Last-Modified><Etag>0x8D7365E946C21A6</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierChangeTime>Wed, 11 Sep 2019 02:20:14 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTU2ODE2ODQxNDE4NTAxNzU5ITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84b8359a-401e-0017-4247-68a69f000000',
  'x-ms-client-request-id',
  '2b1facbf-c6df-4fb6-aa06-7daa635a38cd',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:14 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816841337309636')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156816841337309636\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTU2ODE2ODQxNDE4NTAxNzU5ITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>blockblob/1156816841418501759</Name><Properties><Creation-Time>Wed, 11 Sep 2019 02:20:14 GMT</Creation-Time><Last-Modified>Wed, 11 Sep 2019 02:20:14 GMT</Last-Modified><Etag>0x8D7365E94A9F921</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierChangeTime>Wed, 11 Sep 2019 02:20:14 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd898b587-f01e-0063-0b47-6820d9000000',
  'x-ms-client-request-id',
  '5003c4bd-fdfe-401e-b7dc-9747b280ae37',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816841337309636/blockblob%2F0156816841378203245')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b164f1a-501e-0065-3847-68d7a1000000',
  'x-ms-client-request-id',
  '051aaeaf-b3b4-4806-88a5-95ad748da478',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816841337309636/blockblob%2F1156816841418501759')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1da18e6d-c01e-002f-6147-68e7c6000000',
  'x-ms-client-request-id',
  '755b0b21-2b71-4780-8ca5-c69c56a71a1a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816841337309636')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd898b721-f01e-0063-0747-6820d9000000',
  'x-ms-client-request-id',
  '0cb4a92e-5c54-4a2e-baba-f8212954ea3b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:16 GMT' ]);

