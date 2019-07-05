let nock = require('nock');

module.exports.testInfo = {"container":"container156231864403708947","blockblob0/0":"blockblob0/0156231864431004563","blockblob1/1":"blockblob1/1156231864459003819","blockblob2/2":"blockblob2/2156231864486409349"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864403708947')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:44 GMT',
  'ETag',
  '"0x8D7012A0F114E9F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ab64efb-c01e-0075-3112-33b92d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864403708947/blockblob0%2F0156231864431004563')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'ETag',
  '"0x8D7012A0F3C5BB6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cbf7510-c01e-011c-1212-33a0d4000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864403708947/blockblob1%2F1156231864459003819')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'ETag',
  '"0x8D7012A0F663292"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd10c9885-e01e-00ae-3512-331dfb000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231864403708947/blockblob2%2F2156231864486409349')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'ETag',
  '"0x8D7012A0F90096D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6810339a-101e-00b0-0612-33c716000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231864403708947')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231864403708947\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5dea09ee-001e-0086-6c12-336a44000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864403708947/blockblob0%2F0156231864431004563')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b096c405-501e-001d-1212-33e77c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864403708947/blockblob1%2F1156231864459003819')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32588079-f01e-00dc-0a12-336cc5000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864403708947/blockblob2%2F2156231864486409349')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4685ca3a-601e-003c-4912-338a4d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:20:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231864403708947')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd639675-101e-0011-7b12-33098d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:46 GMT',
  'Connection',
  'close' ]);

