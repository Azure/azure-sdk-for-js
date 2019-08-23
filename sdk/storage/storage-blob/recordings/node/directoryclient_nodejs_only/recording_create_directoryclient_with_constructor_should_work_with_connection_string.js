let nock = require('nock');

module.exports.testInfo = {"container":"container156654457183906373","directory":"directory156654457302005053"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654457183906373')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:12:14 GMT',
  'ETag',
  '"0x8D7279939A3AC06"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df69f201-801e-0037-6e82-594097000000',
  'x-ms-client-request-id',
  'acebe0c3-9051-4587-b6b5-a9cf9033f9fc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654457183906373/directory156654457302005053')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:15 GMT',
  'ETag',
  '"0x8D727993A57B171"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29c1647-b01f-003c-2b82-59bbfc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1a5c9edb-dbca-4076-b44d-a344428a2264',
  'Date',
  'Fri, 23 Aug 2019 07:12:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654457183906373/directory156654457302005053')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b389bc37-301f-0032-5d82-59924c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd66882f5-d324-4739-9fa7-0f78e65bf797',
  'Date',
  'Fri, 23 Aug 2019 07:12:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654457183906373')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65000891-a01e-0042-5482-592bbb000000',
  'x-ms-client-request-id',
  '10f5062c-f701-4c80-89c4-30c9acd567e5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:18 GMT',
  'Connection',
  'close' ]);

