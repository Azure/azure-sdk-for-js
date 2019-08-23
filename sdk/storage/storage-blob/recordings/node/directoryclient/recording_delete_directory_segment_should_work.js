let nock = require('nock');

module.exports.testInfo = {"container":"container156654449326702048","directory":"directory156654449442102901","directory_delete0":"directory_delete0156654449442208352","directory_delete1":"directory_delete1156654449558008881","directory_delete2":"directory_delete2156654449671905271"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654449326702048')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:56 GMT',
  'ETag',
  '"0x8D727990ACE28E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7df0632-901e-0004-2f81-591f3c000000',
  'x-ms-client-request-id',
  '4a8697b2-a56f-42a9-87a0-0fa211c00d79',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654449326702048/directory156654449442102901/directory_delete0156654449442208352')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:57 GMT',
  'ETag',
  '"0x8D727990B81D9C7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c864cb7-701f-0033-0a81-59cd90000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8cfd14ee-fbd4-4901-9620-cf4d2ec200b8',
  'Date',
  'Fri, 23 Aug 2019 07:10:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654449326702048/directory156654449442102901/directory_delete1156654449558008881')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:58 GMT',
  'ETag',
  '"0x8D727990C301E78"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9aa7e4f9-f01f-0002-7181-592c83000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a840b833-b77b-47b6-ad58-a18500680b58',
  'Date',
  'Fri, 23 Aug 2019 07:10:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654449326702048/directory156654449442102901/directory_delete2156654449671905271')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:59 GMT',
  'ETag',
  '"0x8D727990CDCF763"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74d412b9-401f-0007-1a81-59fe58000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fc590131-96ef-45aa-b534-8e38934a9cec',
  'Date',
  'Fri, 23 Aug 2019 07:10:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654449326702048/directory156654449442102901')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1525bb6-b01f-0003-3481-59735f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e990047e-c4ac-445c-92eb-4e07e0675e31',
  'Date',
  'Fri, 23 Aug 2019 07:11:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654449326702048')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bbf1a1d-d01e-0005-6681-5940e0000000',
  'x-ms-client-request-id',
  '2a3c8c53-1fbe-4c02-ac39-0952dc70007a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:01 GMT',
  'Connection',
  'close' ]);

