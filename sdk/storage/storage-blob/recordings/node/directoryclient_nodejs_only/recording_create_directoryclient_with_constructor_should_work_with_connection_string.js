let nock = require('nock');

module.exports.testInfo = {"container":"container157113292134907445","directory":"directory157113292251506202"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113292134907445')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:47 GMT',
  'ETag',
  '"0x8D751542D6D9014"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63a49240-901e-0082-7b3d-83e4ce000000',
  'x-ms-client-request-id',
  '9bd166e2-0b62-4efd-9f65-cff130053856',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113292134907445/directory157113292251506202')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:43:48 GMT',
  'ETag',
  '"0x8D751542E2053B9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f5cc7de-a01f-002b-213d-833126000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2f074a6b-d8c0-4abc-b6d1-bcb35d3dc783',
  'Date',
  'Tue, 15 Oct 2019 09:43:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113292134907445/directory157113292251506202')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '810a547f-001f-004b-4a3d-837404000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7edc98cc-3407-44b6-aaa1-bcb656694b03',
  'Date',
  'Tue, 15 Oct 2019 09:43:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113292134907445')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b053f33-801e-0015-073d-838707000000',
  'x-ms-client-request-id',
  '6e8bca53-f1fd-455e-8add-be4bd151912e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:50 GMT',
  'Connection',
  'close' ]);

