let nock = require('nock');

module.exports.testInfo = {"share":"share156767534332603626","dir":"dir156767534372304086","dir156767534372304086":"dir156767534372304086156767534412400127","now":"2019-09-05T09:22:24.124Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534332603626')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:23 GMT',
  'ETag',
  '"0x8D731E28F7BB089"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f12c88c1-701a-00d4-72cb-6347d2000000',
  'x-ms-client-request-id',
  '7afdd7e8-bfd9-4abe-9efb-b655741c54b0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534332603626/dir156767534372304086')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:23 GMT',
  'ETag',
  '"0x8D731E28FB8B9FD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b976351-101a-0026-31cb-63bf9b000000',
  'x-ms-client-request-id',
  '5521d8ce-a2a7-4457-9638-eca784020a47',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:23.9832573Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:23.9832573Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:23.9832573Z',
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
  'Thu, 05 Sep 2019 09:22:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534332603626/dir156767534372304086156767534412400127')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:24 GMT',
  'ETag',
  '"0x8D731E28FCE33C0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee8a28c6-a01a-00d7-6acb-63a6b6000000',
  'x-ms-client-request-id',
  'f0156c2e-d422-4fe7-857f-354d2637b4a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:24.1240000Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:24.1240000Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:24.1240000Z',
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
  'Thu, 05 Sep 2019 09:22:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767534332603626/dir156767534372304086156767534412400127')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:24 GMT',
  'ETag',
  '"0x8D731E28FCE33C0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e46e691-901a-0065-19cb-6359c7000000',
  'x-ms-client-request-id',
  '8f40569e-c812-4335-b294-7155d641d0ba',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-05T09:22:24.1240000Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:24.1240000Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:24.1240000Z',
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
  'Thu, 05 Sep 2019 09:22:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767534332603626')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e609d89-e01a-014f-58cb-6378da000000',
  'x-ms-client-request-id',
  '3916703c-6dc5-4b53-b9b3-d5cbb1d89bf6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:24 GMT',
  'Connection',
  'close' ]);

