let nock = require('nock');

module.exports.testInfo = {"share":"share156816851566507842","dir":"dir156816851608307072","file":"file156816851657408343"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851566507842')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:56 GMT',
  'ETag',
  '"0x8D7365ED1283341"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97b87c99-201a-0025-2547-68fe4f000000',
  'x-ms-client-request-id',
  'c4fdeae7-5c2c-4211-a364-bd28c48e57ac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851566507842/dir156816851608307072')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:56 GMT',
  'ETag',
  '"0x8D7365ED1730515"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33acebc1-e01a-005e-4947-6895ff000000',
  'x-ms-client-request-id',
  '7c38e70d-ffd1-4859-b8ff-061f14f92357',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:56.5016341Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:56.5016341Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:56.5016341Z',
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
  'Wed, 11 Sep 2019 02:21:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851566507842/dir156816851608307072/file156816851657408343')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:56 GMT',
  'ETag',
  '"0x8D7365ED1B4FC0D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'efb70ba2-501a-002a-3c47-6813b9000000',
  'x-ms-client-request-id',
  '03537a20-2167-4f5b-a5c4-739ef13b1577',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:56.9339405Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:56.9339405Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:56.9339405Z',
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
  'Wed, 11 Sep 2019 02:21:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851566507842/dir156816851608307072/file156816851657408343')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:57 GMT',
  'ETag',
  '"0x8D7365ED1FA4F0E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c10fba63-301a-0013-4047-68531d000000',
  'x-ms-client-request-id',
  'abda0bdd-0432-4402-a678-bb62034d1414',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816851566507842/dir156816851608307072/file156816851657408343')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:57 GMT',
  'ETag',
  '"0x8D7365ED1FA4F0E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b759bb4-a01a-0016-7147-68a762000000',
  'x-ms-client-request-id',
  'a11ceb16-90fb-424e-866b-c42d65dc06a4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:57.3882638Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:56.9339405Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:56.9339405Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816851566507842')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1db6420e-001a-005f-2847-689402000000',
  'x-ms-client-request-id',
  '650b50ca-3f21-4ca2-9816-2825f064b680',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:57 GMT' ]);

