let nock = require('nock');

module.exports.testInfo = {"share":"share156767539241402057","dir":"dir156767539281908374","file":"file156767539322506462"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539241402057')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:12 GMT',
  'ETag',
  '"0x8D731E2ACBF3C75"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e149769-201a-00f6-50cb-6382cd000000',
  'x-ms-client-request-id',
  '2f0cd528-a3a8-4a49-a5ae-1268a1403f00',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539241402057/dir156767539281908374')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:13 GMT',
  'ETag',
  '"0x8D731E2ACFD06EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5dcae808-701a-00b6-74cb-6385f5000000',
  'x-ms-client-request-id',
  'dcce14ed-19e3-4058-a088-9d272c99bdda',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:13.0847982Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:13.0847982Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:13.0847982Z',
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
  'Thu, 05 Sep 2019 09:23:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539241402057/dir156767539281908374/file156767539322506462')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:13 GMT',
  'ETag',
  '"0x8D731E2AD3A1ECA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c387bf77-e01a-00a4-51cb-63fe25000000',
  'x-ms-client-request-id',
  'ae124ff6-079b-4fa7-b2cc-3945473f7e52',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:13.4851786Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:13.4851786Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:13.4851786Z',
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
  'Thu, 05 Sep 2019 09:23:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767539241402057/dir156767539281908374/file156767539322506462')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5260d8b1-801a-0079-7fcb-630ba7000000',
  'x-ms-client-request-id',
  'f49320ec-616e-4c07-a99d-324b5bf624b7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767539241402057')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2969cb38-a01a-006e-69cb-63a2ac000000',
  'x-ms-client-request-id',
  'f8fc8cff-e73a-4256-98b8-087207ab9bb5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:14 GMT',
  'Connection',
  'close' ]);

