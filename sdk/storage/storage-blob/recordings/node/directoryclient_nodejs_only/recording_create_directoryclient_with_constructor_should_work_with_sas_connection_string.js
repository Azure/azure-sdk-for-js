let nock = require('nock');

module.exports.testInfo = {"container":"container156654457646307820","directory":"directory156654457779202367"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654457646307820')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:12:19 GMT',
  'ETag',
  '"0x8D727993C7E792A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7df0b54-901e-0004-1082-591f3c000000',
  'x-ms-client-request-id',
  '4a1ff2dd-f191-4a88-bfb1-9df8c339ad4a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654457646307820/directory156654457779202367')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:20 GMT',
  'ETag',
  '"0x8D727993D624C73"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c910d87-201f-003e-1782-590544000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ce63e03c-69d1-4093-aec5-2497acfc212b',
  'Date',
  'Fri, 23 Aug 2019 07:12:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654457646307820/directory156654457779202367')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17dcccd7-401f-0038-7b82-5936fb000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fd627040-f27d-4157-8c9a-880de8e29ab6',
  'Date',
  'Fri, 23 Aug 2019 07:12:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654457646307820')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b8f4b51-701e-0033-2782-59cd90000000',
  'x-ms-client-request-id',
  'bb395ab2-87fa-4cb3-a952-4735c3d17b7b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:22 GMT',
  'Connection',
  'close' ]);

