let nock = require('nock');

module.exports.testInfo = {"share":"share156775314653501576","dir":"dir156775314693403063","dir156775314693403063":"dir156775314693403063156775314735101244","now":"2019-09-06T06:59:07.351Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314653501576')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:06 GMT',
  'ETag',
  '"0x8D73297B5D1283E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '573b5529-f01a-00ca-2480-64ab0a000000',
  'x-ms-client-request-id',
  'ee282bd5-8853-4629-81ae-18f7f2e5cb13',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314653501576/dir156775314693403063')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:07 GMT',
  'ETag',
  '"0x8D73297B6104885"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6c21019-001a-0093-2080-642c89000000',
  'x-ms-client-request-id',
  '52ea3f0f-6c7a-41dc-8f83-0dce9178ddee',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:07.2185477Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:07.2185477Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:07.2185477Z',
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
  'Fri, 06 Sep 2019 06:59:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314653501576/dir156775314693403063156775314735101244')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:07 GMT',
  'ETag',
  '"0x8D73297B6247E70"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '432b12e0-601a-002c-1980-641b2c000000',
  'x-ms-client-request-id',
  '1b658a9f-5f97-4c9d-bc96-bd47bd52ee6a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:07.3510000Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:07.3510000Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:07.3510000Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 06:59:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775314653501576/dir156775314693403063156775314735101244')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:07 GMT',
  'ETag',
  '"0x8D73297B6247E70"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2dfa80e-401a-00cf-2680-6479d1000000',
  'x-ms-client-request-id',
  '696a82bf-1e8a-42e7-9d04-152f8843964a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-06T06:59:07.3510000Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:07.3510000Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:07.3510000Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775314653501576')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '739ad4ae-e01a-0112-6680-64725e000000',
  'x-ms-client-request-id',
  '06241349-7f24-4d5b-870b-ea5f80d25b36',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:08 GMT',
  'Connection',
  'close' ]);

