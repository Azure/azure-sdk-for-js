let nock = require('nock');

module.exports.testInfo = {"container":"container157113257338902573","blob":"blob157113257479302607"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113257338902573')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:37:59 GMT',
  'ETag',
  '"0x8D751535E24FA0F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59cf5646-201e-0075-4f3c-83c225000000',
  'x-ms-client-request-id',
  '188ea235-e717-477f-a788-540a3c202820',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:37:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113257338902573/blob157113257479302607', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:01 GMT',
  'ETag',
  '"0x8D751535EDCFE01"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2e4d65d-501e-0053-453c-835991000000',
  'x-ms-client-request-id',
  '9bd8e2cc-a027-49dd-826c-8af9d9c3ad6a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 15 Oct 2019 09:38:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113257338902573/blob157113257479302607')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:01 GMT',
  'ETag',
  '"0x8D751535EDCFE01"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'ca3f05a4-e01f-0041-163c-836d8d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b959b16b-c387-4ca4-bd1c-e42c3afe929a',
  'Date',
  'Tue, 15 Oct 2019 09:38:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113257338902573/blob157113257479302607')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:01 GMT',
  'ETag',
  '"0x8D751535EDCFE01"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-rw-rw-',
  'x-ms-acl',
  'user::rw-,group::rw-,other::rw-',
  'x-ms-request-id',
  '3ace365e-901f-0067-353c-83f639000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'aea1d9b9-7ab6-42f9-8503-160d0f6186ed',
  'Date',
  'Tue, 15 Oct 2019 09:38:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113257338902573')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63a1e760-901e-0082-2d3c-83e4ce000000',
  'x-ms-client-request-id',
  '4cf5f2a8-b4d9-4c4f-90a4-9ddee8820202',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:04 GMT',
  'Connection',
  'close' ]);

