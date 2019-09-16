let nock = require('nock');

module.exports.testInfo = {"share":"share156816839231605427","dir":"dir156816839273906476","file":"file156816839316909187"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839231605427')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:52 GMT',
  'ETag',
  '"0x8D7365E87A3ACEE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fbd1d4f-c01a-0049-0647-68559c000000',
  'x-ms-client-request-id',
  'c2a27057-4cf9-4f71-bf4e-92c6259107fe',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:51 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839231605427/dir156816839273906476')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:53 GMT',
  'ETag',
  '"0x8D7365E87E51C92"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85a43a0-301a-0018-7647-684b69000000',
  'x-ms-client-request-id',
  'd847a834-2bcb-4965-81ff-d4b7fcf09671',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:53.0979474Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:53.0979474Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:53.0979474Z',
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
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839231605427/dir156816839273906476/file156816839316909187')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:53 GMT',
  'ETag',
  '"0x8D7365E8825B3C5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab525481-501a-0008-5b47-687d8f000000',
  'x-ms-client-request-id',
  '774a9f43-a73a-4547-8c50-a937a78b063e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:53.5212485Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:53.5212485Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:53.5212485Z',
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
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839231605427/dir156816839273906476/file156816839316909187', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:53 GMT',
  'ETag',
  '"0x8D7365E88669922"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1db64136-001a-005f-5547-689402000000',
  'x-ms-client-request-id',
  '18fa83ae-ca93-437d-b5cd-307f3b6e4cf8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:53 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816839231605427')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b3374bd-001a-0054-6d47-688c76000000',
  'x-ms-client-request-id',
  'f2a52acc-b7fe-42a7-9cbc-c95e37514c97',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:53 GMT' ]);

