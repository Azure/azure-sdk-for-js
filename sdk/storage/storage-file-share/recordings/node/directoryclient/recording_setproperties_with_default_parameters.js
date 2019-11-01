let nock = require('nock');

module.exports.testInfo = {"share":"share156816828834204746","dir":"dir156816828886504665"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828834204746')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:08 GMT',
  'ETag',
  '"0x8D7365E49B6D50E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6b97f8-a01a-0052-2647-687b0e000000',
  'x-ms-client-request-id',
  'c0037bf1-042f-4828-b180-ef6cf1bda314',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828834204746/dir156816828886504665')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:09 GMT',
  'ETag',
  '"0x8D7365E49F9B300"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c7b2-701a-0036-3b47-68cbae000000',
  'x-ms-client-request-id',
  '0be92e2f-3438-4e10-8514-1b01ac234b81',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:09.2141312Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:09.2141312Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:09.2141312Z',
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
  'Wed, 11 Sep 2019 02:18:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828834204746/dir156816828886504665')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:09 GMT',
  'ETag',
  '"0x8D7365E4A3C1F3F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab5253f4-501a-0008-3e47-687d8f000000',
  'x-ms-client-request-id',
  '4cd4d22e-218c-4484-8e31-b0be6a061a38',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:09.6494399Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:09.2141312Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:09.2141312Z',
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
  'Wed, 11 Sep 2019 02:18:08 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816828834204746/dir156816828886504665')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:09 GMT',
  'ETag',
  '"0x8D7365E4A3C1F3F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a99d13ef-901a-003c-7847-68d227000000',
  'x-ms-client-request-id',
  'e008a2a3-0a28-4aad-b9ba-08aaa2f43457',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:18:09.6494399Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:09.2141312Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:09.2141312Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
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
  'Wed, 11 Sep 2019 02:18:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816828834204746')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18b2d570-c01a-0006-7e47-689184000000',
  'x-ms-client-request-id',
  '36f9ffaf-178f-4b28-b784-84e8f4f0fbac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:10 GMT' ]);

