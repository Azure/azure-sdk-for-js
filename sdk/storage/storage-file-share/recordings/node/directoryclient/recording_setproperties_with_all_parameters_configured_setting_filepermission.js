let nock = require('nock');

module.exports.testInfo = {"share":"share156816829055901242","dir":"dir156816829097800053","now":"2019-09-11T02:18:11.859Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829055901242')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:10 GMT',
  'ETag',
  '"0x8D7365E4AFBD61A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e71ce456-001a-0039-1647-682658000000',
  'x-ms-client-request-id',
  '6dc0fc8f-e124-430c-b6ba-3a6dbf8897bb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:10 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829055901242/dir156816829097800053')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:11 GMT',
  'ETag',
  '"0x8D7365E4B3CF520"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d13b54d-101a-0026-5f47-68fd48000000',
  'x-ms-client-request-id',
  '209db28d-8cfe-44ff-9cfc-3f3547b8bb21',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:11.3326368Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:11.3326368Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:11.3326368Z',
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
  'Wed, 11 Sep 2019 02:18:10 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816829055901242')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [ 'Content-Length',
  '149',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e71ce458-001a-0039-1747-682658000000',
  'x-ms-client-request-id',
  'f6789c4e-8fc0-4251-9b09-bc9321f3aca8',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:11 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829055901242/dir156816829097800053')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:12 GMT',
  'ETag',
  '"0x8D7365E4BC6D7A1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fd16887-d01a-003b-2047-6824a2000000',
  'x-ms-client-request-id',
  '2b3f5152-8fb7-4c56-af1c-7170c9d4df78',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:12.2362785Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:11.8590000Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:11.8590000Z',
  'x-ms-file-permission-key',
  '8681810064597988261*13609941760923454748',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:11 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816829055901242/dir156816829097800053')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:12 GMT',
  'ETag',
  '"0x8D7365E4BC6D7A1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ca535b2-e01a-0033-6347-683fd1000000',
  'x-ms-client-request-id',
  '7b88a6e0-21e2-4449-8539-19fe4d9e3958',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:18:12.2362785Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:11.8590000Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:11.8590000Z',
  'x-ms-file-permission-key',
  '8681810064597988261*13609941760923454748',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:12 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829055901242')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33aceaa9-e01a-005e-1247-6895ff000000',
  'x-ms-client-request-id',
  '3d304ae1-2ac0-40cb-9475-8551d86d5ea3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:13 GMT' ]);

