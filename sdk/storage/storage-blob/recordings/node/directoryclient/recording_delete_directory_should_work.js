let nock = require('nock');

module.exports.testInfo = {"container":"container156654448825801977","directory":"directory156654448943705089","directory_delete":"directory_delete156654448943704398"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654448825801977')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:51 GMT',
  'ETag',
  '"0x8D7279907D46369"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5515564b-c01e-0019-1081-591280000000',
  'x-ms-client-request-id',
  '4f0356d9-8a5f-48ee-a547-aa57c691d0a3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654448825801977/directory156654448943705089/directory_delete156654448943704398')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:52 GMT',
  'ETag',
  '"0x8D72799088A8F3F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b329af30-e01f-0043-6981-597467000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd9aa1faf-9133-4abc-8038-697d0e38e2f2',
  'Date',
  'Fri, 23 Aug 2019 07:10:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654448825801977/directory156654448943705089/directory_delete156654448943704398')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41946749-f01f-002d-3281-592148000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'bcdbba06-6f16-430f-9a31-0b39c6d082ee',
  'Date',
  'Fri, 23 Aug 2019 07:10:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654448825801977')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7dcaee18-501e-0034-0581-59a1f3000000',
  'x-ms-client-request-id',
  '9ed0acfc-da56-4031-ac59-9594cbd35f14',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:54 GMT',
  'Connection',
  'close' ]);

