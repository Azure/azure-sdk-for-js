let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157427318152005137","dir":"dir157427318161701354","file":"file157427318176900678"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157427318152005137')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 18:06:21 GMT',
  'ETag',
  '"0x8D76DE45961F398"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8adfaa8a-f01a-000e-5fcd-9f56ef000000',
  'x-ms-client-request-id',
  'f988e4be-3970-4bfb-9cbd-ebfba113e1b8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 18:06:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157427318152005137/dir157427318161701354')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 18:06:21 GMT',
  'ETag',
  '"0x8D76DE4597935C3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce5bd3a8-f01a-00b7-60cd-9f52f5000000',
  'x-ms-client-request-id',
  '3f825c7a-baef-49c9-a50c-fa8432023021',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T18:06:21.7301443Z',
  'x-ms-file-last-write-time',
  '2019-11-20T18:06:21.7301443Z',
  'x-ms-file-creation-time',
  '2019-11-20T18:06:21.7301443Z',
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
  'Wed, 20 Nov 2019 18:06:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157427318152005137')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8adfaa8e-f01a-000e-60cd-9f56ef000000',
  'x-ms-client-request-id',
  'f26430bd-d5ab-4263-bb4e-eb25d890a238',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 18:06:23 GMT'
]);
