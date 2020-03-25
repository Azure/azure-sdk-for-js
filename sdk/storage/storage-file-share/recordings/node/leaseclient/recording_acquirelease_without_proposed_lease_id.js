let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613026640006947","dir":"dir157613026754109537","file":"file157613026869103255"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026640006947')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:47 GMT',
  'ETag',
  '"0x8D77EC836D79173"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c71485c-b01a-003c-75b1-b0bbfc000000',
  'x-ms-client-request-id',
  '5c83a475-c7e4-4436-8d7b-046121d14ee3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:57:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026640006947/dir157613026754109537')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:48 GMT',
  'ETag',
  '"0x8D77EC837878C19"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2907a895-a01a-0030-21b1-b02cf4000000',
  'x-ms-client-request-id',
  '6949e22b-cd3a-4cfd-98ac-79420cd9143b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:57:48.6403609Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:48.6403609Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:48.6403609Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:57:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026640006947/dir157613026754109537/file157613026869103255')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:49 GMT',
  'ETag',
  '"0x8D77EC838390391"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33dfed0a-c01a-0044-7db1-b01804000000',
  'x-ms-client-request-id',
  '1957a157-cf3b-4959-8082-35f7e84eaf2b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:57:49.8034065Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:49.8034065Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:49.8034065Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:57:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613026640006947/dir157613026754109537/file157613026869103255')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:49 GMT',
  'ETag',
  '"0x8D77EC838390391"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f81d554-601a-003f-39b1-b05a98000000',
  'x-ms-client-request-id',
  '7a538763-5a19-4078-9348-9381626d8e95',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '734e011b-fc9b-4e9c-bf75-76535b6fe249',
  'Date',
  'Thu, 12 Dec 2019 05:57:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613026640006947/dir157613026754109537/file157613026869103255')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:49 GMT',
  'ETag',
  '"0x8D77EC838390391"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33dfed0e-c01a-0044-7eb1-b01804000000',
  'x-ms-client-request-id',
  '6b462b18-f358-49e7-96f7-fe4453809157',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-file-change-time',
  '2019-12-12T05:57:49.8034065Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:49.8034065Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:49.8034065Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:57:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613026640006947')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c714863-b01a-003c-77b1-b0bbfc000000',
  'x-ms-client-request-id',
  '36c169d5-859e-4aef-ae09-431fc09118dd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:57:51 GMT'
]);
