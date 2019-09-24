let nock = require('nock');

module.exports.testInfo = {"container":"container156929860420301749","directory":"directory156929860560408976"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860420301749')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:22 GMT',
  'ETag',
  '"0x8D740A56626DAAF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a4f030-f01e-001a-768e-726af1000000',
  'x-ms-client-request-id',
  '691a4d70-9681-4013-9901-131c57483b00',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:22 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929860420301749/directory156929860560408976')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:23 GMT',
  'ETag',
  '"0x8D740A567003900"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0833bc9-b01f-007b-2d8e-722e2e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '640f104e-d800-40d5-8dbd-c31751c9a95e',
  'Date',
  'Tue, 24 Sep 2019 04:12:22 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929860420301749/directory156929860560408976')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4135a4ef-401f-0021-638e-7228af000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c9552ad6-326f-4f94-819f-cfb89933bd9e',
  'Date',
  'Tue, 24 Sep 2019 04:12:24 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929860420301749')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56496d5d-401e-0080-268e-72e634000000',
  'x-ms-client-request-id',
  'ffc6c069-dc79-43d4-9e84-fc6d10c444ff',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:26 GMT' ]);
