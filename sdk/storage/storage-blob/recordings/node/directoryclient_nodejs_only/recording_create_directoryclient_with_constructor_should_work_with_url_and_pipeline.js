let nock = require('nock');

module.exports.testInfo = {"container":"container156654458154508100","directory":"directory156654458284806351"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654458154508100')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:12:24 GMT',
  'ETag',
  '"0x8D727993F6C907D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c63c170-701e-0023-7182-5908f8000000',
  'x-ms-client-request-id',
  '7d0432aa-0d37-4b6b-bc50-ee4b17ded543',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654458154508100/directory156654458284806351')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:25 GMT',
  'ETag',
  '"0x8D72799403E908D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34a2fafe-901f-003b-1082-59d79f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '972f1bfe-5512-4812-b369-16965cba91d0',
  'Date',
  'Fri, 23 Aug 2019 07:12:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654458154508100/directory156654458284806351')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd0f778e-e01f-0021-4582-59b640000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1f742397-2311-432e-a8e8-c7c94c35e7b5',
  'Date',
  'Fri, 23 Aug 2019 07:12:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654458154508100')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af3e1325-a01e-000f-4a82-59e457000000',
  'x-ms-client-request-id',
  '6baecc2c-822f-4dff-8c18-53278629f8e3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:27 GMT',
  'Connection',
  'close' ]);

