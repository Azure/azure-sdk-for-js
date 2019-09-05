let nock = require('nock');

module.exports.testInfo = {"share":"share156767534786607536","dir":"dir156767534826901798"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534786607536')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:28 GMT',
  'ETag',
  '"0x8D731E292315248"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4c1f628-f01a-0097-74cb-63a18e000000',
  'x-ms-client-request-id',
  'e64d3723-ff76-40cc-99cb-ba8c6e94555d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534786607536/dir156767534826901798')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:28 GMT',
  'ETag',
  '"0x8D731E2926EE585"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8fb3c23-601a-0085-38cb-63da5e000000',
  'x-ms-client-request-id',
  'ea9efda9-a78d-4d9c-94f2-9096b39dc9e3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:28.5325701Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:28.5325701Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:28.5325701Z',
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
  'Thu, 05 Sep 2019 09:22:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534786607536/dir156767534826901798')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:28 GMT',
  'ETag',
  '"0x8D731E292AE20B6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97336066-901a-0127-75cb-631e4a000000',
  'x-ms-client-request-id',
  'ec028ac7-402e-446c-ab26-899a86292691',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:28.9469622Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:28.5325701Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:28.5325701Z',
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
  'Thu, 05 Sep 2019 09:22:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767534786607536/dir156767534826901798')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:28 GMT',
  'ETag',
  '"0x8D731E292AE20B6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0c6592e-001a-010a-76cb-63ad39000000',
  'x-ms-client-request-id',
  '6a9780a1-2607-497f-8175-7ee0069e299f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-05T09:22:28.9469622Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:28.5325701Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:28.5325701Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767534786607536')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab5a888a-901a-0091-22cb-639231000000',
  'x-ms-client-request-id',
  '46e2596f-c14b-4010-9e0a-39f1e0d22d8d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:29 GMT',
  'Connection',
  'close' ]);

