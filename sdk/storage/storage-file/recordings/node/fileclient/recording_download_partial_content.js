let nock = require('nock');

module.exports.testInfo = {"share":"share156816840928607165","dir":"dir156816840970701755","file":"file156816841013107959"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840928607165')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:09 GMT',
  'ETag',
  '"0x8D7365E91C07CA0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'efb70b17-501a-002a-1f47-6813b9000000',
  'x-ms-client-request-id',
  '288981e5-8924-46bb-bbbc-5fb8a7865e1a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840928607165/dir156816840970701755')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:10 GMT',
  'ETag',
  '"0x8D7365E92012997"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f2f6398-601a-0044-1547-68ba90000000',
  'x-ms-client-request-id',
  '1242b7ec-e50b-4970-9a9d-52968def2638',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:10.0589975Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:10.0589975Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:10.0589975Z',
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
  'Wed, 11 Sep 2019 02:20:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840928607165/dir156816840970701755/file156816841013107959')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:10 GMT',
  'ETag',
  '"0x8D7365E9241C0CA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29a45a65-d01a-0030-6947-683cd6000000',
  'x-ms-client-request-id',
  '194ed954-6333-40b7-8627-539f4f40b6fa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:10.4822986Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:10.4822986Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:10.4822986Z',
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
  'Wed, 11 Sep 2019 02:20:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840928607165/dir156816840970701755/file156816841013107959', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:10 GMT',
  'ETag',
  '"0x8D7365E928369A1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '861735ab-801a-0001-2447-686701000000',
  'x-ms-client-request-id',
  '7de8511d-9dfc-4836-9779-abe31ee48c96',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816840928607165/dir156816840970701755/file156816841013107959')
  .reply(206, "He", [ 'Content-Length',
  '2',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-1/10',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E928369A1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '649135c8-f01a-0005-4c47-689283000000',
  'x-ms-client-request-id',
  '1bff3b81-f54f-470a-a6ed-ed0c1e6a837c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:20:10.4822986Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:10.4822986Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:10.4822986Z',
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
  'Wed, 11 Sep 2019 02:20:11 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816840928607165')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03795b1b-401a-003e-7547-68d0dd000000',
  'x-ms-client-request-id',
  '7d7ef2e7-31fb-4523-a6f3-523e6617df56',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:11 GMT' ]);

