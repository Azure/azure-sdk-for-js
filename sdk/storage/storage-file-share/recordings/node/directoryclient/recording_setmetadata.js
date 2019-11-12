let nock = require('nock');

module.exports.testInfo = {"share":"share156816827736308951","dir":"dir156816827778700621"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827736308951')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:57 GMT',
  'ETag',
  '"0x8D7365E431F110C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '859540e4-901a-0015-0747-68a465000000',
  'x-ms-client-request-id',
  '7fce58fe-267b-40cb-87ff-6bf5e42779df',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827736308951/dir156816827778700621')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:58 GMT',
  'ETag',
  '"0x8D7365E4364D8C4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34cc91f7-601a-004f-5147-68a2e4000000',
  'x-ms-client-request-id',
  'bf33ae4c-f1b0-4099-b95f-3f3fecc0a029',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:17:58.1722820Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:17:58.1722820Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:17:58.1722820Z',
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
  'Wed, 11 Sep 2019 02:17:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827736308951/dir156816827778700621')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:58 GMT',
  'ETag',
  '"0x8D7365E43AD1272"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a53a28dc-501a-004c-2c47-68a1e3000000',
  'x-ms-client-request-id',
  '47514bf4-0975-4908-853c-f20b86cd3bc1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:17:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816827736308951/dir156816827778700621')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:58 GMT',
  'ETag',
  '"0x8D7365E43AD1272"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '322d35b3-a01a-001d-3247-68bf16000000',
  'x-ms-client-request-id',
  'eeab80e1-c135-4049-9669-1b62c7e98752',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-file-change-time',
  '2019-09-11T02:17:58.6456178Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:17:58.1722820Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:17:58.1722820Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:17:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816827736308951')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3257dd73-601a-000b-4147-687e88000000',
  'x-ms-client-request-id',
  'd2376bd5-66da-43d0-82cf-3937e1f7bb4c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:59 GMT' ]);

