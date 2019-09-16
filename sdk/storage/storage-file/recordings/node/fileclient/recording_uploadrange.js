let nock = require('nock');

module.exports.testInfo = {"share":"share156816838599405999","dir":"dir156816838642608275","file":"file156816838705004856"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838599405999')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:46 GMT',
  'ETag',
  '"0x8D7365E83DDFDE5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9f1def3-101a-000f-6a47-688b0a000000',
  'x-ms-client-request-id',
  '35096179-5166-4118-a95a-92f5aea0adc3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:45 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838599405999/dir156816838642608275')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:46 GMT',
  'ETag',
  '"0x8D7365E843C78C6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5fcbdd7-101a-0040-6547-684f12000000',
  'x-ms-client-request-id',
  'a8b8a4c9-8971-4f33-8f36-8e53799e6613',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:46.9595846Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:46.9595846Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:46.9595846Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:46 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838599405999/dir156816838642608275/file156816838705004856')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:47 GMT',
  'ETag',
  '"0x8D7365E847FCF94"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fd1692d-d01a-003b-6547-6824a2000000',
  'x-ms-client-request-id',
  '8362363f-227d-4988-a37a-1fdfa5d2dbc5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:47.4008980Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:47.4008980Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:47.4008980Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838599405999/dir156816838642608275/file156816838705004856', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:47 GMT',
  'ETag',
  '"0x8D7365E84C066D9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf4a3375-e01a-0055-0947-688d8b000000',
  'x-ms-client-request-id',
  '3d62328e-4078-416a-86fb-23c0ef4a52d4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838599405999/dir156816838642608275/file156816838705004856', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:48 GMT',
  'ETag',
  '"0x8D7365E8503BD96"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86173592-801a-0001-1e47-686701000000',
  'x-ms-client-request-id',
  'a45efd1f-f193-4a90-8ede-096e94115f82',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816838599405999/dir156816838642608275/file156816838705004856')
  .reply(206, "HelloWor", [ 'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:48 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E8503BD96"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cefd351d-a01a-003f-4e47-68d120000000',
  'x-ms-client-request-id',
  '2d8e7c78-c026-49c1-81bd-a65172763805',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:19:47.4008980Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:47.4008980Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:47.4008980Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816838599405999')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e833a0f-b01a-0002-1a47-686406000000',
  'x-ms-client-request-id',
  '58c416ea-97b5-42a9-9b2f-ab4c1472d710',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:48 GMT' ]);

