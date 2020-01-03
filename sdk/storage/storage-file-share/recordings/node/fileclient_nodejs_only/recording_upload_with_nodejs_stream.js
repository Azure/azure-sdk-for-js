let nock = require('nock');

module.exports.testInfo = {"share":"share156816851046804904","dir":"dir156816851087707084","file":"file156816851154503819","randomstring":"randomstring156816851154501911"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851046804904')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:50 GMT',
  'ETag',
  '"0x8D7365ECE0DD6FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86173636-801a-0001-4147-686701000000',
  'x-ms-client-request-id',
  '61fbe520-5383-4b3c-8a53-423fe509e95d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851046804904/dir156816851087707084')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:51 GMT',
  'ETag',
  '"0x8D7365ECE70AA94"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acf9395f-601a-0022-6c47-6808ca000000',
  'x-ms-client-request-id',
  'b3df6236-58b4-44a4-adc8-2e7b151070d6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:51.4530452Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:51.4530452Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:51.4530452Z',
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
  'Wed, 11 Sep 2019 02:21:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851046804904/dir156816851087707084/file156816851154503819')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:51 GMT',
  'ETag',
  '"0x8D7365ECEB168D8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3115b973-501a-0065-1347-68d7a1000000',
  'x-ms-client-request-id',
  '6bca7899-5887-4318-a5cc-e4f97e1b54b6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:51.8773464Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:51.8773464Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:51.8773464Z',
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
  'Wed, 11 Sep 2019 02:21:51 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816851046804904/dir156816851087707084/file156816851154503819', "randomstring156816851154501911")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'akD/RZQcLwmWvQVMEPbJiw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:52 GMT',
  'ETag',
  '"0x8D7365ECEF07924"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9158b7f8-f01a-0027-1547-68fcb5000000',
  'x-ms-client-request-id',
  'e1b467e6-989a-4f71-aae1-c0abf406a248',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:51 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816851046804904/dir156816851087707084/file156816851154503819')
  .reply(200, "randomstring156816851154501911", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365ECEF07924"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf05ec11-701a-0014-3d47-68a598000000',
  'x-ms-client-request-id',
  '9225fcf4-2838-4a03-916f-e1937894a81a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:51.8773464Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:51.8773464Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:51.8773464Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816851046804904')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4021a364-e01a-001a-6147-684993000000',
  'x-ms-client-request-id',
  '5da35705-0d7f-4e39-8dcc-944b08680169',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:52 GMT' ]);

