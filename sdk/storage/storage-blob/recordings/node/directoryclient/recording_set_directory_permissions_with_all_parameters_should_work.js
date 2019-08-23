let nock = require('nock');

module.exports.testInfo = {"container":"container156654451513402805","directory":"directory156654451647105971"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654451513402805')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:18 GMT',
  'ETag',
  '"0x8D7279917EF535E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ab80e84-a01e-0020-7081-59e99c000000',
  'x-ms-client-request-id',
  'c75f0356-77cd-43ea-9e9a-88c5d091b15a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654451513402805/directory156654451647105971')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:19 GMT',
  'ETag',
  '"0x8D7279918A355E8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '348199a8-901f-0014-7c81-59da54000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2040a40a-97e5-4325-875f-b612de70ce63',
  'Date',
  'Fri, 23 Aug 2019 07:11:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654451513402805/directory156654451647105971')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:19 GMT',
  'ETag',
  '"0x8D7279918A355E8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '74d412c5-401f-0007-1f81-59fe58000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a3eace98-7c9f-4b03-a3e4-925e4bc22e9c',
  'Date',
  'Fri, 23 Aug 2019 07:11:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654451513402805/directory156654451647105971')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:19 GMT',
  'ETag',
  '"0x8D7279918A355E8"',
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
  'fc009113-d01f-0015-6381-598588000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7eecdc47-eee7-4586-9078-0765c0efb791',
  'Date',
  'Fri, 23 Aug 2019 07:11:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654451513402805')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d3188bf-401e-0007-4381-59fe58000000',
  'x-ms-client-request-id',
  '3489bb9a-33b6-4abf-b0d1-c7b424f3f6bf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:22 GMT',
  'Connection',
  'close' ]);

