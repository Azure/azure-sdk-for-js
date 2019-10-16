let nock = require('nock');

module.exports.testInfo = {"container":"container157113292601102427","directory":"directory157113292718107904"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113292601102427')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:52 GMT',
  'ETag',
  '"0x8D751543036106F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dda256e6-d01e-0024-3f3d-83dcd0000000',
  'x-ms-client-request-id',
  '8d138bf7-30ac-4bf2-bb6a-874e85fb1280',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113292601102427/directory157113292718107904')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:43:53 GMT',
  'ETag',
  '"0x8D7515430E859AE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00af064e-601f-0014-673d-8386fa000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'bccfe038-3a2a-4bcf-83a3-c89340a2c2ec',
  'Date',
  'Tue, 15 Oct 2019 09:43:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113292601102427/directory157113292718107904')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c946f39-601f-0036-2c3d-83e8cc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f92e7f0e-ae6f-468e-a2a8-eb7dd1fb316f',
  'Date',
  'Tue, 15 Oct 2019 09:43:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113292601102427')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63a4a2c6-901e-0082-543d-83e4ce000000',
  'x-ms-client-request-id',
  '9f5d4341-320e-4ebc-8570-037bb5ebf701',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:55 GMT',
  'Connection',
  'close' ]);

