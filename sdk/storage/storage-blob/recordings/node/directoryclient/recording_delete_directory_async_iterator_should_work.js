let nock = require('nock');

module.exports.testInfo = {"container":"container157113269890508988","directory":"directory157113270142309010","directory_delete_async0":"directory_delete_async0157113270142404559","directory_delete_async1":"directory_delete_async1157113270256502573","directory_delete_async2":"directory_delete_async2157113270374707283"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269890508988')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:40:05 GMT',
  'ETag',
  '"0x8D75153A8D57518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10a1d5cb-f01e-0077-263c-83c0df000000',
  'x-ms-client-request-id',
  '0ffef7a3-88c6-454a-9e1b-d5cd84d03b26',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269890508988/directory157113270142309010/directory_delete_async0157113270142404559')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:07 GMT',
  'ETag',
  '"0x8D75153AA56A2E2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e480b8f5-a01f-008a-2f3c-83ffbd000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1d60f5d2-2c83-4845-b3fc-4fd7d00ec846',
  'Date',
  'Tue, 15 Oct 2019 09:40:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269890508988/directory157113270142309010/directory_delete_async1157113270256502573')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:08 GMT',
  'ETag',
  '"0x8D75153AB06DF61"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf2bd379-001f-002d-313c-83c65e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f51546f4-2e54-4c33-b019-bdb3b1852b71',
  'Date',
  'Tue, 15 Oct 2019 09:40:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113269890508988/directory157113270142309010/directory_delete_async2157113270374707283')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:10 GMT',
  'ETag',
  '"0x8D75153ABBB19EB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b799a8f-101f-001b-723c-836b0c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7abb414f-bfd0-476c-b5b7-a50e99052ffa',
  'Date',
  'Tue, 15 Oct 2019 09:40:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113269890508988/directory157113270142309010')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '842b43cc-501f-0017-673c-8385fd000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b54c7388-3923-45cf-9130-f00eea88ed09',
  'Date',
  'Tue, 15 Oct 2019 09:40:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113269890508988')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bef23f9a-a01e-00a8-503c-83918b000000',
  'x-ms-client-request-id',
  '784b154f-dd92-425c-95fd-4a974be06cae',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:11 GMT',
  'Connection',
  'close' ]);

