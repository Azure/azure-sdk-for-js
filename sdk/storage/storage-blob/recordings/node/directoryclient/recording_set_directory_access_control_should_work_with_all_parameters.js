let nock = require('nock');

module.exports.testInfo = {"container":"container157113273055405109","directory":"directory157113273171708178"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113273055405109')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:40:36 GMT',
  'ETag',
  '"0x8D75153BBB2E110"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '844e4a33-c01e-0056-573c-83adee000000',
  'x-ms-client-request-id',
  '0417f958-654c-41d4-9cc3-31e87af515c2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113273055405109/directory157113273171708178')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:38 GMT',
  'ETag',
  '"0x8D75153BC6378D2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f38791aa-801f-0073-4c3c-83355d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '96773fae-9fa2-45ce-81a5-fbd0d0a4ad13',
  'Date',
  'Tue, 15 Oct 2019 09:40:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113273055405109/directory157113273171708178')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:38 GMT',
  'ETag',
  '"0x8D75153BC6378D2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '116e1247-501f-001c-573c-839d89000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4235bc42-598f-4a27-b32c-44adb903b769',
  'Date',
  'Tue, 15 Oct 2019 09:40:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113273055405109/directory157113273171708178')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:38 GMT',
  'ETag',
  '"0x8D75153BC6378D2"',
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
  '4395390b-f01f-0033-333c-831cb3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7a86345b-ae78-4c17-8e4a-e9b0f9da4d3d',
  'Date',
  'Tue, 15 Oct 2019 09:40:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113273055405109')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ced6b6e-001e-0069-6f3c-831a32000000',
  'x-ms-client-request-id',
  'abcb7572-88c9-4480-bc31-18cb50c255c6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:41 GMT',
  'Connection',
  'close' ]);

