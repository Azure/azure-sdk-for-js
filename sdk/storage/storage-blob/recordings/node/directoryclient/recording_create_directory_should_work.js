let nock = require('nock');

module.exports.testInfo = {"container":"container156654447859208805","directory":"directory156654447978503378"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654447859208805')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:41 GMT',
  'ETag',
  '"0x8D72799021019B5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eca94b60-401e-0028-3281-59f393000000',
  'x-ms-client-request-id',
  'ea16b9aa-00c9-4f55-b8b9-c515a1aed800',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654447859208805/directory156654447978503378')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:42 GMT',
  'ETag',
  '"0x8D7279902C69182"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85cf29d1-701f-001c-6081-59c05b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2f6f8d79-b7f5-4b82-9990-ef0a332110df',
  'Date',
  'Fri, 23 Aug 2019 07:10:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654447859208805')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45e29425-501e-0024-7a81-59649b000000',
  'x-ms-client-request-id',
  '48009a0d-d74c-4ddb-b6bd-cae0e1bc424e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:43 GMT',
  'Connection',
  'close' ]);

