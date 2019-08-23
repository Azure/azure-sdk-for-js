let nock = require('nock');

module.exports.testInfo = {"container":"container156654450014607531","directory":"directory156654450136808475","directory_delete_async0":"directory_delete_async0156654450137008040","directory_delete_async1":"directory_delete_async1156654450252708412","directory_delete_async2":"directory_delete_async2156654450365707693"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654450014607531')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:03 GMT',
  'ETag',
  '"0x8D727990EEC6CD8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd714f3e-201e-0001-2681-59cde7000000',
  'x-ms-client-request-id',
  '2c2c61c5-dccc-42df-834e-625a52799b60',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654450014607531/directory156654450136808475/directory_delete_async0156654450137008040')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:04 GMT',
  'ETag',
  '"0x8D727990FA67C9B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fc4ed63f-201f-002e-7e81-59c02c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e82b96df-99b4-4972-832b-31d42ba56567',
  'Date',
  'Fri, 23 Aug 2019 07:11:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654450014607531/directory156654450136808475/directory_delete_async1156654450252708412')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:05 GMT',
  'ETag',
  '"0x8D727991052EDE9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9aa7e4fa-f01f-0002-7281-592c83000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd931a0f5-0a24-4aad-8ebf-07956194fe89',
  'Date',
  'Fri, 23 Aug 2019 07:11:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654450014607531/directory156654450136808475/directory_delete_async2156654450365707693')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:06 GMT',
  'ETag',
  '"0x8D7279911019402"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '92e3edc5-d01f-0048-1d81-598f0c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b4ec5a20-7f9a-4c25-bd67-4ef7e9c8f125',
  'Date',
  'Fri, 23 Aug 2019 07:11:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654450014607531/directory156654450136808475')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9aa7e4fd-f01f-0002-7581-592c83000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e46ee66d-2832-47ed-828b-941d0ffdf5e4',
  'Date',
  'Fri, 23 Aug 2019 07:11:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654450014607531')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4822c69e-e01e-0021-6581-59b640000000',
  'x-ms-client-request-id',
  'dbc6c392-5016-4c67-8379-ba34319a6d10',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:07 GMT',
  'Connection',
  'close' ]);

