let nock = require('nock');

module.exports.testInfo = {"share":"share156816834203308290","dir":"dir156816834246306920","directory":"directory156816834289702597","file":"file156816834331601273"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834203308290')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:02 GMT',
  'ETag',
  '"0x8D7365E69AC294F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ae13186-201a-0043-4547-684c15000000',
  'x-ms-client-request-id',
  '012188d3-04e3-4fdd-a301-2d73773744f2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834203308290/dir156816834246306920')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:02 GMT',
  'ETag',
  '"0x8D7365E69EBD007"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3cc1a-801a-0023-4b47-680937000000',
  'x-ms-client-request-id',
  '61429bc0-02ef-407e-a19a-3fb8a21c9080',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:02.8102151Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:02.8102151Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:02.8102151Z',
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
  'Wed, 11 Sep 2019 02:19:02 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834203308290/dir156816834246306920/directory156816834289702597')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:03 GMT',
  'ETag',
  '"0x8D7365E6A2DC708"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4021a286-e01a-001a-3247-684993000000',
  'x-ms-client-request-id',
  '3162d981-daf2-48ea-9b01-d5776d0b700e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:03.2425224Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:03.2425224Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:03.2425224Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834203308290/dir156816834246306920/directory156816834289702597/file156816834331601273')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:03 GMT',
  'ETag',
  '"0x8D7365E6A7600BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17ccfc47-401a-0035-1c47-68c8a9000000',
  'x-ms-client-request-id',
  '4143e742-c85e-4140-91b9-30807f4aa75a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:03.7158586Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:03.7158586Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:03.7158586Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835093239654252544',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816834203308290/dir156816834246306920/directory156816834289702597/file156816834331601273')
  .reply(200, "", [ 'Content-Length',
  '256',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:03 GMT',
  'ETag',
  '"0x8D7365E6A7600BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700efcf6-901a-001e-6747-68bc11000000',
  'x-ms-client-request-id',
  'f47c63be-237a-445f-a3f2-b1f2d74b0838',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:19:03.7158586Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:03.7158586Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:03.7158586Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835093239654252544',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816834203308290/dir156816834246306920/directory156816834289702597/file156816834331601273')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86173558-801a-0001-1347-686701000000',
  'x-ms-client-request-id',
  '4ffaac28-bc9a-4034-906c-613bd0f227d2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816834203308290/dir156816834246306920/directory156816834289702597/file156816834331601273')
  .reply(404, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3cc1d-801a-0023-4c47-680937000000',
  'x-ms-client-request-id',
  '13a3f64b-b0e6-491c-84ea-8815317c6b00',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816834203308290/dir156816834246306920/directory156816834289702597')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '333d7bd0-501a-0003-2b47-6865fb000000',
  'x-ms-client-request-id',
  'b910b2b4-bb75-4958-8953-d36e8cd42412',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816834203308290')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc18bc6-b01a-0064-7b47-68d65c000000',
  'x-ms-client-request-id',
  'd4f7b453-064e-443e-9b51-3756528bd796',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:05 GMT' ]);

