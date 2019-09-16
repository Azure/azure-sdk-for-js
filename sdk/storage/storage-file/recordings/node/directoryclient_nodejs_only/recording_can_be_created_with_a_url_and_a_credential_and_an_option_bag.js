let nock = require('nock');

module.exports.testInfo = {"share":"share156816850374005798","dir":"dir156816850414701924"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850374005798')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:44 GMT',
  'ETag',
  '"0x8D7365ECA0AD6B0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b759ba4-a01a-0016-6e47-68a762000000',
  'x-ms-client-request-id',
  '8bfb6168-1573-403b-85ae-a34eb20e129d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:43 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850374005798/dir156816850414701924')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:44 GMT',
  'ETag',
  '"0x8D7365ECA48865E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c97d4-201a-0048-3047-685461000000',
  'x-ms-client-request-id',
  'd1b2dfb0-db61-4afe-ab45-2830f25a2fad',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:44.4790878Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:44.4790878Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:44.4790878Z',
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
  'Wed, 11 Sep 2019 02:21:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816850374005798/dir156816850414701924')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:44 GMT',
  'ETag',
  '"0x8D7365ECA48865E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd31b2471-f01a-002c-3847-68e4c1000000',
  'x-ms-client-request-id',
  '2b1d3b92-a0bf-4076-afcf-f68c319cb9a6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:44.4790878Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:44.4790878Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:44.4790878Z',
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
  'Wed, 11 Sep 2019 02:21:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850374005798/dir156816850414701924')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6e39-c01a-0042-0447-684de8000000',
  'x-ms-client-request-id',
  '54da53b5-16a9-40a5-bb0f-e4f7988ba8e9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850374005798')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b66584a-c01a-000d-2947-6889f0000000',
  'x-ms-client-request-id',
  'ab414e3d-5cbd-4766-953e-e0f1203f1ccf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:45 GMT' ]);

