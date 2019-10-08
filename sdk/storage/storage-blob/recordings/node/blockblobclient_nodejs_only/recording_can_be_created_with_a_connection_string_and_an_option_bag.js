let nock = require('nock');

module.exports.testInfo = {"container":"container157050172300208634","blob":"blob157050172318209913","randomstring":"randomstring157050172318503142"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172300208634')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:42 GMT',
  'ETag',
  '"0x8D74B973CD017C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63f7a0d1-f01e-0028-7f80-7d47c9000000',
  'x-ms-client-request-id',
  '436f6140-35ea-4d37-acdf-6131ebe77bd2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 02:28:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172300208634/blob157050172318209913', "randomstring157050172318503142")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'knu9zsSF7jp4fFD/M+bQHw==',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:43 GMT',
  'ETag',
  '"0x8D74B973CEA9C97"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd723872b-901e-00b0-2680-7dc9f6000000',
  'x-ms-client-request-id',
  '0b8edfa5-c9f0-4bfd-b82b-2a5f5c7f9cde',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'JgtuZBllV1c=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Oct 2019 02:28:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157050172300208634/blob157050172318209913')
  .reply(200, "randomstring157050172318503142", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'knu9zsSF7jp4fFD/M+bQHw==',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D74B973CEA9C97"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c84c61df-b01e-0049-3c80-7d0316000000',
  'x-ms-client-request-id',
  '46ea461e-4f2f-495a-9a1d-adf3834b2126',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 08 Oct 2019 02:28:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 02:28:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157050172300208634')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55930684-e01e-00d2-6480-7d8e2e000000',
  'x-ms-client-request-id',
  '1b85787c-554d-4b32-9c4b-deb732b52711',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 02:28:42 GMT',
  'Connection',
  'close' ]);

