let nock = require('nock');

module.exports.testInfo = {"container":"container157113271547905132","directory":"directory157113271665307473"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113271547905132')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:40:21 GMT',
  'ETag',
  '"0x8D75153B2B90037"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39fdb923-001e-004b-3b3c-837404000000',
  'x-ms-client-request-id',
  '91c2a3d2-62a2-41a4-9ad2-62f3056a53b6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113271547905132/directory157113271665307473')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:23 GMT',
  'ETag',
  '"0x8D75153B3695F77"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23298819-801f-0015-113c-838707000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '906af1d1-d9f9-44c4-9f88-ba50b5b0f3ea',
  'Date',
  'Tue, 15 Oct 2019 09:40:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113271547905132/directory157113271665307473')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:23 GMT',
  'ETag',
  '"0x8D75153B3695F77"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '1f5cc758-a01f-002b-4a3c-833126000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e714e3d6-744b-4b4c-a27a-fdebc1636e81',
  'Date',
  'Tue, 15 Oct 2019 09:40:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113271547905132/directory157113271665307473')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:23 GMT',
  'ETag',
  '"0x8D75153B3695F77"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxrwxrwx',
  'x-ms-acl',
  'user::rwx,group::rwx,other::rwx',
  'x-ms-request-id',
  '4b799a9e-101f-001b-7f3c-836b0c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '14eae2e2-5f13-4aad-9f5d-d56fe39da9eb',
  'Date',
  'Tue, 15 Oct 2019 09:40:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113271547905132')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52803b8f-901e-00a0-6d3c-838af8000000',
  'x-ms-client-request-id',
  '8c807fd0-b9b8-48e9-99d2-9f3696d61c65',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:26 GMT',
  'Connection',
  'close' ]);

