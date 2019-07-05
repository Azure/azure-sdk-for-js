let nock = require('nock');

module.exports.testInfo = {"container":"container156231864650308380","blockblob0/0":"blockblob0/0156231864677001482","blockblob1/1":"blockblob1/1156231864706907876"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864650308380')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'ETag',
  '"0x8D7012A1088CEE5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5abc7dfa-501e-00f3-5f12-33edff000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864650308380/blockblob0%2F0156231864677001482')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'ETag',
  '"0x8D7012A10B36272"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '384a3599-001e-008d-6612-337230000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864650308380/blockblob1%2F1156231864706907876')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'ETag',
  '"0x8D7012A10DFAAC7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45c4722e-f01e-00fe-2412-3302f3000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231864650308380')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231864650308380\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix></Blobs><NextMarker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE1NjIzMTg2NDcwNjkwNzg3NiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8616b45d-f01e-0076-3812-33ba2a000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231864650308380')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231864650308380\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE1NjIzMTg2NDcwNjkwNzg3NiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</Marker><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob1/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3e8e340-601e-00d9-2e12-3398ba000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231864650308380')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231864650308380\"><Prefix>blockblob0/</Prefix><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><Blob><Name>blockblob0/0156231864677001482</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:20:47 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:20:47 GMT</Last-Modified><Etag>0x8D7012A10B36272</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a25f1ff5-b01e-00b6-3812-33306e000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864650308380/blockblob0%2F0156231864677001482')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ebaab4d-a01e-0125-2312-33e070000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864650308380/blockblob1%2F1156231864706907876')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3e8e5d7-601e-00d9-5b12-3398ba000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864650308380')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc7946a-a01e-00a9-7912-33eb7e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:48 GMT',
  'Connection',
  'close' ]);

