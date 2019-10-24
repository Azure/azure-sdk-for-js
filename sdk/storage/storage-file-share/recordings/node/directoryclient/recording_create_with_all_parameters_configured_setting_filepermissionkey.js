let nock = require('nock');

module.exports.testInfo = {"share":"share156816828255304897","dir":"dir156816828365406032","dir156816828365406032":"dir156816828365406032156816828407905070","now":"2019-09-11T02:18:04.080Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828255304897')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:03 GMT',
  'ETag',
  '"0x8D7365E469A7151"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c7a9-701a-0036-3947-68cbae000000',
  'x-ms-client-request-id',
  '02c119a9-318f-4590-a2bb-f6b34d02150d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828255304897/dir156816828365406032')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:04 GMT',
  'ETag',
  '"0x8D7365E46DF1122"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ca535a8-e01a-0033-6047-683fd1000000',
  'x-ms-client-request-id',
  'fabe1564-694c-470e-8fa2-fdc692a2af6b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:04.0064290Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:04.0064290Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:04.0064290Z',
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
  'Wed, 11 Sep 2019 02:18:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828255304897/dir156816828365406032156816828407905070')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:04 GMT',
  'ETag',
  '"0x8D7365E46EA4B00"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c7ae-701a-0036-3a47-68cbae000000',
  'x-ms-client-request-id',
  '96a9c1aa-b226-4665-aadc-4d1fb58d91e8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:04.0800000Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:04.0800000Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:04.0800000Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816828255304897/dir156816828365406032156816828407905070')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:04 GMT',
  'ETag',
  '"0x8D7365E46EA4B00"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5da5fd7b-f01a-0068-3b47-6838ad000000',
  'x-ms-client-request-id',
  '16674fc2-ba67-4c6b-b9b3-8b320ad4f0c2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-11T02:18:04.0800000Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:04.0800000Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:04.0800000Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816828255304897')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b05151-101a-004b-6347-685766000000',
  'x-ms-client-request-id',
  'bb95e0b4-622f-4bf6-b3c7-728d411cf3de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:04 GMT' ]);

