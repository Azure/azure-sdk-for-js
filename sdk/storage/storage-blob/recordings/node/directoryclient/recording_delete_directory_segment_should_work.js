let nock = require('nock');

module.exports.testInfo = {"container":"container156929885954402584","directory":"directory156929886069401434","directory_delete0":"directory_delete0156929886069500173","directory_delete1":"directory_delete1156929886184107683","directory_delete2":"directory_delete2156929886296805892"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929885954402584')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:37 GMT',
  'ETag',
  '"0x8D740A5FE5A03DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6387067-301e-0025-338e-72dd2d000000',
  'x-ms-client-request-id',
  '658947a5-d1e9-4c40-81e2-2e49ba9867ba',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:36 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929885954402584/directory156929886069401434/directory_delete0156929886069500173')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:38 GMT',
  'ETag',
  '"0x8D740A5FF0BCCDB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fec39f0b-701f-004f-0d8e-728186000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '012da6ec-73d8-4f89-8f58-e983df94f15b',
  'Date',
  'Tue, 24 Sep 2019 04:16:37 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929885954402584/directory156929886069401434/directory_delete1156929886184107683')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:40 GMT',
  'ETag',
  '"0x8D740A5FFB793F8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '90352d04-e01f-0063-318e-7203bb000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '534c2491-7f8b-4dd1-a01f-f63bf59de98e',
  'Date',
  'Tue, 24 Sep 2019 04:16:39 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929885954402584/directory156929886069401434/directory_delete2156929886296805892')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:41 GMT',
  'ETag',
  '"0x8D740A60076C557"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5c32b88-301f-0048-0f8e-727703000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5ad4afaf-2bc0-456f-a6f4-6b97bd99a4d5',
  'Date',
  'Tue, 24 Sep 2019 04:16:40 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929885954402584/directory156929886069401434')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '856000b5-b01f-0016-268e-728400000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6f0806da-fa4c-496f-a8de-213350560f61',
  'Date',
  'Tue, 24 Sep 2019 04:16:42 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929885954402584')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18de776b-001e-008c-7d8e-7208c5000000',
  'x-ms-client-request-id',
  '672792a2-fc88-4b58-9289-5a994ce4c798',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:43 GMT' ]);
