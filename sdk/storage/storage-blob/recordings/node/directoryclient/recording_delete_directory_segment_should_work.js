let nock = require('nock');

module.exports.testInfo = {"container":"container157113269189407667","directory":"directory157113269308309951","directory_delete0":"directory_delete0157113269308403963","directory_delete1":"directory_delete1157113269425601692","directory_delete2":"directory_delete2157113269542003203"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269189407667')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:39:58 GMT',
  'ETag',
  '"0x8D75153A4A884AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199da2bc-001e-00ae-573c-8366f3000000',
  'x-ms-client-request-id',
  '342cc390-15fc-4a6d-9ff6-e212eb45d389',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269189407667/directory157113269308309951/directory_delete0157113269308403963')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:39:59 GMT',
  'ETag',
  '"0x8D75153A561CA30"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2401dd93-701f-0088-543c-83fd47000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'db29957f-ce1b-455a-9d0c-1cf55dc1142d',
  'Date',
  'Tue, 15 Oct 2019 09:39:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269189407667/directory157113269308309951/directory_delete1157113269425601692')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:00 GMT',
  'ETag',
  '"0x8D75153A613F0A2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a14b8529-901f-006c-3f3c-83ee4d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '33fb78ee-88b7-4f9a-9cdb-e95aa8fa6e68',
  'Date',
  'Tue, 15 Oct 2019 09:40:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269189407667/directory157113269308309951/directory_delete2157113269542003203')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:01 GMT',
  'ETag',
  '"0x8D75153A6C179D6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29985f46-101f-0032-6e3c-831d4e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '755773eb-327e-4152-a2ca-21d54edc7abd',
  'Date',
  'Tue, 15 Oct 2019 09:40:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113269189407667/directory157113269308309951')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '638b2d6d-401f-0003-773c-834699000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '24ae35c8-74d2-4733-9b9e-3e41e9134320',
  'Date',
  'Tue, 15 Oct 2019 09:40:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113269189407667')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f165d16f-e01e-00a4-773c-837f7a000000',
  'x-ms-client-request-id',
  '6067022e-fa64-4492-aeaf-23ef6025f1ff',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:03 GMT',
  'Connection',
  'close' ]);

