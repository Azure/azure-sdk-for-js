let nock = require('nock');

module.exports.testInfo = {"container":"container156654452124103524","directory":"directory156654452301902401"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654452124103524')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:24 GMT',
  'ETag',
  '"0x8D727991BB27C11"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f8797f0-c01e-0044-0b81-591804000000',
  'x-ms-client-request-id',
  '5c6db666-f60e-4ff0-8e96-dbd968ea5670',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654452124103524/directory156654452301902401')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:25 GMT',
  'ETag',
  '"0x8D727991C8A2F2A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '879f1031-601f-002f-4e81-599ff0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '12849123-95ca-4d8d-b6dd-582d2141e056',
  'Date',
  'Fri, 23 Aug 2019 07:11:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654452124103524')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74ba7c93-101e-000a-7081-59368c000000',
  'x-ms-client-request-id',
  '635a477c-f417-49dd-a10e-3b4d2664e6da',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:26 GMT',
  'Connection',
  'close' ]);

