let nock = require('nock');

module.exports.testInfo = {"container":"container156654453118104207","directory":"directory156654453235905003"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654453118104207')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:34 GMT',
  'ETag',
  '"0x8D72799216957B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c73359dd-b01e-002c-4181-597e94000000',
  'x-ms-client-request-id',
  '90f42de4-6957-4a44-b3c3-637c34c067bc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654453118104207/directory156654453235905003')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:35 GMT',
  'ETag',
  '"0x8D72799221CBE76"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9caeb799-d01f-002a-2c81-594d2b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'eee5b0d7-bb7c-45b9-9008-3b2a1734dbe7',
  'Date',
  'Fri, 23 Aug 2019 07:11:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654453118104207/directory156654453235905003')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:35 GMT',
  'ETag',
  '"0x8D72799221CBE76"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '8cc48f20-b01f-0013-3482-59b637000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6fbcb6b3-ec9d-4430-a114-abdfea094732',
  'Date',
  'Fri, 23 Aug 2019 07:11:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654453118104207/directory156654453235905003')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:35 GMT',
  'ETag',
  '"0x8D72799221CBE76"',
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
  'd2c3d4f8-701f-0041-6f82-59cadf000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5eb5a5ac-41d6-40f3-b289-33907b4b4427',
  'Date',
  'Fri, 23 Aug 2019 07:11:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654453118104207')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c1e6fef-e01e-000e-1182-59bb8b000000',
  'x-ms-client-request-id',
  '5fe639bc-b990-4008-8d5d-196fe8a7f6fb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:37 GMT',
  'Connection',
  'close' ]);

