let nock = require('nock');

module.exports.testInfo = {"share":"share156816850168909905","dir":"dir156816850209508484"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850168909905')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:42 GMT',
  'ETag',
  '"0x8D7365EC8D1C073"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9f1df88-101a-000f-0b47-688b0a000000',
  'x-ms-client-request-id',
  '78746e41-9895-4b55-8fc5-aaf784046e73',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:41 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850168909905/dir156816850209508484')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:42 GMT',
  'ETag',
  '"0x8D7365EC91042BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ae1324b-201a-0043-7047-684c15000000',
  'x-ms-client-request-id',
  '4cf860e7-c32c-40d0-8821-593bcd53f686',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:42.4326330Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:42.4326330Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:42.4326330Z',
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
  'Wed, 11 Sep 2019 02:21:41 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816850168909905/dir156816850209508484')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:42 GMT',
  'ETag',
  '"0x8D7365EC91042BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41be3908-801a-006c-0c47-68cd2f000000',
  'x-ms-client-request-id',
  'b834b8d1-df84-48c2-a8ec-3ed26d7f5197',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:42.4326330Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:42.4326330Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:42.4326330Z',
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
  'Wed, 11 Sep 2019 02:21:42 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850168909905/dir156816850209508484')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '322d36d3-a01a-001d-6d47-68bf16000000',
  'x-ms-client-request-id',
  '22b0b888-28d1-4204-ae04-2e8cfae9cd1a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:42 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850168909905')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf4a340b-e01a-0055-2847-688d8b000000',
  'x-ms-client-request-id',
  '37311b8f-7eeb-46ad-91a9-91ad812d3141',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:42 GMT' ]);

