let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613029266006093","dir":"dir157613029381102542","file":"file157613029497804753"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029266006093')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:13 GMT',
  'ETag',
  '"0x8D77EC846801B56"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da001e07-d01a-0048-39b1-b08f0c000000',
  'x-ms-client-request-id',
  '0d9eac20-db36-4119-8cd7-77b5c2a68850',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:58:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029266006093/dir157613029381102542')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:14 GMT',
  'ETag',
  '"0x8D77EC847327F89"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c927f-301a-0040-62b1-b09503000000',
  'x-ms-client-request-id',
  '78ec5a5e-3054-4ec2-a8a9-59e675f9ee75',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:58:14.9265289Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:58:14.9265289Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:58:14.9265289Z',
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
  'Thu, 12 Dec 2019 05:58:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029266006093/dir157613029381102542/file157613029497804753')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:16 GMT',
  'ETag',
  '"0x8D77EC847E46AFD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd62022db-501a-000b-34b1-b06950000000',
  'x-ms-client-request-id',
  '37c07a7a-18d6-4540-8f32-7ba143109b09',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:58:16.0925437Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:58:16.0925437Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:58:16.0925437Z',
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
  'Thu, 12 Dec 2019 05:58:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029266006093/dir157613029381102542/file157613029497804753')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:16 GMT',
  'ETag',
  '"0x8D77EC847E46AFD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc002ae-501a-001b-7bb1-b0ac38000000',
  'x-ms-client-request-id',
  'c0ffb730-5de1-4566-b6c3-1f692e1669c9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 05:58:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029266006093/dir157613029381102542/file157613029497804753')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:16 GMT',
  'ETag',
  '"0x8D77EC847E46AFD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc002b1-501a-001b-7cb1-b0ac38000000',
  'x-ms-client-request-id',
  '5e0548ac-9957-4833-8879-7991f0591245',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 05:58:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613029266006093')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da001e0c-d01a-0048-3ab1-b08f0c000000',
  'x-ms-client-request-id',
  'cb7e3179-8735-453f-8b27-e92463741767',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:58:17 GMT'
]);
