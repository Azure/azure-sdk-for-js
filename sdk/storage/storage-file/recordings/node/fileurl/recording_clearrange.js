let nock = require('nock');

module.exports.testInfo = {"share":"share156758478326601387","dir":"dir156758478370309948","file":"file156758478411406567"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478326601387')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:03 GMT',
  'ETag',
  '"0x8D7310FB57AA345"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19468ea6-401a-00cf-57f8-6279d1000000',
  'x-ms-client-request-id',
  '240f07bb-cefd-4219-a34c-ff63653ef912',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478326601387/dir156758478370309948')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:03 GMT',
  'ETag',
  '"0x8D7310FB5BA6AA5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf8b0b30-401a-00df-26f8-62bcb9000000',
  'x-ms-client-request-id',
  'ca68fcb1-94cf-4cb8-bb6b-9e1f5c7ed619',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:03.9378085Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:03.9378085Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:03.9378085Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478326601387/dir156758478370309948/file156758478411406567')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:04 GMT',
  'ETag',
  '"0x8D7310FB5F97EC3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f1414a4-e01a-0102-03f8-62b736000000',
  'x-ms-client-request-id',
  '8b7d8377-87ed-44c3-b8ee-58ea6bcb0520',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:04.3512003Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:04.3512003Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:04.3512003Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478326601387/dir156758478370309948/file156758478411406567', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:04 GMT',
  'ETag',
  '"0x8D7310FB6381D8A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ef28808-d01a-0144-50f8-6283b1000000',
  'x-ms-client-request-id',
  'eea2bbea-4b79-4793-8114-3250c37464fa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478326601387/dir156758478370309948/file156758478411406567', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'ETag',
  '"0x8D7310FB677CE12"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0d7f8f7-401a-010b-45f8-62f2e5000000',
  'x-ms-client-request-id',
  '7b899752-67f3-4a68-a906-afa71b49011d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478326601387/dir156758478370309948/file156758478411406567')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'ETag',
  '"0x8D7310FB6B693FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8880929c-e01a-0040-73f8-62f0bb000000',
  'x-ms-client-request-id',
  '77cbb30d-9ba9-4a4b-b7fe-0b52da3e10d6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758478326601387/dir156758478370309948/file156758478411406567')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7310FB6B693FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15704d71-d01a-0039-47f8-620c9f000000',
  'x-ms-client-request-id',
  '234d0f44-a88b-45f9-bcce-e3d094eb28d0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-04T08:13:04.3512003Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:04.3512003Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:04.3512003Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758478326601387')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed6ea87e-101a-00a0-4ef8-627322000000',
  'x-ms-client-request-id',
  '9af7a9b8-f9b8-4788-9887-71a743119c5f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:05 GMT',
  'Connection',
  'close' ]);

