let nock = require('nock');

module.exports.testInfo = {"container":"container156654446685705061","blob":"blob156654446812906457"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654446685705061')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:29 GMT',
  'ETag',
  '"0x8D72798FB11C92D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19ef3227-f01e-003d-1481-59e420000000',
  'x-ms-client-request-id',
  '768d784a-e29d-4ea0-b61f-0c72cef609cb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654446685705061/blob156654446812906457', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:31 GMT',
  'ETag',
  '"0x8D72798FBD8CA1A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ab80b5e-a01e-0020-0981-59e99c000000',
  'x-ms-client-request-id',
  '51bc4bd9-c200-401e-ad72-b49c9edccb14',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 23 Aug 2019 07:10:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654446685705061/blob156654446812906457')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:31 GMT',
  'ETag',
  '"0x8D72798FBD8CA1A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'b1525ba7-b01f-0003-2b81-59735f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'cae21cb0-f8be-4b41-8bd0-24ea14d56d37',
  'Date',
  'Fri, 23 Aug 2019 07:10:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654446685705061/blob156654446812906457')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:31 GMT',
  'ETag',
  '"0x8D72798FBD8CA1A"',
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
  '9f182fda-101f-0025-3081-593b47000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f0e54f1c-4599-4744-9f86-1c08175bb235',
  'Date',
  'Fri, 23 Aug 2019 07:10:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654446685705061')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ec7384d-f01e-0002-3581-592c83000000',
  'x-ms-client-request-id',
  'c422d253-0715-4142-ac8f-295b8fcd7cd7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:34 GMT',
  'Connection',
  'close' ]);

