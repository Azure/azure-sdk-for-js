let nock = require('nock');

module.exports.testInfo = {"container":"container156929884508903202","directory":"directory156929884653903785"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929884508903202')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:23 GMT',
  'ETag',
  '"0x8D740A5F5D3CA19"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58cf1d71-301e-0048-488e-727703000000',
  'x-ms-client-request-id',
  '1400ef06-3a9b-4c62-9231-6d42b3d1fd8c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:22 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929884508903202/directory156929884653903785')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:24 GMT',
  'ETag',
  '"0x8D740A5F6B1C284"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70a27e53-b01f-0059-1a8e-724018000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9988e326-c3d7-469f-9aa3-971df5a182c7',
  'Date',
  'Tue, 24 Sep 2019 04:16:24 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929884508903202')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5636ed52-601e-0014-5a8e-7286fa000000',
  'x-ms-client-request-id',
  '24b9060d-a3a7-484b-a9d9-70904613408c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:25 GMT' ]);
