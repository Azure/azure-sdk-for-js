let nock = require('nock');

module.exports.testInfo = {"share":"share156767541178907751","dir":"dir156767541218702644","file":"file156767541258909589"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541178907751')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:32 GMT',
  'ETag',
  '"0x8D731E2B84A99DF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '089072b8-f01a-010e-68cb-63203e000000',
  'x-ms-client-request-id',
  'a4594ecd-1d62-47a9-81c5-2b1adbb3dafd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541178907751/dir156767541218702644')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:32 GMT',
  'ETag',
  '"0x8D731E2B887CB09"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b25ad4e-e01a-00e9-56cb-6331c9000000',
  'x-ms-client-request-id',
  'e59a8e36-8dec-4478-96fd-62340f4c109b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:32.4491529Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:32.4491529Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:32.4491529Z',
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
  'Thu, 05 Sep 2019 09:23:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541178907751/dir156767541218702644/file156767541258909589')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:32 GMT',
  'ETag',
  '"0x8D731E2B8C53111"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b300288c-601a-005e-01cb-631c63000000',
  'x-ms-client-request-id',
  '36310808-4c86-4167-909f-b70adea86902',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:32.8515345Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:32.8515345Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:32.8515345Z',
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
  'Thu, 05 Sep 2019 09:23:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541178907751/dir156767541218702644/file156767541258909589', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:33 GMT',
  'ETag',
  '"0x8D731E2B902BE2D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3dd7d91b-101a-015b-3acb-6330b5000000',
  'x-ms-client-request-id',
  '32d2854a-d07c-4170-9459-67944f1a5682',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541178907751/dir156767541218702644/file156767541258909589', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:33 GMT',
  'ETag',
  '"0x8D731E2B93FAEE3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '892bb8de-601a-0095-43cb-631f36000000',
  'x-ms-client-request-id',
  '94973b3b-88ae-4bf1-978a-290b17cdae52',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767541178907751/dir156767541218702644/file156767541258909589')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:34 GMT',
  'ETag',
  '"0x8D731E2B97DD877"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70f4a185-801a-009d-32cb-630539000000',
  'x-ms-client-request-id',
  'f8f6a2de-09ea-4486-a108-220269744e22',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767541178907751/dir156767541218702644/file156767541258909589')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D731E2B97DD877"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc71b143-a01a-013c-3fcb-632049000000',
  'x-ms-client-request-id',
  '0f145bcb-2d64-4d18-b92f-99eef73cc5a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-05T09:23:32.8515345Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:32.8515345Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:32.8515345Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
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
  'Thu, 05 Sep 2019 09:23:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767541178907751')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9dd4200d-501a-0107-04cb-6365ed000000',
  'x-ms-client-request-id',
  '03d016c5-1fa1-4dc1-b2c8-23af6c41d29f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:34 GMT',
  'Connection',
  'close' ]);

