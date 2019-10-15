let nock = require('nock');

module.exports.testInfo = {"container":"container156929888164300258","directory":"directory156929888280309590"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929888164300258')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:59 GMT',
  'ETag',
  '"0x8D740A60B872253"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad6fd91b-a01e-0046-748e-729b08000000',
  'x-ms-client-request-id',
  '573f3b61-e411-4986-9bb1-f31257be4efa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:59 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929888164300258/directory156929888280309590')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:00 GMT',
  'ETag',
  '"0x8D740A60C378EEC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0d2874d-701f-000b-7f8e-725dea000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '44b3fcd3-dae9-4f75-a676-1b922c2bb557',
  'Date',
  'Tue, 24 Sep 2019 04:17:00 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929888164300258/directory156929888280309590')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:00 GMT',
  'ETag',
  '"0x8D740A60C378EEC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'b4781421-001f-004b-3f8e-727404000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '821d9f0e-6e18-4e26-b9ef-2d502f35cc90',
  'Date',
  'Tue, 24 Sep 2019 04:17:01 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929888164300258/directory156929888280309590')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:00 GMT',
  'ETag',
  '"0x8D740A60C378EEC"',
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
  '6bfacb11-e01f-0027-248e-72dfd7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a2ced0fd-3bab-4d7d-8588-c13a713b4d01',
  'Date',
  'Tue, 24 Sep 2019 04:17:03 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929888164300258')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f9a0e57-701e-0000-328e-72459e000000',
  'x-ms-client-request-id',
  '386fb943-cd18-46a3-b88e-91b9799e7467',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:04 GMT' ]);
