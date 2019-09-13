let nock = require('nock');

module.exports.testInfo = {"share":"share156775319659303865","dir":"dir156775319702705272","file":"file156775319743107938"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775319659303865')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:56 GMT',
  'ETag',
  '"0x8D73297D3AACBB5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cbf26cb-a01a-00c7-6080-6463de000000',
  'x-ms-client-request-id',
  '52f55233-733b-4b14-b7f9-ec7e6517f544',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775319659303865/dir156775319702705272')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:57 GMT',
  'ETag',
  '"0x8D73297D3EA6FBC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3eb85752-c01a-00fe-2b80-6498c2000000',
  'x-ms-client-request-id',
  '1f8d5bd2-0247-48ce-99a9-4aa4e4e9ca21',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:57.3021628Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:57.3021628Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:57.3021628Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 06:59:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775319659303865/dir156775319702705272/file156775319743107938')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:57 GMT',
  'ETag',
  '"0x8D73297D4282402"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04e53f1d-d01a-0006-4e80-64c43c000000',
  'x-ms-client-request-id',
  'b68089a6-e95e-4651-a8c0-1a3e839b1ac4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:57.7065474Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:57.7065474Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:57.7065474Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 06:59:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775319659303865/dir156775319702705272/file156775319743107938')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3e84558c-b01a-0120-4280-647229000000',
  'x-ms-client-request-id',
  'fac0781a-bacd-4353-8456-a1e391e075c1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775319659303865')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1478e31f-101a-0116-0980-64ff59000000',
  'x-ms-client-request-id',
  '7d56d761-3664-4e5e-bf92-56ad9ebe01d5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:58 GMT',
  'Connection',
  'close' ]);

