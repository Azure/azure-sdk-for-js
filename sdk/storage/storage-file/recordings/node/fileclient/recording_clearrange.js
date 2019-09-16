let nock = require('nock');

module.exports.testInfo = {"share":"share156816839448601283","dir":"dir156816839490703703","file":"file156816839538601877"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839448601283')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:54 GMT',
  'ETag',
  '"0x8D7365E88EE4854"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f32e8c1-d01a-0012-7e47-6852e0000000',
  'x-ms-client-request-id',
  'e62e62a3-96d0-43eb-901a-4832db33e43c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839448601283/dir156816839490703703')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:55 GMT',
  'ETag',
  '"0x8D7365E8935321B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a7852e1-c01a-002f-6547-68e7c6000000',
  'x-ms-client-request-id',
  'e847842c-dc2f-493c-93f4-2f5c65342997',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:55.3005083Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:55.3005083Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:55.3005083Z',
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
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839448601283/dir156816839490703703/file156816839538601877')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:55 GMT',
  'ETag',
  '"0x8D7365E89783AAE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bee1e0c4-201a-0061-4147-682223000000',
  'x-ms-client-request-id',
  '2e72ce1d-73b3-477c-8139-49a3c1bf3d2a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:55.7398190Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:55.7398190Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:55.7398190Z',
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
  'Wed, 11 Sep 2019 02:19:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839448601283/dir156816839490703703/file156816839538601877', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:56 GMT',
  'ETag',
  '"0x8D7365E89B883B3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4021a2cd-e01a-001a-4147-684993000000',
  'x-ms-client-request-id',
  '17afdf14-d322-4178-90eb-87356eb9230b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839448601283/dir156816839490703703/file156816839538601877', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:56 GMT',
  'ETag',
  '"0x8D7365E8A00482B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45dc1b51-401a-0017-7547-68a69f000000',
  'x-ms-client-request-id',
  'bec43da7-4cd8-46c1-b521-4ed2d61c6169',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839448601283/dir156816839490703703/file156816839538601877')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:57 GMT',
  'ETag',
  '"0x8D7365E8A42B466"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cefd3527-a01a-003f-5147-68d120000000',
  'x-ms-client-request-id',
  'de8e6b74-c986-4bcd-83d7-0c5994736eb0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816839448601283/dir156816839490703703/file156816839538601877')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E8A42B466"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ac83096-701a-001f-7947-68bdec000000',
  'x-ms-client-request-id',
  'e413a2ad-a8b8-4949-9a73-e40e9f549c6a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:19:55.7398190Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:55.7398190Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:55.7398190Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
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
  'Wed, 11 Sep 2019 02:19:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816839448601283')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '333d7c15-501a-0003-3747-6865fb000000',
  'x-ms-client-request-id',
  '28e74fcd-1063-4eb4-970c-2e72b2f175ee',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:57 GMT' ]);

