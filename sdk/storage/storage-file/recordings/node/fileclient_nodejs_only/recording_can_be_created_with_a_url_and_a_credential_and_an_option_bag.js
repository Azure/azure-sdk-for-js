let nock = require('nock');

module.exports.testInfo = {"share":"share156816851829509529","dir":"dir156816851870202811","file":"file156816851921200936"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851829509529')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:58 GMT',
  'ETag',
  '"0x8D7365ED2B7B691"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6e4a-c01a-0042-0847-684de8000000',
  'x-ms-client-request-id',
  'e4fa2f06-948d-4922-9d45-90d4fee2bd40',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851829509529/dir156816851870202811')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:59 GMT',
  'ETag',
  '"0x8D7365ED3038AC0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d85115c-301a-005c-3747-689705000000',
  'x-ms-client-request-id',
  'be0657cd-7e74-4868-ba3f-dcb83f71e4b9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:59.1264960Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:59.1264960Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:59.1264960Z',
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
  'Wed, 11 Sep 2019 02:21:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851829509529/dir156816851870202811/file156816851921200936')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:59 GMT',
  'ETag',
  '"0x8D7365ED347088C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c10fba68-301a-0013-4147-68531d000000',
  'x-ms-client-request-id',
  'a4d5d576-6b8d-4cc1-9293-eb33bb5b2b9d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:59.5688076Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:59.5688076Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:59.5688076Z',
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
  'Wed, 11 Sep 2019 02:21:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851829509529/dir156816851870202811/file156816851921200936')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:00 GMT',
  'ETag',
  '"0x8D7365ED38C3472"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c97f4-201a-0048-3547-685461000000',
  'x-ms-client-request-id',
  '36ae2dfb-144c-4bea-9bf8-9099bdc740a8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816851829509529/dir156816851870202811/file156816851921200936')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:00 GMT',
  'ETag',
  '"0x8D7365ED38C3472"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '076d3329-b01a-0009-2c47-687c72000000',
  'x-ms-client-request-id',
  'e5c29183-b02e-4e45-afa1-977bed83681b',
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
  '2019-09-11T02:22:00.0221298Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:59.5688076Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:59.5688076Z',
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
  'Wed, 11 Sep 2019 02:21:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816851829509529')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef50984e-801a-000a-3f47-687f75000000',
  'x-ms-client-request-id',
  'e32da3d3-012b-44c7-a6fa-00357584870a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:00 GMT' ]);

