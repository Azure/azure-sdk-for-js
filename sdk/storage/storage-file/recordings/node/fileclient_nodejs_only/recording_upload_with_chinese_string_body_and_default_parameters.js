let nock = require('nock');

module.exports.testInfo = {"share":"share156816851319500719","dir":"dir156816851359607872","file":"file156816851402102650","randomstring你好":"randomstring你好156816851402300362"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851319500719')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:53 GMT',
  'ETag',
  '"0x8D7365ECFACD23D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56684164-c01a-0060-8047-6823de000000',
  'x-ms-client-request-id',
  '2fe7b7a7-e838-4eb8-a5f4-20c08385e141',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851319500719/dir156816851359607872')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:53 GMT',
  'ETag',
  '"0x8D7365ECFEDA4DE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab52551b-501a-0008-7c47-687d8f000000',
  'x-ms-client-request-id',
  '50edf00e-a90a-4b1f-b701-c71561becbe9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:53.9498206Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:53.9498206Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:53.9498206Z',
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
  'Wed, 11 Sep 2019 02:21:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851319500719/dir156816851359607872/file156816851402102650')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:54 GMT',
  'ETag',
  '"0x8D7365ED02C66EF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fbd1de7-c01a-0049-2547-68559c000000',
  'x-ms-client-request-id',
  '8c5cd1fa-0819-4c20-891e-394782088b20',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:54.3611119Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:54.3611119Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:54.3611119Z',
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
  'Wed, 11 Sep 2019 02:21:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851319500719/dir156816851359607872/file156816851402102650', "randomstring你好156816851402300362")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1gZSeJWIEgvI6IlCoe8mBQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:54 GMT',
  'ETag',
  '"0x8D7365ED06B01F3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8064f26-901a-005a-7547-68607d000000',
  'x-ms-client-request-id',
  'a2555a9a-c693-4a5c-9475-e18e69bcaff9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816851319500719/dir156816851359607872/file156816851402102650')
  .reply(200, "randomstring你好156816851402300362", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365ED06B01F3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '276e3c09-a01a-0059-1647-68637a000000',
  'x-ms-client-request-id',
  '9ea70666-3352-4bad-afa8-532a5151a365',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:54.3611119Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:54.3611119Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:54.3611119Z',
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
  'Wed, 11 Sep 2019 02:21:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816851319500719')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4847e3c3-801a-004e-5747-68a319000000',
  'x-ms-client-request-id',
  '381c2121-2b78-4fb3-9c81-36062323f4df',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:54 GMT' ]);

