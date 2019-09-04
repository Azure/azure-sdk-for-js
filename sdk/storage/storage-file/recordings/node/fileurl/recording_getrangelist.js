let nock = require('nock');

module.exports.testInfo = {"share":"share156758478668503640","dir":"dir156758478711006802","file":"file156758478763708963"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478668503640')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:06 GMT',
  'ETag',
  '"0x8D7310FB7826A73"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e73dc1c8-301a-0031-56f8-621690000000',
  'x-ms-client-request-id',
  '7c1c10e6-13f9-4457-9af1-c1b1e2643738',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478668503640/dir156758478711006802')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:07 GMT',
  'ETag',
  '"0x8D7310FB7D4F399"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '096d1660-601a-00aa-7bf8-62d795000000',
  'x-ms-client-request-id',
  '522c3a59-f89a-42f9-b11d-41f742de046c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:07.4671513Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:07.4671513Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:07.4671513Z',
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
  'Wed, 04 Sep 2019 08:13:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478668503640/dir156758478711006802/file156758478763708963')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:07 GMT',
  'ETag',
  '"0x8D7310FB813927F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0137a5b-a01a-00d7-0af8-62a6b6000000',
  'x-ms-client-request-id',
  'e2762340-793b-4839-917d-6ad28bd7f2ca',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:07.8775423Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:07.8775423Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:07.8775423Z',
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
  'Wed, 04 Sep 2019 08:13:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478668503640/dir156758478711006802/file156758478763708963', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:08 GMT',
  'ETag',
  '"0x8D7310FB850D148"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '888092a1-e01a-0040-74f8-62f0bb000000',
  'x-ms-client-request-id',
  'ba7008d0-c37b-4ba2-bd36-0ee0c89503fb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478668503640/dir156758478711006802/file156758478763708963', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:08 GMT',
  'ETag',
  '"0x8D7310FB88E374D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8742acb1-301a-00d5-32f8-62180e000000',
  'x-ms-client-request-id',
  '3a52539d-b89a-4554-8d5e-4639f18d05f1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758478668503640/dir156758478711006802/file156758478763708963')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:09 GMT',
  'ETag',
  '"0x8D7310FB8CC87EC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a00af34-201a-0150-31f8-62cbde000000',
  'x-ms-client-request-id',
  'e2190cb2-611b-4552-bd2a-b0f3608d053e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758478668503640/dir156758478711006802/file156758478763708963')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:09 GMT',
  'ETag',
  '"0x8D7310FB8CC87EC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9e654fc-001a-00ce-04f8-62260d000000',
  'x-ms-client-request-id',
  'd26cbe36-45d8-4426-8753-0bc427298adf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758478668503640')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cb1d7c2-701a-00b6-03f8-6285f5000000',
  'x-ms-client-request-id',
  '0a2ffd87-f89e-4772-b70a-01e4c90a5f2d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:09 GMT',
  'Connection',
  'close' ]);

