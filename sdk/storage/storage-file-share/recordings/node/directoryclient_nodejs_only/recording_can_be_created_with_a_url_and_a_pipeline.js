let nock = require('nock');

module.exports.testInfo = {"share":"share156816850582509887","dir":"dir156816850623400204"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850582509887')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:46 GMT',
  'ETag',
  '"0x8D7365ECB495105"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4847e3b8-801a-004e-5447-68a319000000',
  'x-ms-client-request-id',
  'ded3370d-7f13-43bd-abfa-c9b42a5b11ec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:45 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850582509887/dir156816850623400204')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:46 GMT',
  'ETag',
  '"0x8D7365ECB87A91A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c97d7-201a-0048-3147-685461000000',
  'x-ms-client-request-id',
  '4e13580a-25a5-4b62-a05f-ae55815897fb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:46.5705754Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:46.5705754Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:46.5705754Z',
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
  'Wed, 11 Sep 2019 02:21:46 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816850582509887/dir156816850623400204')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:46 GMT',
  'ETag',
  '"0x8D7365ECB87A91A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6e3d-c01a-0042-0547-684de8000000',
  'x-ms-client-request-id',
  '02ce2ac3-ef6f-4ab5-86f8-80f25fe39189',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:46.5705754Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:46.5705754Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:46.5705754Z',
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
  'Wed, 11 Sep 2019 02:21:46 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850582509887/dir156816850623400204')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3b8d0d8-601a-0029-4747-6810be000000',
  'x-ms-client-request-id',
  '371a709d-c1f8-49a3-bebe-e3ab79329768',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850582509887')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f828942-801a-0045-7347-68bb6d000000',
  'x-ms-client-request-id',
  '7ee66171-48c5-4a0d-9609-0a96d47f27cc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:47 GMT' ]);

