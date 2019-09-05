let nock = require('nock');

module.exports.testInfo = {"share":"share156767541503705703","dir":"dir156767541543907254","file":"file156767541584306942"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541503705703')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:35 GMT',
  'ETag',
  '"0x8D731E2BA3AD349"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7675e46-a01a-0113-36cb-632d82000000',
  'x-ms-client-request-id',
  '032bbd6e-f255-4703-95ef-023dbefa0eb3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541503705703/dir156767541543907254')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:35 GMT',
  'ETag',
  '"0x8D731E2BA779038"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a38ffd00-e01a-0102-33cb-63b736000000',
  'x-ms-client-request-id',
  '44265183-94df-41b4-a96d-b37e5cba0ceb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:35.6982328Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:35.6982328Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:35.6982328Z',
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
  'Thu, 05 Sep 2019 09:23:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541503705703/dir156767541543907254/file156767541584306942')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:36 GMT',
  'ETag',
  '"0x8D731E2BAB62F07"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2754d80-d01a-004b-16cb-630bd0000000',
  'x-ms-client-request-id',
  '7e47cfbd-80b4-46a9-bdd0-9457ecb439c0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:36.1086215Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:36.1086215Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:36.1086215Z',
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
  'Thu, 05 Sep 2019 09:23:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541503705703/dir156767541543907254/file156767541584306942', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:36 GMT',
  'ETag',
  '"0x8D731E2BAF28360"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a57b80c-d01a-005b-63cb-63ceb8000000',
  'x-ms-client-request-id',
  'fdc9b780-a476-462a-9baf-868078882c37',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541503705703/dir156767541543907254/file156767541584306942', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:36 GMT',
  'ETag',
  '"0x8D731E2BB30D3FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acaffa78-a01a-00f8-4fcb-63ab7d000000',
  'x-ms-client-request-id',
  '76919fd4-d8fd-4b32-b36d-3193bf374cdf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541503705703/dir156767541543907254/file156767541584306942')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:37 GMT',
  'ETag',
  '"0x8D731E2BB6E39FE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0184db6-501a-0055-05cb-63e708000000',
  'x-ms-client-request-id',
  'c21560be-4d15-4bd9-a825-e04aabf2aa79',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767541503705703/dir156767541543907254/file156767541584306942')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:37 GMT',
  'ETag',
  '"0x8D731E2BB6E39FE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02d12b07-d01a-0126-62cb-634196000000',
  'x-ms-client-request-id',
  'b0d887fa-4bdb-434a-9af0-df89e2fdd1ce',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:23:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767541503705703')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc956221-001a-00e1-41cb-632bc6000000',
  'x-ms-client-request-id',
  'a9e0d302-928a-44c3-9786-c0b73a4e9202',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:37 GMT',
  'Connection',
  'close' ]);

