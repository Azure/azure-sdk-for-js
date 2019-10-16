let nock = require('nock');

module.exports.testInfo = {"container":"container157113259125403746","blob":"blob157113259258406430"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113259125403746')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:17 GMT',
  'ETag',
  '"0x8D7515368BCA4BA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b0602773-a01e-0009-293c-835f10000000',
  'x-ms-client-request-id',
  'ed095f99-ac75-4a8f-9ecd-6e104ed40413',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113259125403746/blob157113259258406430', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:19 GMT',
  'ETag',
  '"0x8D75153697E8822"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c6d2a12-001e-000f-5f3c-83a868000000',
  'x-ms-client-request-id',
  '34e3cc75-45a9-41cb-95e0-60cabfdf172d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 15 Oct 2019 09:38:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113259125403746/blob157113259258406430')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:19 GMT',
  'ETag',
  '"0x8D75153697E8822"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '913eec44-f01f-001a-663c-836af1000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'dda611df-d3a5-47b6-9f78-07ccc2eae1be',
  'Date',
  'Tue, 15 Oct 2019 09:38:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113259125403746/blob157113259258406430')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:19 GMT',
  'ETag',
  '"0x8D75153697E8822"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '3ca7e78d-101f-0054-053c-83af14000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6a7888cb-7c35-4cb1-8c0a-1af945f3c86f',
  'Date',
  'Tue, 15 Oct 2019 09:38:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113259125403746')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2416b8e4-801e-0073-643c-83355d000000',
  'x-ms-client-request-id',
  '71110ec5-e66d-469a-b47b-b7e2256d7c6f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:21 GMT',
  'Connection',
  'close' ]);

