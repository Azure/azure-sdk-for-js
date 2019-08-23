let nock = require('nock');

module.exports.testInfo = {"container":"container156654447278207206","blob":"blob156654447398207553"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654447278207206')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:35 GMT',
  'ETag',
  '"0x8D72798FE9B07DE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da38e5c7-401e-0038-5481-5936fb000000',
  'x-ms-client-request-id',
  'f828b250-d4ae-4a13-93b1-39fa7a1ebd99',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654447278207206/blob156654447398207553', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:36 GMT',
  'ETag',
  '"0x8D72798FF530906"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4822c316-e01e-0021-6681-59b640000000',
  'x-ms-client-request-id',
  'bbee01a7-5e04-4a12-b292-6b8a83bc3759',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 23 Aug 2019 07:10:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654447278207206/blob156654447398207553')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:36 GMT',
  'ETag',
  '"0x8D72798FF530906"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'cd03bd85-801f-0037-2581-594097000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c9f3b09e-eb0b-4848-ba06-7ce8c02c1b10',
  'Date',
  'Fri, 23 Aug 2019 07:10:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654447278207206/blob156654447398207553')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:36 GMT',
  'ETag',
  '"0x8D72798FF530906"',
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
  '71f375e7-701f-0023-6881-5908f8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b08adf56-a85c-48c5-bc3a-dd19decfe6e3',
  'Date',
  'Fri, 23 Aug 2019 07:10:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654447278207206')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19ef3348-f01e-003d-1181-59e420000000',
  'x-ms-client-request-id',
  'e6a99868-8438-40a0-9c63-b706af649984',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:39 GMT',
  'Connection',
  'close' ]);

