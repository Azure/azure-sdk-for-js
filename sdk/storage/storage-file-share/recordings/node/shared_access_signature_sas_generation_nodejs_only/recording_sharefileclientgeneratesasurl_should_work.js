let nock = require('nock');

module.exports.hash = "3af8b11447ca9fcd4f7a834a581bf811";

module.exports.testInfo = {"uniqueName":{"share":"share160716069729203196","dir":"dir160716069882505078","file":"file160716069918003810"},"newDate":{"now":"2020-12-05T09:31:37.291Z","tmr":"2020-12-05T09:31:37.292Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160716069729203196')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 09:31:38 GMT',
  'ETag',
  '"0x8D89900911E08B9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8039d08-b01a-0026-1ae9-ca1de5000000',
  'x-ms-client-request-id',
  '4d1bef0c-3f1f-4b28-9300-f704659e2a46',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 09:31:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160716069729203196/dir160716069882505078')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 09:31:39 GMT',
  'ETag',
  '"0x8D8990091536ED8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8039d0c-b01a-0026-1be9-ca1de5000000',
  'x-ms-client-request-id',
  '24b56584-b7f6-435a-8c7f-894064ce4725',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-12-05T09:31:39.0139096Z',
  'x-ms-file-last-write-time',
  '2020-12-05T09:31:39.0139096Z',
  'x-ms-file-creation-time',
  '2020-12-05T09:31:39.0139096Z',
  'x-ms-file-permission-key',
  '18253506462963126402*10775527834424002315',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 05 Dec 2020 09:31:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160716069729203196/dir160716069882505078/file160716069918003810')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 09:31:39 GMT',
  'ETag',
  '"0x8D8990091892E84"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8039d0f-b01a-0026-1ce9-ca1de5000000',
  'x-ms-client-request-id',
  '15afc5f6-bac7-4d71-bee4-0d1745f1d48a',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-12-05T09:31:39.3661572Z',
  'x-ms-file-last-write-time',
  '2020-12-05T09:31:39.3661572Z',
  'x-ms-file-creation-time',
  '2020-12-05T09:31:39.3661572Z',
  'x-ms-file-permission-key',
  '4407534441384161157*10775527834424002315',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 05 Dec 2020 09:31:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share160716069729203196/dir160716069882505078/file160716069918003810')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Sat, 05 Dec 2020 09:31:39 GMT',
  'ETag',
  '"0x8D8990091892E84"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8039d10-b01a-0026-1de9-ca1de5000000',
  'x-ms-client-request-id',
  '6eb7d83e-2a40-49a7-a422-8b649e9c9c4e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-type',
  'File',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-12-05T09:31:39.3661572Z',
  'x-ms-file-last-write-time',
  '2020-12-05T09:31:39.3661572Z',
  'x-ms-file-creation-time',
  '2020-12-05T09:31:39.3661572Z',
  'x-ms-file-permission-key',
  '4407534441384161157*10775527834424002315',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 05 Dec 2020 09:31:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160716069729203196')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8039d12-b01a-0026-1ee9-ca1de5000000',
  'x-ms-client-request-id',
  '47613521-4d3b-4ed0-b028-65301567e19e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 09:31:39 GMT'
]);
