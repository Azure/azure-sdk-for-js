let nock = require('nock');

module.exports.testInfo = {"share":"share156775321999803759","dir":"dir156775322039508493","file":"file156775322079304880"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321999803759')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:20 GMT',
  'ETag',
  '"0x8D73297E19ACD41"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cbf26e9-a01a-00c7-6880-6463de000000',
  'x-ms-client-request-id',
  '43944330-1915-4060-85e3-8a449cd198b5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321999803759/dir156775322039508493')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:20 GMT',
  'ETag',
  '"0x8D73297E1D73657"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fadd829-801a-001b-7c80-64c980000000',
  'x-ms-client-request-id',
  '70225806-f761-45c7-b800-d6bbe97783a6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:20.6642775Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:20.6642775Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:20.6642775Z',
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
  'Fri, 06 Sep 2019 07:00:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321999803759/dir156775322039508493/file156775322079304880')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:21 GMT',
  'ETag',
  '"0x8D73297E214EA8C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '573b5586-f01a-00ca-3880-64ab0a000000',
  'x-ms-client-request-id',
  '2801ef8b-5d8b-47b9-a2dc-38e70f6f5917',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:21.0686604Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:21.0686604Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:21.0686604Z',
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
  'Fri, 06 Sep 2019 07:00:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321999803759/dir156775322039508493/file156775322079304880', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:21 GMT',
  'ETag',
  '"0x8D73297E25B7A7B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '001adb4d-701a-0100-7c80-64098e000000',
  'x-ms-client-request-id',
  '0c246a71-10f9-46d7-b18a-92738f492fc1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321999803759/dir156775322039508493/file156775322079304880', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:21 GMT',
  'ETag',
  '"0x8D73297E299CB0D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a09bd571-d01a-0119-0380-648935000000',
  'x-ms-client-request-id',
  'b3044c47-6c06-4cc0-b637-25f30e17fdec',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321999803759/dir156775322039508493/file156775322079304880')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:22 GMT',
  'ETag',
  '"0x8D73297E2D7CD73"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30c4124a-d01a-0090-7980-64cded000000',
  'x-ms-client-request-id',
  '069b68a4-17d6-4b3e-85c7-e04a504b7f72',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775321999803759/dir156775322039508493/file156775322079304880')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:22 GMT',
  'ETag',
  '"0x8D73297E2D7CD73"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6b88c7a-201a-005f-7480-6443bf000000',
  'x-ms-client-request-id',
  '40cb18fd-ee17-4af5-a6e0-bc36ccbfc5c7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:00:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775321999803759')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a316f532-601a-0061-7c80-64d4c0000000',
  'x-ms-client-request-id',
  '7de36817-eb2d-4ea0-9008-5903500f9d04',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:22 GMT',
  'Connection',
  'close' ]);

