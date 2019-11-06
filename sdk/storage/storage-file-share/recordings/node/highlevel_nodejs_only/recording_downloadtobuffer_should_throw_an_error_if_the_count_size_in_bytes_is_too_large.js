let nock = require('nock');

module.exports.testInfo = {"share":"share157307943298805253","dir":"dir157307943340005734","file":"file157307943346505070"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157307943298805253')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 06 Nov 2019 22:30:33 GMT',
  'ETag',
  '"0x8D76308EFF8B5F8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47c58e6b-101a-0039-36f1-948443000000',
  'x-ms-client-request-id',
  '55843082-a5e7-4193-bbe6-ce17f32e60d6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 06 Nov 2019 22:30:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157307943298805253/dir157307943340005734')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 06 Nov 2019 22:30:33 GMT',
  'ETag',
  '"0x8D76308F006AAFD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf5225bb-c01a-0067-68f1-946fa3000000',
  'x-ms-client-request-id',
  '4e1bbe5b-72c5-4cfe-977c-a1c267aeb1c7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-06T22:30:33.4071549Z',
  'x-ms-file-last-write-time',
  '2019-11-06T22:30:33.4071549Z',
  'x-ms-file-creation-time',
  '2019-11-06T22:30:33.4071549Z',
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
  'Wed, 06 Nov 2019 22:30:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157307943298805253')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47c58e6f-101a-0039-37f1-948443000000',
  'x-ms-client-request-id',
  'ab170548-90e7-49df-ac3b-194ae3f2581e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 06 Nov 2019 22:30:33 GMT'
]);
