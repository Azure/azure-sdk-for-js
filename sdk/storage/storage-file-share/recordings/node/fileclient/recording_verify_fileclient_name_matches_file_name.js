let nock = require('nock');

module.exports.testInfo = {"share":"share157326050458609312","dir":"dir157326050473704397","file":"file157326050484704489"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157326050458609312')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 09 Nov 2019 00:48:24 GMT',
  'ETag',
  '"0x8D764AE86E89BC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d425987-a01a-0085-1b97-965282000000',
  'x-ms-client-request-id',
  'd77e07ef-7fca-4ebd-ac92-7bb4caba7b29',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Sat, 09 Nov 2019 00:48:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157326050458609312/dir157326050473704397')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 09 Nov 2019 00:48:24 GMT',
  'ETag',
  '"0x8D764AE8700A290"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd07723c-d01a-007b-7897-963dc3000000',
  'x-ms-client-request-id',
  '8d316c83-9092-4123-a394-586802ca5804',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-09T00:48:24.8267408Z',
  'x-ms-file-last-write-time',
  '2019-11-09T00:48:24.8267408Z',
  'x-ms-file-creation-time',
  '2019-11-09T00:48:24.8267408Z',
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
  .delete('/share157326050458609312')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d42598a-a01a-0085-1c97-965282000000',
  'x-ms-client-request-id',
  '1f44046a-a76d-4cb7-b5f5-1fdc50972cd6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Sat, 09 Nov 2019 00:48:23 GMT'
]);
