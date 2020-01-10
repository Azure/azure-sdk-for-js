let nock = require('nock');

module.exports.testInfo = {"share":"share156816827957205144","dir":"dir156816828000301480"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827957205144')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:59 GMT',
  'ETag',
  '"0x8D7365E447108FD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3cbca-801a-0023-3b47-680937000000',
  'x-ms-client-request-id',
  'a1143c6b-1092-405b-a053-c5306745e092',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827957205144/dir156816828000301480')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:00 GMT',
  'ETag',
  '"0x8D7365E44B207C1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56684007-c01a-0060-1147-6823de000000',
  'x-ms-client-request-id',
  '59447cda-2daa-49c2-af5c-6461d2ef2151',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:00.3558337Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:00.3558337Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:00.3558337Z',
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
  'Wed, 11 Sep 2019 02:17:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816827957205144/dir156816828000301480')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:00 GMT',
  'ETag',
  '"0x8D7365E44B207C1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8c4b138-b01a-004d-6d47-68a01e000000',
  'x-ms-client-request-id',
  '04a8fd43-36c0-4c74-a9f6-069da99d50e3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:18:00.3558337Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:00.3558337Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:00.3558337Z',
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
  'Wed, 11 Sep 2019 02:17:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816827957205144')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '076d31fe-b01a-0009-6f47-687c72000000',
  'x-ms-client-request-id',
  '914185a0-3ae7-4b7d-99d6-406c41d39827',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:00 GMT' ]);

