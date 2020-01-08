let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534368787308536"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534368787308536')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:10 GMT',
  'ETag',
  '"0x8D7779FFBDD3D25"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '05c9e510-501e-0053-1e88-a95991000000',
  'x-ms-client-request-id',
  'bd92786e-6733-4412-b687-9195c4443356',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:10 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534368787308536')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:10 GMT',
  'ETag',
  '"0x8D7779FFBDD3D25"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e15214d-101e-0032-1788-a91d4e000000',
  'x-ms-client-request-id',
  '993876db-2326-4540-981d-b0c6995f74c4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '1213617b-b3f3-4288-8b96-c4f5e8969a72',
  'Date',
  'Tue, 03 Dec 2019 03:22:10 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534368787308536')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:10 GMT',
  'ETag',
  '"0x8D7779FFBDD3D25"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '05c9e8b7-501e-0053-0188-a95991000000',
  'x-ms-client-request-id',
  'b2e9bc1f-a419-418e-a683-ce242626b36b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:22:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534368787308536')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:10 GMT',
  'ETag',
  '"0x8D7779FFBDD3D25"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e152284-101e-0032-3888-a91d4e000000',
  'x-ms-client-request-id',
  '5e1ade68-f22d-4f88-8467-69245fca27a2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534368787308536')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '05c9ea07-501e-0053-3588-a95991000000',
  'x-ms-client-request-id',
  '529da593-d455-4277-8a80-1e4da97a4543',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:12 GMT' ]);
