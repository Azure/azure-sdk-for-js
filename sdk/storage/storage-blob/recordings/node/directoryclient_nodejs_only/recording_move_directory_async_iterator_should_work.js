let nock = require('nock');

module.exports.testInfo = {"container":"container157113294842708121","directory":"directory157113294959904096","directory0":"directory0157113294960006879","directory1":"directory1157113295076406704","directory2":"directory2157113295191208662","directorydest":"directorydest157113295306602008"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113294842708121')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:44:14 GMT',
  'ETag',
  '"0x8D751543D905462"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c92d2c7c-701e-00a1-033d-838b05000000',
  'x-ms-client-request-id',
  'aa1394ef-9034-4bb3-8a51-de4ae5a4537e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113294842708121/directory157113294959904096/directory0157113294960006879')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:16 GMT',
  'ETag',
  '"0x8D751543E46AB9A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '375c1321-f01f-0077-7d3d-83c0df000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fb3b4f79-8b67-4d44-84f2-1195bcf129c8',
  'Date',
  'Tue, 15 Oct 2019 09:44:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113294842708121/directory157113294959904096/directory1157113295076406704')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:17 GMT',
  'ETag',
  '"0x8D751543EF61D1D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb66c80e-601f-0072-2c3d-8334a0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd3b5f280-a531-4104-a2e5-9d405d84a957',
  'Date',
  'Tue, 15 Oct 2019 09:44:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113294842708121/directory157113294959904096/directory2157113295191208662')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:18 GMT',
  'ETag',
  '"0x8D751543FA5D157"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7eb9d931-101f-005f-663d-83b760000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0a01ab75-a6b2-47bf-8d07-2e7674adca29',
  'Date',
  'Tue, 15 Oct 2019 09:44:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113294842708121/directorydest157113295306602008')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4de9118b-e01f-0068-3c3d-831bcf000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '92e69a60-dee1-48dd-947f-7be5e1ab1a3c',
  'Date',
  'Tue, 15 Oct 2019 09:44:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157113294842708121')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container157113294842708121\"><Prefix>directorydest157113295306602008/</Prefix><Blobs><Blob><Name>directorydest157113295306602008/directory0157113294960006879</Name><Properties><Creation-Time>Tue, 15 Oct 2019 09:44:16 GMT</Creation-Time><Last-Modified>Tue, 15 Oct 2019 09:44:16 GMT</Last-Modified><Etag>0x8D751543E46AB9A</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest157113295306602008/directory1157113295076406704</Name><Properties><Creation-Time>Tue, 15 Oct 2019 09:44:17 GMT</Creation-Time><Last-Modified>Tue, 15 Oct 2019 09:44:17 GMT</Last-Modified><Etag>0x8D751543EF61D1D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>directorydest157113295306602008/directory2157113295191208662</Name><Properties><Creation-Time>Tue, 15 Oct 2019 09:44:18 GMT</Creation-Time><Last-Modified>Tue, 15 Oct 2019 09:44:18 GMT</Last-Modified><Etag>0x8D751543FA5D157</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df718dc2-401e-008b-3b3d-83fe40000000',
  'x-ms-client-request-id',
  '311a8444-44ae-41b1-8947-31317c1a0190',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 15 Oct 2019 09:44:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113294842708121')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17a40597-601e-0097-7d3d-832657000000',
  'x-ms-client-request-id',
  'c2d125ad-62c0-4f89-bf03-a3761a044526',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:22 GMT',
  'Connection',
  'close' ]);

