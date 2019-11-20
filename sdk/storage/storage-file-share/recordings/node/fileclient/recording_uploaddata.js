let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157428701709709532","dir":"dir157428701732302330","file":"file157428701739406859"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701709709532')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E049017939A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee9126eb-a01a-00aa-3ced-9f5f49000000',
  'x-ms-client-request-id',
  '940a5411-4b73-45df-8bc9-064a009acc28',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 21:56:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701709709532/dir157428701732302330')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E04902965FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f3bfa67-501a-005a-63ed-9f19b8000000',
  'x-ms-client-request-id',
  'b36e3a0a-ecd0-4aa0-b38d-8029f82c6860',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T21:56:57.3771259Z',
  'x-ms-file-last-write-time',
  '2019-11-20T21:56:57.3771259Z',
  'x-ms-file-creation-time',
  '2019-11-20T21:56:57.3771259Z',
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
  'Wed, 20 Nov 2019 21:56:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701709709532/dir157428701732302330/file157428701739406859')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E049036D387"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce5c2d0c-f01a-00b7-0aed-9f52f5000000',
  'x-ms-client-request-id',
  'c7bcd385-6f7a-4876-9daf-f9d439fdb4fa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T21:56:57.4651271Z',
  'x-ms-file-last-write-time',
  '2019-11-20T21:56:57.4651271Z',
  'x-ms-file-creation-time',
  '2019-11-20T21:56:57.4651271Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 21:56:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701709709532/dir157428701732302330/file157428701739406859')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E04903C51C8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce5c2d0e-f01a-00b7-0bed-9f52f5000000',
  'x-ms-client-request-id',
  '0f4f8493-cb6f-4045-a0a6-c5a8bb09597f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T21:56:57.5011272Z',
  'x-ms-file-last-write-time',
  '2019-11-20T21:56:57.5011272Z',
  'x-ms-file-creation-time',
  '2019-11-20T21:56:57.5011272Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 21:56:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701709709532/dir157428701732302330/file157428701739406859', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E04904133C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce5c2d0f-f01a-00b7-0ced-9f52f5000000',
  'x-ms-client-request-id',
  '00df942a-7d0f-4160-9ae4-29633c8b0413',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 21:56:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157428701709709532/dir157428701732302330/file157428701739406859')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D76E04904133C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce5c2d10-f01a-00b7-0ded-9f52f5000000',
  'x-ms-client-request-id',
  'a5cd5897-a0e0-4655-9794-ac9bbe6637dc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2019-11-20T21:56:57.5011272Z',
  'x-ms-file-last-write-time',
  '2019-11-20T21:56:57.5011272Z',
  'x-ms-file-creation-time',
  '2019-11-20T21:56:57.5011272Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 20 Nov 2019 21:56:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157428701709709532')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee91270a-a01a-00aa-57ed-9f5f49000000',
  'x-ms-client-request-id',
  'f942ea5d-a93b-4f08-ac57-d5f599c0dec0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 21:56:56 GMT'
]);
