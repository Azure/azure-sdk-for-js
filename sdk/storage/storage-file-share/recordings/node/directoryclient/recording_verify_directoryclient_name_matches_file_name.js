let nock = require('nock');

module.exports.testInfo = {"share":"share157326050405208320","dir":"dir157326050427607950"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157326050405208320')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 09 Nov 2019 00:48:24 GMT',
  'ETag',
  '"0x8D764AE869FD866"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bfe3026f-d01a-006b-7697-96f8ab000000',
  'x-ms-client-request-id',
  'ad72dd49-1897-4e3e-934e-e7b3a556bd50',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Sat, 09 Nov 2019 00:48:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157326050405208320/dir157326050427607950')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 09 Nov 2019 00:48:24 GMT',
  'ETag',
  '"0x8D764AE86C9DAA0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58f1f7b7-301a-004c-5597-96ef6f000000',
  'x-ms-client-request-id',
  '2fa758ef-b105-47c1-bcba-5c9808c142b2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-09T00:48:24.4677280Z',
  'x-ms-file-last-write-time',
  '2019-11-09T00:48:24.4677280Z',
  'x-ms-file-creation-time',
  '2019-11-09T00:48:24.4677280Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 09 Nov 2019 00:48:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157326050405208320')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bfe3027f-d01a-006b-0497-96f8ab000000',
  'x-ms-client-request-id',
  '3a3fe79d-75ed-4e73-a7a0-ee89c8234f29',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Sat, 09 Nov 2019 00:48:24 GMT'
]);
