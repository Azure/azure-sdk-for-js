let nock = require('nock');

module.exports.testInfo = {"container":"container156929886657404872","directory":"directory156929886771405655","directory_delete_async0":"directory_delete_async0156929886771603246","directory_delete_async1":"directory_delete_async1156929886886507201","directory_delete_async2":"directory_delete_async2156929887000808413"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929886657404872')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:44 GMT',
  'ETag',
  '"0x8D740A602898DEF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3c76bfd-d01e-00a7-558e-727c7d000000',
  'x-ms-client-request-id',
  'a6e40f29-4de6-4aa3-8d4d-72b886bd79f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:44 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929886657404872/directory156929886771405655/directory_delete_async0156929886771603246')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:45 GMT',
  'ETag',
  '"0x8D740A6033B7B9B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4d840e-101f-0032-278e-721d4e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '406ae5b9-3fc4-4849-928a-9226f94d4d08',
  'Date',
  'Tue, 24 Sep 2019 04:16:45 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929886657404872/directory156929886771405655/directory_delete_async1156929886886507201')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:47 GMT',
  'ETag',
  '"0x8D740A603E9DB1A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '695e0309-a01f-002b-598e-723126000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0055a3e4-9a29-416d-86c3-4c95c57f0857',
  'Date',
  'Tue, 24 Sep 2019 04:16:46 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929886657404872/directory156929886771405655/directory_delete_async2156929887000808413')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:48 GMT',
  'ETag',
  '"0x8D740A604983688"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fec39f0e-701f-004f-108e-728186000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3ac5d147-15a7-4fc2-8cee-1cc4043c656c',
  'Date',
  'Tue, 24 Sep 2019 04:16:47 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929886657404872/directory156929886771405655')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2642c34e-201f-0013-3e8e-72707f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0df6e46e-49c2-45de-9a13-31d891a9c8a8',
  'Date',
  'Tue, 24 Sep 2019 04:16:48 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929886657404872')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5737ed7-d01e-0049-068e-7276fe000000',
  'x-ms-client-request-id',
  'e118638b-2dca-494f-8234-d8160c258dca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:50 GMT' ]);
