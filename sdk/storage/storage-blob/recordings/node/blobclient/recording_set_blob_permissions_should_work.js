let nock = require('nock');

module.exports.testInfo = {"container":"container156654445333101316","blob":"blob156654445489703073"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654445333101316')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:16 GMT',
  'ETag',
  '"0x8D72798F3276E14"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4822bf95-e01e-0021-3381-59b640000000',
  'x-ms-client-request-id',
  '9cd4280f-744c-4062-818a-d86ceb3b1bc8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654445333101316/blob156654445489703073', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:17 GMT',
  'ETag',
  '"0x8D72798F412DF89"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7752e48e-201e-002e-2e81-59c02c000000',
  'x-ms-client-request-id',
  'df9617ce-8f1c-432e-9eb6-5fd7a3b18d34',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 23 Aug 2019 07:10:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654445333101316/blob156654445489703073')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:17 GMT',
  'ETag',
  '"0x8D72798F412DF89"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'eb6a123f-101f-000a-6381-59368c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a2399fef-85ab-45f6-b9a3-15ed024bb1c7',
  'Date',
  'Fri, 23 Aug 2019 07:10:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654445333101316/blob156654445489703073')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:17 GMT',
  'ETag',
  '"0x8D72798F412DF89"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-rw-rw-',
  'x-ms-acl',
  'user::rw-,group::rw-,other::rw-',
  'x-ms-request-id',
  '548c35a4-801f-0018-5881-594d5c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c7a1c3f6-fb6b-4b7c-9f2c-27ae17f730a9',
  'Date',
  'Fri, 23 Aug 2019 07:10:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654445333101316')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd5efcfa-501e-0046-1581-59a6bc000000',
  'x-ms-client-request-id',
  'a14949a1-9251-4142-9dce-72694f247512',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:22 GMT',
  'Connection',
  'close' ]);

