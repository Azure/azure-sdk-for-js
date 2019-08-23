let nock = require('nock');

module.exports.testInfo = {"container":"container156654458643408722","directory":"directory156654458778301723"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654458643408722')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:12:29 GMT',
  'ETag',
  '"0x8D7279942573BC3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7752ed67-201e-002e-7082-59c02c000000',
  'x-ms-client-request-id',
  '102865a3-770b-47c9-bc00-36b2b8b7bc02',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654458643408722/directory156654458778301723')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:12:30 GMT',
  'ETag',
  '"0x8D727994328A083"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a52e09fe-301f-000d-7182-595aef000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ed75d97e-b7a7-4232-8030-e6dfa2dd1bfa',
  'Date',
  'Fri, 23 Aug 2019 07:12:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654458643408722/directory156654458778301723')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cecf152-901f-0004-4782-591f3c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8096d029-18b6-48f2-a293-471c38b10745',
  'Date',
  'Fri, 23 Aug 2019 07:12:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654458643408722')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7752ed9e-201e-002e-0f82-59c02c000000',
  'x-ms-client-request-id',
  '367b34e3-4946-47fd-83c3-b8943ec7bdcd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:32 GMT',
  'Connection',
  'close' ]);

