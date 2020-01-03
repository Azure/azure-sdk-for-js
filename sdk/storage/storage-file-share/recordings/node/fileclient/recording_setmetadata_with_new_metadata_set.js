let nock = require('nock');

module.exports.testInfo = {"share":"share156816836172400124","dir":"dir156816836214705742","file":"file156816836257007605"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816836172400124')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:22 GMT',
  'ETag',
  '"0x8D7365E7567B776"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41be3857-801a-006c-6547-68cd2f000000',
  'x-ms-client-request-id',
  '292fa8ae-0001-4b01-b1e1-a196588973ce',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816836172400124/dir156816836214705742')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:22 GMT',
  'ETag',
  '"0x8D7365E75A81D2B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8c4b19c-b01a-004d-0347-68a01e000000',
  'x-ms-client-request-id',
  'b93285e3-0242-4cf5-ac62-30d8c4b49393',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:22.4992043Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:22.4992043Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:22.4992043Z',
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
  'Wed, 11 Sep 2019 02:19:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816836172400124/dir156816836214705742/file156816836257007605')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:22 GMT',
  'ETag',
  '"0x8D7365E75E88D40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c971e-201a-0048-0747-685461000000',
  'x-ms-client-request-id',
  'a804b84e-11be-48cf-85ee-1f15815ac8e2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:22.9215040Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:22.9215040Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:22.9215040Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:22 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816836172400124/dir156816836214705742/file156816836257007605')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:23 GMT',
  'ETag',
  '"0x8D7365E762E5589"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3257ddd6-601a-000b-5547-687e88000000',
  'x-ms-client-request-id',
  'fbc70d6c-8335-467e-9df6-c4c5e1441d96',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816836172400124/dir156816836214705742/file156816836257007605')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:23 GMT',
  'ETag',
  '"0x8D7365E762E5589"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8064e63-901a-005a-4e47-68607d000000',
  'x-ms-client-request-id',
  'b276a318-5ff0-4e32-8bd9-01f2bfa89000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:19:23.3788297Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:22.9215040Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:22.9215040Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816836172400124')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd31b23c4-f01a-002c-1347-68e4c1000000',
  'x-ms-client-request-id',
  '4f292007-3ae4-409c-912f-738fbcad9445',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:23 GMT' ]);

