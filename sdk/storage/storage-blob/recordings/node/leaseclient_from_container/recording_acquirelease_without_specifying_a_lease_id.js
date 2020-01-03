let nock = require('nock');

module.exports.testInfo = {"container":"container156816845723509016"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816845723509016')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:57 GMT',
  'ETag',
  '"0x8D7365EAE52AF13"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66b1a39c-f01e-004a-3f47-68569b000000',
  'x-ms-client-request-id',
  'f4a30971-7f29-417e-b446-6c2bf4d24dc4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:57 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816845723509016')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:57 GMT',
  'ETag',
  '"0x8D7365EAE52AF13"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f34ce92-601e-0044-4d47-68ba90000000',
  'x-ms-client-request-id',
  '77fac08b-d66d-4dc9-8f15-2f9e3a8ba8e6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ff4cd64a-da67-429d-a6cf-3433e727ee67',
  'Date',
  'Wed, 11 Sep 2019 02:20:57 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816845723509016')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:57 GMT',
  'ETag',
  '"0x8D7365EAE52AF13"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7bd56fd-301e-005c-6147-689705000000',
  'x-ms-client-request-id',
  '08ab1b4b-cc8b-4c2f-84a3-8afc961a8be1',
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
  'Wed, 11 Sep 2019 02:20:57 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816845723509016')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:57 GMT',
  'ETag',
  '"0x8D7365EAE52AF13"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6797aa26-b01e-0064-1a47-68d65c000000',
  'x-ms-client-request-id',
  '2290c654-af69-4ff1-845f-c9115e65a5c4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:58 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816845723509016')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f34d06c-601e-0044-7e47-68ba90000000',
  'x-ms-client-request-id',
  'f57c7ae0-18cd-48c7-928f-c1b1ff57f495',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:59 GMT' ]);

